"use client";
import { motion } from "framer-motion";
import { FROTA, Carro } from "@/constants/carros";
import { Fuel, Gauge, ArrowUpRight, Milestone } from "lucide-react";

type FrotaProps = {
  showHeader?: boolean;
  showDivider?: boolean;
  contactHref?: string;
  containerClassName?: string;

  // NOVOS
  headerClassName?: string; // controlar PT do header
  compact?: boolean; // reduz espaços verticais
  cardless?: boolean; // remove “quadrado” branco dos cards
};

export default function Frota({
  showHeader = true,
  showDivider = true,
  contactHref = "/contato",
  containerClassName = "",

  headerClassName = "",
  compact = false,
  cardless = false,
}: FrotaProps) {
  return (
    <section
      className={`font-display ${
        showDivider ? "border-t border-slate-200" : ""
      } bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#ffffff_100%)]`}
    >
      <div className={`max-w-[1400px] mx-auto px-4 md:px-0 ${containerClassName}`}>
        {/* Cabeçalho (opcional) */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={[
              compact ? "mb-8 md:mb-10" : "mb-10 md:mb-14",
              compact ? "pt-0" : "pt-10",
              headerClassName,
            ].join(" ")}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/15 border border-brand-blue/20" />
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.45em]">
                Curadoria de Veículos
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-[-0.06em] leading-[0.9] text-slate-900 uppercase italic">
              Nossa <span className="text-brand-blue not-italic">Seleção</span>
              <span className="text-slate-300">.</span>
            </h2>

            <p className="mt-4 text-slate-600 max-w-2xl font-sans text-base md:text-lg leading-relaxed">
              Escolha o carro ideal com transparência, conforto e atendimento premium — do jeito L.A.
            </p>
          </motion.div>
        )}

        {/* Grid de Veículos */}
        <div
          className={[
            "grid grid-cols-1 md:grid-cols-2",
            compact ? "gap-x-8 md:gap-x-10 gap-y-8 md:gap-y-10" : "gap-x-10 md:gap-x-12 gap-y-10 md:gap-y-12",
            compact ? "pb-8 md:pb-10" : "pb-10 md:pb-14",
          ].join(" ")}
        >
          {FROTA.map((carro: Carro, index: number) => (
            <motion.article
              key={carro.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* ===== CARDLESS (SEM QUADRADO) ===== */}
              {cardless ? (
                <div className="rounded-3xl overflow-hidden">
                  {/* Imagem */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 rounded-3xl">
                    <img
                      src={carro.imagem}
                      alt={carro.nome}
                      className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-70" />

                    {/* Badge categoria */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-brand-blue" />
                        {carro.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo (sem caixa branca) */}
                  <div className="px-2 md:px-3 pt-6">
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
                        {carro.nome}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                          <Gauge size={14} className="text-brand-blue" />
                          {carro.cambio}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                          <Fuel size={14} className="text-brand-blue" />
                          {carro.combustivel}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-700">
                          <Milestone size={14} className="text-brand-blue" />
                          {carro.lugares} lugares
                        </span>
                      </div>
                    </div>

                    <div className="mt-7 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                      <div className="flex gap-8">
                        <div className="space-y-1">
                          <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest block">
                            Diária até 300km
                          </span>
                          <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.preco300km}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest block">
                            Diária km livre
                          </span>
                          <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.precoKmLivre}
                          </p>
                        </div>
                      </div>

                      <a
                        href={contactHref}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest
                                 hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/15"
                      >
                        Reservar
                        <ArrowUpRight
                          size={18}
                          className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* ===== PADRÃO (COM QUADRADO) ===== */
                <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_20px_70px_-55px_rgba(2,6,23,0.35)] overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={carro.imagem}
                      alt={carro.nome}
                      className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-70" />
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-brand-blue" />
                        {carro.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 md:p-8">
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
                        {carro.nome}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-600">
                          <Gauge size={14} className="text-brand-blue" />
                          {carro.cambio}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-600">
                          <Fuel size={14} className="text-brand-blue" />
                          {carro.combustivel}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-2 text-[10px] uppercase tracking-widest font-black text-slate-600">
                          <Milestone size={14} className="text-brand-blue" />
                          {carro.lugares} lugares
                        </span>
                      </div>
                    </div>

                    <div className="mt-7 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                      <div className="flex gap-8">
                        <div className="space-y-1">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">
                            Diária até 300km
                          </span>
                          <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.preco300km}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">
                            Diária km livre
                          </span>
                          <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            <span className="text-brand-blue text-sm mr-1 italic">R$</span>
                            {carro.precoKmLivre}
                          </p>
                        </div>
                      </div>

                      <a
                        href={contactHref}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest
                                 hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/15"
                      >
                        Reservar
                        <ArrowUpRight size={18} className="transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
