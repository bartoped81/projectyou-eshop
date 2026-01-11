import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import pdfMake from "https://esm.sh/pdfmake@0.2.7/build/pdfmake.js";
import pdfFonts from "https://esm.sh/pdfmake@0.2.7/build/vfs_fonts.js";

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface OrderItem {
  courseDateId: string;
  courseTitle: string;
  courseSlug: string;
  startDate: string;
  endDate: string;
  location: string;
  quantity: number;
  pricePerPerson: number;
  vatRate: number;
}

interface OrderPayload {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    isCompany: boolean;
    companyName?: string;
    ico?: string;
    dic?: string;
  };
  items: OrderItem[];
  paymentMethod: "invoice" | "qr" | "card";
  totalPriceWithoutVat: number;
  totalVat: number;
  totalPriceWithVat: number;
}

serve(async (req) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const payload: OrderPayload = await req.json();
    const { userData, items, paymentMethod, totalPriceWithoutVat, totalVat, totalPriceWithVat } = payload;

    // Generate variable symbol: 99YYYYMMXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const randomPart = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    const variableSymbol = `99${year}${month}${randomPart}`;

    // Start database transaction
    // 1. Create order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        street: userData.street,
        city: userData.city,
        zip: userData.zip,
        is_company: userData.isCompany,
        company_name: userData.companyName || null,
        ico: userData.ico || null,
        dic: userData.dic || null,
        payment_method: paymentMethod,
        total_price_without_vat: totalPriceWithoutVat,
        total_vat: totalVat,
        total_price_with_vat: totalPriceWithVat,
        variable_symbol: variableSymbol,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // 2. Create order items and update course dates capacity
    for (const item of items) {
      // Insert order item
      const { error: itemError } = await supabaseClient
        .from("order_items")
        .insert({
          order_id: order.id,
          course_date_id: item.courseDateId,
          course_title: item.courseTitle,
          course_slug: item.courseSlug,
          start_date: item.startDate,
          end_date: item.endDate,
          location: item.location,
          quantity: item.quantity,
          price_per_person: item.pricePerPerson,
          vat_rate: item.vatRate,
        });

      if (itemError) {
        throw new Error(`Failed to create order item: ${itemError.message}`);
      }

      // Update course date capacity
      const { data: courseDate, error: fetchError } = await supabaseClient
        .from("course_dates")
        .select("current_booked_count")
        .eq("id", item.courseDateId)
        .single();

      if (fetchError) {
        throw new Error(`Failed to fetch course date: ${fetchError.message}`);
      }

      const newBookedCount = (courseDate.current_booked_count || 0) + item.quantity;

      const { error: updateError } = await supabaseClient
        .from("course_dates")
        .update({ current_booked_count: newBookedCount })
        .eq("id", item.courseDateId);

      if (updateError) {
        throw new Error(`Failed to update capacity: ${updateError.message}`);
      }
    }

    // 3. Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF({
      order,
      userData,
      items,
      variableSymbol,
      totalPriceWithoutVat,
      totalVat,
      totalPriceWithVat,
    });

    // 4. Send email with invoice attachment
    await sendOrderConfirmationEmail({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      variableSymbol,
      totalPriceWithVat,
      paymentMethod,
      pdfBuffer,
      items,
    });

    // 5. Optional: Upload to Google Drive (if credentials exist)
    // This would require setting up Google Drive API credentials
    // Skipping for now, can be added later

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        variableSymbol,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

