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
    width: s.images[0].width,
    height: s.images[0].height,
    href: `/stills/${s.slug}`,
  }));

  return <CardStrip projects={projects} />;
}
