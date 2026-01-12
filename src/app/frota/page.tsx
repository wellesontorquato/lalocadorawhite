"use client";

import NavbarPages from "@/components/NavbarPages";
import Frota from "@/components/Frota";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PaginaFrota() {
  return (
    <main className="min-h-screen bg-white">
      <NavbarPages />

      {/* HEADER DA PÁGINA COM FUNDO ESTRUTURADO */}
      <section className="relative bg-slate-50 border-b border-slate-200/60 overflow-hidden">
        {/* Elemento Decorativo (opcional - para dar profundidade) */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/5 to-transparent pointer-events-none" />
        
        {/* Compensação Navbar Fixed + Respiro Superior */}
        <div className="h-20 md:h-24" />


        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-2 md:pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Tag / Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Explore nosso catálogo
              </p>
            </div>

            {/* Título Principal */}
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase text-slate-900 mb-8">
              NOSSA <span className="text-brand-blue italic">FROTA</span>
              <span className="text-brand-blue">.</span>
            </h1>

            {/* Descrição com largura controlada */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed font-light">
                Tecnologia, conforto e performance. Encontre o veículo 
                que melhor se adapta à sua próxima jornada.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DA FROTA (CONTEÚDO) */}
      <section className="relative py-8 md:py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Aqui entra o componente da frota já sem os headers internos */}
            <Frota 
                showHeader={false} 
                showDivider={false} 
                contactHref="/contato" 
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}