import type { Metadata, Viewport } from "next";
import { mono, display, grotesk } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://id140dev.tech"),
  applicationName: "id.140dev",
  authors: [{ name: "id.140dev" }],
  openGraph: {
    type: "website",
    images: [{ url: "/logo.svg", width: 168, height: 32, alt: "id.140dev" }]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${mono.variable} ${display.variable} ${grotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
