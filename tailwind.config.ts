import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        urbanist: ['var(--font-urbanist)', 'Urbanist', 'sans-serif'],
      },
      colors: {
        // ProjectYOU brand colors - based on pyou.html
        pyou: {
          // Primary blue (hlavní barva ProjectYOU)
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',  // Hlavní modrá ProjectYOU
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          // Cyan accent (tyrkysová lišta)
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2',
          },
          // Rose accent (červená/růžová lišta)
          rose: {
            DEFAULT: '#e11d48',
            light: '#f43f5e',
            dark: '#be123c',
          },
          // Amber accent (oranžová/žlutá lišta)
          amber: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
