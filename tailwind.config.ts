/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
        marquee_ltr: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        marquee_rtl: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
        marquee_ltr: "marquee_ltr 10s linear infinite",
        marquee_rtl: "marquee_rtl 10s linear infinite"
      },
      colors: {
        "custom-orange": "#FF9900"
      },
      fontFamily: {
        poppinsExtrabold: ['"poppinsExtrabold"', "sans serif"],
        poppinsBold: ['"poppinsBold"', "sans serif"],
        poppinsMedium: ['"poppinsMedium"', "sans serif"]
      },
      dropShadow: {
        border: "0 0 2px rgba(0, 0, 0, .6)"
      }
    }
  },
  plugins: []
};
