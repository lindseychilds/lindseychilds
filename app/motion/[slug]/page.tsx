import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import { getMotion } from "../../../sanity/lib/data";
import { SITE_URL } from "../../site";

export async function generateStaticParams() {
  const motion = await getMotion();
  return motion.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getMotion()).find((m) => m.slug === slug);
  if (!project) return {};

  const description = `${project.title} — a film by Lindsey Childs.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/motion/${slug}` },
    openGraph: {
      type: "video.other",
      title: project.title,
      description,
      url: `/motion/${slug}`,
      images: project.thumb
        ? [
            {
              url: project.thumb.src,
              width: project.thumb.width,
              height: project.thumb.height,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function MotionProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motion = await getMotion();
  const index = motion.findIndex((m) => m.slug === slug);
  if (index === -1) notFound();

  const project = motion[index];
  const prev = motion[(index - 1 + motion.length) % motion.length];
  const next = motion[(index + 1) % motion.length];

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: `${project.title} — a film by Lindsey Childs.`,
    thumbnailUrl: [project.thumb.src],
    embedUrl: `https://player.vimeo.com/video/${project.vimeoId}`,
    url: `${SITE_URL}/motion/${slug}`,
    author: { "@type": "Person", name: "Lindsey Childs" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Motion", item: `${SITE_URL}/motion` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/motion/${slug}`,
      },
    ],
  };

  return (
    <main className="player-page">
      <JsonLd data={videoLd} />
      <JsonLd data={breadcrumbLd} />
      <h1 className="visually-hidden">{project.title}</h1>
      <div className="player__frame">
        <iframe
          src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
          title={project.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      <footer className="player__footer">
        <Link href="/motion" className="player__back">← Motion</Link>
        <div className="player__nav">
          <Link href={`/motion/${prev.slug}`}>Prev</Link>
          <Link href={`/motion/${next.slug}`}>Next</Link>
        </div>
      </footer>
    </main>
  );
}
