import type { Config } from "tailwindcss";

export default {
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
        header: "var(--header)",
        task_background: "var(--task-background)",
        task_background_checked: "var(--task-background-checked)",
        task_prior_color_na: "var(--task-prior-color-na)",
        task_prior_color_low: "var(--task-prior-color-low)",
        task_prior_color_med: "var(--task-prior-color-med)",
        task_prior_color_high: "var(--task-prior-color-high)"
      },
      fontFamily: {
        'dm-sans': ['"DM Sans Variable"', 'sans-serif'],
        'inter': ['"Inter Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [ require('tailwind-scrollbar')({ nocompatible: true })],
} satisfies Config;