// Generate PDF invoice using pdfMake
async function generateInvoicePDF(params: any): Promise<Uint8Array> {
  const { order, userData, items, variableSymbol, totalPriceWithoutVat, totalVat, totalPriceWithVat } = params;

  const docDefinition = {
    content: [
      // Header
      {
        columns: [
          {
            width: "*",
            stack: [
              { text: "ProjectYOU", style: "header", color: "#2563eb" },
              { text: "Vzdělávací kurzy pro firmy", style: "subheader" },
            ],
          },
          {
            width: "auto",
            stack: [
              { text: "ZÁLOHOVÁ FAKTURA", style: "invoiceTitle", alignment: "right" },
              { text: `Číslo: ${order.id}`, alignment: "right" },
              { text: `Variabilní symbol: ${variableSymbol}`, alignment: "right" },
              {
                text: `Datum vystavení: ${new Date().toLocaleDateString("cs-CZ")}`,
                alignment: "right",
              },
            ],
          },
        ],
        margin: [0, 0, 0, 30],
      },

      // Supplier and Customer
      {
        columns: [
          {
            width: "50%",
            stack: [
              { text: "Dodavatel:", style: "sectionHeader" },
              { text: "ProjectYOU s.r.o.", bold: true },
              { text: "Adresa dodavatele" },
              { text: "IČO: 12345678" },
              { text: "DIČ: CZ12345678" },
            ],
          },
          {
            width: "50%",
            stack: [
              { text: "Odběratel:", style: "sectionHeader" },
              {
                text: userData.isCompany ? userData.companyName : `${userData.firstName} ${userData.lastName}`,
                bold: true,
              },
              { text: `${userData.street}` },
              { text: `${userData.zip} ${userData.city}` },
              userData.ico ? { text: `IČO: ${userData.ico}` } : {},
              userData.dic ? { text: `DIČ: ${userData.dic}` } : {},
              { text: `Email: ${userData.email}` },
              { text: `Telefon: ${userData.phone}` },
            ],
          },
        ],
        margin: [0, 0, 0, 30],
      },

      // Items table
      {
        table: {
          headerRows: 1,
          widths: ["*", 50, 60, 60, 80],
          body: [
            [
              { text: "Položka", style: "tableHeader" },
              { text: "Množství", style: "tableHeader", alignment: "center" },
              { text: "Cena/ks", style: "tableHeader", alignment: "right" },
              { text: "DPH", style: "tableHeader", alignment: "right" },
              { text: "Celkem", style: "tableHeader", alignment: "right" },
            ],
            ...items.map((item: OrderItem) => [
              {
                text: [
                  { text: item.courseTitle, bold: true },
                  "\n",
                  {
                    text: `${new Date(item.startDate).toLocaleDateString("cs-CZ")} - ${item.location}`,
                    fontSize: 9,
                    color: "#64748b",
                  },
                ],
              },
              { text: item.quantity.toString(), alignment: "center" },
              { text: `${item.pricePerPerson.toLocaleString("cs-CZ")} Kč`, alignment: "right" },
              { text: `${item.vatRate}%`, alignment: "right" },
              {
                text: `${(item.pricePerPerson * item.quantity).toLocaleString("cs-CZ")} Kč`,
                alignment: "right",
              },
            ]),
          ],
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? "#f1f5f9" : null),
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#e2e8f0",
          vLineColor: () => "#e2e8f0",
        },
        margin: [0, 0, 0, 20],
      },

      // Totals
      {
        columns: [
          { width: "*", text: "" },
          {
            width: 200,
            stack: [
              {
                columns: [
                  { text: "Cena bez DPH:", width: "*" },
                  {
                    text: `${totalPriceWithoutVat.toLocaleString("cs-CZ")} Kč`,
                    width: "auto",
                    alignment: "right",
                  },
                ],
                margin: [0, 0, 0, 5],
              },
              {
                columns: [
                  { text: "DPH 21%:", width: "*" },
                  { text: `${totalVat.toLocaleString("cs-CZ")} Kč`, width: "auto", alignment: "right" },
                ],
                margin: [0, 0, 0, 5],
              },
              {
                columns: [
                  { text: "Celkem k úhradě:", width: "*", bold: true, fontSize: 14 },
                  {
                    text: `${totalPriceWithVat.toLocaleString("cs-CZ")} Kč`,
                    width: "auto",
                    alignment: "right",
                    bold: true,
                    fontSize: 14,
                    color: "#2563eb",
                  },
                ],
                margin: [0, 10, 0, 0],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 30],
      },

      // Payment info
      {
        stack: [
          { text: "Platební údaje:", style: "sectionHeader" },
          { text: `Variabilní symbol: ${variableSymbol}`, bold: true },
          { text: "Číslo účtu: 123456789/0100" },
          { text: "IBAN: CZ00 0000 0000 0000 0000 0000" },
          { text: "Splatnost: 14 dní od vystavení" },
        ],
        margin: [0, 0, 0, 20],
      },

      // Footer
      {
        text: "Děkujeme za Vaši objednávku!",
        style: "footer",
        alignment: "center",
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 5],
      },
      subheader: {
        fontSize: 12,
        color: "#64748b",
      },
      invoiceTitle: {
        fontSize: 18,
        bold: true,
        color: "#2563eb",
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: "#2563eb",
        margin: [0, 0, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "#334155",
      },
      footer: {
        fontSize: 12,
        italics: true,
        color: "#64748b",
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  return new Promise((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBuffer((buffer: Uint8Array) => {
      resolve(buffer);
    });
  });
}

// Send order confirmation email with invoice
async function sendOrderConfirmationEmail(params: any): Promise<void> {
  const { email, firstName, lastName, variableSymbol, totalPriceWithVat, paymentMethod, pdfBuffer, items } = params;

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") || "onboarding@resend.dev";

  if (!RESEND_API_KEY) {
    console.warn("Resend API key not configured, skipping email send");
    return;
  }

  const resend = new Resend(RESEND_API_KEY);

  // Convert Uint8Array to base64
  const base64PDF = btoa(String.fromCharCode(...pdfBuffer));

  // Determine if payment is already completed
  const isPaymentCompleted = paymentMethod === "card" || paymentMethod === "qr";

  const paymentMethodText = {
    invoice: "Zálohová faktura",
    qr: "QR kód",
    card: "Platební karta",
  }[paymentMethod] || "Platební karta";

  const invoiceType = paymentMethod === "invoice" ? "Zálohová faktura" : "Faktura";
  const paymentStatusText = isPaymentCompleted
    ? "✓ Platba byla úspěšně přijata"
    : "⏳ Čeká se na platbu";

  // Get first course info for the email (simplified for now)
  const firstItem = items[0];
  const courseName = firstItem.courseTitle;
  const courseDate = new Date(firstItem.startDate).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const courseTime = `${new Date(firstItem.startDate).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${new Date(firstItem.endDate).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  const courseLocation = firstItem.location;
  const participantCount = items.reduce((sum: number, item: OrderItem) => sum + item.quantity, 0);

  // Create email HTML (inline since we can't easily import React components in Deno edge functions)
  const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potvrzení objednávky - GrowPORT</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #1e40af; padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; padding: 0;">GrowPORT</h1>
              <p style="color: #93c5fd; font-size: 16px; margin: 8px 0 0 0;">Potvrzení objednávky - ${invoiceType}</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <div style="font-size: 48px; margin: 0 0 16px 0;">✅</div>
              <h2 style="color: #1e293b; font-size: 24px; font-weight: bold; margin: 0 0 12px 0;">Děkujeme za vaši objednávku!</h2>
              <p style="color: #475569; font-size: 16px; line-height: 24px; margin: 0;">
                Vaše registrace na kurz byla úspěšně dokončena. Těšíme se na viděnou!
              </p>
            </td>
          </tr>

          <tr><td style="padding: 0 40px;"><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;"></td></tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Detaily objednávky</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px; width: 40%;">Číslo objednávky:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${variableSymbol}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Jméno:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Email:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${email}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="padding: 0 40px;"><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;"></td></tr>

          <!-- Course Details -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Informace o kurzu</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px; width: 40%;">Název kurzu:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${courseName}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Datum:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${courseDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Čas:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${courseTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Místo konání:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${courseLocation}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Počet účastníků:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${participantCount}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="padding: 0 40px;"><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;"></td></tr>

          <!-- Payment Details -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Platební informace</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px; width: 40%;">Způsob platby:</td>
                  <td style="color: #1e293b; font-size: 14px; padding-bottom: 12px;">${paymentMethodText}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-size: 14px; padding-bottom: 12px;">Celková částka:</td>
                  <td style="color: #1e293b; font-size: 16px; font-weight: bold; padding-bottom: 12px;">${totalPriceWithVat.toLocaleString("cs-CZ")} Kč</td>
                </tr>
              </table>
              <div style="background-color: ${isPaymentCompleted ? '#d1fae5' : '#fef3c7'}; color: ${isPaymentCompleted ? '#059669' : '#d97706'}; font-size: 14px; font-weight: 600; margin: 16px 0 0 0; padding: 12px; border-radius: 8px; text-align: center;">
                ${paymentStatusText}
              </div>
            </td>
          </tr>

          <tr><td style="padding: 0 40px;"><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;"></td></tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">Co dál?</h3>
              <p style="color: #475569; font-size: 14px; line-height: 22px; margin: 0 0 12px 0;">
                📧 Další instrukce a materiály k přípravě na kurz vám zašleme několik dní před začátkem.
              </p>
              <p style="color: #475569; font-size: 14px; line-height: 22px; margin: 0 0 12px 0;">
                📍 Nezapomeňte si poznamenat datum, čas a místo konání kurzu.
              </p>
              <p style="color: #475569; font-size: 14px; line-height: 22px; margin: 0;">
                📞 V případě jakýchkoliv dotazů nás neváhejte kontaktovat.
              </p>
            </td>
          </tr>

          <tr><td style="padding: 0 40px;"><hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; line-height: 22px; margin: 0 0 12px 0;">
                S pozdravem,<br/>
                Tým GrowPORT
              </p>
              <p style="color: #64748b; font-size: 14px; line-height: 22px; margin: 0 0 20px 0;">
                📧 info@growport.cz<br/>
                🌐 www.growport.cz
              </p>
              <p style="color: #94a3b8; font-size: 12px; line-height: 18px; margin: 0;">
                Tento email byl zaslán na adresu ${email} jako potvrzení vaší objednávky.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Potvrzení objednávky - ${courseName}`,
      html: emailHTML,
      attachments: [
        {
          filename: `faktura-${variableSymbol}.pdf`,
          content: base64PDF,
        },
      ],
    });

    console.log(`Email sent successfully to ${email}`, result);
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    // Don't throw - we don't want to fail the whole order if email fails
  }
}
