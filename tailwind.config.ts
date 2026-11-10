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
        // Design System Refinement — Editorial Legal & Personal Branding Klasik
        ink: {
          DEFAULT: "#111C2D",
          soft: "#1E2D42",
        },
        "ink-soft": "#1E2D42",
        paper: {
          DEFAULT: "#FBF9F4",
          card: "#FFFFFF",
          muted: "#F3EEE3",
          deep: "#F3EEE3", // alias untuk kompatibilitas hero & simulator
        },
        "paper-card": "#FFFFFF",
        "paper-muted": "#F3EEE3",
        line: "#E4DEC9",
        muted: "#525866",
        brass: {
          DEFAULT: "#9E7428",
          deep: "#9E7428", // alias kontras tinggi untuk quote/eyebrow
          light: "#E5CA85",
          btn: "#B88D3B",
          button: "#B88D3B", // alias tombol
        },
        "brass-light": "#E5CA85",
        "brass-btn": "#B88D3B",
        "text-on-dark": "#EAEFF5",

        // Harmonized backward compatibility tokens
        navy: {
          DEFAULT: "#111C2D",
          50: "#F0F4F9",
          100: "#DCE5F2",
          200: "#B8CBE5",
          300: "#8EAAD4",
          400: "#5C83BE",
          500: "#365FA2",
          600: "#244379",
          700: "#1E2D42",
          800: "#111C2D",
          900: "#0D1624",
          950: "#060C17",
        },
        gold: {
          DEFAULT: "#9E7428",
          50: "#FBF9F4",
          100: "#F3EEE3",
          200: "#E5CA85",
          300: "#E5CA85",
          400: "#B88D3B",
          500: "#9E7428",
          600: "#8A621E",
          700: "#755217",
          800: "#5E4010",
          900: "#442D09",
        },
        ivory: {
          DEFAULT: "#FBF9F4",
          50: "#FBF9F4",
          100: "#F3EEE3",
          200: "#EAE2D2",
          300: "#E4DEC9",
          400: "#D9CCB4",
          500: "#C3B293",
          600: "#A69372",
        },
        burgundy: {
          DEFAULT: "#9E7428",
          50: "#FBF9F4",
          100: "#F3EEE3",
          200: "#E5CA85",
          300: "#E5CA85",
          400: "#B88D3B",
          500: "#9E7428",
          600: "#8A621E",
          700: "#755217",
          800: "#5E4010",
          900: "#442D09",
        },
        charcoal: {
          DEFAULT: "#525866",
          50: "#F6F7F8",
          100: "#E6E8EC",
          200: "#CFD3DA",
          300: "#AEB5C0",
          400: "#8690A0",
          500: "#687283",
          600: "#525866",
          700: "#444B57",
          800: "#1E2D42",
          900: "#111C2D",
          950: "#0A101A",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
