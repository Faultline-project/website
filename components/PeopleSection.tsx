"use client";

import { useEffect, useRef, useState } from "react";
import type { Person } from "@/lib/content";

export function PeopleSection({ people }: { people: Person[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  useEffect(() => {
    if (selected !== null && panelRef.current) {
      panelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selected]);

  if (people.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-text-muted">
        People list coming soon.
      </div>
    );
  }

  const spotlightOn = selected !== null;
  const activePerson = selected !== null ? people[selected] : null;

  function toggle(i: number) {
    setSelected((cur) => (cur === i ? null : i));
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div
        className="relative px-4 py-12 sm:px-6 sm:py-14"
        onClick={() => {
          if (spotlightOn) setSelected(null);
        }}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 ${
            spotlightOn ? "opacity-80" : "opacity-0"
          }`}
        />

        <ul className="relative mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-10">
          {people.map((person, i) => {
            const isSelected = i === selected;
            const isPreview = !spotlightOn && hovered === i;
            const isHighlighted = isSelected || isPreview;
            const isDimmed = spotlightOn && !isSelected;

            return (
              <li key={person.name} className="flex">
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(i);
                  }}
                  aria-label={
                    isSelected
                      ? `Dismiss ${person.name}`
                      : `Spotlight ${person.name}`
                  }
                  aria-pressed={isSelected}
                  className={`group relative flex w-24 flex-col items-center outline-none transition-opacity duration-500 sm:w-28 ${
                    isDimmed ? "opacity-15" : "opacity-100"
                  }`}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-7 rounded-full transition-opacity duration-500 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle at 50% 25%, rgba(255,215,175,0.65) 0%, rgba(255,180,140,0.28) 40%, rgba(255,150,110,0.08) 65%, transparent 80%)",
                      }}
                    />

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-3 rounded-full bg-accent/30 blur-2xl transition-opacity duration-300 ${
                        isPreview ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div
                      className={`relative h-20 w-20 overflow-hidden rounded-full border-2 transition-all duration-300 sm:h-24 sm:w-24 ${
                        isSelected
                          ? "scale-110 border-accent shadow-[0_24px_30px_-12px_rgba(0,0,0,0.7)]"
                          : isPreview
                            ? "scale-105 border-accent"
                            : "scale-100 border-border"
                      }`}
                    >
                      {person.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className={`h-full w-full object-cover transition-[filter] duration-300 ${
                            isSelected ? "brightness-110" : ""
                          }`}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-background text-lg text-text-muted">
                          {person.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <p
                    className={`relative mt-3 text-center text-xs leading-tight transition-colors duration-300 sm:text-sm ${
                      isHighlighted
                        ? "text-text"
                        : spotlightOn
                          ? "text-text-muted/60"
                          : "text-text-muted"
                    }`}
                  >
                    {person.name}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>

        <p
          className={`relative mt-10 text-center text-[10px] uppercase tracking-[0.25em] text-text-muted transition-opacity duration-300 ${
            spotlightOn ? "opacity-0" : "opacity-60"
          }`}
        >
          Tap a face to spotlight
        </p>
      </div>

      {activePerson && (
        <div
          ref={panelRef}
          key={selected}
          className="animate-fade-in-up relative border-t border-border bg-surface px-6 pb-8 pt-7"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Dismiss spotlight"
            className="absolute right-3 top-3 rounded-full p-1.5 text-text-muted transition-colors hover:bg-border/60 hover:text-text"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-baseline gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <h3 className="text-2xl font-semibold tracking-tight text-text">
              {activePerson.name}
            </h3>
          </div>
          {(activePerson.role || activePerson.affiliation) && (
            <p className="ml-5 mt-1.5 text-xs uppercase tracking-[0.2em] text-text-muted">
              {[activePerson.role, activePerson.affiliation]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          {activePerson.description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-text/90">
              {activePerson.description}
            </p>
          )}
          {(activePerson.website ||
            activePerson.googleScholar ||
            activePerson.github) && (
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {activePerson.website && (
                <PersonLink href={activePerson.website}>Website</PersonLink>
              )}
              {activePerson.googleScholar && (
                <PersonLink href={activePerson.googleScholar}>
                  Google Scholar
                </PersonLink>
              )}
              {activePerson.github && (
                <PersonLink href={activePerson.github}>GitHub</PersonLink>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PersonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-md border border-border px-3 py-1.5 text-text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
