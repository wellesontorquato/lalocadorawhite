"use client";
import { motion } from "framer-motion";

export default function Empresa() {
  return (
    <section className="relative bg-white overflow-hidden border-t border-slate-200">
      {/* detalhe de fundo bem sutil (premium) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[240px] w-[60%] bg-gradient-to-r from-slate-50 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center px-6 md:px-12 py-16 md:py-24">
        {/* Lado do Texto */}
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">
              Sobre a L.A. Locadora
            </span>
          </div>

          {/* Título */}
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.05]">
            Compromisso com o seu{" "}
            <span className="text-brand-blue italic">destino</span> <br />
            e com o seu conforto.
          </h2>

          {/* Texto */}
          <p className="mt-6 text-slate-600 leading-relaxed text-base md:text-lg max-w-xl">
            A L.A. Locadora nasceu para transformar o aluguel de carros em uma
            experiência premium e sem burocracia. Nossa frota é selecionada e
            revisada para você só se preocupar em aproveitar a viagem.
          </p>

          {/* Stats (mais “clean”, com cartões) */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-[0_20px_70px_-60px_rgba(2,6,23,0.25)]">
              <h4 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                +10.000
              </h4>
              <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-[0.35em] font-black">
                Clientes atendidos
              </p>
              <div className="mt-4 h-[1px] w-10 bg-brand-blue/60" />
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-[0_20px_70px_-60px_rgba(2,6,23,0.25)]">
              <h4 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                24h
              </h4>
              <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-[0.35em] font-black">
                Suporte dedicado
              </p>
              <div className="mt-4 h-[1px] w-10 bg-brand-blue/60" />
            </div>
          </div>

          {/* mini CTA opcional (combina com seu estilo) */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/contato"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em]
                         hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
            >
              Falar com a equipe
            </a>

            <a
              href="/frota"
              className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-slate-900 transition"
            >
              Ver frota →
            </a>
          </div>
        </motion.div>

        {/* Lado da Imagem */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Moldura premium */}
          <div className="absolute -inset-4 rounded-[2.2rem] border border-brand-blue/20 pointer-events-none" />
          <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-brand-blue/10 via-transparent to-transparent blur-2xl pointer-events-none" />

          <div className="relative h-[320px] md:h-[540px] overflow-hidden rounded-[2rem] bg-slate-100 border border-slate-200 shadow-[0_30px_90px_-70px_rgba(2,6,23,0.45)]">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80"
              className="w-full h-full object-cover scale-[1.02] hover:scale-[1.06] transition-transform duration-1000"
              alt="L.A. Locadora Premium Service"
            />

            {/* Overlay suave p/ dar “cinema” */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
          </div>

          {/* selo (menos agressivo, mais elegante) */}
          <div className="absolute -bottom-5 -right-5 hidden md:block">
            <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-5 shadow-xl">
              <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.25em] leading-none">
                Qualidade
                <br />
                Certificada
              </p>
              <div className="mt-3 h-[2px] w-10 bg-brand-blue rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
