"use client";

import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import { FROTA, Carro, CarFeatureId } from "@/constants/carros";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  Calendar,
  Wind,
  Car as CarIcon,
  GlassWater,
  LockKeyhole,
  ShieldCheck,
  Luggage,
  Users,
  Gauge,
  Fuel,
} from "lucide-react";

function FeatureIcon({ id }: { id: CarFeatureId }) {
  const common = "text-brand-blue";
  switch (id) {
    case "ar":
      return <Wind size={18} className={common} />;
    case "direcao":
      return <CarIcon size={18} className={common} />;
    case "vidro":
      return <GlassWater size={18} className={common} />;
    case "trava":
      return <LockKeyhole size={18} className={common} />;
    case "abs":
      return <ShieldCheck size={18} className={common} />;
    case "bagagem_grande":
    case "bagagem_pequena":
      return <Luggage size={18} className={common} />;
    case "pessoas":
      return <Users size={18} className={common} />;
    default:
      return <ShieldCheck size={18} className={common} />;
  }
}

function formatDateBR(iso?: string | null) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export default function FrotaDetalheClient() {
  const routeParams = useParams<{ id?: string }>();
  const routeId = routeParams?.id; // <- AGORA funciona no client

  const searchParams = useSearchParams();
  const retirada = searchParams.get("retirada");
  const devolucao = searchParams.get("devolucao");

  const carro: Carro | undefined = useMemo(() => {
    const raw = decodeURIComponent(String(routeId ?? ""));
    const target = raw.trim().toLowerCase();

    const slug = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const byId = FROTA.find((c) => String(c.id).trim().toLowerCase() === target);
    if (byId) return byId;

    const byNameSlug = FROTA.find((c) => slug(c.nome) === target);
    if (byNameSlug) return byNameSlug;

    const byNameSlugPartial = FROTA.find((c) => {
      const s = slug(c.nome);
      return (
        target === s ||
        target.startsWith(`${s}-`) ||
        target.includes(`-${s}-`) ||
        target.endsWith(`-${s}`)
      );
    });
    if (byNameSlugPartial) return byNameSlugPartial;

    const byNamePlain = FROTA.find((c) => c.nome.trim().toLowerCase() === target);
    if (byNamePlain) return byNamePlain;

    return undefined;
  }, [routeId]);

  const contatoHref = useMemo(() => {
    if (!carro) return "/contato";
    const qp = new URLSearchParams();
    qp.set("carro", carro.nome);
    if (retirada) qp.set("retirada", retirada);
    if (devolucao) qp.set("devolucao", devolucao);
    return `/contato?${qp.toString()}`;
  }, [carro, retirada, devolucao]);

  if (!carro) {
    return (
      <main className="min-h-screen bg-white text-slate-900 font-display">
        <NavbarPages />

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              Frota
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
              Veículo não encontrado
            </h1>

            <p className="mt-2 text-slate-600">
              Esse veículo não existe na base da frota.
            </p>

            {/* DEBUG (pode remover depois) */}
            <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-4 text-xs text-slate-700">
              <p><b>debug routeId (useParams):</b> {String(routeId)}</p>
              <p><b>decoded:</b> {decodeURIComponent(String(routeId ?? ""))}</p>
              <div className="mt-2">
                <p><b>frota ids:</b></p>
                <p className="break-words">{FROTA.map((c) => c.id).join(", ")}</p>
              </div>
              <div className="mt-2">
                <p><b>frota nomes:</b></p>
                <p className="break-words">{FROTA.map((c) => c.nome).join(" | ")}</p>
              </div>
            </div>

            <Link
              href="/frota"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest
                         hover:bg-brand-blue hover:text-slate-900 transition-all"
            >
              <ChevronLeft size={18} />
              Voltar para Frota
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // ---- resto do seu layout (inalterado) ----
  return (
    <main className="min-h-screen bg-white text-slate-900 font-display overflow-x-hidden">
      <NavbarPages />

      <section className="relative bg-slate-50 border-b border-slate-200/60 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-[38%] h-full bg-gradient-to-l from-brand-blue/6 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[120px] w-[70%] bg-gradient-to-r from-white/80 to-transparent" />
        </div>

        <div className="h-20 md:h-24" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-6 md:pb-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/frota"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={18} className="text-brand-blue" />
              Voltar
            </Link>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                {carro.categoria}
              </span>

              {carro.grupo && (
                <span className="inline-flex items-center rounded-full bg-slate-900/60 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  {carro.grupo}
                </span>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-8"
          >
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_24px_80px_-60px_rgba(2,6,23,0.35)]">
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img src={carro.imagem} alt={carro.nome} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-90" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_24px_80px_-60px_rgba(2,6,23,0.35)]">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Detalhes do veículo
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
                {carro.nome}
                <span className="text-brand-blue">.</span>
              </h1>

              {carro.subtitulo && (
                <p className="mt-3 text-slate-600 font-light leading-relaxed">
                  {carro.subtitulo}
                </p>
              )}

              {(retirada || devolucao) && (
                <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar size={18} className="text-brand-blue" />
                    <p className="text-[11px] font-black uppercase tracking-widest">
                      Período selecionado
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Retirada</p>
                      <p className="mt-1 text-lg font-black">{formatDateBR(retirada)}</p>
                    </div>

                    <div className="rounded-xl bg-white border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Devolução</p>
                      <p className="mt-1 text-lg font-black">{formatDateBR(devolucao)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black">
                  <Gauge size={14} className="text-brand-blue" />
                  {carro.cambio}
                </span>

                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black">
                  <Fuel size={14} className="text-brand-blue" />
                  {carro.combustivel}
                </span>

                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black">
                  <Users size={14} className="text-brand-blue" />
                  {carro.lugares} pessoas
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Diária até 300km</p>
                  <p className="mt-1 text-3xl font-black">
                    <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                    {carro.preco300km}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Diária km livre</p>
                  <p className="mt-1 text-3xl font-black">
                    <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                    {carro.precoKmLivre}
                  </p>
                </div>
              </div>

              <a
                href={contatoHref}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest
                           hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/15"
              >
                Reservar este veículo
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Itens e recursos
            </p>
          </div>

          {carro.features?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {carro.features.map((f) => (
                <div
                  key={`${carro.id}-${f.id}`}
                  className="rounded-2xl bg-white border border-slate-200 px-5 py-4 flex items-center gap-3"
                >
                  <span className="h-11 w-11 rounded-2xl bg-slate-50 border border-slate-200 grid place-items-center">
                    <FeatureIcon id={f.id} />
                  </span>
                  <p className="text-sm text-slate-700">{f.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">*Este veículo não possui itens cadastrados.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
