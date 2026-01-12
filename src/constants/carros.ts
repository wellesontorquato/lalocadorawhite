// constants/carros.tsx
export type CarFeatureId =
  | "ar"
  | "direcao"
  | "vidro"
  | "trava"
  | "abs"
  | "bagagem_grande"
  | "bagagem_pequena"
  | "pessoas";

export type CarFeature = {
  id: CarFeatureId;
  label: string;
};

export interface Carro {
  id: string;
  nome: string;
  categoria: string;
  preco300km: number;
  precoKmLivre: number;
  imagem: string;
  cambio: string;
  combustivel: string;
  lugares: number;

  // ✅ NOVOS (opcionais) — página detalhada usa, o resto ignora
  grupo?: string; // ex: "Grupo F - Intermediário"
  subtitulo?: string; // ex: "VW Polo Hatch 1.0 Turbo, HB20 1.0 Turbo ou similar*"
  features?: CarFeature[];

  malasPequenas?: number;
  malasGrandes?: number;
}

export const FROTA: Carro[] = [
  {
    id: "onix-2022",
    nome: "Onix 2022",
    categoria: "Econômico Premium",
    grupo: "Grupo F - Intermediário",
    subtitulo: "Chevrolet Onix 1.0 Turbo ou similar*",
    preco300km: 140,
    precoKmLivre: 170,
    imagem: "/carros/onix.webp",
    cambio: "Automático",
    combustivel: "Flex",
    lugares: 5,
    malasPequenas: 2,
    malasGrandes: 1,
    features: [
      { id: "ar", label: "Ar-condicionado" },
      { id: "direcao", label: "Dir. Hidráulica" },
      { id: "vidro", label: "Vidro elétrico" },
      { id: "trava", label: "Trava elétrica" },
      { id: "abs", label: "ABS" },
      { id: "bagagem_grande", label: "1 mala(s) grande(s)" },
      { id: "bagagem_pequena", label: "2 mala(s) pequena(s)" },
      { id: "pessoas", label: "5 pessoas" },
    ],
  },
  {
    id: "polo-2022",
    nome: "Polo 2022",
    categoria: "Econômico Premium",
    grupo: "Grupo F - Intermediário",
    subtitulo: "VW Polo Hatch 1.0 Turbo, HB20 1.0 Turbo ou similar*",
    preco300km: 170,
    precoKmLivre: 210,
    imagem: "/carros/polo.webp",
    cambio: "Automático",
    combustivel: "Flex",
    lugares: 5,
    malasPequenas: 2,
    malasGrandes: 1,
    features: [
      { id: "ar", label: "Ar-condicionado" },
      { id: "direcao", label: "Dir. Hidráulica" },
      { id: "vidro", label: "Vidro elétrico" },
      { id: "trava", label: "Trava elétrica" },
      { id: "abs", label: "ABS" },
      { id: "bagagem_grande", label: "1 mala(s) grande(s)" },
      { id: "bagagem_pequena", label: "2 mala(s) pequena(s)" },
      { id: "pessoas", label: "5 pessoas" },
    ],
  },
];
