import type { Config } from "tailwindcss";

const colorPalette: Record<
  string,
  string | Record<string | number, string | Record<string, string>>
> = {
  common: {
    black: "#000",
    white: "#fff",
  },
  gray: {
    100: "#f5f5f5",
    200: "#eee",
    300: "#ddd",
    400: "#bbb",
    500: "#aaa",
    600: "#808080",
    700: "#555",
    800: "#333",
  },
  primary: {
    normal: "#3586ff",
    strong: "#1d69dc",
  },
  semantic: {
    positive: "#2bc352",
    negative: "#ff5841",
    caution: "#ffc32e",
    active: "#1e76fc",
  },
  red: {
    100: "#ffebe7",
    300: "#ffb7a9",
    500: "#f75c46",
    800: "#b40000",
    900: "#740000",
  },
  orange: {
    100: "#fff3e0",
    300: "#ffcc80",
    500: "#ff9800",
    800: "#e65100",
    900: "#c54500",
  },
  yellow: {
    100: "#fffacd",
    300: "#fff176",
    500: "#ffd559",
    800: "#ffc519",
    900: "#ffbe00",
  },
  green: {
    100: "#f4fbf4",
    300: "#c8e6c9",
    500: "#4caf50",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  blue: {
    100: "#edf8ff",
    300: "#a1d4fd",
    500: "#65b5ff",
    800: "#0057be",
    900: "#004899",
  },
  purple: {
    100: "#f6ebff",
    300: "#dbbbfe",
    500: "#bd8bfc",
    800: "#893de7",
    900: "#5d13b7",
  },
  pink: {
    100: "#ffeaf0",
    300: "#ffb2cc",
    500: "#fa77a7",
    800: "#c82265",
    900: "#ad0951",
  },
};

const px0_20 = Array.from(Array(21)).reduce((acc, _, i) => {
  acc[i] = `${i}px`;
  return acc;
}, {} as Record<number, string>);

const px0_100 = Array.from(Array(101)).reduce((acc, _, i) => {
  acc[i] = `${i}px`;
  return acc;
}, {} as Record<number, string>);

const px0_1200 = Array.from(Array(1201)).reduce((acc, _, i) => {
  acc[i] = `${i}px`;
  return acc;
}, {} as Record<number, string>);

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { min: "320px", max: "767px" },
        md: { min: "768px", max: "1199px" },
        lg: { min: "1200px" },
      },
      borderRadius: px0_100,
      borderWidth: px0_20,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_1200,
      minHeight: px0_1200,
      spacing: px0_1200,
      margin: px0_100,
      padding: px0_100,
      gap: px0_20,
      colors: colorPalette,
      fontFamily: {
        primary: ["Pretendard", "sans-serif"],
        secondary: ["Iropke Batang", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
