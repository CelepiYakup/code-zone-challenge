import type { Metadata } from "next";
import Navigation from "./components/Navigation/Navigation";
import {
  generateMetadata,
  FONT_CONFIG,
  PWA_CONFIG,
  SITE_CONFIG,
} from "@/lib/site-config";
import "../styles/global.scss";

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE_CONFIG.language} suppressHydrationWarning>
      <head>
        {FONT_CONFIG.preconnectUrls.map((url) => (
          <link key={url} rel="preconnect" href={url} />
        ))}
        <link
          rel="preconnect"
          href={FONT_CONFIG.preconnectUrls[1]}
          crossOrigin=""
        />
        <link href={FONT_CONFIG.googleFontsUrl} rel="stylesheet" />
        <link rel="icon" href={PWA_CONFIG.favicon} />
        <link
          rel="apple-touch-icon"
          sizes={PWA_CONFIG.appleTouchIcon.sizes}
          href={PWA_CONFIG.appleTouchIcon.href}
        />
        <meta name="theme-color" content={SITE_CONFIG.themeColor} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only">
          Ana içeriğe geç
        </a>

        <Navigation />

        <main id="main-content" className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
