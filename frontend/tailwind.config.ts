import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-neutral-0': '#101214',
        'dark-neutral-50': '#161A1D',
        'dark-neutral-100': '#1D2125',
        'dark-neutral-200': '#22272B',
        'dark-neutral-250': '#282E33',
        'dark-neutral-300': '#2C333A',
        'dark-neutral-350': '#38414A',
        'dark-neutral-400': '#454F59',
        'dark-neutral-500': '#596773',
        'dark-neutral-600': '#738496',
        'dark-neutral-700': '#8C9BAB',
        'dark-neutral-800': '#9FADBC',
        'dark-neutral-900': '#B6C2CF',
        'dark-neutral-1000': '#C7D1DB',
        'dark-neutral-1100': '#DEE4EA',
        'light-neutral-0': '#FFFFFF',
        'light-neutral-100': '#F7F8F9',
        'light-neutral-200': '#F1F2F4',
        'light-neutral-300': '#DCDFE4',
        'light-neutral-400': '#B3B9C4',
        'light-neutral-500': '#8590A2',
        'light-neutral-600': '#758195',
        'light-neutral-700': '#626F86',
        'light-neutral-800': '#44546F',
        'light-neutral-900': '#2C3E5D',
        'light-neutral-1000': '#172B4D',
        'light-neutral-1100': '#091E42',
      },
    },
  },
  plugins: [],
};
export default config;
