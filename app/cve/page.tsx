import { getCVEs, type CVE, type CVESeverity } from "@/lib/content";

const SEVERITY_STYLES: Record<CVESeverity, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  informational: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const STATUS_LABEL: Record<CVE["status"], string> = {
  reported: "Reported",
  disclosed: "Disclosed",
  patched: "Patched",
  withdrawn: "Withdrawn",
};

export default function CVEPage() {
  const cves = getCVEs();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <header className="mb-12">
        <h1 className="font-display text-6xl leading-none text-text">CVEs</h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Vulnerabilities discovered through Faultline&apos;s analysis of LLM
          inference systems. Each entry links to the public advisory and any
          accompanying writeup.
        </p>
      </header>

      {cves.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface/40 p-12 text-center text-text-muted">
          No CVEs published yet. Reports are forthcoming.
        </div>
      ) : (
        <ul className="space-y-4">
          {cves.map((cve) => (
            <li
              key={cve.id}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="rounded bg-background px-2 py-0.5 font-mono text-xs text-text-muted">
                      {cve.id}
                    </code>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${SEVERITY_STYLES[cve.severity]}`}
                    >
                      {cve.severity}
                      {cve.cvss !== undefined && ` · ${cve.cvss.toFixed(1)}`}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted">
                      {STATUS_LABEL[cve.status]}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-text">
                    {cve.title}
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">
                    Affects <span className="text-text">{cve.product}</span>
                    {cve.disclosed && ` · Disclosed ${cve.disclosed}`}
                  </p>
                </div>
              </div>

              <p className="mt-4 leading-relaxed text-text/90">
                {cve.description}
              </p>

              {cve.credits && cve.credits.length > 0 && (
                <p className="mt-4 text-xs text-text-muted">
                  <span className="uppercase tracking-wider">Credit:</span>{" "}
                  {cve.credits.join(", ")}
                </p>
              )}

              {cve.tags && cve.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cve.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {cve.links && Object.values(cve.links).some(Boolean) && (
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {cve.links.advisory && (
                    <CVELink href={cve.links.advisory}>Advisory</CVELink>
                  )}
                  {cve.links.nvd && <CVELink href={cve.links.nvd}>NVD</CVELink>}
                  {cve.links.vendor && (
                    <CVELink href={cve.links.vendor}>Vendor</CVELink>
                  )}
                  {cve.links.patch && (
                    <CVELink href={cve.links.patch}>Patch</CVELink>
                  )}
                  {cve.links.writeup && (
                    <CVELink href={cve.links.writeup}>Writeup</CVELink>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function CVELink({
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
