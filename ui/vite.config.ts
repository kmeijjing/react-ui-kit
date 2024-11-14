/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
// import * as path from 'path';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		dts({
			include: ['src'],
			insertTypesEntry: true,
		}),
	],
	// resolve: {
	// 	alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	// },
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'meijjing-ui-kit-react',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
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
