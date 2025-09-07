/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // لو تستخدم مجلد app
    "./pages/**/*.{js,ts,jsx,tsx}",   // لو تستخدم مجلد pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        noto: ["var(--font-notoKufi)"],
      },
      
    },
  },
  plugins: [],
};
