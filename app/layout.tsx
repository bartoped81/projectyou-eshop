import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { CartBadge } from "@/components/cart-badge";
import { UserMenu } from "@/components/user-menu";
import { RealtimeNotifications } from "@/components/realtime-notifications";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProjectYOU - Vzdělávací kurzy pro firmy",
  description: "AI Firemní Akcelerátor, Aplikovaná Improvizace a další transformační kurzy pro moderní firmy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body
        className={`${inter.variable} ${urbanist.variable} antialiased bg-white text-slate-900`}
      >
        <AuthProvider>
        <CartProvider>
        {/* Header - přesně jako pyou.html */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-20 gap-8">
              {/* Logo - úplně vlevo, bez max-width */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <img
                  src="https://www.projectyou.cz/files/projectyou-logo-rgb.svg"
                  alt="projectYOU"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Primary Navigation - rostoucí střed */}
              <nav className="hidden lg:flex items-center space-x-6 flex-grow justify-center">
                <div className="relative group">
                  <button className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
                    Programy
                  </button>
                  {/* Dropdown pro Programy */}
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/programy-pro-organizace" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Programy pro organizace
                    </Link>
                    <Link href="/programy-pro-leadery" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Programy pro leadery
                    </Link>
                    <Link href="/programy-pro-tymy" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Programy pro týmy
                    </Link>
                    <Link href="/programy-pro-talenty" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Programy pro talenty
                    </Link>
                    <Link href="/prehled-programu" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Přehled programů
                    </Link>
                  </div>
                </div>

                <Link href="/reference" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Reference
                </Link>

                <Link href="/open-courses" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Otevřené kurzy
                </Link>

                <Link href="/posilame-to-dal" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Posíláme to dál
                </Link>

                <Link href="/novinky" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Novinky
                </Link>

                <div className="relative group">
                  <button className="text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">
                    O nás
                  </button>
                  {/* Dropdown pro O nás */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/kdo-jsme" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Kdo jsme
                    </Link>
                    <Link href="/tym" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Tým
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Secondary Navigation - úplně vpravo */}
              <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
                <Link href="/kontakty" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Kontakty
                </Link>

                {/* Shopping Cart */}
                <CartBadge />

                {/* Language switcher */}
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 font-semibold">cs</span>
                  <span className="text-slate-400">|</span>
                  <Link href="/en" className="text-slate-400 hover:text-blue-600 transition-colors">
                    en
                  </Link>
                </div>

                {/* User Menu - dočasně skryto */}
                {/* <UserMenu /> */}
              </div>

              {/* Mobile menu button */}
              <button className="lg:hidden p-2 text-slate-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Spacer pro fixed header */}
        <div className="h-20"></div>

        {/* Realtime Notifications */}
        <RealtimeNotifications />

        {children}

        {/* Footer */}
        <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
