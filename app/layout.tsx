import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Visionair — Digital-first marketing & web design studio",
  description:
    "Visionair is a digital-first marketing and web design studio crafting high-converting, modern websites for businesses that don't have time to build their own.",
  icons: {
    icon: "/favicon.ico",
  },
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
  themeColor: "#05010d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
