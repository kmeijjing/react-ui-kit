import { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
 stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

 addons: [
  "@chromatic-com/storybook",
  "@storybook/addon-links",
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
 ],

 framework: {
  name: "@storybook/react-vite",
  options: {},
 },

 viteFinal: async (config) => {
  config.css = {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  };
  return config;
 },

 docs: {},

 typescript: {
  reactDocgen: "react-docgen-typescript",
  check: true,
 },

 core: {
  builder: '@storybook/builder-vite',
 },

 staticDirs: [{ from: '../src/css/fonts.css', to: '/assets/fonts.css' }],
};
export default config;
