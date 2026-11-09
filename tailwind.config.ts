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
        burgundy: {
          DEFAULT: "#762B30",
          50: "#FAF5F5",
          100: "#F5EBEB",
          200: "#E6CCCC",
          300: "#D4A5A8",
          400: "#B8666C",
          500: "#9C3C43",
          600: "#762B30",
          700: "#5D1F23",
          800: "#441417",
          900: "#2B0B0D",
        },
        navy: {
          DEFAULT: "#17243A",
          50: "#F0F4FA",
          100: "#DCE5F3",
          200: "#B8CBE7",
          300: "#8FAEDB",
          400: "#5A88C5",
          500: "#3262A2",
          600: "#224373",
          700: "#1B3255",
          800: "#17243A",
          900: "#0F1827",
          950: "#090E17",
        },
        ivory: {
          DEFAULT: "#F5F1E9",
          50: "#FDFCFB",
          100: "#FAF7F2",
          200: "#F5F1E9",
          300: "#EBE3D4",
          400: "#DCD0BB",
          500: "#C8B69B",
          600: "#AC9676",
        },
        charcoal: {
          DEFAULT: "#252525",
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4F4F4F",
          800: "#383838",
          900: "#252525",
          950: "#171717",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
