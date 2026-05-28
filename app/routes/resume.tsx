import { IconDownload, IconExternalLink } from "@tabler/icons-react";
import type { MetaFunction } from "react-router";
import Container from "~/components/container";
import { DottedSeparator } from "~/components/separator";
import { Subheading } from "~/components/subheading";
import { RESUME } from "~/lib/resume";

export const meta: MetaFunction = () => [
  { title: "Resume – Tony Liang" },
  {
    name: "description",
    content: "梁炯新 · AI 全栈 / 后端工程师 · 工作经历与项目经历",
  },
];

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <Subheading>{eyebrow}</Subheading>
      <span className="text-foreground/35 shrink-0 font-mono text-[11px] uppercase">
        {title}
      </span>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/70">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-2">
          <span className="mt-[0.62em] size-1 rounded-full bg-foreground/25" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  return (
    <Container className="pt-6">
      <section className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            <Subheading>Resume</Subheading>
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
              {RESUME.contact.name}
            </h1>
            <p className="mt-2 text-base text-foreground/70">{RESUME.title}</p>
          </div>
          <a
            href={RESUME.pdfPath}
            download
            aria-label="下载 PDF 简历"
            title="下载 PDF 简历"
            className="group flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-foreground/10 px-3 text-sm font-medium text-foreground/65 transition hover:border-foreground/25 hover:bg-foreground/[0.03] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <IconDownload
              className="size-4 transition group-hover:translate-y-0.5"
              stroke={2}
            />
            <span>下载 PDF</span>
          </a>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-foreground/70 text-balance">
          {RESUME.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/60">
          <a
            href={`tel:${RESUME.contact.phone}`}
            className="hover:text-foreground"
          >
            {RESUME.contact.phone}
          </a>
          <a
            href={`mailto:${RESUME.contact.email}`}
            className="hover:text-foreground"
          >
            {RESUME.contact.email}
          </a>
          <span>{RESUME.contact.location}</span>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {RESUME.highlights.map((highlight) => (
            <div
              key={highlight}
              className="border-l border-foreground/15 pl-3 text-sm leading-relaxed text-foreground/70"
            >
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <DottedSeparator className="my-10" />

      <section>
        <SectionTitle eyebrow="Work" title="工作内容" />
        <div className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
          {RESUME.experience.map((job, index) => (
            <article key={job.company} className="py-6">
              <div className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs tabular-nums text-foreground/35">
                  W{String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h2 className="font-medium tracking-tight text-foreground">
                      {job.company}
                    </h2>
                    <span className="shrink-0 font-mono text-xs text-foreground/45">
                      {job.dates}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    {job.role} · {job.department} · {job.location}
                  </p>
                  <BulletList items={job.bullets} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DottedSeparator className="my-10" />

      <section>
        <SectionTitle eyebrow="Projects" title="项目经历" />
        <div className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
          {RESUME.projects.map((project, index) => (
            <article key={project.name} className="py-6">
              <div className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs tabular-nums text-foreground/35">
                  P{String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h2 className="font-medium tracking-tight text-foreground">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-primary"
                        >
                          {project.name}
                          <IconExternalLink
                            className="size-3 text-foreground/35"
                            stroke={2}
                          />
                        </a>
                      ) : (
                        project.name
                      )}
                    </h2>
                    <span className="shrink-0 font-mono text-xs text-foreground/45">
                      {project.dates}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    {project.role}
                    {project.stack ? ` · ${project.stack}` : ""}
                  </p>
                  {project.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {project.description}
                    </p>
                  ) : null}
                  <BulletList items={project.bullets} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DottedSeparator className="my-10" />

      <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
        <section>
          <SectionTitle eyebrow="Skills" title="专业技能" />
          <BulletList items={RESUME.skills} />
        </section>

        <section>
          <SectionTitle eyebrow="Education" title="教育经历" />
          <div className="mt-4 space-y-5">
            {RESUME.education.map((education) => (
              <article key={education.school}>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-medium text-foreground">
                    {education.school}
                  </h2>
                  <span className="shrink-0 font-mono text-xs text-foreground/45">
                    {education.location}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/60">
                  {education.degree}
                </p>
                <p className="mt-1 font-mono text-xs text-foreground/40">
                  {education.dates}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {education.courses}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <DottedSeparator className="my-10" />

      <section>
        <SectionTitle eyebrow="Notes" title="自我评价" />
        <BulletList items={RESUME.selfEvaluation} />
      </section>

      <DottedSeparator className="my-10" />
    </Container>
  );
}
