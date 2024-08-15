import type { Config } from 'tailwindcss'
import colors from './src/css/colors.ts'

/** @type {import('tailwindcss').Config} */
const config: Config = {
 content: [
  "index.html",
  "./src/**/*.{html,js,ts,tsx,jsx,css,mdx}",
  // './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 safelist: Object.values(colors).flatMap((color) => [
  `bg-[${color}]`,
  `text-[${color}]`,
  `border-[${color}]`,
  `decoration-[${color}]`,
  `hover:before:bg-[${color}]`,
]),
 mode: 'jit',
 important: true,
 theme: {
  extend: {
   fontFamily: {
    pretendard: ["Pretendard"],
   },
   spacing: {
    '0.5': '0.125rem', // 2px
    '1.5': '0.375rem', // 6px
    '2.5': '0.625rem', // 10px
    '3.5': '0.875rem', // 14px
    '4.5': '1.125rem', // 20px
   },
   borderRadius: {
    4: '0.25rem',
   },
   colors,
  },
 },
 plugins: [],
} satisfies Config;

export default config