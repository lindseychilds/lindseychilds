import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./client";
import {
  aboutQuery,
  contactQuery,
  motionQuery,
  settingsQuery,
  stillsQuery,
} from "./queries";

export interface NavLink {
  label: string;
  href: string;
  hidden?: boolean;
}

export interface Settings {
  siteName: string;
  preloaderName: string;
  instagramUrl: string;
  instagramHandle: string;
  navLinks: NavLink[];
  seoTitle: string;
  seoDescription: string;
}

export interface ResolvedImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Still {
  slug: string;
  title: string;
  description: string;
  featuredOnHome: boolean;
  images: ResolvedImage[];
}

export interface Motion {
  slug: string;
  title: string;
  vimeoId: string;
  thumb: ResolvedImage;
}

export interface About {
  signature?: string;
  biographyHeading: string;
  biography: PortableTextBlock[];
  clientsHeading: string;
  clients: string[];
}

export interface Office {
  city: string;
  address?: string;
  email?: string;
}

export interface Contact {
  signature?: string;
  representationHeading: string;
  representationName?: string;
  representationUrl?: string;
  offices: Office[];
  directHeading: string;
  directEmail?: string;
}

async function safeFetch<T>(query: string): Promise<T | null> {
  try {
    return await client.fetch<T>(query);
  } catch {
    return null;
  }
}

function vimeoId(url: string | undefined): string {
  return url?.match(/(\d{6,})/)?.[1] ?? "";
}

function cleanImages(images: ResolvedImage[] | undefined): ResolvedImage[] {
  return (images ?? []).filter((i) => i && i.src && i.width && i.height);
}

export async function getSettings(): Promise<Settings> {
  const data = await safeFetch<Partial<Settings>>(settingsQuery);
  return {
    siteName: data?.siteName ?? "",
    preloaderName: data?.preloaderName || data?.siteName || "",
    instagramUrl: data?.instagramUrl ?? "",
    instagramHandle: data?.instagramHandle ?? "",
    navLinks: data?.navLinks ?? [],
    seoTitle: data?.seoTitle || data?.siteName || "",
    seoDescription: data?.seoDescription ?? "",
  };
}

export async function getStills(): Promise<Still[]> {
  const data = await safeFetch<Still[]>(stillsQuery);
  if (!data) return [];
  return data.map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description ?? "",
    featuredOnHome: s.featuredOnHome ?? true,
    images: cleanImages(s.images),
  }));
}

export async function getMotion(): Promise<Motion[]> {
  const data = await safeFetch<
    { slug: string; title: string; vimeoUrl?: string; thumb?: ResolvedImage }[]
  >(motionQuery);
  if (!data) return [];
  return data
    .map((m) => ({
      slug: m.slug,
      title: m.title,
      vimeoId: vimeoId(m.vimeoUrl),
      thumb: m.thumb as ResolvedImage,
    }))
    .filter((m) => m.vimeoId && m.thumb?.src);
}

export async function getAbout(): Promise<About> {
  const data = await safeFetch<Partial<About>>(aboutQuery);
  return {
    signature: data?.signature,
    biographyHeading: data?.biographyHeading || "Biography",
    biography: data?.biography ?? [],
    clientsHeading: data?.clientsHeading || "Clients",
    clients: data?.clients ?? [],
  };
}

export async function getContact(): Promise<Contact> {
  const data = await safeFetch<Partial<Contact>>(contactQuery);
  return {
    signature: data?.signature,
    representationHeading: data?.representationHeading || "Representation",
    representationName: data?.representationName,
    representationUrl: data?.representationUrl,
    offices: data?.offices ?? [],
    directHeading: data?.directHeading || "Direct",
    directEmail: data?.directEmail,
  };
}
