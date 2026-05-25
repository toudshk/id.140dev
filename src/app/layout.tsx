import type { Metadata, Viewport } from "next";
import { mono, display, grotesk } from "@/lib/fonts";
import { Frame } from "@/components/shell/Frame";
import { Nav } from "@/components/shell/Nav";
import { Cursor } from "@/components/shell/Cursor";
import { Grain } from "@/components/shell/Grain";
import { TransitionProvider } from "@/components/shell/Transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "id.140dev — frontend / web",
  description:
    "Портфолио фронтенд-разработчика id.140dev. Сайты для брендов, художников и небольших студий.",
  applicationName: "id.140dev",
  authors: [{ name: "id.140dev" }],
  openGraph: {
    title: "id.140dev",
    description: "frontend / web · interaction",
    type: "website",
    images: [{ url: "/logo.svg", width: 168, height: 32, alt: "id.140dev" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${mono.variable} ${display.variable} ${grotesk.variable}`}
    >
      <body>
        <TransitionProvider>
          <main
            data-archive-page
            className="relative z-10 min-h-screen md:pr-[var(--nav-rail)]"
          >
            {children}
          </main>
          <Frame />
          <Nav />
        </TransitionProvider>
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
