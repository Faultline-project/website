import type { Config } from "tailwindcss";
import { theme } from "./theme/theme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
      },
      borderRadius: {
        sm: theme.radius.sm,
        md: theme.radius.md,
        lg: theme.radius.lg,
        xl: theme.radius.xl,
        full: theme.radius.full,
      },
      fontFamily: {
        sans: theme.fontFamily.sans.split(",").map((s) => s.trim()),
        mono: theme.fontFamily.mono.split(",").map((s) => s.trim()),
        display: ["var(--font-display)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
