/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'privy-red': {
          '50': '#fef2f2',
          '100': '#ffe1e1',
          '200': '#ffc9c8',
          '300': '#ffa3a2',
          '400': '#fd6e6c',
          '500': '#f5403e',
          '600': '#e42e2c',
          '700': '#bf1816',
          '800': '#9d1817',
          '900': '#821b1a',
          '950': '#470908',
        },
        'privy-dark': {
          '50': '#f5f6f6',
          '100': '#e5e6e8',
          '200': '#ced0d3',
          '300': '#acb0b4',
          '400': '#83888d',
          '500': '#686d72',
          '600': '#595d61',
          '700': '#4c4f52',
          '800': '#434447',
          '900': '#3b3c3e',
          '950': '#242527',
        },
      },
    },
  },
  plugins: [],
};
