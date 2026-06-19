import { groq } from "next-sanity";

const imageProjection = `{
  "src": asset->url + "?w=1600&auto=format&q=75",
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt
}`;

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  preloaderName,
  instagramUrl,
  instagramHandle,
  navLinks[]{ label, href, hidden },
  seoTitle,
  seoDescription
}`;

export const stillsQuery = groq`*[_type == "stillProject"] | order(orderRank){
  "slug": slug.current,
  title,
  description,
  featuredOnHome,
  images[]${imageProjection}
}`;

export const motionQuery = groq`*[_type == "motionProject"] | order(orderRank){
  "slug": slug.current,
  title,
  vimeoUrl,
  "thumb": thumbnail${imageProjection}
}`;

export const aboutQuery = groq`*[_type == "aboutPage"][0]{
  signature,
  biographyHeading,
  biography,
  clientsHeading,
  clients
}`;

export const contactQuery = groq`*[_type == "contactPage"][0]{
  signature,
  representationHeading,
  representationName,
  representationUrl,
  offices[]{ city, address, email },
  directHeading,
  directEmail
}`;
