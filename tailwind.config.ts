import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#3B76D1", dark: "#2456a8", ink: "#22508f" },
        ink: "#152033",
        line: "#e7ecf3",
      },
    },
  },
  plugins: [],
};
export default config;
