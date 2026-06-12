"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "people", label: "People" },
  { id: "papers", label: "Papers" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    if (!onHome) return;

    const sectionIds = SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border/70 bg-surface/60 px-2 py-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label="Faultline home"
          className="flex items-center px-3 text-text"
        >
          <Logo className="h-8 w-auto" />
        </Link>

        <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        {SECTIONS.map((s) => {
          const href = onHome ? `#${s.id}` : `/#${s.id}`;
          const isActive = onHome && activeSection === s.id;
          return (
            <Link
              key={s.id}
              href={href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent/15 text-accent"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {s.label}
            </Link>
          );
        })}

        <Link
          href="/cve"
          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
            pathname?.startsWith("/cve")
              ? "bg-accent/15 text-accent"
              : "text-text-muted hover:text-text"
          }`}
        >
          CVEs
        </Link>

        <Link
          href="/blog"
          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
            pathname?.startsWith("/blog")
              ? "bg-accent/15 text-accent"
              : "text-text-muted hover:text-text"
          }`}
        >
          Blog
        </Link>

        <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        <ThemeToggle />
      </div>
    </nav>
  );
}
