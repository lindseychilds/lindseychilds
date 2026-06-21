import CardStrip from "./components/CardStrip";
import { getStills } from "../sanity/lib/data";

export default async function Home() {
  const stills = (await getStills()).filter(
    (s) => s.featuredOnHome && s.images.length,
  );

  const projects = stills.map((s) => ({
    title: s.title,
    description: s.description,
    image: s.images[0].src,
    alt: s.images[0].alt || s.title,
    width: s.images[0].width,
    height: s.images[0].height,
    href: `/stills/${s.slug}`,
  }));

  return (
    <>
      <h1 className="visually-hidden">Lindsey Childs — Photographer</h1>
      <CardStrip projects={projects} />
    </>
  );
}
