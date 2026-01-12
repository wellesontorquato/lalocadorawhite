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

  // ✅ Detalhes (opcionais) — usados na página /frota/[id]
  grupo?: string; // ex: "Grupo F - Intermediário"
  subtitulo?: string; // ex: "VW Polo Hatch 1.0 Turbo, HB20 1.0 Turbo ou similar*"
  features?: CarFeature[];

  // ✅ Para “renderizar” badges e textos dinamicamente
  malasPequenas?: number;
  malasGrandes?: number;
}

/**
 * Helpers para labels consistentes (evita hardcode repetido e mantém plural certo)
 */
const labelMalaGrande = (n: number) => `${n} mala(s) grande(s)`;
const labelMalaPequena = (n: number) => `${n} mala(s) pequena(s)`;
const labelPessoas = (n: number) => `${n} pessoas`;

/**
 * Mantém o array de features coerente com os números de malas/lugares,
 * sem você precisar lembrar de atualizar manualmente.
 */
const buildFeatures = (cfg: {
  direcao: string;
  malasGrandes: number;
  malasPequenas: number;
  lugares: number;
}): CarFeature[] => [
  { id: "ar", label: "Ar-condicionado" },
  { id: "direcao", label: cfg.direcao },
  { id: "vidro", label: "Vidro elétrico" },
  { id: "trava", label: "Trava elétrica" },
  { id: "abs", label: "ABS" },
  { id: "bagagem_grande", label: labelMalaGrande(cfg.malasGrandes) },
  { id: "bagagem_pequena", label: labelMalaPequena(cfg.malasPequenas) },
  { id: "pessoas", label: labelPessoas(cfg.lugares) },
];

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

    features: buildFeatures({
      direcao: "Dir. Hidráulica",
      malasGrandes: 1,
      malasPequenas: 2,
      lugares: 5,
    }),
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

    features: buildFeatures({
      direcao: "Dir. Hidráulica",
      malasGrandes: 1,
      malasPequenas: 2,
      lugares: 5,
    }),
  },
];
