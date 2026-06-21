import type { MetadataRoute } from "next";
import { getMotion, getStills } from "../sanity/lib/data";
import { SITE_URL } from "./site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stills, motion] = await Promise.all([getStills(), getMotion()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/stills`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/motion`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const stillRoutes: MetadataRoute.Sitemap = stills.map((s) => ({
    url: `${SITE_URL}/stills/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const motionRoutes: MetadataRoute.Sitemap = motion.map((m) => ({
    url: `${SITE_URL}/motion/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...stillRoutes, ...motionRoutes];
}
