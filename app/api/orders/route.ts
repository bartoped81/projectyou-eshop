import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

export async function POST(req: NextRequest) {
  try {
    // Create Supabase client with service role key for admin operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: OrderPayload = await req.json();
    const {
      userData,
      items,
      paymentMethod,
      totalPriceWithoutVat,
      totalVat,
      totalPriceWithVat,
    } = payload;

    // Generate variable symbol: 99YYYYMMXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const randomPart = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    const variableSymbol = `99${year}${month}${randomPart}`;

    // 1. Create order
    const { data: order, error: orderError } = await supabase
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
      console.error("Order creation error:", orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // 2. Create order items and update course dates capacity
    for (const item of items) {
      // Insert order item
      const { error: itemError } = await supabase.from("order_items").insert({
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
        console.error("Order item creation error:", itemError);
        throw new Error(`Failed to create order item: ${itemError.message}`);
      }

      // Update course date capacity
      const { data: courseDate, error: fetchError } = await supabase
        .from("course_dates")
        .select("current_booked_count")
        .eq("id", item.courseDateId)
        .single();

      if (fetchError) {
        console.error("Course date fetch error:", fetchError);
        throw new Error(`Failed to fetch course date: ${fetchError.message}`);
      }

      const newBookedCount = (courseDate.current_booked_count || 0) + item.quantity;

      const { error: updateError } = await supabase
        .from("course_dates")
        .update({ current_booked_count: newBookedCount })
        .eq("id", item.courseDateId);

      if (updateError) {
        console.error("Capacity update error:", updateError);
        throw new Error(`Failed to update capacity: ${updateError.message}`);
      }
    }

    // 3. Send confirmation email (optional - can be done asynchronously)
    // For now, we'll skip email and PDF generation to get the basic flow working
    // You can add this later using Resend API
    console.log("Order created successfully:", order.id);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      variableSymbol,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
