"use client";
import { useState, useEffect, useMemo } from "react";
import { FROTA } from "@/constants/carros";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

export default function Formulario() {
  const [form, setForm] = useState({
    nome: "",
    carro: "",
    dataRetirada: "",
    dataDevolucao: "",
    quilometragem: "300km",
  });

  const [total, setTotal] = useState<number | null>(null);
  const [avisoData, setAvisoData] = useState<string>("");

  // =========================
  // Helpers de datas (sem libs)
  // =========================
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const toISODate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  // evita bug timezone (sempre meio-dia)
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

  // se cair no domingo, avança até segunda
  const nextNonSundayISO = (iso: string) => {
    if (!iso) return iso;
    const d = parseISODate(iso);
    while (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return toISODate(d);
  };

  // hoje em ISO (timezone-safe)
  const hoje = useMemo(() => toISODate(new Date()), []);

  // menor dia permitido para retirada (se hoje for domingo, começa segunda)
  const minDataRetirada = useMemo(() => nextNonSundayISO(hoje), [hoje]);

  // mínimo de devolução (sempre +1 dia da retirada; se cair domingo, pula)
  const minDataDevolucao = useMemo(() => {
    const baseRetirada = form.dataRetirada ? nextNonSundayISO(form.dataRetirada) : minDataRetirada;

    let min = addDaysISO(baseRetirada, 1);
    min = nextNonSundayISO(min);

    return min;
  }, [form.dataRetirada, minDataRetirada]);

  // =========================
  // Remove domingo automaticamente (retirada/devolução)
  // =========================
  const onChangeRetirada = (value: string) => {
    setAvisoData("");

    if (!value) {
      setForm((prev) => ({ ...prev, dataRetirada: "", dataDevolucao: "" }));
      return;
    }

    const retiradaValida = nextNonSundayISO(value);

    if (isSundayISO(value)) {
      setAvisoData("Domingo é fechado. Ajustamos sua retirada para a segunda-feira.");
    }

    // reset devolução para forçar reescolha (min muda)
    setForm((prev) => ({ ...prev, dataRetirada: retiradaValida, dataDevolucao: "" }));
  };

  const onChangeDevolucao = (value: string) => {
    setAvisoData("");

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

  // limpa aviso sozinho
  useEffect(() => {
    if (!avisoData) return;
    const t = setTimeout(() => setAvisoData(""), 3500);
    return () => clearTimeout(t);
  }, [avisoData]);

  // se por qualquer motivo devolução ficar inválida (ex.: mudou retirada via state), limpa
  useEffect(() => {
    if (!form.dataRetirada) return;
    if (!form.dataDevolucao) return;

    const retiradaValida = nextNonSundayISO(form.dataRetirada);
    const devolucaoValida = nextNonSundayISO(form.dataDevolucao);

    if (devolucaoValida <= retiradaValida || devolucaoValida < minDataDevolucao) {
      setForm((prev) => ({ ...prev, dataDevolucao: "" }));
    }
  }, [form.dataRetirada, minDataDevolucao]); // intencional

  // =========================
  // Cálculo (datas já válidas)
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
  }, [form]);

  const enviarWhats = (e: React.FormEvent) => {
    e.preventDefault();
    const numero = "5582996906585";
    const valorEstimado = total ? `\n💰 *Valor Estimado:* R$ ${total.toLocaleString("pt-BR")}` : "";

    const texto = `Olá L.A. Locadora!
Me chamo ${form.nome}.
*Pedido de Reserva:*
🚗 Veículo: ${form.carro}
📅 Retirada: ${form.dataRetirada}
📅 Devolução: ${form.dataDevolucao}
🛣️ Plano: ${form.quilometragem}${valorEstimado}

Como podemos prosseguir?`;

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  return (
    <div className="bg-brand-dark text-white font-display">
      <div className="flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
              Reserva & Orçamento
            </span>

            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.05em] leading-[0.9] uppercase italic">
              VAMOS <br /> <span className="text-brand-blue">RESERVAR?</span>
            </h2>

            {/* Texto fixo na página (regra clara) */}
            <div className="mt-6 border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.22em] font-black text-white/60">
              Domingos: fechado. O calendário não permite retirada/devolução no domingo.
            </div>

            {/* Aviso UX rápido (auto-correções) */}
            <AnimatePresence>
              {avisoData && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 border border-brand-blue/30 bg-brand-blue/10 px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-black text-brand-blue"
                >
                  {avisoData}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {total !== null && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-brand-blue/10 border border-brand-blue/30 p-6 min-w-[240px]"
              >
                <div className="flex items-center gap-2 mb-2 text-brand-blue">
                  <Calculator size={14} />
                  <span className="text-[10px] font-black uppercase">Estimativa (c/ Lavagem)</span>
                </div>
                <div className="text-4xl font-black italic">R$ {total.toLocaleString("pt-BR")}</div>
                <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-tighter">
                  *Taxa de lavagem inclusa
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={enviarWhats} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {/* Input Nome */}
          <div className="group flex flex-col gap-3 border-b border-white/10 hover:border-brand-blue/50 transition-colors duration-500 pb-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-blue transition-colors duration-500 font-bold">
              01. Nome
            </label>
            <input
              required
              type="text"
              placeholder="DIGITE AQUI"
              className="bg-transparent text-xl font-black uppercase outline-none placeholder:text-white/5"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          {/* Select Veículo */}
          <div className="group flex flex-col gap-3 border-b border-white/10 hover:border-brand-blue/50 transition-colors duration-500 pb-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-blue transition-colors duration-500 font-bold">
              02. Veículo
            </label>
            <select
              required
              className="bg-transparent text-xl font-black uppercase outline-none cursor-pointer"
              value={form.carro}
              onChange={(e) => setForm({ ...form, carro: e.target.value })}
            >
              <option value="" className="bg-brand-dark">
                SELECIONAR
              </option>
              {FROTA.map((c) => (
                <option key={c.id} value={c.nome} className="bg-brand-dark">
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Date Retirada */}
          <div className="group flex flex-col gap-3 border-b border-white/10 hover:border-brand-blue/50 transition-colors duration-500 pb-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-blue transition-colors duration-500 font-bold">
              03. Retirada
            </label>
            <input
              required
              type="date"
              min={minDataRetirada}
              value={form.dataRetirada}
              className="bg-transparent text-lg font-black outline-none [color-scheme:dark]"
              onChange={(e) => onChangeRetirada(e.target.value)}
            />
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20">
              Domingos não aparecem como opção.
            </p>
          </div>

          {/* Date Devolução */}
          <div className="group flex flex-col gap-3 border-b border-white/10 hover:border-brand-blue/50 transition-colors duration-500 pb-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-brand-blue transition-colors duration-500 font-bold">
              04. Devolução
            </label>
            <input
              required
              type="date"
              min={minDataDevolucao}
              value={form.dataDevolucao}
              disabled={!form.dataRetirada}
              className="bg-transparent text-lg font-black outline-none [color-scheme:dark] disabled:opacity-20"
              onChange={(e) => onChangeDevolucao(e.target.value)}
            />
          </div>

          {/* Quilometragem */}
          <div className="md:col-span-2 space-y-4">
            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">
              05. Quilometragem
            </label>
            <div className="flex gap-8">
              {["300km", "Km Livre"].map((km) => (
                <label key={km} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="km"
                    value={km}
                    checked={form.quilometragem === km}
                    onChange={(e) => setForm({ ...form, quilometragem: e.target.value })}
                    className="accent-brand-blue"
                  />
                  <span
                    className={`text-lg font-black uppercase transition-colors duration-500 ${
                      form.quilometragem === km
                        ? "text-brand-blue"
                        : "text-white/20 group-hover:text-white/50"
                    }`}
                  >
                    {km}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Botão */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="group flex items-center gap-6 text-white transition-all duration-500 ease-out hover:translate-x-3"
            >
              <span className="text-3xl md:text-4xl font-black uppercase group-hover:text-brand-blue transition-colors duration-500">
                SOLICITAR AGORA
              </span>
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
