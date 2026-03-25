import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // 可选，保留也没问题
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
