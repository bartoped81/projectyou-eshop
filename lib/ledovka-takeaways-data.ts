import { MessageCircle, Heart, BookOpen, CheckSquare } from "lucide-react";

export const LEDOVKA_TAKEAWAYS = {
  title: "S čím odcházíte?",
  items: [
    {
      icon: MessageCircle,
      title: "Komunikace s klidem",
      description: "Schopnost vést těžké rozhovory a dávat zpětnou vazbu i pod tlakem.",
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-100",
    },
    {
      icon: Heart,
      title: "Empatie a Respekt",
      description: "Praktické dovednosti servant leadershipu – vedení s pokorou.",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-100",
    },
    {
      icon: BookOpen,
      title: "Polární deník",
      description: "Vlastní poznámky a strategie, které jste si během expedice vytvořili.",
      iconColor: "text-slate-700",
      iconBgColor: "bg-slate-200",
    },
    {
      icon: CheckSquare,
      title: "Konkrétní kroky",
      description: "Jasný plán, co zítra uděláte jinak ve svém skutečném týmu.",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100",
    },
  ],
};
