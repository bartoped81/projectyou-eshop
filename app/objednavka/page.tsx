"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, CreditCard, FileText, QrCode } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  lastName: z.string().min(2, "Příjmení musí mít alespoň 2 znaky"),
  email: z.string().email("Neplatná emailová adresa"),
  phone: z.string().min(9, "Neplatné telefonní číslo"),
  street: z.string().min(3, "Ulice a číslo popisné jsou povinné"),
  city: z.string().min(2, "Město je povinné"),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/, "PSČ musí být ve formátu 123 45"),
  isCompany: z.boolean(),
  companyName: z.string().optional(),
  ico: z.string().optional(),
  dic: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;
type PaymentMethod = "invoice" | "qr" | "card";

export default function CheckoutPage() {
  const { items, totalPriceWithoutVat, totalVat, totalPriceWithVat, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("invoice");
  const [showCardModal, setShowCardModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      isCompany: false,
    },
  });

  const isCompany = watch("isCompany");

  // Redirect to cart if empty (but not during order submission)
  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      router.push("/kosik");
    }
  }, [items.length, router, isSubmitting]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (paymentMethod === "card") {
      setShowCardModal(true);
      return;
    }
    await processOrder(data);
  };

  const processOrder = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare payload for Edge Function
      const payload = {
        userData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          street: data.street,
          city: data.city,
          zip: data.zip,
          isCompany: data.isCompany,
          companyName: data.companyName,
          ico: data.ico,
          dic: data.dic,
        },
        items: items,
        paymentMethod: paymentMethod,
        totalPriceWithoutVat: totalPriceWithoutVat,
        totalVat: totalVat,
        totalPriceWithVat: totalPriceWithVat,
      };

      // Call Edge Function
      const { data: result, error } = await supabase.functions.invoke("process-order", {
        body: payload,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!result.success) {
        throw new Error(result.error || "Neznámá chyba při zpracování objednávky");
      }

      // Redirect to success page with order details first, then clear cart
      const params = new URLSearchParams({
        orderId: result.orderId,
        variableSymbol: result.variableSymbol,
        paymentMethod: paymentMethod,
        totalAmount: totalPriceWithVat.toString(),
      });
      router.push(`/platba/uspech?${params.toString()}`);

      // Clear cart after navigation starts (with small delay to ensure navigation begins)
      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Chyba při zpracování objednávky. Zkuste to prosím znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Dokončení objednávky</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Vaše údaje</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Jméno *</label>
                      <input {...register("firstName")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Jan" />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Příjmení *</label>
                      <input {...register("lastName")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Novák" />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                    <input {...register("email")} type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="jan.novak@example.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Telefon *</label>
                    <input {...register("phone")} type="tel" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="+420 123 456 789" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ulice a číslo popisné *</label>
                    <input {...register("street")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Václavské náměstí 1" />
                    {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Město *</label>
                      <input {...register("city")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Praha" />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">PSČ *</label>
                      <input {...register("zip")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="110 00" />
                      {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <label className="flex items-center cursor-pointer">
                      <input {...register("isCompany")} type="checkbox" className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-3 text-sm font-semibold text-slate-700">Nakupuji na firmu</span>
                    </label>
                  </div>
                  {isCompany && (
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Název firmy *</label>
                        <input {...register("companyName")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="ProjectYOU s.r.o." />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">IČO *</label>
                          <input {...register("ico")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">DIČ</label>
                          <input {...register("dic")} type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="CZ12345678" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Způsob platby</h2>
                <div className="space-y-3">
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "invoice" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                    <div className="flex items-start">
                      <input type="radio" name="paymentMethod" value="invoice" checked={paymentMethod === "invoice"} onChange={() => setPaymentMethod("invoice")} className="mt-1 w-5 h-5 text-blue-600" />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-slate-900">Zálohová faktura</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">Faktura se splatností 14 dní. Po odeslání objednávky vám zašleme fakturu na email.</p>
                      </div>
                    </div>
                  </label>
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "qr" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                    <div className="flex items-start">
                      <input type="radio" name="paymentMethod" value="qr" checked={paymentMethod === "qr"} onChange={() => setPaymentMethod("qr")} className="mt-1 w-5 h-5 text-blue-600" />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <QrCode className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-slate-900">QR kód</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">Okamžitá platba pomocí QR kódu v mobilní aplikaci vaší banky.</p>
                      </div>
                    </div>
                  </label>
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === "card" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                    <div className="flex items-start">
                      <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mt-1 w-5 h-5 text-blue-600" />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-slate-900">Platba kartou</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">Okamžitá platba online pomocí platební karty.</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Shrnutí objednávky</h2>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.courseDateId} className="text-sm pb-3 border-b border-slate-200">
                      <div className="font-semibold text-slate-900 mb-1">{item.courseTitle}</div>
                      <div className="text-slate-600 text-xs">{new Date(item.startDate).toLocaleDateString("cs-CZ")} • {item.location}</div>
                      <div className="flex justify-between mt-2">
                        <span className="text-slate-600">{item.quantity}× {item.pricePerPerson.toLocaleString("cs-CZ")} Kč</span>
                        <span className="font-semibold">{(item.quantity * item.pricePerPerson).toLocaleString("cs-CZ")} Kč</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Cena bez DPH:</span>
                    <span className="font-semibold">{totalPriceWithoutVat.toLocaleString("cs-CZ")} Kč</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">DPH (21%):</span>
                    <span className="font-semibold">{totalVat.toLocaleString("cs-CZ")} Kč</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-900">Celkem s DPH:</span>
                      <span className="font-bold text-blue-600 text-xl">{totalPriceWithVat.toLocaleString("cs-CZ")} Kč</span>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Zpracovávám...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Závazně objednat
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 mt-4 text-center">Odesláním objednávky souhlasíte s obchodními podmínkami a zpracováním osobních údajů.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showCardModal && (
        <CardPaymentModal totalAmount={totalPriceWithVat} onSuccess={() => { setShowCardModal(false); handleSubmit(processOrder)(); }} onCancel={() => setShowCardModal(false)} />
      )}
    </div>
  );
}

function CardPaymentModal({ totalAmount, onSuccess, onCancel }: { totalAmount: number; onSuccess: () => void; onCancel: () => void; }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (value: string) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 16 digits
    const limited = digitsOnly.slice(0, 16);
    // Add space after every 4 digits
    const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 4 digits (MMYY)
    const limited = digitsOnly.slice(0, 4);
    // Add slash after 2 digits
    if (limited.length >= 2) {
      setExpiry(limited.slice(0, 2) + "/" + limited.slice(2));
    } else {
      setExpiry(limited);
    }
  };

  const handlePayment = async () => {
    setError("");
    // Remove spaces and slash for validation
    const cardNumberClean = cardNumber.replace(/\s/g, "");
    if (cardNumberClean !== "1111111111111111" || expiry !== "11/11" || cvc !== "111") {
      setError("Neplatná karta. Pro testování použijte: 1111 1111 1111 1111, 11/11, 111");
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Platba kartou</h3>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-slate-600 mb-1">Částka k úhradě:</div>
          <div className="text-2xl font-bold text-blue-600">{totalAmount.toLocaleString("cs-CZ")} Kč</div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Číslo karty</label>
            <input type="text" value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} maxLength={19} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="1111 1111 1111 1111" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Platnost</label>
              <input type="text" value={expiry} onChange={(e) => handleExpiryChange(e.target.value)} maxLength={5} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">CVC</label>
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} maxLength={3} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="111" />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600"><strong>Test režim:</strong> Pro úspěšnou platbu použijte číslo karty <strong>1111 1111 1111 1111</strong>, platnost <strong>11/11</strong> a CVC <strong>111</strong>.</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">Zrušit</button>
          <button onClick={handlePayment} disabled={isProcessing} className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center">
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Zpracovávám...
              </>
            ) : (
              "Zaplatit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
