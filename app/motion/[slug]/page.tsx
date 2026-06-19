import Link from "next/link";
import { notFound } from "next/navigation";
import { getMotion } from "../../../sanity/lib/data";

export async function generateStaticParams() {
  const motion = await getMotion();
  return motion.map((m) => ({ slug: m.slug }));
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

  return (
    <main className="player-page">
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
