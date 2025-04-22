
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Couleurs spécifiques au CMS
        brand: {
          DEFAULT: "#5561EF",
          50: "#EEF0FE",
          100: "#DDE0FD",
          200: "#BCC3FB",
          300: "#9AA5F9",
          400: "#7887F7",
          500: "#5561EF", // Couleur principale
          600: "#4B55CF",
          700: "#4048AF",
          800: "#363C8F",
          900: "#2C306F",
        },
        client: {
          primary: "#F67D65",   // Orange/corail pour l'interface client
          secondary: "#FFB7A9",
          tertiary: "#FFF5F2",
        },
        admin: {
          primary: "#5561EF",   // Bleu pour l'interface admin
          secondary: "#DEE1FC",
          tertiary: "#F5F7FF",
        },
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#F44336",
        info: "#2196F3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'card': '0 4px 20px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
