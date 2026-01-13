"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FROTA } from "@/constants/carros";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

type UploadResult = { url: string; key: string };

export default function FormularioContato() {
  const searchParams = useSearchParams();

  const CONTACT = {
    phoneE164Digits: "5582996906585",
  } as const;

  const [form, setForm] = useState({
    nome: "",
    carro: "",
    dataRetirada: "",
    dataDevolucao: "",
    quilometragem: "300km",
  });

  // arquivos CPF/CNH
  const [cpfFile, setCpfFile] = useState<File | null>(null);
  const [cnhFile, setCnhFile] = useState<File | null>(null);

  const [total, setTotal] = useState<number | null>(null);
  const [avisoData, setAvisoData] = useState<string>("");

  // estados de envio
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string>("");

  // Prefill vindo do Hero (/contato?local&retirada&devolucao&lat&lng)
  const [prefillLocal, setPrefillLocal] = useState<string>("");
  const [prefillCoords, setPrefillCoords] = useState<{ lat?: string; lng?: string }>(
    {}
  );

  // =========================
  // Helpers de datas (sem libs)
  // =========================
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const toISODate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  const formatBR = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

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
    if (!form.dataRetirada) return addDaysISO(minDataRetirada, 1);
    const retiradaValida = nextNonSundayISO(form.dataRetirada);
    let min = addDaysISO(retiradaValida, 1);
    min = nextNonSundayISO(min);
    return min;
  }, [form.dataRetirada, minDataRetirada]);

  // =========================
  // Prefill vindo do Hero (querystring)
  // =========================
  useEffect(() => {
    const local = searchParams.get("local") || "";
    const retirada = searchParams.get("retirada") || "";
    const devolucao = searchParams.get("devolucao") || "";
    const lat = searchParams.get("lat") || "";
    const lng = searchParams.get("lng") || "";

    if (local) setPrefillLocal(local);
    if (lat || lng) setPrefillCoords({ lat, lng });

    if (retirada) {
      const retiradaValida = nextNonSundayISO(retirada);

      setForm((prev) => ({
        ...prev,
        dataRetirada: retiradaValida,
        dataDevolucao: "",
      }));

      if (devolucao) {
        let min = addDaysISO(retiradaValida, 1);
        min = nextNonSundayISO(min);

        let devolucaoValida = nextNonSundayISO(devolucao);
        if (devolucaoValida < min) devolucaoValida = min;

        setForm((prev) => ({
          ...prev,
          dataRetirada: retiradaValida,
          dataDevolucao: devolucaoValida,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // =========================
  // Remove domingo automaticamente
  // =========================
  const onChangeRetirada = (value: string) => {
    setAvisoData("");
    setSendError("");

    if (!value) {
      setForm((prev) => ({ ...prev, dataRetirada: "", dataDevolucao: "" }));
      return;
    }

    const retiradaValida = nextNonSundayISO(value);

    if (isSundayISO(value)) {
      setAvisoData("Domingo é fechado. Ajustamos sua retirada para a segunda-feira.");
    }

    setForm((prev) => ({
      ...prev,
      dataRetirada: retiradaValida,
      dataDevolucao: "",
    }));
  };

  const onChangeDevolucao = (value: string) => {
    setAvisoData("");
    setSendError("");

    if (!value) {
      setForm((prev) => ({ ...prev, dataDevolucao: "" }));
      return;
    }

    let devolucaoValida = nextNonSundayISO(value);

    if (isSundayISO(value)) {
      setAvisoData("Domingo é fechado. Ajustamos sua devolução para a segunda-feira.");
    }

    if (devolucaoValida < minDataDevolucao) {
      setAvisoData("Devolução ajustada para a primeira data disponível.");
      devolucaoValida = minDataDevolucao;
    }

    setForm((prev) => ({ ...prev, dataDevolucao: devolucaoValida }));
  };

  useEffect(() => {
    if (!avisoData) return;
    const t = setTimeout(() => setAvisoData(""), 3500);
    return () => clearTimeout(t);
  }, [avisoData]);

  // =========================
  // Cálculo
  // =========================
  useEffect(() => {
    if (form.carro && form.dataRetirada && form.dataDevolucao) {
      const carroSelecionado = FROTA.find((c) => c.nome === form.carro);
      if (!carroSelecionado) return setTotal(null);

      const dataInicio = parseISODate(form.dataRetirada);
      const dataFim = parseISODate(form.dataDevolucao);

      const diffInMs = dataFim.getTime() - dataInicio.getTime();
      const diffDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        const diariaAplicada =
          form.quilometragem === "Km Livre"
            ? carroSelecionado.precoKmLivre
            : carroSelecionado.preco300km;

        const valorFinal = diffDays * diariaAplicada + 50;
        setTotal(valorFinal);
      } else {
        setTotal(null);
      }
    } else {
      setTotal(null);
    }
  }, [form, minDataDevolucao, minDataRetirada]);

  // ✅ obrigatório de verdade: pronto só fica true se cpf/cnh existirem
  const pronto = Boolean(
    form.nome.trim() &&
      form.carro &&
      form.dataRetirada &&
      form.dataDevolucao &&
      total !== null &&
      cpfFile &&
      cnhFile
  );

  // =========================
  // Upload helpers
  // =========================
  const allowedTypes = new Set(["image/png", "image/jpeg", "application/pdf"]);

  const validateFile = (file: File | null, label: string) => {
    if (!file) return `${label} é obrigatório.`;
    if (!allowedTypes.has(file.type)) {
      return `${label}: formato inválido. Envie PNG, JPG, JPEG ou PDF.`;
    }
    const maxMB = 8;
    const maxBytes = maxMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `${label}: arquivo muito grande (máx. ${maxMB}MB).`;
    }
    return "";
  };

  const uploadOne = async (file: File, docType: "cpf" | "cnh") => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("docType", docType);

    fd.append("nome", form.nome || "");
    fd.append("carro", form.carro || "");
    fd.append("retirada", form.dataRetirada || "");
    fd.append("devolucao", form.dataDevolucao || "");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg = data?.error || "Falha ao enviar arquivo. Tente novamente.";
      throw new Error(msg);
    }

    return data as UploadResult;
  };

  // =========================
  // Submit -> WhatsApp
  // =========================
  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur?.();
    setSendError("");

    if (!pronto || total === null || !cpfFile || !cnhFile) return;

    const errCpf = validateFile(cpfFile, "CPF");
    const errCnh = validateFile(cnhFile, "CNH");
    const err = errCpf || errCnh;
    if (err) {
      setSendError(err);
      return;
    }

    try {
      setSending(true);

      const [cpfUp, cnhUp] = await Promise.all([
        uploadOne(cpfFile, "cpf"),
        uploadOne(cnhFile, "cnh"),
      ]);

      const msg = [
        `Olá! Quero solicitar uma reserva na LA Locadora.`,
        ``,
        `Nome: ${form.nome}`,
        prefillLocal ? `Local: ${prefillLocal}` : null,
        prefillCoords?.lat || prefillCoords?.lng
          ? `Coords: ${prefillCoords.lat || ""}${prefillCoords.lat && prefillCoords.lng ? ", " : ""}${prefillCoords.lng || ""}`
          : null,
        `Carro: ${form.carro}`,
        `Retirada: ${formatBR(form.dataRetirada)}`,
        `Devolução: ${formatBR(form.dataDevolucao)}`,
        `Quilometragem: ${form.quilometragem}`,
        `Estimativa (c/ lavagem): R$ ${total.toLocaleString("pt-BR")}`,
        ``,
        `Documentos (links):`,
        `CPF: ${cpfUp.url}`,
        `CNH: ${cnhUp.url}`,
      ]
        .filter(Boolean)
        .join("\n");

      const url = `https://wa.me/${CONTACT.phoneE164Digits}?text=${encodeURIComponent(
        msg
      )}`;

      window.location.href = url;
    } catch (err: any) {
      setSendError(err?.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="font-display">
      <div className="rounded-3xl border border-slate-300/70 bg-white shadow-[0_35px_110px_-85px_rgba(2,6,23,0.55)] overflow-hidden">
        {/* HEADER DO FORM */}
        <div className="relative border-b border-slate-200 bg-slate-100 px-6 md:px-10 py-8 md:py-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-20 h-[280px] w-[280px] rounded-full bg-brand-blue/15 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[140px] w-[75%] bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-10 bg-brand-blue rounded-full" />
              <span className="text-slate-600 font-black text-[10px] uppercase tracking-[0.4em]">
                Reserva & Orçamento
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase text-slate-950">
                  Vamos <span className="text-brand-blue italic">reservar</span>
                  <span className="text-brand-blue">.</span>
                </h2>

                <p className="mt-4 text-slate-700 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                  Escolha o veículo, as datas e o plano de quilometragem. A gente calcula a
                  estimativa e você finaliza pelo WhatsApp.
                </p>

                <AnimatePresence>
                  {(form.dataRetirada || form.dataDevolucao || prefillLocal) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35 }}
                      className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-slate-300/60 bg-white/85 px-4 py-3 text-[10px]
                                 uppercase tracking-[0.25em] font-black text-slate-700 shadow-sm"
                    >
                      {prefillLocal && (
                        <span className="rounded-full bg-slate-900/10 px-3 py-1 text-slate-800">
                          local: {prefillLocal}
                        </span>
                      )}
                      {form.dataRetirada && (
                        <span className="rounded-full bg-brand-blue/15 text-slate-900 px-3 py-1">
                          retirada: {formatBR(form.dataRetirada)}
                        </span>
                      )}
                      {form.dataDevolucao && (
                        <span className="rounded-full bg-brand-blue/15 text-slate-900 px-3 py-1">
                          devolução: {formatBR(form.dataDevolucao)}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {total !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-slate-300/60 bg-white px-6 py-5 shadow-[0_22px_70px_-55px_rgba(2,6,23,0.45)]"
                  >
                    <div className="flex items-center gap-2 mb-2 text-slate-900">
                      <Calculator size={14} className="text-brand-blue" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                        Estimativa (c/ lavagem)
                      </span>
                    </div>

                    <div className="text-4xl font-black tracking-tight text-slate-950">
                      R$ {total.toLocaleString("pt-BR")}
                    </div>

                    <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-bold">
                      Taxa de lavagem inclusa
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {avisoData && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 rounded-2xl border border-amber-300/70 bg-amber-50 px-5 py-4 text-[11px]
                             uppercase tracking-[0.25em] font-black text-amber-900"
                >
                  {avisoData}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="px-6 md:px-10 py-8 md:py-10 bg-white">
          <form
            onSubmit={enviarFormulario}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* 01 Nome */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                01. Nome
              </label>
              <input
                required
                type="text"
                placeholder="Digite seu nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-950 font-black uppercase outline-none
                           placeholder:text-slate-500/70
                           focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/15 transition"
              />
            </div>

            {/* 02 Veículo */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                02. Veículo
              </label>
              <select
                required
                value={form.carro}
                onChange={(e) => setForm({ ...form, carro: e.target.value })}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-950 font-black uppercase outline-none cursor-pointer
                           focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/15 transition"
              >
                <option value="">Selecionar</option>
                {FROTA.map((c) => (
                  <option key={c.id} value={c.nome}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* 03 Retirada */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                03. Retirada
              </label>
              <input
                required
                type="date"
                min={minDataRetirada}
                value={form.dataRetirada}
                onChange={(e) => onChangeRetirada(e.target.value)}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-950 font-black uppercase outline-none [color-scheme:light]
                           focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/15 transition"
              />
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                Domingos não aparecem como opção.
              </p>
            </div>

            {/* 04 Devolução */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                04. Devolução
              </label>
              <input
                required
                type="date"
                min={minDataDevolucao}
                value={form.dataDevolucao}
                disabled={!form.dataRetirada}
                onChange={(e) => onChangeDevolucao(e.target.value)}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-950 font-black uppercase outline-none [color-scheme:light]
                           disabled:opacity-40 disabled:cursor-not-allowed
                           focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/15 transition"
              />
              {form.dataRetirada ? (
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                  mínima: {formatBR(minDataDevolucao)}
                </p>
              ) : (
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                  Selecione a retirada primeiro.
                </p>
              )}
            </div>

            {/* 05 CPF (upload) - AGORA ANTES DA QUILOMETRAGEM */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                05. CPF (PNG/JPG/PDF)
              </label>

              <input
                required
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => {
                  setSendError("");
                  const f = e.target.files?.[0] || null;
                  setCpfFile(f);
                }}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-900 font-bold outline-none
                           file:mr-4 file:rounded-full file:border-0
                           file:bg-slate-950 file:px-4 file:py-2 file:text-[10px]
                           file:font-black file:uppercase file:tracking-[0.25em] file:text-white
                           hover:file:bg-brand-blue hover:file:text-slate-950 transition"
              />
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                {cpfFile ? `Selecionado: ${cpfFile.name}` : "Envie foto ou PDF do CPF."}
              </p>
            </div>

            {/* 06 CNH (upload) - AGORA ANTES DA QUILOMETRAGEM */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                06. CNH (PNG/JPG/PDF)
              </label>

              <input
                required
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => {
                  setSendError("");
                  const f = e.target.files?.[0] || null;
                  setCnhFile(f);
                }}
                className="w-full rounded-2xl border border-slate-300/70 bg-slate-100 px-4 py-4
                           text-slate-900 font-bold outline-none
                           file:mr-4 file:rounded-full file:border-0
                           file:bg-slate-950 file:px-4 file:py-2 file:text-[10px]
                           file:font-black file:uppercase file:tracking-[0.25em] file:text-white
                           hover:file:bg-brand-blue hover:file:text-slate-950 transition"
              />
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                {cnhFile ? `Selecionado: ${cnhFile.name}` : "Envie foto ou PDF da CNH."}
              </p>
            </div>

            {/* 07 Quilometragem (AGORA DEPOIS DOS DOCUMENTOS) */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] uppercase tracking-[0.35em] text-slate-600 font-black">
                07. Quilometragem
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["300km", "Km Livre"].map((km) => {
                  const active = form.quilometragem === km;
                  return (
                    <label
                      key={km}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 cursor-pointer transition
                        ${
                          active
                            ? "border-brand-blue/60 bg-brand-blue/15"
                            : "border-slate-300/70 bg-slate-100 hover:border-brand-blue/50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="km_contato"
                          value={km}
                          checked={active}
                          onChange={(e) =>
                            setForm({ ...form, quilometragem: e.target.value })
                          }
                          className="accent-brand-blue"
                        />
                        <span
                          className={`text-sm md:text-base font-black uppercase tracking-widest ${
                            active ? "text-slate-950" : "text-slate-800"
                          }`}
                        >
                          {km}
                        </span>
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-600">
                        plano
                      </span>
                    </label>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-700 font-normal leading-relaxed">
                *A estimativa considera o número de diárias + taxa de lavagem (R$ 50).
              </p>
            </div>

            {/* Erro de envio */}
            <AnimatePresence>
              {sendError && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="md:col-span-2 rounded-2xl border border-red-300/70 bg-red-50 px-5 py-4 text-[11px]
                             uppercase tracking-[0.25em] font-black text-red-900"
                >
                  {sendError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="text-slate-700 text-sm font-normal">
                Ao enviar, vamos subir seus documentos e abrir o WhatsApp com os links.
              </div>

              <button
                type="submit"
                disabled={!pronto || sending}
                className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4
                           bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.25em]
                           hover:bg-brand-blue hover:text-slate-950 transition-all
                           disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-slate-950/15"
              >
                {sending ? "Enviando..." : "Solicitar agora"}
                <span className="grid place-items-center h-9 w-9 rounded-full bg-white/10 group-hover:bg-slate-950/10 transition">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
