import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import { getStills } from "../../../sanity/lib/data";
import { SITE_URL } from "../../site";
import ProjectView from "./ProjectView";

export async function generateStaticParams() {
  const stills = await getStills();
  return stills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getStills()).find((s) => s.slug === slug);
  if (!project) return {};

  const description = [project.title, project.description]
    .filter(Boolean)
    .join(" — ")
    .concat(". Photography by Lindsey Childs.");
  const cover = project.images[0];

  return {
    title: project.title,
    description,
    alternates: { canonical: `/stills/${slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: `/stills/${slug}`,
      images: cover
        ? [{ url: cover.src, width: cover.width, height: cover.height, alt: project.title }]
        : undefined,
    },
  };
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

  const galleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    ...(project.description ? { description: project.description } : {}),
    url: `${SITE_URL}/stills/${slug}`,
    image: project.images.map((img) => img.src),
    author: { "@type": "Person", name: "Lindsey Childs" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Stills", item: `${SITE_URL}/stills` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/stills/${slug}`,
      },
    ],
  };

  return (
    <main className="project-page">
      <JsonLd data={galleryLd} />
      <JsonLd data={breadcrumbLd} />
      <ProjectView
        title={project.title}
        images={project.images}
        prevSlug={prev.slug}
        nextSlug={next.slug}
      />
    </main>
  );
}
