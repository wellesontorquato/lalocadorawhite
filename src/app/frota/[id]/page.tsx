"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FROTA } from "@/constants/carros";
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Info,
  Luggage,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Wind,
} from "lucide-react";

type CarFeatureId =
  | "ar"
  | "direcao"
  | "vidro"
  | "trava"
  | "abs"
  | "bagagem_grande"
  | "bagagem_pequena"
  | "pessoas"
  | "automatico"
  | "flex"
  | "seguro"
  | "revisado";

type CarDetail = {
  id: string;
  nome: string;
  categoria: string;
  preco300km: number;
  precoKmLivre: number;
  imagem: string;

  // base atual
  cambio: string;
  combustivel: string;
  lugares: number;

  // === extras (opcionais) para a página detalhada
  grupo?: string; // "Grupo F - Intermediário"
  titleLong?: string; // "VW Polo Hatch 1.0 Turbo, HB20 1.0 Turbo ou similar*"
  resumo?: string; // texto curto
  franquia?: string; // ex: "Franquia reduzida disponível"
  caução?: string; // ex: "Sem caução / Sem cartão"
  entrega?: string; // ex: "Retirada no Galpão L.A."
  seguro?: string; // ex: "Seguro e assistência 24h"
  imagens?: string[]; // galeria
  destaques?: { label: string; value: string }[];
  features?: { id: CarFeatureId; label: string }[];
  detalhes?: { titulo: string; valor: string }[];
  faq?: { q: string; a: string }[];
};

function FeatureIcon({ id }: { id: CarFeatureId }) {
  const common = "text-brand-blue";

  switch (id) {
    case "ar":
      return <Wind size={18} className={common} />;
    case "direcao":
      return <Car size={18} className={common} />;
    case "vidro":
      return <BadgeCheck size={18} className={common} />;
    case "trava":
      return <ShieldCheck size={18} className={common} />;
    case "abs":
      return <ShieldCheck size={18} className={common} />;
    case "bagagem_grande":
    case "bagagem_pequena":
      return <Luggage size={18} className={common} />;
    case "pessoas":
      return <Users size={18} className={common} />;
    case "automatico":
      return <Gauge size={18} className={common} />;
    case "flex":
      return <Fuel size={18} className={common} />;
    case "seguro":
      return <ShieldCheck size={18} className={common} />;
    case "revisado":
      return <Sparkles size={18} className={common} />;
    default:
      return <Info size={18} className={common} />;
  }
}

function money(v: number) {
  return v.toLocaleString("pt-BR");
}

