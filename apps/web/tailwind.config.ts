import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/domain/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oxblood: "#8B1116",
        garnet: "#A61B22",
        champagne: "#D4AF37",
        ink: "#1F2937",
        porcelain: "#F8FAFC"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Trebuchet MS", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(31, 41, 55, 0.14), 0 8px 32px rgba(31, 41, 55, 0.08)",
        "premium-hover": "0 32px 90px rgba(31, 41, 55, 0.2), 0 12px 40px rgba(31, 41, 55, 0.12)",
        glow: "0 0 20px rgba(212, 175, 55, 0.4)"
      },
      backgroundImage: {
        "insurance-grid":
          "linear-gradient(rgba(139,17,22,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,17,22,.06) 1px, transparent 1px)"
      },
      animation: {
        marquee: "marquee 50s linear infinite"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 0.5rem))" }
        }
      }
    }
  },
  plugins: []
};

export default config;
