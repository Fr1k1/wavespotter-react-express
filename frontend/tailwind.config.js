import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss,css}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          DEFAULT: "#0891B2",
          90: "rgba(14, 165, 233, 0.9)",
        },
        "custom-gray": "#EDF5F6",
      },

      fontSize: {
        "256px": "256px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
