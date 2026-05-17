export type ThemeMode = "dark" | "light";

export type ColorPalette = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
};

export type Theme = {
  colors: Record<ThemeMode, ColorPalette>;
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  fontFamily: {
    sans: string;
    mono: string;
  };
};

export const theme: Theme = {
  colors: {
    dark: {
      background: "#0b0d10",
      surface: "#15181d",
      primary: "#e6e9ef",
      secondary: "#8a93a3",
      accent: "#ff5b3a",
      text: "#f4f5f7",
      textMuted: "#9aa3b2",
      border: "#262a32",
    },
    light: {
      background: "#fafafa",
      surface: "#ffffff",
      primary: "#15181d",
      secondary: "#52596a",
      accent: "#d6431f",
      text: "#15181d",
      textMuted: "#5b6373",
      border: "#e3e5ea",
    },
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  fontFamily: {
    sans: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
};

export const defaultMode: ThemeMode = "dark";

export const themeStorageKey = "faultline-theme";

export const themeInitScript = `(function(){try{var s=localStorage.getItem('${themeStorageKey}');if(s==='light'||s==='dark')document.documentElement.setAttribute('data-theme',s);}catch(e){}})();`;

export function paletteToCssVars(palette: ColorPalette): Record<string, string> {
  return {
    "--color-background": palette.background,
    "--color-surface": palette.surface,
    "--color-primary": palette.primary,
    "--color-secondary": palette.secondary,
    "--color-accent": palette.accent,
    "--color-text": palette.text,
    "--color-text-muted": palette.textMuted,
    "--color-border": palette.border,
  };
}
