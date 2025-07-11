import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", ...defaultTheme.fontFamily.sans], // Manrope para o corpo
        heading: ["var(--font-outfit)", ...defaultTheme.fontFamily.sans], // Outfit para títulos
      },
      colors: {
        // Existing shadcn colors (will be overridden by brand colors where applicable)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // New Brand Colors (Orange and Beige)
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary-600))",
            50: "hsl(var(--brand-primary-50))",
            100: "hsl(var(--brand-primary-100))",
            600: "hsl(var(--brand-primary-600))",
            700: "hsl(var(--brand-primary-700))",
            800: "hsl(var(--brand-primary-800))",
            900: "hsl(var(--brand-primary-900))",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary-600))",
            50: "hsl(var(--brand-secondary-50))",
            100: "hsl(var(--brand-secondary-100))",
            600: "hsl(var(--brand-secondary-600))",
            700: "hsl(var(--brand-secondary-700))",
          },
          accent: {
            DEFAULT: "hsl(var(--brand-accent-500))",
            500: "hsl(var(--brand-accent-500))",
            600: "hsl(var(--brand-accent-600))",
            700: "hsl(var(--brand-accent-700))",
          },
          background: "hsl(var(--brand-background))",
          text: {
            dark: "hsl(var(--brand-text-dark))",
            medium: "hsl(var(--brand-text-medium))",
            light: "hsl(var(--brand-text-light))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
