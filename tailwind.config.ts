import type { Config } from 'tailwindcss';
import colors from './src/css/colors.ts';

const pxToRem = (px: number, base = 12) => `${px / base}rem`;
const range = (start: number, end: number): number[] => {
	return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
const sizes = {
	...range(1, 2000).reduce<Record<string, string>>((acc, px) => {
		acc[`${px}pxr`] = pxToRem(px);
		return acc;
	}, {}),
};

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
			fontSize: sizes,
			lineHeight: sizes,
			borderRadius: sizes,
			borderColor: {
				dropdownInner: 'color-mix(in srgb, white 30%, transparent)',
			},
			boxShadow: {
				dropdownOptions: '2px 2px 12px 2px #0000001A;',
				tooltip: '2px 2px 8px 2px #00000033;',
				input: '0 0 4px #0075ff',
			},
			colors: colors,
			spacing: sizes,
			animation: {
				qmatDash: 'qmatDash 2s infinite linear',
			},
			keyframes: {
				qmatDash: {
					'0%': { strokeDasharray: '1, 200', strokeDashoffset: '0' },
					'50%': { strokeDasharray: '89, 200', strokeDashoffset: '-35px' },
					'100%': { strokeDasharray: '89, 200', strokeDashoffset: '-124px' },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
