"use client";

import Navbar from "@/components/Navbar";
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
} from "lucide-react";

export default function PaginaEmpresa() {
  const WHATS_NUMBER = "5582996906585"; // só dígitos
  const WHATS_MESSAGE = encodeURIComponent(
    "Olá! Quero alugar um carro em Maceió e solicitar uma reserva com a L.A. Locadora. Pode me ajudar?"
  );

  const diferenciais = [
    {
      icon: ShieldCheck,
      title: "Seguro e assistência 24h",
      desc: "No aluguel de carro em Maceió, todos os veículos contam com seguro e assistência 24 horas para você rodar com tranquilidade do início ao fim.",
    },
    {
      icon: CreditCard,
      title: "Sem caução ou cartão",
      desc: "Você não precisa de cartão de crédito nem caução para alugar. Mais praticidade e menos burocracia para reservar seu carro em Maceió.",
    },
    {
      icon: Clock,
      title: "Atendimento ágil",
      desc: "Orçamento e confirmação rápidos, direto pelo WhatsApp — ideal pra quem quer resolver o aluguel de carro em Maceió sem perder tempo.",
    },
    {
      icon: MapPin,
      title: "Retirada no Galpão L.A.",
      desc: "Retirada e devolução no Galpão da L.A. Locadora em Maceió, com horário combinado e checklist na entrega.",
    },
  ];

  const passos = [
    {
      step: "01",
      title: "Escolha o veículo e as datas",
      desc: "Você seleciona o carro, a data de retirada e devolução. A gente confirma disponibilidade para seu aluguel de carro em Maceió.",
    },
    {
      step: "02",
      title: "Confirmação pelo WhatsApp",
      desc: "Sem formulários longos. Você fala direto com a equipe, tira dúvidas e confirma sua locação com agilidade.",
    },
    {
      step: "03",
      title: "Retirada no Galpão L.A.",
      desc: "O veículo é retirado no Galpão da L.A. Locadora em Maceió, com checklist, orientações e transparência.",
    },
    {
      step: "04",
      title: "Uso com seguro e assistência 24h",
      desc: "Durante toda a locação, você conta com suporte 24h para rodar em Maceió e região com mais segurança.",
    },
  ];

  const requisitos = [
    { icon: FileText, label: "CNH válida (categoria B)" },
    { icon: Car, label: "Idade mínima conforme categoria do veículo" },
    { icon: ShieldCheck, label: "Seguro e assistência 24h inclusos na locação" },
  ];

  const faq = [
    {
      q: "Preciso de cartão de crédito ou caução?",
      a: "Não. A L.A. Locadora não exige cartão de crédito nem caução para realizar o aluguel de carro em Maceió.",
    },
    {
      q: "Onde faço a retirada e devolução do veículo?",
      a: "A retirada e a devolução são feitas no Galpão da L.A. Locadora, em Maceió, em horário combinado com antecedência.",
    },
    {
      q: "O carro tem seguro?",
      a: "Sim. Todos os veículos contam com seguro e assistência 24 horas durante o período de locação.",
    },
    {
      q: "O que está incluso na diária?",
      a: "A diária inclui o uso do veículo no período contratado e os itens acordados no plano escolhido. Tudo é informado antes da confirmação.",
    },
    {
      q: "Posso alterar datas depois de reservar?",
      a: "Sempre que houver disponibilidade, sim. Alterações podem impactar o valor final do seu aluguel de carro em Maceió.",
    },
  ];

  return (
    <main className="bg-brand-dark min-h-screen overflow-x-hidden text-white font-display">
      <Navbar />

      {/* Offset fixo do navbar */}
      <div className="h-24 md:h-28" />

      {/* HERO / CABEÇALHO DA PÁGINA */}
      <section className="px-6 md:px-12 pb-10 md:pb-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black leading-none tracking-[-0.06em] uppercase"
          >
            NOSSA <span className="text-brand-blue italic text-stroke">HISTÓRIA.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-5 max-w-[920px] text-gray-400 leading-relaxed text-lg md:text-xl"
          >
            A L.A. Locadora nasceu para entregar uma experiência premium de{" "}
            <strong className="text-gray-200">aluguel de carro em Maceió</strong>: simples, segura e com atendimento rápido.
            Aqui você entende como funciona a locação, sem burocracia — e resolve tudo com clareza pelo WhatsApp.
          </motion.p>

          {/* CTA topo */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            href={`https://wa.me/${WHATS_NUMBER}?text=${WHATS_MESSAGE}`}
            className="mt-7 inline-flex items-center gap-3 border border-white/15 hover:border-brand-blue/60 bg-white/5 hover:bg-brand-blue/10 px-5 py-3 transition-all duration-500"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] font-black">Falar no WhatsApp</span>
            <ArrowRight size={16} className="opacity-80" />
          </motion.a>
        </div>
      </section>

      {/* CONTEÚDO INSTITUCIONAL */}
      <section className="section-pad border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue text-[10px] uppercase tracking-[0.35em] font-black block mb-5">
              Sobre a L.A. Locadora
            </span>

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
              Locação premium para{" "}
              <span className="text-brand-blue italic">rodar em Maceió</span> com conforto.
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              A L.A. Locadora foi criada para elevar o padrão de locação de veículos,
              oferecendo uma experiência premium, sem burocracia e com foco total em
              conforto, segurança e agilidade — do orçamento à devolução. Se você busca{" "}
              <strong className="text-gray-200">aluguel de carro em Maceió</strong> com clareza e suporte, é aqui.
            </p>

            {/* pontos rápidos (sem inventar número) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-brand-blue mt-1" size={18} />
                <div>
                  <p className="font-black uppercase tracking-tight">Atendimento claro</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Você sabe tudo antes de confirmar o aluguel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="text-brand-blue mt-1" size={18} />
                <div>
                  <p className="font-black uppercase tracking-tight">Padrão premium</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Checklist e entrega cuidadosa no Galpão L.A.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IMAGEM / VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[360px] md:h-[520px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80"
                alt="Aluguel de carro em Maceió - L.A. Locadora"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="section-pad border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-blue text-[10px] uppercase tracking-[0.35em] font-black block mb-5">
              O que você pode esperar
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">
              O que quem busca aluguel de carro em Maceió gosta de saber.
            </h3>
            <p className="mt-4 text-gray-400 max-w-[920px] leading-relaxed">
              Transparência, agilidade e previsibilidade. A ideia é você ter segurança do começo ao fim,
              sem surpresas e com atendimento que resolve.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {diferenciais.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-white/10 bg-white/5 p-6 hover:border-brand-blue/40 transition-colors duration-500"
              >
                <item.icon size={18} className="text-brand-blue" />
                <h4 className="mt-4 text-lg font-black uppercase tracking-tight">{item.title}</h4>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section-pad border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-brand-blue text-[10px] uppercase tracking-[0.35em] font-black block mb-5">
            Como funciona
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Do WhatsApp à retirada: aluguel de carro em Maceió sem burocracia.
          </h3>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {passos.map((p) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">
                    {p.step}
                  </p>
                </div>
                <h4 className="mt-3 text-2xl font-black tracking-tight">{p.title}</h4>
                <p className="mt-3 text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUISITOS */}
      <section className="section-pad border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-brand-blue text-[10px] uppercase tracking-[0.35em] font-black block mb-5">
            Requisitos
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            O que você precisa pra alugar em Maceió.
          </h3>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {requisitos.map((r) => (
              <div
                key={r.label}
                className="border border-white/10 bg-white/5 p-6 flex items-start gap-3"
              >
                <r.icon className="text-brand-blue mt-1" size={18} />
                <p className="text-gray-300 leading-relaxed">{r.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-gray-500 text-sm leading-relaxed max-w-[980px]">
            *Não exigimos cartão de crédito nem caução. Retirada e devolução no Galpão da L.A. Locadora (Maceió),
            com condições informadas antes da confirmação.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-brand-blue text-[10px] uppercase tracking-[0.35em] font-black block mb-5">
            Dúvidas frequentes
          </span>

          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Perguntas sobre aluguel de carro em Maceió.
          </h3>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {faq.map((item) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-black tracking-tight">{item.q}</h4>
                    <p className="mt-3 text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA final */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-white/10 bg-white/5 p-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500 font-black">
                Pronto pra reservar?
              </p>
              <p className="mt-2 text-gray-300 leading-relaxed">
                Chama no WhatsApp e a gente confirma disponibilidade e valores do seu aluguel de carro em Maceió.
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATS_NUMBER}?text=${WHATS_MESSAGE}`}
              className="inline-flex items-center gap-3 border border-white/15 hover:border-brand-blue/60 bg-brand-blue/10 hover:bg-brand-blue/20 px-5 py-3 transition-all duration-500"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-black">
                Solicitar no WhatsApp
              </span>
              <ArrowRight size={16} className="opacity-80" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
