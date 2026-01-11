import { LucideIcon } from "lucide-react";

interface TakeawayItem {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBgColor: string;
}

interface TakeawaysSectionProps {
  title: string;
  subtitle?: string;
  items: TakeawayItem[];
}

export function TakeawaysSection({
  title,
  subtitle,
  items,
}: TakeawaysSectionProps) {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid gap-6 ${items.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : items.length === 3 ? 'md:grid-cols-3' : items.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 mx-auto ${item.iconBgColor} ${item.iconColor} rounded-full flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
