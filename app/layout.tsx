import type { Metadata } from "next";
import "./globals.css";
import { defaultMode, themeInitScript } from "@/theme/theme";
import { kaushanScript } from "./fonts";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Faultline",
  description:
    "Open-source tools for discovering, reproducing, and analyzing failures in LLM inference serving systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={defaultMode}
      className={kaushanScript.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-text">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
