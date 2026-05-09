import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(240 10% 25%)",
        background: "hsl(230 25% 8%)",
        foreground: "hsl(0 0% 98%)",
        primary: "hsl(240 100% 70%)",
      },
      backgroundImage: {
        aurora: "linear-gradient(135deg, rgb(59 130 246 / 0.24), rgb(124 58 237 / 0.3))"
      }
    }
  },
  plugins: []
} satisfies Config;
