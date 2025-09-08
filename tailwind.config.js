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
        sans: ["var(--font-cairo)", "sans-serif"], // استخدمنا CSS variable للخط Cairo
      },
    },
  },
  plugins: [],
};
