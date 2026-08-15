import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  ExternalLink,
  Github,
  Info,
  Lightbulb,
  LockKeyhole,
  TimerReset,
  TriangleAlert,
} from "lucide-react";

import type { BlogArticle } from "@/app/blog/articles";
import {
  englishArticles,
  getEnglishArticle,
} from "@/app/blog/articles.en";
import {
  MarketingFooter,
  MarketingHeader,
} from "@/components/marketing/site-chrome";
import { ArticleProductCapture } from "@/components/marketing/article-product-capture";
import { marketingHref } from "@/lib/marketing-i18n";

import { githubUrl } from "@/app/blog/articles";

const locale = "en" as const;
const href = (path: string) => marketingHref(locale, path);

function InlineCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={`${part}-${index}`}
        className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.88em] text-foreground"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

function ArticleNote({
  note,
}: {
  note: NonNullable<BlogArticle["sections"][number]["note"]>;
}) {
  const styles = {
    brand: {
      wrapper: "border-brand/20 bg-brand-soft",
      icon: "bg-brand-solid text-on-brand",
      Icon: Info,
    },
    warning: {
      wrapper: "border-warning/25 bg-warning-soft",
      icon: "bg-warning text-white",
      Icon: TriangleAlert,
    },
    success: {
      wrapper: "border-success/25 bg-success-soft",
      icon: "bg-success text-white",
      Icon: Lightbulb,
    },
  } as const;
  const style = styles[note.tone ?? "brand"];
  const Icon = style.Icon;

  return (
    <aside className={`mt-8 rounded-2xl border p-5 sm:p-6 ${style.wrapper}`}>
      <div className="flex items-start gap-4">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-xl ${style.icon}`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{note.title}</p>
          <p className="mt-1.5 text-sm leading-6 text-muted-strong">
            <InlineCode text={note.body} />
          </p>
        </div>
      </div>
    </aside>
  );
}

export function EnglishBlogOverviewPage() {
  const [featured, ...moreArticles] = englishArticles;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-[#121318] text-white">
          <div className="pointer-events-none absolute left-[8%] top-16 size-[360px] rounded-full bg-[#8ff0cc]/10 blur-[110px]" />
          <div className="pointer-events-none absolute right-[7%] top-4 size-[480px] rounded-full bg-[#665cff]/25 blur-[140px]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

          <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8ff0cc]">
                Technical notes
              </p>
              <h1 className="mt-5 text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.91] tracking-[-0.07em]">
                How Open Inventory
                <span className="block text-[#9188ff]">works internally.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/55 sm:text-[19px]">
                Notes on queues, data models, APIs, labels, iOS, and
                self-hosting. With explicit limits and links to the open source.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/60">
              {[
                "MIT license",
                "PostgreSQL + Next.js",
                "SwiftUI + RoomPlan",
                "OpenAPI",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check
                    className="size-3.5 text-[#8ff0cc]"
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            Latest article
          </p>

          <Link
            href={href(`/blog/${featured.slug}`)}
            className="group mt-5 grid overflow-hidden rounded-[30px] border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-xl lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative min-h-[300px] overflow-hidden bg-strong text-white lg:min-h-[440px]">
              <Image
                src={featured.cover.src}
                alt={featured.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
                <span className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                  {featured.category}
                </span>
                <span className="text-[10px] text-white/70">
                  Real contextual photo · Pexels
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted">
                <time dateTime={featured.publishedAt}>
                  {featured.publishedLabel}
                </time>
                <span aria-hidden="true">·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted sm:text-base">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Read article
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </section>

        <section className="border-y border-border bg-surface-subtle">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  All articles
                </p>
                <h2 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-foreground sm:text-[44px]">
                  Capture, data model, and operations
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">
                Implementation details, technical decisions, and known limits
                from the public repository.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {moreArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={href(`/blog/${article.slug}`)}
                  className="group flex min-h-[420px] flex-col overflow-hidden rounded-[26px] border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                    <Image
                      src={article.cover.src}
                      alt={article.cover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${article.accentSoft}`}
                      >
                        {article.category}
                      </span>
                      <span
                        className={`size-3 rounded-full bg-gradient-to-br ${article.accent}`}
                      />
                    </div>
                    <h3 className="mt-7 text-[28px] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-[32px]">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                      <span className="text-[11px] font-medium text-muted">
                        {article.publishedLabel} · {article.readingTime}
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition group-hover:border-brand group-hover:bg-brand-solid group-hover:text-on-brand">
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: TimerReset,
                title: "Batch capture",
                copy: "Shared fields are set once. Upload, analysis, and cover work run as separate idempotent queue stages.",
              },
              {
                icon: LockKeyhole,
                title: "Docker operations",
                copy: "Run Next.js, PostgreSQL, and upload storage yourself. Backups, TLS, and upgrades remain operator tasks.",
              },
              {
                icon: BookOpenText,
                title: "Code and API",
                copy: "Repository, migrations, and the OpenAPI specification are public. The code is available under the MIT license.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <item.icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[26px] bg-[#121318] p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ff0cc]">
                Open source · MIT
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                Repository, license, and issues
              </h2>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#121318] transition hover:-translate-y-0.5"
            >
              <Github className="size-4" aria-hidden="true" />
              Open repository
            </a>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

export function EnglishBlogArticlePage({
  article,
}: {
  article: BlogArticle;
}) {
  const articleIndex = englishArticles.findIndex(
    (item) => item.slug === article.slug,
  );
  const nextArticle =
    englishArticles[(articleIndex + 1) % englishArticles.length];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <MarketingHeader />

      <main>
        <article>
          <header className="relative overflow-hidden border-b border-white/10 bg-[#121318] text-white">
            <div
              className={`pointer-events-none absolute -right-24 -top-36 size-[620px] rounded-full bg-gradient-to-br ${article.accent} opacity-25 blur-[110px]`}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

            <div className="relative mx-auto max-w-[1020px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
              <Link
                href={href("/blog")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition hover:text-white"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                All articles
              </Link>

              <div className="mt-12 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-white/50">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 uppercase tracking-[0.15em] text-[#8ff0cc]">
                  {article.category}
                </span>
                <time dateTime={article.publishedAt}>
                  {article.publishedLabel}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </div>

              <h1 className="mt-7 max-w-5xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.93] tracking-[-0.065em]">
                {article.title}
              </h1>
              <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/55 sm:text-[19px]">
                {article.excerpt}
              </p>

              <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                <span
                  className={`grid size-9 place-items-center rounded-xl bg-gradient-to-br ${article.accent} text-xs font-bold text-white`}
                >
                  OI
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Open Inventory
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/45">
                    Technical notes · MIT licensed
                  </p>
                </div>
              </div>
            </div>
          </header>

          <figure className="mx-auto max-w-[1120px] px-5 pt-10 sm:px-8 sm:pt-12">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border border-border bg-surface-muted shadow-sm">
              <Image
                src={article.cover.src}
                alt={article.cover.alt}
                fill
                priority
                sizes="(max-width: 1120px) 100vw, 1056px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-muted">
              {article.cover.caption}
            </figcaption>
          </figure>

          <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-between">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  In this article
                </p>
                <nav
                  className="mt-3 grid gap-1"
                  aria-label="Table of contents"
                >
                  {article.sections.map((section) => (
                    <Link
                      key={section.id}
                      href={href(`#${section.id}`)}
                      className="rounded-xl px-3 py-2.5 text-[12px] font-medium leading-5 text-muted transition hover:bg-surface hover:text-foreground"
                    >
                      {section.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-7 border-t border-border px-3 pt-6">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-strong"
                  >
                    <Github className="size-3.5" aria-hidden="true" />
                    GitHub
                  </a>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <section className="rounded-[24px] border border-border bg-surface p-6 shadow-sm sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Summary
                </p>
                <ul className="mt-5 grid gap-4">
                  {article.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex items-start gap-3 text-sm leading-6 text-muted-strong"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                        <Check
                          className="size-3"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                      <InlineCode text={takeaway} />
                    </li>
                  ))}
                </ul>
              </section>

              <ArticleProductCapture slug={article.slug} locale="en" />

              <div className="mt-4">
                {article.sections.map((section, sectionIndex) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 border-b border-border py-14 last:border-0 sm:py-16"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-8 place-items-center rounded-xl bg-gradient-to-br text-[11px] font-semibold text-white ${article.accent}`}
                      >
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      {section.eyebrow ? (
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                          {section.eyebrow}
                        </p>
                      ) : null}
                    </div>

                    <h2 className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-[42px]">
                      {section.title}
                    </h2>

                    {section.paragraphs ? (
                      <div className="mt-7 space-y-5 text-[15px] leading-7 text-muted-strong sm:text-base sm:leading-8">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>
                            <InlineCode text={paragraph} />
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {section.steps ? (
                      <ol className="mt-8 grid gap-4">
                        {section.steps.map((step, index) => (
                          <li
                            key={step.title}
                            className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[40px_1fr] sm:p-6"
                          >
                            <span className="grid size-10 place-items-center rounded-xl bg-strong font-mono text-xs font-semibold text-on-strong">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">
                                <InlineCode text={step.title} />
                              </h3>
                              <p className="mt-2 text-sm leading-6 text-muted">
                                <InlineCode text={step.body} />
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : null}

                    {section.bullets ? (
                      <ul className="mt-8 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 rounded-xl bg-surface-subtle px-4 py-3.5 text-sm leading-6 text-muted-strong"
                          >
                            <Check
                              className="mt-1 size-3.5 shrink-0 text-brand"
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                            <InlineCode text={bullet} />
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.note ? <ArticleNote note={section.note} /> : null}
                  </section>
                ))}
              </div>

              <section className="border-t border-border pt-14 sm:pt-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Further reading
                </p>
                <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.045em] text-foreground">
                  From the article to the implementation
                </h2>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {article.relatedLinks.map((link) => {
                    const content = (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-foreground">
                            {link.label}
                          </h3>
                          {link.external ? (
                            <ExternalLink
                              className="size-3.5 shrink-0 text-muted transition group-hover:text-brand"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowRight
                              className="size-3.5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-muted">
                          {link.description}
                        </p>
                      </>
                    );
                    const classes =
                      "group rounded-2xl border border-border bg-surface p-5 transition hover:border-border-strong hover:shadow-md";

                    return link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={classes}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={href(link.href)}
                        className={classes}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </article>

        <section className="border-t border-border bg-surface-subtle">
          <div className="mx-auto max-w-[1020px] px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              Next article
            </p>
            <Link
              href={href(`/blog/${nextArticle.slug}`)}
              className="group mt-4 flex flex-col justify-between gap-6 rounded-[24px] border border-border bg-surface p-7 shadow-sm transition hover:border-border-strong hover:shadow-lg sm:flex-row sm:items-end sm:p-9"
            >
              <div>
                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${nextArticle.accentSoft}`}
                >
                  {nextArticle.category}
                </span>
                <h2 className="mt-5 max-w-2xl text-[28px] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-[34px]">
                  {nextArticle.title}
                </h2>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-strong text-on-strong transition group-hover:translate-x-1">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

export { englishArticles, getEnglishArticle };
