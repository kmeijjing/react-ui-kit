import type { Config } from 'tailwindcss'
import colors from './src/css/colors.ts'
import sizes from './src/css/sizes.ts'

/** @type {import('tailwindcss').Config} */
const config: Config = {
 content: [
  "index.html",
  "./src/**/*.{html,js,ts,tsx,jsx,css,mdx}",
  // './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 safelist: Object.entries(colors).flatMap(([key, color]) => [
  `bg-[${color}]`,
  `text-[${color}]`,
  `border-[${color}]`,
  `border-${key}/30`,
  `decoration-[${color}]`,
  `hover:before:bg-[${color}]`,
  `hover:before:bg-${key}/10`,
  `hover:before:border-[${color}]`,
  `before:border-[${color}]`,
]),
 mode: 'jit',
 important: true,
 theme: {
  extend: {
   fontFamily: {
    pretendard: ["Pretendard"],
   },
   spacing: sizes,
   width: sizes,
   height: sizes,
   fontSize: {
    '16': '1.333rem' // 16px
   },
   lineHeight: {
    '6.5': '1.667rem', // 20px
    '8.5': '2.167rem', // 26px
   },
   borderRadius: {
    2: '0.167rem',
    4: '0.333rem',
   },
   borderColor: {
    dropdownInner: 'color-mix(in srgb, white 30%, transparent)'
   },
   boxShadow: {
    dropdownOptions: '2px 2px 12px 2px #0000001A;',
   },
   colors,
  },
 },
 plugins: [],
} satisfies Config;

export default config