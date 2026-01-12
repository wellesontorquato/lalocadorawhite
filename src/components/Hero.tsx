"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Clock,
  BadgeCheck,
  CreditCard,
  ChevronRight,
  MousePointer2,
} from "lucide-react";

type GeoStatus = "idle" | "loading" | "ok" | "error";

const CIDADES_ALAGOAS = [
  "Maceió - AL",
  "Arapiraca - AL",
  "Palmeira dos Índios - AL",
  "Rio Largo - AL",
  "Penedo - AL",
  "União dos Palmares - AL",
  "São Miguel dos Campos - AL",
  "Coruripe - AL",
  "Delmiro Gouveia - AL",
  "Campo Alegre - AL",
  "Santana do Ipanema - AL",
  "Marechal Deodoro - AL",
  "Atalaia - AL",
  "Murici - AL",
  "Teotônio Vilela - AL",
  "Porto Calvo - AL",
  "Girau do Ponciano - AL",
  "Batalha - AL",
  "Maragogi - AL",
  "Junqueiro - AL",
  "Pilar - AL",
  "São Luís do Quitunde - AL",
  "Capela - AL",
  "Pão de Açúcar - AL",
  "Igaci - AL",
  "Boca da Mata - AL",
  "Matriz de Camaragibe - AL",
  "Satuba - AL",
  "Paripueira - AL",
  "Barra de São Miguel - AL",
];

