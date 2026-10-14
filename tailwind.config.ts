import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "20px",
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
        theme: {
          dark: "#082029",
          deep: "#05161c",
          surface: "#0d2c38",
          surfaceHover: "#123746",
          darkBorder: "#184556",
          emerald: "#00a887",
          emeraldHover: "#009476",
          mint: "#e8f6f3",
          mintBg: "#f3f8f7",
          cardBg: "#ffffff",
          cardBorder: "#dce7e4",
          brass: "#c5a880",
          textPrimary: "#111827",
          textSecondary: "#4b5563",
          textMuted: "#6b7280",
        },
        primary: {
          DEFAULT: "#00a887",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(8, 32, 41, 0.06), 0 2px 6px -1px rgba(8, 32, 41, 0.04)',
        'elevated': '0 12px 32px -4px rgba(8, 32, 41, 0.12), 0 4px 12px -2px rgba(8, 32, 41, 0.06)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config