"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CourseDate } from "@/lib/courses-loader";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { Minus, Plus, Calendar, MapPin, Users } from "lucide-react";

interface TermSelectionProps {
  courseTitle: string;
  courseSlug: string;
  courseDates: CourseDate[];
  pricePerPerson: number;
}

export function TermSelection({
  courseTitle,
  courseSlug,
  courseDates,
  pricePerPerson,
}: TermSelectionProps) {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    if (!selectedTermId) return;

    const selectedTerm = courseDates.find((d) => d.id === selectedTermId);
    if (!selectedTerm) return;

    addItem({
      courseDateId: selectedTermId,
      courseTitle,
      courseSlug,
      startDate: selectedTerm.start_date,
      endDate: selectedTerm.end_date,
      location: selectedTerm.location,
      quantity,
      pricePerPerson,
      vatRate: 21, // Výchozí DPH sazba 21%
    });

    setShowModal(true);
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleDateString("cs-CZ", { month: "long" });
    const year = start.getFullYear();

    // Pokud je to stejný den
    if (startDay === endDay) {
      return `${startDay}. ${month} ${year}`;
    }

    return `${startDay}.-${endDay}. ${month} ${year}`;
  };

  const formatTime = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${start.getHours()}:${String(start.getMinutes()).padStart(2, "0")} - ${end.getHours()}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-900 font-urbanist">
          Vyberte termín
        </h3>
        {courseDates.length > 0 && (
          <div className="inline-flex items-center px-2 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse"></span>
            {courseDates.length} {courseDates.length === 1 ? 'volný termín' : courseDates.length < 5 ? 'volné termíny' : 'volných termínů'}
          </div>
        )}
      </div>

      {/* Seznam termínů */}
      <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto">
        {courseDates.map((date) => {
          const availableSpots = date.max_capacity - date.current_booked_count;
          const isLowCapacity = availableSpots < 5;
          const isSelected = selectedTermId === date.id;

          return (
            <button
              key={date.id}
              onClick={() => setSelectedTermId(date.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center text-sm font-semibold text-slate-900 mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {formatDate(date.start_date, date.end_date)}
                  </div>
                  <div className="flex items-center text-xs text-slate-600 mb-1">
                    <MapPin className="w-3 h-3 mr-2" />
                    {date.location} • {formatTime(date.start_date, date.end_date)}
                  </div>
                  <div className="flex items-center text-xs mt-2">
                    <Users className="w-3 h-3 mr-2" />
                    <span
                      className={
                        isLowCapacity
                          ? "text-red-600 font-semibold"
                          : "text-green-600"
                      }
                    >
                      {isLowCapacity
                        ? `Poslední ${availableSpots} místa!`
                        : `Volných ${availableSpots} míst`}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Výběr počtu osob */}
      {selectedTermId && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Počet osob
          </label>
          <div className="flex items-center justify-between border border-slate-300 rounded-lg p-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-xl font-bold text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      {/* Cena */}
      <div className="mb-4 p-3 bg-slate-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Cena celkem:</span>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {(pricePerPerson * quantity).toLocaleString("cs-CZ")} Kč
            </p>
            <p className="text-xs text-slate-500">bez DPH</p>
          </div>
        </div>
      </div>

      {/* Tlačítko */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedTermId}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          selectedTermId
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-slate-300 cursor-not-allowed"
        }`}
      >
        Vložit do košíku
      </button>

      {/* Modal - Přidáno do košíku */}
      {showModal && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Přidáno do košíku!
              </h3>
              <p className="text-slate-600">
                Kurz byl úspěšně přidán do vašeho košíku.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Pokračovat v nákupu
              </button>
              <button
                onClick={() => router.push("/kosik")}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Přejít do košíku
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
