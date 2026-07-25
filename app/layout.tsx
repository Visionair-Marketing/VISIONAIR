import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { LenisProvider } from "@/components/animation/LenisProvider";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

// Body + heading face. Geist, self-hosted variable font. Body copy runs light
// (weight 300, set on <body> in globals.css); headings/labels opt into heavier
// weights explicitly. Exposes --font-geist-sans, aliased to --font-sans in CSS.

// Display face. Used sparingly: large hero words, pull quotes, editorial accents.
// Single weight by design (regular + italic) to keep it restrained.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  // Browser tab title. app/icon.png is auto-detected by Next as the favicon,
  // so no explicit `icons` entry is needed.
  title: "Visionair Marketing",
  description:
    "Visionair is a digital-first marketing and web design studio crafting high-converting, modern websites for businesses that don't have time to build their own.",
  metadataBase:
    typeof process !== "undefined"
      ? new URL(
          process.env.NEXT_PUBLIC_SITE_URL ?? "https://visionair.agency",
        )
      : undefined,
  openGraph: {
    title: "Visionair — Websites that move brands forward",
    description:
      "Premium, conversion-focused websites for ambitious brands. Strategy, design, and build — handled end to end.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visionair — Digital-first marketing studio",
    description:
      "Minimal, high-impact web design and marketing for brands that care about first impressions.",
  },
};

export const viewport: Viewport = {
  // Mirrors --background. Next metadata can't read CSS vars, so keep in sync.
  themeColor: "#0a0a0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${instrumentSerif.variable} bg-background text-foreground antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
        <Cursor />
      </body>
    </html>
  );
}
