import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAbout, getSettings } from "../../sanity/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Lindsey Childs — photographer based in Los Angeles, working between LA and London across fashion, editorial, and portraiture.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "About Lindsey Childs — photographer based in Los Angeles, working between LA and London across fashion, editorial, and portraiture.",
    url: "/about",
  },
};

const ptComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  const signature = about.signature || settings.siteName;
  const instagramLabel = `Instagram ${
    settings.instagramHandle ? `@${settings.instagramHandle}` : ""
  }`.trim();

  return (
    <main className="about">
      <div className="about__inner">
        <aside className="about__aside">
          <span className="about__signature">{signature}</span>
          {settings.instagramUrl && (
            <a
              className="about__instagram"
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {instagramLabel}
            </a>
          )}
        </aside>

        <div className="about__body">
          <section className="about__section">
            <h1 className="about__heading">{about.biographyHeading}</h1>
            <div className="about__prose">
              <PortableText value={about.biography} components={ptComponents} />
            </div>
          </section>

          {about.clients.length > 0 && (
            <section className="about__section">
              <h2 className="about__heading">{about.clientsHeading}</h2>
              <ul className="about__clients">
                {about.clients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </section>
          )}

          <p className="about__contact-link">
            For bookings, see <Link href="/contact">Contact</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
