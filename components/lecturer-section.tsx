import Image from "next/image";

interface LecturerSectionProps {
  name: string;
  bio: string;
  photo: string;
}

export function LecturerSection({ name, bio, photo }: LecturerSectionProps) {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Váš průvodce
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Kurz povede zkušený expert, který kombinuje teorii s praxí.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Fotka lektora */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl opacity-20 blur-2xl"></div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">{name}</h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
