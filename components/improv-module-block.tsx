"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ImprovModuleBlockProps {
  time: string;
  title: string;
  description: string;
  details: string[];
  color?: "emerald" | "violet" | "amber";
}

export function ImprovModuleBlock({
  time,
  title,
  description,
  details,
  color = "emerald",
}: ImprovModuleBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    emerald: {
      bg: "from-emerald-50 to-white",
      accent: "bg-emerald-600",
      timeBg: "bg-emerald-100",
      timeText: "text-emerald-700",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
    },
    violet: {
      bg: "from-violet-50 to-white",
      accent: "bg-violet-600",
      timeBg: "bg-violet-100",
      timeText: "text-violet-700",
      iconBg: "bg-violet-100",
      iconText: "text-violet-600",
    },
    amber: {
      bg: "from-amber-50 to-white",
      accent: "bg-amber-600",
      timeBg: "bg-amber-100",
      timeText: "text-amber-700",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-gradient-to-br ${colors.bg} rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div
            className={`px-4 py-2 ${colors.timeBg} ${colors.timeText} font-mono font-bold rounded-lg text-center text-sm tracking-wide shrink-0`}
          >
            {time}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${colors.iconBg} ${colors.iconText} w-10 h-10 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shrink-0`}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-6 mt-6 border-t border-slate-200">
            <div className="space-y-3">
              {details.map((detail, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className={`${colors.accent} w-1.5 h-1.5 rounded-full mt-2 shrink-0`}
                  ></div>
                  <p className="text-slate-700 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