export default function Hero() {
  const router = useRouter();

  const [local, setLocal] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");

  const [dataRetirada, setDataRetirada] = useState<string>("");
  const [dataDevolucao, setDataDevolucao] = useState<string>("");

  // =========================
  // Modal (Portal) para avisos
  // =========================
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const openModal = (msg: string) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMsg("");
  };

  // fecha modal no ESC
  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const Modal =
    mounted && modalOpen
      ? createPortal(
          <div className="fixed inset-0 z-[9999] grid place-items-center px-6">
            <div
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white shadow-[0_40px_120px_-70px_rgba(2,6,23,0.8)] overflow-hidden"
            >
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                  Aviso
                </p>
                <p className="mt-2 text-slate-900 font-black text-lg">
                  Ajuste automático de data
                </p>
                <p className="mt-3 text-slate-600 leading-relaxed">{modalMsg}</p>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full bg-slate-900 text-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.25em]
                               hover:bg-brand-blue hover:text-slate-900 transition-all"
                  >
                    Entendi
                  </button>
                </div>
              </div>

              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
            </motion.div>
          </div>,
          document.body
        )
      : null;

  // =========================
  // Helpers de datas (sem libs)
  // =========================
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const toISODate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  const parseISODate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  };

  const addDaysISO = (iso: string, days: number) => {
    const d = parseISODate(iso);
    d.setDate(d.getDate() + days);
    return toISODate(d);
  };

  const isSundayISO = (iso: string) => {
    if (!iso) return false;
    return parseISODate(iso).getDay() === 0;
  };

  const nextNonSundayISO = (iso: string) => {
    if (!iso) return iso;
    const d = parseISODate(iso);
    while (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return toISODate(d);
  };

  const hoje = useMemo(() => toISODate(new Date()), []);
  const minDataRetirada = useMemo(() => nextNonSundayISO(hoje), [hoje]);

  const minDataDevolucao = useMemo(() => {
    const base = dataRetirada ? nextNonSundayISO(dataRetirada) : minDataRetirada;
    let min = addDaysISO(base, 1);
    min = nextNonSundayISO(min);
    return min;
  }, [dataRetirada, minDataRetirada]);

  // =========================
  // Reverse geocode -> Cidade/UF
  // =========================
  const reverseToCityUF = async (lat: number, lng: number) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);

    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`;
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) return "";

      const data: any = await res.json();

      const city =
        data.city ||
        data.locality ||
        data.principalSubdivisionCity ||
        data.localityInfo?.administrative?.[0]?.name ||
        "";

      const uf =
        data.principalSubdivisionCode ||
        (typeof data.principalSubdivision === "string"
          ? data.principalSubdivision
          : "");

      if (city && uf && uf.length <= 3) return `${city} - ${uf}`;
      if (city && uf) return `${city}, ${uf}`;
      if (city) return city;

      return "";
    } catch {
      return "";
    } finally {
      clearTimeout(t);
    }
  };

  // =========================
  // Geolocalização + cidade
  // =========================
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
      setLocal("");
      return;
    }

    setGeoStatus("loading");
    setLocal("Obtendo sua localização...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });

        const cityUF = await reverseToCityUF(lat, lng);

        if (cityUF) setLocal(cityUF);
        else setLocal("Maceió - AL");

        setGeoStatus("ok");
      },
      () => {
        // usuário bloqueou / negou permissão
        setGeoStatus("error");
        setCoords(null);
        setLocal("");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // Handlers de datas (domingo -> segunda) + AVISO (MODAL)
  // =========================
  const onChangeRetirada = (value: string) => {
    if (!value) {
      setDataRetirada("");
      setDataDevolucao("");
      return;
    }

    // AVISA PELO VALOR ORIGINAL
    if (isSundayISO(value)) {
      openModal(
        "Domingo é fechado. Ajustamos sua retirada automaticamente para a segunda-feira."
      );
    }

    const retiradaValida = nextNonSundayISO(value);
    setDataRetirada(retiradaValida);
    setDataDevolucao("");
  };

  const onChangeDevolucao = (value: string) => {
    if (!value) {
      setDataDevolucao("");
      return;
    }

    let devolucaoValida = nextNonSundayISO(value);

    // AVISA PELO VALOR ORIGINAL
    if (isSundayISO(value)) {
      openModal(
        "Domingo é fechado. Ajustamos sua devolução automaticamente para a segunda-feira."
      );
    }

    if (devolucaoValida < minDataDevolucao) {
      devolucaoValida = minDataDevolucao;
      openModal("Devolução ajustada para a primeira data disponível.");
    }

    setDataDevolucao(devolucaoValida);
  };

  useEffect(() => {
    if (!dataRetirada || !dataDevolucao) return;
    if (dataDevolucao < minDataDevolucao) setDataDevolucao("");
  }, [dataRetirada, dataDevolucao, minDataDevolucao]);

  const pronto = Boolean(local.trim() && dataRetirada && dataDevolucao);

  const onPesquisar = () => {
    if (!pronto) return;

    const params = new URLSearchParams({
      local: local.trim(),
      retirada: dataRetirada,
      devolucao: dataDevolucao,
    });

    if (coords) {
      params.set("lat", String(coords.lat));
      params.set("lng", String(coords.lng));
    }

    router.push(`/contato?${params.toString()}`);
  };

  const localPlaceholder =
    geoStatus === "loading"
      ? "Obtendo sua localização..."
      : geoStatus === "error"
      ? "Selecione sua cidade (AL)"
      : "Qual sua localização?";

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden">
      {Modal}

      {/* Imagem de fundo com Overlay Premium */}
      <div className="absolute inset-0 z-0">
        <img
          src="onix.png"
          alt="L.A. Locadora"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full py-20">
        <div className="max-w-4xl">
          {/* Badge Superior */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-black uppercase">
              Premium Experience
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-black uppercase text-white text-6xl md:text-[7rem] lg:text-[8.5rem] leading-[0.8] tracking-tighter italic"
          >
            L.A. <span className="text-brand-blue block">LOCADORA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8 text-slate-300 text-lg md:text-2xl max-w-2xl leading-relaxed font-light"
          >
            A liberdade de dirigir os modelos mais modernos com um serviço exclusivo
            feito para quem não abre mão do conforto.
          </motion.p>

          {/* Chamadas de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-5"
          >
            <a
              href="/frota"
              className="group bg-brand-blue text-slate-900 px-10 py-5 rounded-full font-black text-sm tracking-widest flex items-center gap-3 hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(0,183,255,0.3)]"
            >
              EXPLORAR FROTA
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/contato"
              className="border-2 border-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-black text-sm tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500"
            >
              RESERVAR AGORA
            </a>
          </motion.div>
        </div>

        {/* BARRA DE BUSCA (BOOKING) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 bg-white/95 backdrop-blur-2xl p-3 rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-6xl border border-white/20"
        >
          {/* Local */}
          <div className="flex-1 flex items-center gap-4 px-8 py-4 w-full border-b md:border-b-0 md:border-r border-slate-200">
            <MapPin size={24} className="text-brand-blue shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">
                Seu local
              </label>

              {/* Se geolocalização falhar => dropdown AL */}
              {geoStatus === "error" ? (
                <select
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  className="text-slate-900 font-bold focus:outline-none bg-transparent w-full min-w-0 cursor-pointer"
                >
                  <option value="">{localPlaceholder}</option>
                  {CIDADES_ALAGOAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder={localPlaceholder}
                  className="text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none bg-transparent w-full min-w-0"
                />
              )}
            </div>
          </div>

          {/* Retirada */}
          <div className="flex-1 flex items-center gap-4 px-8 py-4 w-full border-b md:border-b-0 md:border-r border-slate-200">
            <Calendar size={24} className="text-brand-blue shrink-0" />
            <div className="flex flex-col min-w-0">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">
                Data de Retirada
              </label>
              <input
                type="date"
                min={minDataRetirada}
                value={dataRetirada}
                onChange={(e) => onChangeRetirada(e.target.value)}
                className="text-slate-900 font-bold focus:outline-none bg-transparent w-full [color-scheme:light]"
              />
            </div>
          </div>

          {/* Devolução */}
          <div className="flex-1 flex items-center gap-4 px-8 py-4 w-full border-b md:border-b-0 md:border-r border-slate-200">
            <Calendar size={24} className="text-brand-blue shrink-0" />
            <div className="flex flex-col min-w-0">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">
                Data de Devolução
              </label>
              <input
                type="date"
                min={minDataDevolucao}
                value={dataDevolucao}
                disabled={!dataRetirada}
                onChange={(e) => onChangeDevolucao(e.target.value)}
                className="text-slate-900 font-bold focus:outline-none bg-transparent w-full disabled:opacity-40 disabled:cursor-not-allowed [color-scheme:light]"
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={onPesquisar}
            disabled={!pronto}
            className="w-full md:w-auto bg-brand-blue text-slate-900 px-12 py-5 rounded-xl md:rounded-full font-black tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-300 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
          >
            PESQUISAR
          </button>
        </motion.div>

        {/* VANTAGENS INFERIORES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50"
        >
          {[
            { icon: ShieldCheck, label: "Seguro Premium" },
            { icon: BadgeCheck, label: "Frota 2024/25" },
            { icon: Clock, label: "Suporte VIP 24h" },
            { icon: CreditCard, label: "Parcelamento" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <item.icon size={20} className="text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-blue to-transparent" />
        <MousePointer2 size={16} className="text-brand-blue/50" />
      </motion.div>
    </section>
  );
}
  