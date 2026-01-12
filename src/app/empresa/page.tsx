"use client";

import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  Car,
  FileText,
  CreditCard,
  MapPin,
  HelpCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function PaginaEmpresa() {
  const WHATS_NUMBER = "5582996906585";
  const WHATS_MESSAGE =
    "Olá! Quero alugar um carro em Maceió e solicitar uma reserva com a L.A. Locadora. Pode me ajudar?";

  const contatoHref = `/contato`;

  const diferenciais = [
    {
      icon: ShieldCheck,
      title: "Seguro e assistência 24h",
      desc: "Todos os veículos contam com seguro e assistência 24 horas para você rodar com tranquilidade do início ao fim.",
    },
    {
      icon: CreditCard,
      title: "Sem caução ou cartão",
      desc: "Você não precisa de cartão de crédito nem caução para alugar. Mais praticidade e menos burocracia.",
    },
    {
      icon: Clock,
      title: "Atendimento ágil",
      desc: "Orçamento e confirmação rápidos, direto pelo WhatsApp — ideal pra quem quer resolver sem perder tempo.",
    },
    {
      icon: MapPin,
      title: "Retirada no Galpão L.A.",
      desc: "Retirada e devolução no Galpão da L.A. Locadora, com horário combinado e checklist na entrega.",
    },
  ];

  const passos = [
    {
      step: "01",
      title: "Escolha o veículo e as datas",
      desc: "Você seleciona o carro, retirada e devolução. A gente confirma disponibilidade.",
    },
    {
      step: "02",
      title: "Confirmação pelo WhatsApp",
      desc: "Sem formulários longos. Você fala direto com a equipe, tira dúvidas e confirma com agilidade.",
    },
    {
      step: "03",
      title: "Retirada no Galpão L.A.",
      desc: "Checklist na entrega, orientações e transparência — do jeito L.A.",
    },
    {
      step: "04",
      title: "Uso com seguro e suporte",
      desc: "Durante toda a locação, você conta com suporte para rodar com mais segurança.",
    },
  ];

  const requisitos = [
    { icon: FileText, label: "CNH válida (categoria B)" },
    { icon: Car, label: "Idade mínima conforme categoria do veículo" },
    { icon: ShieldCheck, label: "Seguro e assistência 24h inclusos" },
  ];

  const faq = [
    {
      q: "Preciso de cartão de crédito ou caução?",
      a: "Não. A L.A. Locadora não exige cartão de crédito nem caução para realizar a locação.",
    },
    {
      q: "Onde faço a retirada e devolução do veículo?",
      a: "Retirada e devolução no Galpão da L.A. Locadora, em horário combinado com antecedência.",
    },
    {
      q: "O carro tem seguro?",
      a: "Sim. Todos os veículos contam com seguro e assistência 24 horas durante o período de locação.",
    },
    {
      q: "O que está incluso na diária?",
      a: "Inclui o uso do veículo no período contratado e itens acordados no plano escolhido. Tudo é informado antes da confirmação.",
    },
    {
      q: "Posso alterar datas depois de reservar?",
      a: "Sempre que houver disponibilidade, sim. Alterações podem impactar o valor final.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-display overflow-x-hidden">
      <NavbarPages />

      {/* HERO (mais horizontal / aproveita espaço) */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/70">
        {/* decoração leve */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute top-0 right-0 h-full w-[42%] bg-gradient-to-l from-brand-blue/6 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[140px] w-[70%] bg-gradient-to-r from-white/70 to-transparent" />
        </div>

        {/* offset do navbar fixo */}
        <div className="h-24 md:h-28" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-10 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* COLUNA ESQUERDA */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  Nossa história & como funciona
                </p>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter uppercase">
                NOSSA{" "}
                <span className="text-brand-blue italic">HISTÓRIA</span>
                <span className="text-brand-blue">.</span>
              </h1>
              
              <p className="mt-5 text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-[48rem]">
                A L.A. Locadora nasceu para entregar uma experiência premium: simples,
                segura e com atendimento rápido. Aqui você entende como funciona a locação,
                sem burocracia — e resolve tudo com clareza.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={contatoHref}
                  className="inline-flex items-center gap-3 rounded-full bg-slate-900 text-white px-6 py-3
                             text-[11px] font-black uppercase tracking-[0.25em]
                             hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
                >
                  Ir para contato
                  <ArrowRight size={16} className="opacity-90" />
                </a>

                <a
                  href="/frota"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3
                             text-[11px] font-black uppercase tracking-[0.25em] text-slate-700
                             hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all"
                >
                  Ver frota <ChevronRight size={16} className="opacity-70" />
                </a>
              </div>
            </motion.div>

            {/* COLUNA DIREITA (stats / cards) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-[0_18px_60px_-55px_rgba(2,6,23,0.35)]">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                    Modelos
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                    20+
                  </p>
                  <p className="mt-2 text-slate-600 text-sm font-light leading-relaxed">
                    Catálogo atualizado com opções para diferentes perfis.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-[0_18px_60px_-55px_rgba(2,6,23,0.35)]">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                    Revisados
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                    100%
                  </p>
                  <p className="mt-2 text-slate-600 text-sm font-light leading-relaxed">
                    Checklist e entrega com padrão premium.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl bg-slate-900 text-white p-6 shadow-lg shadow-slate-900/10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-black">
                  Reserva rápida
                </p>
                <p className="mt-2 text-lg font-black">
                  Tudo resolvido pelo WhatsApp, sem burocracia.
                </p>
                <p className="mt-2 text-sm text-white/70 font-light leading-relaxed">
                  Você escolhe o carro e as datas — a gente confirma e orienta do início ao fim.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BLOCO INSTITUCIONAL (mais próximo do hero) */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
              Sobre a L.A. Locadora
            </span>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Locação premium para{" "}
              <span className="text-brand-blue italic">rodar em Maceió</span> com conforto.
            </h2>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg font-light">
              A L.A. Locadora foi criada para elevar o padrão de locação de veículos,
              com foco total em conforto, segurança e agilidade — do orçamento à devolução.
              Se você busca clareza e suporte, é aqui.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-brand-blue mt-0.5" size={18} />
                  <div>
                    <p className="font-black uppercase tracking-tight text-slate-900">
                      Atendimento claro
                    </p>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                      Você sabe tudo antes de confirmar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-brand-blue mt-0.5" size={18} />
                  <div>
                    <p className="font-black uppercase tracking-tight text-slate-900">
                      Padrão premium
                    </p>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                      Checklist e entrega cuidadosa no Galpão L.A.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IMAGEM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_30px_90px_-70px_rgba(2,6,23,0.45)] bg-white">
              <div className="relative h-[340px] md:h-[500px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80"
                  alt="L.A. Locadora Premium Service"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-7 bg-white">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                  Qualidade certificada
                </p>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  Frota revisada, entrega com checklist e suporte no período de locação.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIFERENCIAIS (mais próximo) */}
      <section className="py-12 md:py-16 border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#ffffff_100%)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
              O que você pode esperar
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">
              Transparência, agilidade e previsibilidade.
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed font-light">
              A ideia é você ter segurança do começo ao fim, sem surpresas e com atendimento
              que resolve.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {diferenciais.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border border-slate-200 p-7
                           shadow-[0_20px_70px_-55px_rgba(2,6,23,0.35)]
                           hover:border-brand-blue/35 transition-colors"
              >
                <item.icon size={18} className="text-brand-blue" />
                <h4 className="mt-4 text-lg font-black uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
            Como funciona
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Do contato à retirada: sem burocracia.
          </h3>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {passos.map((p) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-7"
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                  {p.step}
                </p>
                <h4 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                  {p.title}
                </h4>
                <p className="mt-3 text-slate-600 leading-relaxed font-light">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUISITOS */}
      <section className="py-12 md:py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
            Requisitos
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            O que você precisa para alugar.
          </h3>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {requisitos.map((r) => (
              <div
                key={r.label}
                className="rounded-3xl bg-white border border-slate-200 p-7 flex items-start gap-3
                           shadow-[0_20px_70px_-55px_rgba(2,6,23,0.25)]"
              >
                <r.icon className="text-brand-blue mt-1" size={18} />
                <p className="text-slate-700 leading-relaxed">{r.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-slate-500 text-sm leading-relaxed max-w-[980px] font-light">
            *Não exigimos cartão de crédito nem caução. Retirada e devolução no Galpão da L.A.
            Locadora, com condições informadas antes da confirmação.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
            Dúvidas frequentes
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Perguntas comuns.
          </h3>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {faq.map((item) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-7"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-black tracking-tight text-slate-900">
                      {item.q}
                    </h4>
                    <p className="mt-3 text-slate-600 leading-relaxed font-light">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA final */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                Pronto pra reservar?
              </p>
              <p className="mt-2 text-slate-600 leading-relaxed font-light">
                Clique e vá para a página de contato para solicitar sua reserva.
              </p>
            </div>

            <a
              href={contatoHref}
              className="inline-flex items-center gap-3 rounded-full bg-slate-900 text-white px-6 py-3
                         text-[11px] font-black uppercase tracking-[0.25em]
                         hover:bg-brand-blue hover:text-slate-900 transition-all shadow-lg shadow-slate-900/10"
            >
              Ir para contato
              <ArrowRight size={16} className="opacity-90" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
