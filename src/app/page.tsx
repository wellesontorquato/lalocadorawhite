"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Frota from "@/components/Frota";
import Empresa from "@/components/Empresa";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* FROTA (COLADA NO HERO) */}
      <section id="frota" className="-mt-14 md: mt-5">
        <Frota
          showDivider={false}
          containerClassName="pt-0"
          headerClassName="pt-0"
          compact
          cardless
        />
      </section>

      {/* EMPRESA (MAIS PRÓXIMO) */}
      <section id="empresa" className="py-0 md:py-0">
        <Empresa />
      </section>

      <Footer />
    </main>
  );
}
