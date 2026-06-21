import type { Metadata } from "next";
import { Fragment } from "react";
import { getContact, getSettings } from "../../sanity/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lindsey Childs — bookings and representation via Atelier Management (Los Angeles & New York), or direct enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Contact Lindsey Childs — bookings and representation via Atelier Management (Los Angeles & New York), or direct enquiries.",
    url: "/contact",
  },
};

function Address({ value }: { value: string }) {
  const lines = value.split("\n");
  return (
    <p>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const signature = contact.signature || settings.siteName;
  const instagramLabel = `Instagram ${
    settings.instagramHandle ? `@${settings.instagramHandle}` : ""
  }`.trim();
  const prettyUrl = contact.representationUrl
    ?.replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <main className="contact">
      <h1 className="visually-hidden">Contact Lindsey Childs</h1>
      <div className="contact__inner">
        <aside className="contact__aside">
          <span className="contact__signature">{signature}</span>
          {settings.instagramUrl && (
            <a
              className="contact__instagram"
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {instagramLabel}
            </a>
          )}
        </aside>

        <div className="contact__body">
          {(contact.representationName || contact.representationUrl) && (
            <section className="contact__block">
              <h2 className="contact__heading">{contact.representationHeading}</h2>
              {contact.representationName && <p>{contact.representationName}</p>}
              {contact.representationUrl && (
                <p>
                  <a
                    href={contact.representationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {prettyUrl}
                  </a>
                </p>
              )}
            </section>
          )}

          {contact.offices.length > 0 && (
            <div className="contact__offices">
              {contact.offices.map((office, i) => (
                <section className="contact__block" key={i}>
                  <h2 className="contact__heading">{office.city}</h2>
                  {office.address && <Address value={office.address} />}
                  {office.email && (
                    <p>
                      <a href={`mailto:${office.email}`}>{office.email}</a>
                    </p>
                  )}
                </section>
              ))}
            </div>
          )}

          {contact.directEmail && (
            <section className="contact__block">
              <h2 className="contact__heading">{contact.directHeading}</h2>
              <p>
                <a href={`mailto:${contact.directEmail}`}>{contact.directEmail}</a>
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
