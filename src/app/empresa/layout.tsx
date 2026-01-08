import type { Metadata } from "next";

const SITE_URL = "https://www.seudominio.com"; // 🔴 TROQUE pelo domínio real
const PAGE_URL = `${SITE_URL}/empresa`;

export const metadata: Metadata = {
  title: "Aluguel de Carro em Maceió | L.A. Locadora (Sem Caução)",
  description:
    "Aluguel de carro em Maceió com seguro e assistência 24h. Sem caução e sem cartão. Retirada e devolução no Galpão da L.A. Locadora. Solicite pelo WhatsApp.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "Aluguel de Carro em Maceió | L.A. Locadora",
    description:
      "Seguro e assistência 24h. Sem caução e sem cartão. Retirada e devolução no Galpão da L.A. Locadora.",
    url: PAGE_URL,
    siteName: "L.A. Locadora",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // em /public
        width: 1200,
        height: 630,
        alt: "L.A. Locadora - Aluguel de carro em Maceió",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aluguel de Carro em Maceió | L.A. Locadora",
    description:
      "Seguro e assistência 24h. Sem caução e sem cartão. Retirada no Galpão da L.A. Locadora.",
    images: ["/og-image.png"],
  },

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
};

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdCarRental = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    name: "L.A. Locadora",
    url: SITE_URL,
    areaServed: {
      "@type": "City",
      name: "Maceió",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Maceió",
        addressRegion: "AL",
        addressCountry: "BR",
      },
    },
    telephone: "+55 82 99690-6585",
    image: `${SITE_URL}/og-image.png`,
    description:
      "Aluguel de carro em Maceió com seguro e assistência 24h. Sem caução e sem cartão. Retirada e devolução no Galpão da L.A. Locadora.",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Preciso de cartão de crédito ou caução?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. A L.A. Locadora não exige cartão de crédito nem caução para realizar a locação.",
        },
      },
      {
        "@type": "Question",
        name: "Onde faço a retirada e devolução do veículo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A retirada e a devolução são feitas no Galpão da L.A. Locadora, em Maceió, em horário combinado.",
        },
      },
      {
        "@type": "Question",
        name: "O carro tem seguro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Todos os veículos contam com seguro e assistência 24 horas durante o período de locação.",
        },
      },
      {
        "@type": "Question",
        name: "O que está incluso na diária?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A diária inclui o uso do veículo no período contratado e os itens acordados no plano escolhido.",
        },
      },
    ],
  };

  return (
    <>
      {/* 🔥 Structured Data para SEO local + rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCarRental) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {children}
    </>
  );
}
