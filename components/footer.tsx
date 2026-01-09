import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo a hlavní odkazy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo */}
          <div className="lg:col-span-3">
            <img
              src="https://www.projectyou.cz/files/projectyou-logo-claim-pod-logo-cz.svg"
              alt="projectYOU"
              className="h-auto w-full max-w-[300px]"
            />
          </div>

          {/* Čtyři barevné boxy s odkazy */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* Rozvoj organizací - Modrá */}
            <Link
              href="/programy-pro-organizace"
              className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition-colors"
            >
              &gt; Rozvoj organizací
            </Link>

            {/* Rozvoj leaderů - Tyrkysová */}
            <Link
              href="/programy-pro-leadery"
              className="bg-cyan-500 text-slate-900 p-4 hover:bg-cyan-600 transition-colors"
            >
              &gt; Rozvoj leaderů
            </Link>

            {/* Rozvoj týmů - Červená */}
            <Link
              href="/programy-pro-tymy"
              className="bg-rose-600 text-white p-4 hover:bg-rose-700 transition-colors"
            >
              &gt; Rozvoj týmů
            </Link>

            {/* Rozvoj talentů - Oranžová */}
            <Link
              href="/programy-pro-talenty"
              className="bg-amber-500 text-slate-900 p-4 hover:bg-amber-600 transition-colors"
            >
              &gt; Rozvoj talentů
            </Link>
          </div>
        </div>

        {/* Kontaktní informace - 4 sloupce */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Kontakty */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Kontakty</h3>
            <p className="text-slate-600 text-sm">
              +420 722 928 413
              <br />
              <a
                href="mailto:hello@projectyou.cz"
                className="hover:text-blue-600 transition-colors"
              >
                hello@projectyou.cz
              </a>
            </p>
          </div>

          {/* Sídlo firmy */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Sídlo firmy</h3>
            <p className="text-slate-600 text-sm">
              projectYOU s.r.o.
              <br />
              Hálův statek 1584/1
              <br />
              Praha 10
              <br />
              102 00
            </p>
          </div>

          {/* Fakturační údaje */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Fakturační údaje</h3>
            <p className="text-slate-600 text-sm">
              IČ: 198 555 32
              <br />
              DIČ: CZ 198 555 32
            </p>
          </div>

          {/* Spojte se s námi - Social media */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Spojte se s námi</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/projectyou-cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/projectyou.cz?igsh=a2V2MmJ3bWtkc2Iw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/projectyou2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Zásady ochrany osobních údajů */}
        <div className="text-center pt-6 border-t border-slate-200">
          <Link
            href="/zasady-zpracovani-osobnich-udaju"
            className="text-sm text-slate-600 hover:text-blue-600 transition-colors underline"
          >
            Zásady zpracování osobních údajů
          </Link>
        </div>
      </div>
    </footer>
  );
}
