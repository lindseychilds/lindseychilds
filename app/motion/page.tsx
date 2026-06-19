import Image from "next/image";
import Link from "next/link";
import { getMotion } from "../../sanity/lib/data";

export default async function MotionPage() {
  const motion = await getMotion();

  return (
    <main className="stills">
      <div className="stills-grid stills-grid--motion">
        {motion.map(({ title, slug, thumb }) => (
          <Link key={slug} href={`/motion/${slug}`} className="stills-item">
            <Image
              src={thumb.src}
              alt=""
              width={thumb.width}
              height={thumb.height}
              sizes="(max-width: 48rem) 50vw, (max-width: 64rem) 33vw, 30vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="stills-item__title">{title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
