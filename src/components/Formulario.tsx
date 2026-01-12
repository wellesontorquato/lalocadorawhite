"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function Formulario() {
  const router = useRouter();

  const [local, setLocal] = useState<string>("Obtendo sua localização...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [dataRetirada, setDataRetirada] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");

  // ===== Portal mount (evita erro SSR/hidratação)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ===== Modal aviso
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

  // ===== helpers de data (sem libs)
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const toISODate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  // evita bug de timezone (sempre meio-dia)
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

  // pula domingo automaticamente (domingo -> próxima data)
  const nextNonSundayISO = (iso: string) => {
    if (!iso) return iso;
    const d = parseISODate(iso);
    while (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return toISODate(d);
  };

  const hoje = useMemo(() => toISODate(new Date()), []);
  const minRetirada = useMemo(() => nextNonSundayISO(hoje), [hoje]);

  const minDevolucao = useMemo(() => {
    const base = dataRetirada ? nextNonSundayISO(dataRetirada) : minRetirada;
    let min = addDaysISO(base, 1);
    min = nextNonSundayISO(min);
    return min;
  }, [dataRetirada, minRetirada]);

  // ===== geolocalização
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocal("Geolocalização indisponível no navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setLocal(`Minha localização atual (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
      },
      () => {
        setLocal("Não foi possível obter sua localização. Digite manualmente.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }, []);

  // ===== handlers com domingo -> segunda + aviso modal
  const onChangeRetirada = (value: string) => {
    if (!value) {
      setDataRetirada("");
      setDataDevolucao("");
      return;
    }

    const retiradaValida = nextNonSundayISO(value);

    if (isSundayISO(value)) {
      openModal("Domingo é fechado. Ajustamos sua retirada automaticamente para a segunda-feira.");
    }

    setDataRetirada(retiradaValida);
    setDataDevolucao("");
  };

  const onChangeDevolucao = (value: string) => {
    if (!value) {
      setDataDevolucao("");
      return;
    }

    let devolucaoValida = nextNonSundayISO(value);

    if (isSundayISO(value)) {
      openModal("Domingo é fechado. Ajustamos sua devolução automaticamente para a segunda-feira.");
    }

    if (devolucaoValida < minDevolucao) {
      devolucaoValida = minDevolucao;
      openModal("Devolução ajustada para a primeira data disponível.");
    }

    setDataDevolucao(devolucaoValida);
  };

  // se devolução ficar inválida após trocar retirada
  useEffect(() => {
    if (!dataRetirada || !dataDevolucao) return;
    if (dataDevolucao < minDevolucao) setDataDevolucao("");
  }, [dataRetirada, dataDevolucao, minDevolucao]);

  const pronto = Boolean(local.trim() && dataRetirada && dataDevolucao);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  // ===== Modal via Portal (fora do Hero/overflow)
  const Modal = mounted && modalOpen
    ? createPortal(
        <div className="fixed inset-0 z-[9999] grid place-items-center px-6">
          <div
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white shadow-[0_40px_120px_-70px_rgba(2,6,23,0.8)] overflow-hidden animate-[fadeIn_.18s_ease-out]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-blue/15 border border-brand-blue/25">
                  <span className="h-2 w-2 rounded-full bg-brand-blue" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
                    Aviso
                  </p>
                  <p className="text-slate-900 font-black tracking-tight">
                    Ajuste automático de data
                  </p>
                </div>
              </div>

              <p className="mt-3 text-slate-600 leading-relaxed">{modalMsg}</p>

              <div className="mt-6 flex items-center justify-end gap-3">
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
          </div>

          {/* animação simples sem libs */}
          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px) scale(.99); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {Modal}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Local */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
            Local de Retirada
          </label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Qual sua localização?"
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 font-bold
                       placeholder:text-slate-300 outline-none focus:border-brand-blue/60
                       focus:ring-4 focus:ring-brand-blue/10 transition"
          />
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
              Data de Retirada
            </label>
            <input
              required
              type="date"
              min={minRetirada}
              value={dataRetirada}
              onChange={(e) => onChangeRetirada(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 font-bold
                         outline-none focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/10
                         transition [color-scheme:light]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-black">
              Data de Devolução
            </label>
            <input
              required
              type="date"
              min={minDevolucao}
              disabled={!dataRetirada}
              value={dataDevolucao}
              onChange={(e) => onChangeDevolucao(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 font-bold
                         outline-none focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/10
                         transition disabled:opacity-40 disabled:cursor-not-allowed [color-scheme:light]"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={!pronto}
          className="w-full rounded-full bg-brand-blue text-slate-900 px-10 py-4 font-black tracking-widest
                     hover:bg-slate-950 hover:text-white transition-all duration-300
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          PESQUISAR
        </button>

        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">
          Você será direcionado para o contato com as datas preenchidas.
        </p>
      </form>
    </>
  );
}
