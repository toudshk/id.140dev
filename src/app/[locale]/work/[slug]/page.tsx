import { notFound } from "next/navigation";
import { ProjectView } from "@/components/work/Project";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const projects = getDictionary(locale).projects;
    return projects
      .filter((p) => p.status !== "private")
      .map((p) => ({ locale, slug: p.slug }));
  });
}

export function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "ru";
  const t = getDictionary(locale);
  const p = t.projects.find((x) => x.slug === params.slug);

  if (!p) return { title: "404 — id.140dev" };

  return {
    title: `${p.title} — id.140dev`,
    description: p.blocks.find((b) => b.kind === "text")?.body ?? p.title
  };
}

export default function ProjectPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const t = getDictionary(params.locale);
  const p = t.projects.find((x) => x.slug === params.slug);

  if (!p || p.status === "private") notFound();

  return <ProjectView project={p} />;
}
