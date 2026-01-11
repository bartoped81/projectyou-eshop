"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPriceWithoutVat, totalVat, totalPriceWithVat } = useCart();
  const router = useRouter();

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const months = [
      "ledna", "února", "března", "dubna", "května", "června",
      "července", "srpna", "září", "října", "listopadu", "prosince"
    ];

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = months[start.getMonth()];
    const year = start.getFullYear();

    if (start.toDateString() === end.toDateString()) {
      return `${startDay}. ${month} ${year}`;
    }

    return `${startDay}.-${endDay}. ${month} ${year}`;
  };

  const formatTime = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${start.getHours()}:${String(start.getMinutes()).padStart(2, "0")} - ${end.getHours()}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Váš košík je prázdný
            </h1>
            <p className="text-slate-600 mb-8">
              Prozkoumejte naši nabídku kurzů a vyberte si ten pravý pro vás.
            </p>
            <Link
              href="/open-courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Prohlédnout kurzy
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Nákupní košík</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Levá strana - Položky košíku */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Header tabulky */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-700">
                <div className="col-span-5">Kurz</div>
                <div className="col-span-2">Cena/os</div>
                <div className="col-span-2">Počet osob</div>
                <div className="col-span-2">Celkem</div>
                <div className="col-span-1"></div>
              </div>

              {/* Položky */}
              <div className="divide-y divide-slate-200">
                {items.map((item) => {
                  const itemTotal = item.pricePerPerson * item.quantity;

                  return (
                    <div
                      key={item.courseDateId}
                      className="p-4 md:p-6 grid md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Kurz info */}
                      <div className="col-span-12 md:col-span-5">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {item.courseTitle}
                        </h3>
                        <div className="text-sm text-slate-600 space-y-1">
                          <div>{formatDate(item.startDate, item.endDate)}</div>
                          <div>{formatTime(item.startDate, item.endDate)}</div>
                          <div>{item.location}</div>
                        </div>
                      </div>

                      {/* Cena/os */}
                      <div className="col-span-6 md:col-span-2">
                        <span className="text-sm text-slate-600 md:hidden">
                          Cena/os:{" "}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {item.pricePerPerson.toLocaleString("cs-CZ")} Kč
                        </span>
                        <div className="text-xs text-slate-500">bez DPH</div>
                      </div>

                      {/* Počet osob */}
                      <div className="col-span-6 md:col-span-2">
                        <span className="text-sm text-slate-600 md:hidden">
                          Počet osob:{" "}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.courseDateId, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-semibold"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.courseDateId, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Celkem */}
                      <div className="col-span-6 md:col-span-2">
                        <span className="text-sm text-slate-600 md:hidden">
                          Celkem:{" "}
                        </span>
                        <span className="font-bold text-slate-900">
                          {itemTotal.toLocaleString("cs-CZ")} Kč
                        </span>
                        <div className="text-xs text-slate-500">bez DPH</div>
                      </div>

                      {/* Odstranit */}
                      <div className="col-span-6 md:col-span-1 flex md:justify-end">
                        <button
                          onClick={() => removeItem(item.courseDateId)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Odstranit z košíku"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Vyprázdnit košík */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Vyprázdnit košík
                </button>
              </div>
            </div>
          </div>

          {/* Pravá strana - Souhrn */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Rekapitulace
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Cena bez DPH:</span>
                  <span className="font-semibold text-slate-900">
                    {totalPriceWithoutVat.toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">DPH (21%):</span>
                  <span className="font-semibold text-slate-900">
                    {totalVat.toLocaleString("cs-CZ")} Kč
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900">
                      Celkem s DPH:
                    </span>
                    <span className="font-bold text-blue-600 text-xl">
                      {totalPriceWithVat.toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/objednavka")}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Pokračovat bez registrace
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                <button
                  disabled
                  className="w-full py-3 px-6 bg-slate-200 text-slate-400 font-semibold rounded-lg cursor-not-allowed"
                >
                  Přihlásit se
                </button>

                <Link
                  href="/open-courses"
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 font-semibold mt-4"
                >
                  ← Pokračovat v nákupu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
