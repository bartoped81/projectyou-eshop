"use client";

import Link from "next/link";
import { CheckCircle, Home, Mail } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function OrderSuccessPage() {
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
