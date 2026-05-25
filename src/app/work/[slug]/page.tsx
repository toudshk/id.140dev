import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { ProjectView } from "@/components/work/Project";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.status !== "private").map((p) => ({
    slug: p.slug
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return { title: "404 — id.140dev" };
  return {
    title: `${p.title} — id.140dev`,
    description: p.blocks.find((b) => b.kind === "text")?.body ?? p.title
  };
}

export default function ProjectPage({
  params
}: {
  params: { slug: string };
}) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  if (p.status === "private") notFound();
  return <ProjectView project={p} />;
}
