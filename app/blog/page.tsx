import { getBlogPosts } from "@/lib/content";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <header className="mb-12">
        <h1 className="font-display text-6xl leading-none text-text">Blog</h1>
        <p className="mt-4 text-text-muted">
          News and updates from the Faultline team.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface/40 p-12 text-center text-text-muted">
          No posts yet. Check back soon.
        </div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <p className="text-xs uppercase tracking-wider text-text-muted">
                {post.date}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-text">
                {post.url ? (
                  <a href={post.url} className="hover:text-accent">
                    {post.title}
                  </a>
                ) : (
                  post.title
                )}
              </h2>
              <p className="mt-2 text-text-muted">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