export default function FrotaDetalhePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // acha o carro base
  const base = useMemo(() => FROTA.find((c) => c.id === id), [id]);

  // se não existe, volta pra frota (ou crie not-found.tsx)
  if (!base) {
    return (
      <main className="min-h-screen bg-white font-display">
        <NavbarPages />
        <div className="h-24" />
        <div className="max-w-[1100px] mx-auto px-6 py-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
            Veículo não encontrado
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Esse carro não existe na frota.
          </h1>
          <button
            onClick={() => router.push("/frota")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3
                       text-[11px] font-black uppercase tracking-[0.25em]
                       hover:bg-brand-blue hover:text-slate-900 transition-all"
          >
            <ChevronLeft size={18} />
            Voltar para Frota
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  // monta detalhes com fallback (se você ainda não colocou no constants)
  const car: CarDetail = {
    ...base,
    titleLong:
      (base as any).titleLong ||
      `${base.nome}, ${base.cambio}, ${base.combustivel} ou similar*`,
    grupo: (base as any).grupo || base.categoria,
    resumo:
      (base as any).resumo ||
      "Ideal para rodar em Maceió com conforto, transparência e atendimento rápido. Reserve em minutos pelo WhatsApp.",
    entrega: (base as any).entrega || "Retirada no Galpão L.A. (horário combinado)",
    seguro: (base as any).seguro || "Seguro e assistência 24h inclusos",
    imagens:
      (base as any).imagens || [base.imagem, base.imagem, base.imagem].slice(0, 3),
    destaques: (base as any).destaques || [
      { label: "Câmbio", value: base.cambio },
      { label: "Combustível", value: base.combustivel },
      { label: "Capacidade", value: `${base.lugares} pessoas` },
    ],
    features: (base as any).features || [
      { id: "ar", label: "Ar-condicionado" },
      { id: "direcao", label: "Direção" },
      { id: "automatico", label: "Câmbio automático" },
      { id: "flex", label: "Flex" },
      { id: "bagagem_grande", label: "1 mala grande" },
      { id: "bagagem_pequena", label: "2 malas pequenas" },
      { id: "pessoas", label: `${base.lugares} pessoas` },
      { id: "revisado", label: "Revisado" },
      { id: "seguro", label: "Seguro incluso" },
    ],
    detalhes: (base as any).detalhes || [
      { titulo: "Categoria", valor: base.categoria },
      { titulo: "Câmbio", valor: base.cambio },
      { titulo: "Combustível", valor: base.combustivel },
      { titulo: "Lugares", valor: String(base.lugares) },
      { titulo: "Plano 300km", valor: `R$ ${money(base.preco300km)}/dia` },
      { titulo: "Km livre", valor: `R$ ${money(base.precoKmLivre)}/dia` },
    ],
    faq: (base as any).faq || [
      {
        q: "O modelo é exatamente o da foto?",
        a: "O veículo pode variar conforme disponibilidade, mantendo categoria e padrão equivalente (modelo ou similar).",
      },
      {
        q: "Preciso de cartão ou caução?",
        a: "A confirmação e condições são alinhadas pelo WhatsApp de forma simples e transparente.",
      },
      {
        q: "Retirada e devolução são onde?",
        a: "Retirada e devolução no Galpão L.A., em horário combinado com antecedência.",
      },
    ],
  };

  // galeria
  const [imgIndex, setImgIndex] = useState(0);

  const irParaContato = (plano: "300km" | "Km Livre") => {
    const params = new URLSearchParams({
      carro: car.nome,
      plano,
      origem: "frota-detalhe",
    });
    router.push(`/contato?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-display overflow-x-hidden">
      <NavbarPages />

      {/* HERO */}
      <section className="relative bg-slate-50 border-b border-slate-200/70 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute top-0 right-0 h-full w-[42%] bg-gradient-to-l from-brand-blue/6 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[140px] w-[70%] bg-gradient-to-r from-white/70 to-transparent" />
        </div>

        <div className="h-24 md:h-28" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-10 md:pb-12">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.push("/frota")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2
                         text-[11px] font-black uppercase tracking-[0.25em] text-slate-700
                         hover:border-brand-blue/50 hover:bg-brand-blue/5 transition"
            >
              <ChevronLeft size={16} className="opacity-70" />
              Voltar
            </button>

            <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/70 border border-slate-200 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <span className="h-2 w-2 rounded-full bg-brand-blue" />
              {car.grupo}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* esquerda */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Detalhes do veículo
              </p>

              <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                {car.nome}
                <span className="text-brand-blue">.</span>
              </h1>

              <p className="mt-4 text-slate-600 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                {car.titleLong}
              </p>

              <p className="mt-5 text-slate-600 leading-relaxed font-light max-w-2xl">
                {car.resumo}
              </p>

              <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
                {car.destaques?.map((d) => (
                  <div
                    key={d.label}
                    className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                      {d.label}
                    </p>
                    <p className="mt-2 text-slate-900 font-black tracking-tight">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => irParaContato("300km")}
                  className="inline-flex items-center gap-3 rounded-full bg-slate-900 text-white px-6 py-3
                             text-[11px] font-black uppercase tracking-[0.25em]
                             hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
                >
                  Reservar 300km
                  <ArrowUpRight size={16} className="opacity-90" />
                </button>

                <button
                  onClick={() => irParaContato("Km Livre")}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3
                             text-[11px] font-black uppercase tracking-[0.25em] text-slate-700
                             hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all"
                >
                  Reservar Km Livre <ChevronRight size={16} className="opacity-70" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2 text-slate-500 text-sm font-light">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-brand-blue" />
                  {car.entrega}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-blue" />
                  {car.seguro}
                </span>
              </div>
            </motion.div>

            {/* direita - galeria + preços */}
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_-70px_rgba(2,6,23,0.35)] overflow-hidden">
                {/* imagem principal */}
                <div className="relative aspect-[16/10] bg-slate-100">
                  <img
                    src={car.imagens?.[imgIndex] || car.imagem}
                    alt={car.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" />
                </div>

                {/* thumbs */}
                <div className="p-4 border-t border-slate-200">
                  <div className="grid grid-cols-3 gap-3">
                    {(car.imagens || [car.imagem]).slice(0, 3).map((src, i) => {
                      const active = i === imgIndex;
                      return (
                        <button
                          key={`${src}-${i}`}
                          onClick={() => setImgIndex(i)}
                          className={[
                            "rounded-2xl overflow-hidden border transition",
                            active ? "border-brand-blue/50" : "border-slate-200 hover:border-brand-blue/30",
                          ].join(" ")}
                        >
                          <img src={src} alt="" className="w-full h-20 object-cover" />
                        </button>
                      );
                    })}
                  </div>

                  {/* preços */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                        Diária 300km
                      </p>
                      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                        <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                        {money(car.preco300km)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                        Diária Km Livre
                      </p>
                      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                        <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                        {money(car.precoKmLivre)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-slate-500 font-light leading-relaxed">
                    *Valores podem variar conforme datas e disponibilidade. Confirmação final via WhatsApp.
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* FEATURES (grade igual ao exemplo do print) */}
      <section className="py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">
                Itens do veículo
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
                O que vem nesse grupo.
              </h2>
            </div>

            <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] uppercase tracking-widest font-black text-slate-600">
              <Calendar size={14} className="text-brand-blue" />
              Domingo fechado (ajuste automático)
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {car.features?.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3"
              >
                <span className="grid place-items-center h-10 w-10 rounded-2xl bg-white border border-slate-200">
                  <FeatureIcon id={f.id} />
                </span>
                <p className="text-slate-700 font-bold leading-snug">{f.label}</p>
              </div>
            ))}
          </div>

          {/* detalhes técnicos */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_70px_-55px_rgba(2,6,23,0.25)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">
                Especificações
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {car.detalhes?.map((d) => (
                <div key={d.titulo} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                    {d.titulo}
                  </p>
                  <p className="mt-2 text-slate-900 font-black tracking-tight">
                    {d.valor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#ffffff_100%)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
            Perguntas comuns.
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {car.faq?.map((item) => (
              <div key={item.q} className="rounded-3xl bg-white border border-slate-200 p-7">
                <p className="font-black tracking-tight text-slate-900">{item.q}</p>
                <p className="mt-3 text-slate-600 leading-relaxed font-light">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                Quer reservar agora?
              </p>
              <p className="mt-2 text-slate-600 leading-relaxed font-light">
                Clique e vá para o contato com o carro já selecionado.
              </p>
            </div>

            <button
              onClick={() => irParaContato("300km")}
              className="inline-flex items-center gap-3 rounded-full bg-slate-900 text-white px-6 py-3
                         text-[11px] font-black uppercase tracking-[0.25em]
                         hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
            >
              Reservar agora
              <ArrowUpRight size={16} className="opacity-90" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
