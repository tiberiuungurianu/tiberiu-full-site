import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, DM_Sans, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import { sameAsLinks } from "@/content/links";
import "./globals.css";

const display = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const utility = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-utility",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.personName }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.personName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: site.name,
        alternateName: [site.personName, "Tiberiu", site.code],
        inLanguage: "en-GB",
        publisher: { "@id": `${site.url}#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}#profile`,
        url: site.url,
        name: `${site.personName} — Official Website`,
        description: site.description,
        isPartOf: { "@id": `${site.url}#website` },
        mainEntity: { "@id": `${site.url}#person` },
        about: { "@id": `${site.url}#person` },
        primaryImageOfPage: { "@id": `${site.url}#portrait` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}#person`,
        name: site.personName,
        givenName: "Tiberiu",
        familyName: "Ungurianu",
        alternateName: site.structuredData.alternateName,
        url: site.url,
        mainEntityOfPage: { "@id": `${site.url}#profile` },
        image: { "@id": `${site.url}#portrait` },
        description:
          "Tiberiu Ungurianu is a London-based creator and model. Known online as Tiberiu and @tiberiu.",
        jobTitle: site.structuredData.jobTitle,
        homeLocation: {
          "@type": "Place",
          name: site.structuredData.homeLocation,
        },
        sameAs: sameAsLinks(),
      },
      {
        "@type": "ImageObject",
        "@id": `${site.url}#portrait`,
        url: `${site.url}images/og.jpg`,
        contentUrl: `${site.url}images/tiberiu-ungurianu-portrait.jpg`,
        name: site.personName,
        caption: site.personName,
        representativeOfPage: true,
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${editorial.variable} ${utility.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        {children}
      </body>
    </html>
  );
}
