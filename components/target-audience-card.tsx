"use client";

import { useState } from "react";
import { ChevronDown, Briefcase, Zap } from "lucide-react";

interface TargetAudienceCardProps {
  title: string;
  description: string;
  icon: "briefcase" | "zap";
  bgColor: string;
  textColor: string;
}

export function TargetAudienceCard({
  title,
  description,
  icon,
  bgColor,
  textColor,
}: TargetAudienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const IconComponent = icon === "briefcase" ? Briefcase : Zap;

  return (
    <div className="bg-slate-50 rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-white transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor} ${textColor} shrink-0`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-slate-900">
            {title}
          </h3>
        </div>
        <div className="ml-4 shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 bg-white">
          <div className="pt-3 pb-4 border-t border-slate-100">
            <p className="text-slate-600 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
