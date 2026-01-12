import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white font-display">
      <NavbarPages />
      <div className="h-24" />

      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
          404
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
          Veículo não encontrado.
        </h1>
        <p className="mt-4 text-slate-600 font-light">
          Volte para a frota e selecione um veículo disponível.
        </p>

        <Link
          href="/frota"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3
                     text-[11px] font-black uppercase tracking-[0.25em]
                     hover:bg-brand-blue hover:text-slate-900 transition-all"
        >
          Voltar para Frota
        </Link>
      </div>

      <Footer />
    </main>
  );
}
