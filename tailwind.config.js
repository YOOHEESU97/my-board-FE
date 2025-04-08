/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        gowun: ["'Gowun Dodum'", "sans-serif"], // ✅ 별명처럼 등록!
      },
    },
  },
  plugins: [],
};
