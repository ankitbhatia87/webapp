/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } }
      },
      animation: {
        blink: "blink 1s ease-in-out infinite"
      },
      colors: {
        "custom-orange": "#FF9900"
      }
    }
  },
  plugins: []
};
