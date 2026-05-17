import {
  getProjects,
  getPeople,
  getPapers,
  site,
} from "@/lib/content";
import { PeopleSection } from "@/components/PeopleSection";

export default function HomePage() {
  const projects = getProjects();
  const people = getPeople();
  const papers = getPapers();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <header className="mb-20">
        <h1 className="font-display text-7xl leading-none text-text">
          Faultline
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-text-muted">
          {site.tagline}
        </p>
        {site.links.repo && (
          <div className="mt-6">
            <a
              href={site.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              github.com/Faultline-project
            </a>
          </div>
        )}
      </header>

      <Section id="projects" title="Projects">
        {projects.length === 0 ? (
          <EmptyState>No projects listed yet.</EmptyState>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold text-text">
                    {project.name}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-accent">
                    {project.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{project.tagline}</p>
                <p className="mt-3 text-text">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {project.links.repo && (
                    <LinkPill href={project.links.repo}>Repo</LinkPill>
                  )}
                  {project.links.paper && (
                    <LinkPill href={project.links.paper}>Paper</LinkPill>
                  )}
                  {project.links.docs && (
                    <LinkPill href={project.links.docs}>Docs</LinkPill>
                  )}
                  {project.links.site && (
                    <LinkPill href={project.links.site}>Site</LinkPill>
                  )}
                </div>

                {project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="people" title="People">
        <PeopleSection people={people} />
      </Section>

      <Section id="papers" title="Papers">
        {papers.length === 0 ? (
          <EmptyState>No papers listed yet.</EmptyState>
        ) : (
          <ul className="space-y-3">
            {papers.map((paper) => (
              <li
                key={paper.id}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-text hover:text-accent"
                >
                  {paper.title}
                </a>
                <p className="mt-1 text-sm text-text-muted">
                  {paper.authors.length > 0 && (
                    <span>{paper.authors.join(", ")} · </span>
                  )}
                  {paper.venue}, {paper.year}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-20">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

function LinkPill({
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
      className="rounded-md border border-border px-3 py-1 text-text-muted hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-text-muted">
      {children}
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
