import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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
  const { email, firstName, lastName, variableSymbol, totalPriceWithVat, paymentMethod, pdfBuffer } = params;

  const SMTP_USER = Deno.env.get("SMTP_USER");
  const SMTP_PASS = Deno.env.get("SMTP_PASS");

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP credentials not configured, skipping email send");
    return;
  }

  // Convert Uint8Array to base64
  const base64PDF = btoa(String.fromCharCode(...pdfBuffer));

  const paymentMethodText = {
    invoice: "zálohovou fakturu",
    qr: "QR kód",
    card: "platební kartu",
  }[paymentMethod];

  const emailBody = `
    <h2>Potvrzení objednávky - ProjectYOU</h2>
    <p>Dobrý den ${firstName} ${lastName},</p>
    <p>děkujeme za Vaši objednávku vzdělavacích kurzů v ProjectYOU.</p>
    <h3>Detail objednávky:</h3>
    <ul>
      <li><strong>Variabilní symbol:</strong> ${variableSymbol}</li>
      <li><strong>Celková částka:</strong> ${totalPriceWithVat.toLocaleString("cs-CZ")} Kč</li>
      <li><strong>Způsob platby:</strong> ${paymentMethodText}</li>
    </ul>
    <p>V příloze naleznete zálohovou fakturu. Platba je splatná do 14 dnů od vystavení.</p>
    <p>V případě jakýchkoli dotazů nás neváhejte kontaktovat.</p>
    <p>S pozdravem,<br/>Tým ProjectYOU</p>
  `;

  // Using a simple fetch to an email service or SMTP relay
  // For production, you'd want to use a proper email service like SendGrid, Mailgun, etc.
  // Here's a simple example using a hypothetical email API:

  try {
    // This is a placeholder - in production you'd use a real email service
    // For now, just log that we would send an email
    console.log(`Would send email to ${email} with VS: ${variableSymbol}`);
    console.log(`Email body length: ${emailBody.length}`);
    console.log(`PDF buffer size: ${pdfBuffer.length}`);

    // TODO: Implement actual email sending with nodemailer or email service API
    // Example with SendGrid, Mailgun, or SMTP relay would go here
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
