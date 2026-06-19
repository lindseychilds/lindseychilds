import type { Metadata } from "next";
import { Space_Mono, Reenie_Beanie } from "next/font/google";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import { getSettings } from "../sanity/lib/data";
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${spaceMono.variable} ${reenieBeanie.variable}`}>
      <body>
        <div className="site">
          <Preloader name={settings.preloaderName} />
          <Nav logo={settings.siteName} links={settings.navLinks} />
          {children}
        </div>
      </body>
    </html>
  );
}
