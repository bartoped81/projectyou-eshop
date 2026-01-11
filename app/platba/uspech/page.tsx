"use client";

import Link from "next/link";
import { CheckCircle, Home, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Suspense, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export const dynamic = 'force-dynamic';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");
  const variableSymbol = searchParams.get("variableSymbol");
  const totalAmount = searchParams.get("totalAmount");
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  // Clear cart when the success page loads (only once)
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Generate QR payment string (Czech QR payment standard)
  const generateQRPaymentString = () => {
    if (!variableSymbol || !totalAmount) return "";

    // Czech QR payment format (Short Payment Descriptor)
    const accountNumber = "123456789";
    const bankCode = "0100";
    const amount = parseFloat(totalAmount).toFixed(2);

    return `SPD*1.0*ACC:CZ0001000000000${accountNumber}*AM:${amount}*CC:CZK*MSG:Objednávka ${orderId}*X-VS:${variableSymbol}`;
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Děkujeme za vaši objednávku!
          </h1>

          <p className="text-lg text-slate-600 mb-8">
            Vaše objednávka byla úspěšně přijata a zpracovává se.
          </p>

          {/* QR Code for QR Payment */}
          {paymentMethod === "qr" && variableSymbol && totalAmount && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                Naskenujte QR kód pro platbu
              </h3>
              <div className="bg-white p-6 rounded-lg inline-block mb-4">
                <QRCodeSVG
                  value={generateQRPaymentString()}
                  size={256}
                  level="M"
                  includeMargin={true}
                />
              </div>
              <div className="text-left bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Variabilní symbol:</span>
                  <span className="font-bold text-slate-900">{variableSymbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Částka k úhradě:</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {parseFloat(totalAmount).toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Číslo účtu:</span>
                  <span className="font-mono text-slate-900">123456789/0100</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                Naskenujte QR kód mobilní aplikací vaší banky pro okamžité provedení platby.
              </p>
            </div>
          )}

          {/* Invoice Payment Info */}
          {paymentMethod === "invoice" && variableSymbol && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                Platební údaje
              </h3>
              <div className="text-left bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Variabilní symbol:</span>
                  <span className="font-bold text-slate-900">{variableSymbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Číslo účtu:</span>
                  <span className="font-mono text-slate-900">123456789/0100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Částka:</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {totalAmount ? parseFloat(totalAmount).toLocaleString("cs-CZ") : "0"} Kč
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Splatnost:</span>
                  <span className="text-slate-900">14 dní</span>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Co se stane dále?
                </h3>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>• Na váš email jsme odeslali potvrzení objednávky</li>
                  <li>• V případě zálohové faktury vám zašleme fakturu do 24 hodin</li>
                  <li>• Před začátkem kurzu vám pošleme všechny potřebné informace</li>
                  <li>
                    • V případě dotazů nás kontaktujte na{" "}
                    <a
                      href="mailto:info@projectyou.cz"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      info@projectyou.cz
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Zpět na hlavní stránku
            </Link>
            <Link
              href="/open-courses"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Prohlédnout další kurzy
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Číslo objednávky a další detaily najdete v emailu, který jsme vám
              zaslali.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Načítání...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
