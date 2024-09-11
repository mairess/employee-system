import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-00': '0 1px 1px 0 #00000020',
        'custom-05': '0 1px 2px 0 #00000020',
        'custom-10': '0 4px 4px 0 #00000025'
      },
      spacing: {
        'spacing-medium-80': '5rem',
        'spacing-medium-60': '3.75rem',
        'spacing-medium-40': '2.5rem',
        'spacing-medium-32': '2rem',
        'spacing-regular-28': '1.75rem',
        'spacing-regular-20': '1.25rem',
        'spacing-regular-16': '1rem',
        'spacing-little-12': '0.75rem',
        'spacing-little-08': '0.5rem',
        'spacing-little-04': '0.25rem',
      },
      fontSize: {
        'h0': ['2rem', { fontWeight: '800' }],
        'h1': ['2rem', { fontWeight: '500' }],
        'h2': ['1rem', { fontWeight: '500' }],
        'h3': ['1rem', { fontWeight: '400' }],
      },
      size: {
        'custom-size-08': '2.12rem'
      },
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
        'black-neutral': '#1C1C1C',
        'gray-neutral-10': '#DFDFDF',
        error:'#B00020',
        success: '#388E3C',
        primary: '#594ED2',
        secondary: '#5A84C0',
      },
    },
  },
  plugins: [],
};
export default config;
