import type { Metadata, Viewport } from "next";
import { Space_Mono, Reenie_Beanie } from "next/font/google";
import Nav from "./components/Nav";
import JsonLd from "./components/JsonLd";
import Preloader from "./components/Preloader";
import { getSettings } from "../sanity/lib/data";
import { SITE_URL } from "./site";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const reenieBeanie = Reenie_Beanie({
  weight: ["400"],
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle || settings.siteName;
  const description = settings.seoDescription;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${settings.siteName}`,
    },
    description,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    alternates: { canonical: "/" },
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title,
      description,
      url: SITE_URL,
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  const sameAs = settings.instagramUrl ? [settings.instagramUrl] : undefined;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.siteName,
    url: SITE_URL,
    jobTitle: "Photographer",
    ...(settings.seoDescription ? { description: settings.seoDescription } : {}),
    image: `${SITE_URL}/og-image.png`,
    ...(sameAs ? { sameAs } : {}),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: SITE_URL,
  };

  return (
    <html lang="en" className={`${spaceMono.variable} ${reenieBeanie.variable}`}>
      <body>
        <JsonLd data={personLd} />
        <JsonLd data={websiteLd} />
        <div className="site">
          <Preloader name={settings.preloaderName} />
          <Nav logo={settings.siteName} links={settings.navLinks} />
          {children}
        </div>
      </body>
    </html>
  );
}
