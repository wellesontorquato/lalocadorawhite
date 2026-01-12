import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

// Inter para textos corridos e leitura
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

// Syne para Navbar e Títulos imponentes
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  // ✅ IMPORTANTE: troque pelo seu domínio real em produção
  // Ex.: https://lalocadora.com.br
  metadataBase: new URL("https://lalocadorawhite.netlify.app"),

  title: {
    default: "L.A. LOCADORA | Experiência Premium em Locação",
    template: "%s | L.A. LOCADORA",
  },

  description:
    "Elevando o padrão de locação de veículos exclusivos. Conforto, agilidade e segurança em cada quilômetro.",

  // ✅ Ajuda Google e Social (WhatsApp/Facebook)
  applicationName: "L.A. Locadora",
  creator: "L.A. Locadora",
  publisher: "L.A. Locadora",
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

  // ✅ Open Graph (WhatsApp / Facebook / Instagram)
  openGraph: {
    title: "L.A. LOCADORA | Experiência Premium em Locação",
    description:
      "Elevando o padrão de locação de veículos exclusivos. Conforto, agilidade e segurança em cada quilômetro.",
    url: "https://lalocadorawhite.netlify.app",
    siteName: "L.A. Locadora",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image-v2.png", // ✅ coloque esse arquivo em /public/og-image.jpg (1200x630)
        width: 1200,
        height: 630,
        alt: "L.A. Locadora - Experiência Premium em Locação",
      },
    ],
  },

  // ✅ Twitter card (também ajuda em outros crawlers)
  twitter: {
    card: "summary_large_image",
    title: "L.A. LOCADORA | Experiência Premium em Locação",
    description:
      "Elevando o padrão de locação de veículos exclusivos. Conforto, agilidade e segurança em cada quilômetro.",
    images: ["/og-image-v2.png"],
  },

  // ✅ Ícones
  icons: {
    // Sugestão: use favicon.ico e apple-touch-icon.png também
    icon: [
      { url: "/favicon.ico" },
      { url: "/logolalocadora.png", type: "image/jpeg" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }], // 180x180 em /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        <NextTopLoader
          color="#87CEEB"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #87CEEB,0 0 5px #87CEEB"
        />

        {children}
      </body>
    </html>
  );
}
