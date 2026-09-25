import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF9FA",
        "bg-soft": "#FDF6F7",
        "bg-card": "#FCEEF0",
        "bg-banner": "#FDF0F3",
        "border-rose": "#F4D3DA",
        "border-soft": "#F9E4E8",
        brand: {
          mauve: "#BA4A6E",
          "mauve-hover": "#A03B5C",
          "mauve-dark": "#7E2B43",
          "mauve-light": "#F8E7EC",
          gold: "#D4AF37",
          "gold-light": "#FAF3E0",
          charcoal: "#2D2427",
          muted: "#6E6266",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(186, 74, 110, 0.08)",
        card: "0 8px 30px rgba(45, 36, 39, 0.06)",
        hover: "0 14px 35px rgba(186, 74, 110, 0.15)",
        floating: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
