"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-emerald-600",
  iconBgColor = "bg-emerald-100",
}: FeatureCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:shadow-md group">
      <div
        className={`w-14 h-14 ${iconBgColor} ${iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-xl mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
