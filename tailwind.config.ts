import type { Config } from 'tailwindcss';
import colors from './src/css/colors.ts';
import sizes from './src/css/sizes.ts';

// const px0_200 = Object.fromEntries(Array.from({ length: 201 }, (_, i) => [i.toString(), `${i}px`]));
// const px0_2000 = Object.fromEntries(
// 	Array.from({ length: 2001 }, (_, i) => [i.toString(), `${i}px`])
// );

/** @type {import('tailwindcss').Config} */
const config: Config = {
	content: [
		'index.html',
		'./src/**/*.{html,js,ts,tsx,jsx,css,mdx}',
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
				pretendard: ['Pretendard'],
			},
			borderWidth: sizes,
			width: sizes,
			height: sizes,
			minWidth: sizes,
			minHeight: sizes,
			spacing: sizes,
			fontSize: sizes,
			lineHeight: sizes,
			borderRadius: sizes,
			borderColor: {
				dropdownInner: 'color-mix(in srgb, white 30%, transparent)',
			},
			boxShadow: {
				dropdownOptions: '2px 2px 12px 2px #0000001A;',
			},
			colors: colors,
		},
	},
	plugins: [],
} satisfies Config;

export default config;
