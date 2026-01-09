"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CourseBlockProps {
  icon: string;
  title: string;
  subtitle?: string;
  quote?: string;
  why: string;
  content: Array<{
    title: string;
    description: string;
  }>;
  output: string;
  color?: "blue" | "cyan";
}

export function CourseBlock({
  icon,
  title,
  subtitle,
  quote,
  why,
  content,
  output,
  color = "blue",
}: CourseBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    blue: {
      bg: "from-blue-50 to-white",
      accent: "bg-blue-600",
      text: "text-blue-600",
      border: "border-blue-600",
      quoteBorder: "border-l-blue-600",
      quoteBg: "bg-blue-100",
      dot: "bg-blue-600",
    },
    cyan: {
      bg: "from-cyan-50 to-white",
      accent: "bg-cyan-600",
      text: "text-cyan-600",
      border: "border-cyan-600",
      quoteBorder: "border-l-cyan-600",
      quoteBg: "bg-cyan-100",
      dot: "bg-cyan-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.bg} p-6 border-b border-slate-200`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`${colors.accent} text-white p-3 rounded-lg shrink-0`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-slate-900 mb-1">{title}</h4>
            {subtitle && (
              <p className={`text-sm ${colors.text} font-semibold`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {quote && (
          <div className={`${colors.quoteBg} border-l-4 ${colors.quoteBorder} p-3 rounded`}>
            <p className="text-slate-700 italic text-sm">"{quote}"</p>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Why section */}
        <div className="mb-4">
          <h5 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
            PROČ TO POTŘEBUJETE
          </h5>
          <p className="text-slate-700 leading-relaxed">{why}</p>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-4"
        >
          <span>Zobrazit obsah bloku</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Collapsible content */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-6 mt-4 border-t border-slate-200">
            <h5 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">
              OBSAH BLOKU:
            </h5>
            <ul className="space-y-3 mb-6">
              {content.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 text-xl shrink-0">✓</span>
                  <span className="text-slate-700">
                    <strong>{item.title}:</strong> {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
                VÝSTUP:
              </p>
              <p className="text-emerald-900 font-medium">{output}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
