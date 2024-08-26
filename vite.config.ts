/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	build: {
		sourcemap: true,
	},
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.ts'],
	},
});
