import { notFound } from "next/navigation";
import { getStills } from "../../../sanity/lib/data";
import ProjectView from "./ProjectView";

export async function generateStaticParams() {
  const stills = await getStills();
  return stills.map((s) => ({ slug: s.slug }));
}

export default async function StillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stills = await getStills();
  const index = stills.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const project = stills[index];
  const prev = stills[(index - 1 + stills.length) % stills.length];
  const next = stills[(index + 1) % stills.length];

  return (
    <main className="project-page">
      <ProjectView
        images={project.images}
        prevSlug={prev.slug}
        nextSlug={next.slug}
      />
    </main>
  );
}
