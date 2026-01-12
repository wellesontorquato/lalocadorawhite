"use client";

import React from "react";
import NavbarPages from "@/components/NavbarPages";
import Footer from "@/components/Footer";
import Formulario from "@/components/FormularioContato";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

type InfoItem = {
  icon: React.ElementType;
  label: string;
  valor: string;
  href?: string;
  external?: boolean;
  variant?: "default" | "email";
};

export default function PaginaContato() {
  const endereco = "R. Dezoito, 04 - Antares, Maceió - AL, 57084-018";

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    endereco
  )}`;

  const infoContato: InfoItem[] = [
    {
      icon: Phone,
      label: "TELEFONE",
      valor: "(82) 99690-6585",
      href: "tel:+5582996906585",
    },
    {
      icon: Mail,
      label: "E-MAIL",
      valor: "contato@lalocadora.com",
      href: "mailto:contato@lalocadora.com",
      variant: "email",
    },
    {
      icon: MapPin,
      label: "ENDEREÇO",
      valor: "R. Dezoito, 04 - Antares",
      href: mapsLink,
      external: true,
    },
    {
      icon: Clock,
      label: "HORÁRIO",
      valor: "SEG-SEX: 08-12H / 14-18H | SÁB: 08-12H",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-display overflow-x-hidden">
      <NavbarPages />

      {/* HERO / CABEÇALHO */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/70">
        {/* decoração leve */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute top-0 right-0 h-full w-[40%] bg-gradient-to-l from-brand-blue/5 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[140px] w-[65%] bg-gradient-to-r from-white/70 to-transparent" />
        </div>

        {/* offset navbar fixo */}
        <div className="h-28 md:h-32" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-10 md:pb-12">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Contato & Reservas
              </p>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase">
              FALE <span className="text-brand-blue italic">CONOSCO</span>
              <span className="text-brand-blue">.</span>
            </h1>

            <p className="mt-6 text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl">
              Faça sua reserva em minutos. Selecione o veículo, datas e plano — e finalize
              pelo WhatsApp com nossa equipe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="py-12 md:py-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* LADO ESQUERDO – INFORMAÇÕES + MAPA */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Cards de info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoContato.map((item, i) => {
                const Wrapper: any = item.href ? "a" : "div";
                const isEmail = item.variant === "email";

                return (
                  <Wrapper
                    key={i}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`group rounded-3xl border border-slate-200 bg-white p-6
                      shadow-[0_20px_70px_-55px_rgba(2,6,23,0.25)]
                      transition-all
                      min-w-0 overflow-hidden
                      ${item.href ? "hover:border-brand-blue/35 hover:-translate-y-0.5" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-3 min-w-0">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-blue/10 border border-brand-blue/20 shrink-0">
                        <item.icon size={16} className="text-brand-blue" />
                      </span>
                      <span className="text-[10px] font-black tracking-[0.35em] uppercase text-slate-400 truncate">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 min-w-0">
                      {/* FIX definitivo do email: min-w-0 + truncate */}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-slate-900 font-black uppercase leading-snug
                            ${isEmail ? "text-sm md:text-base tracking-tight" : "text-base md:text-lg tracking-tight"}
                          `}
                        >
                          {isEmail ? (
                            <span className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.valor}
                            </span>
                          ) : (
                            <span className="block break-words">{item.valor}</span>
                          )}
                        </div>

                        {isEmail && (
                          <div className="mt-3 text-[10px] uppercase tracking-[0.25em] font-black text-slate-400">
                            toque para enviar e-mail
                          </div>
                        )}
                      </div>

                      {item.href && (
                        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50
                                        group-hover:border-brand-blue/40 group-hover:bg-brand-blue/10 transition shrink-0">
                          <ArrowUpRight
                            size={16}
                            className="text-slate-600 group-hover:text-brand-blue transition"
                          />
                        </span>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>


            {/* Mapa */}
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">
                Nossa localização
              </span>

              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-[0_30px_90px_-70px_rgba(2,6,23,0.35)]">
                <div className="relative h-[320px] md:h-[380px] bg-slate-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.456!2d-35.7!3d-9.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDAuMCJTIDM1wrA0MicwMC4wIlc!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-700"
                  />
                </div>

                <div className="p-5 md:p-6 border-t border-slate-200 bg-white">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                    Endereço
                  </p>
                  <p className="mt-2 text-slate-700 leading-relaxed">{endereco}</p>

                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5
                               text-[11px] font-black uppercase tracking-[0.25em] text-slate-700
                               hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue transition"
                  >
                    Abrir no Google Maps <ArrowUpRight size={16} className="opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LADO DIREITO – FORMULÁRIO */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Formulario />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
