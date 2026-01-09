"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AgendaBlockProps {
  time: string;
  title: string;
  description: string;
  details?: string[];
  accentColor?: "sky" | "amber" | "slate";
  highlighted?: boolean;
}

export function AgendaBlock({
  time,
  title,
  description,
  details,
  accentColor = "slate",
  highlighted = false,
}: AgendaBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    sky: {
      bg: "bg-sky-50",
      text: "text-sky-700",
      border: "border-l-sky-500",
      hover: "hover:text-sky-600",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-l-amber-500",
      hover: "hover:text-amber-600",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-l-slate-300",
      hover: "hover:text-slate-600",
    },
  };

  const colors = colorClasses[accentColor];
  const borderClass = highlighted ? `border-l-4 ${colors.border}` : "border";

  return (
    <div
      className={`bg-white rounded-xl ${borderClass} border-y border-r border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow`}
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className={`px-4 py-2 ${colors.bg} ${colors.text} font-mono font-bold rounded-lg text-center min-w-[120px] text-sm`}
          >
            {time}
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg font-bold text-slate-900 group-hover:${colors.hover} transition-colors`}
            >
              {title}
            </h3>
            <p className="text-slate-500 text-sm mt-1">{description}</p>
          </div>
          {details && details.length > 0 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-sky-600 transition-colors"
            >
              <ChevronDown
                className={`w-6 h-6 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
        {details && details.length > 0 && (
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 mt-4 border-t border-slate-100 text-slate-600 text-sm space-y-2">
              {details.map((detail, index) => (
                <p key={index}>• {detail}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
