import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "brand-primary": "#0D47A1",
        "brand-secondary": "#1976D2",
        "brand-accent": "#FFC107",
        "brand-light": "#E3F2FD",
        "brand-dark": "#002171",
        "text-primary": "#212121",
        "text-secondary": "#757575",
        "bg-main": "#F7F9FC",
        "bg-card": "#FFFFFF",
        success: "#2E7D32",
        warning: "#ED6C02",
        error: "#D32F2F"
      },
      fontFamily: {
        sans: [
          "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont",
          '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial",
          '"Noto Sans"', "sans-serif"
        ]
      },
      transitionDuration: {
        '600': '600ms'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
      },
    }
  },
  plugins: [],
};

export default config;
