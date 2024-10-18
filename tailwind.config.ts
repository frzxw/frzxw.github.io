import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-roboto)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        'deep-blue': '#050816',
        'light-blue': '#aaa6c3',
      },
    },
  },
  plugins: [],
};
export default config;