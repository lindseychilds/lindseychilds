import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStills } from "../../sanity/lib/data";

export const metadata: Metadata = {
  title: "Stills",
  description:
    "Still photography by Lindsey Childs — editorial, fashion, and portrait work for brands and publications.",
  alternates: { canonical: "/stills" },
  openGraph: {
    title: "Stills",
    description:
      "Still photography by Lindsey Childs — editorial, fashion, and portrait work for brands and publications.",
    url: "/stills",
  },
};

export default async function StillsPage() {
  const stills = await getStills();

  return (
    <main className="stills">
      <h1 className="visually-hidden">Stills — Photography by Lindsey Childs</h1>
      <div className="stills-grid">
        {stills.map(({ title, slug, images }) => (
          <Link key={slug} href={`/stills/${slug}`} className="stills-item">
            <Image
              src={images[0].src}
              alt={images[0].alt || title}
              width={images[0].width}
              height={images[0].height}
              sizes="(max-width: 48rem) 50vw, (max-width: 64rem) 33vw, 20vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="stills-item__title">{title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
