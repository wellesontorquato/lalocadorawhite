"use client";

import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import { FROTA, Carro, CarFeatureId } from "@/constants/carros";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Wind,
  Car as CarIcon,
  GlassWater,
  LockKeyhole,
  ShieldCheck,
  Luggage,
  Users,
  Gauge,
  Fuel,
  ChevronRight,
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

export default function FrotaClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-display overflow-x-hidden">
      <NavbarPages />

      {/* HEADER (compacto) */}
      <section className="relative bg-slate-50 border-b border-slate-200/60 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-[38%] h-full bg-gradient-to-l from-brand-blue/6 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[120px] w-[70%] bg-gradient-to-r from-white/80 to-transparent" />
        </div>

        <div className="h-20 md:h-24" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-4 md:pb-6">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Curadoria de veículos
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.88] tracking-tighter uppercase">
              Nossa <span className="text-brand-blue italic">Frota</span>
              <span className="text-brand-blue">.</span>
            </h1>

            <p className="mt-3 text-slate-600 text-base md:text-lg font-light max-w-2xl leading-relaxed">
              Escolha o carro ideal com transparência. Veja detalhes do grupo, itens e
              capacidade — e finalize a reserva em 1 clique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LISTA */}
      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {FROTA.map((carro: Carro, idx: number) => (
              <motion.article
                key={carro.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group"
              >
                <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_24px_80px_-60px_rgba(2,6,23,0.35)]">
                  {/* Imagem (clicável) */}
                  <Link href={`/frota/${encodeURIComponent(carro.id)}`} className="block">
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={carro.imagem}
                        alt={carro.nome}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-5 left-5 flex flex-wrap gap-2">
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

                      <div className="absolute bottom-5 right-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900">
                          Ver detalhes <ChevronRight size={16} className="text-brand-blue" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Conteúdo */}
                  <div className="p-6 md:p-7">
                    <div className="space-y-2">
                      <Link href={`/frota/${encodeURIComponent(carro.id)}`}>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none hover:text-brand-blue transition-colors">
                          {carro.nome}
                        </h2>
                      </Link>

                      {carro.subtitulo && (
                        <p className="text-slate-600 font-light leading-relaxed">
                          {carro.subtitulo}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                        <Gauge size={14} className="text-brand-blue" />
                        {carro.cambio}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                        <Fuel size={14} className="text-brand-blue" />
                        {carro.combustivel}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                        <Users size={14} className="text-brand-blue" />
                        {carro.lugares} pessoas
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="grid grid-cols-2 gap-3">
                        {(carro.features ?? []).slice(0, 8).map((f) => (
                          <div
                            key={`${carro.id}-${f.id}`}
                            className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 flex items-center gap-3"
                          >
                            <span className="h-10 w-10 rounded-2xl bg-white border border-slate-200 grid place-items-center">
                              <FeatureIcon id={f.id} />
                            </span>
                            <p className="text-[13px] leading-snug text-slate-700">
                              {f.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {!carro.features?.length && (
                        <p className="text-sm text-slate-500 font-light">
                          *Detalhes do veículo serão exibidos aqui.
                        </p>
                      )}
                    </div>

                    <div className="mt-7 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                      <div className="flex gap-8">
                        <div className="space-y-1">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">
                            Diária até 300km
                          </span>
                          <p className="text-3xl font-black tracking-tight leading-none text-slate-900">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.preco300km}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">
                            Diária km livre
                          </span>
                          <p className="text-3xl font-black tracking-tight leading-none text-slate-900">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.precoKmLivre}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`/contato?carro=${encodeURIComponent(carro.nome)}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest
                                   hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/15"
                      >
                        Reservar
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-[11px] text-slate-500 font-light leading-relaxed">
            *Os itens podem variar conforme disponibilidade do grupo/categoria. Confirmação final pelo WhatsApp.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
