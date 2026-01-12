"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu as MenuIcon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Frota", path: "/frota" },
      { name: "Empresa", path: "/empresa" },
      { name: "Contato", path: "/contato" },
    ],
    []
  );

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname?.startsWith(path);

  // Paleta dinâmica:
  // - No topo do Hero (geralmente escuro): texto branco/transparente
  // - Ao rolar: navbar claro premium
  const navShell =
    scrolled || isOpen
      ? "bg-white/88 backdrop-blur-xl border-b border-slate-200 shadow-[0_12px_50px_-35px_rgba(2,6,23,0.35)] py-4"
      : "bg-transparent py-6";

  const brandText = scrolled || isOpen ? "text-slate-900" : "text-white";
  const brandSub = scrolled || isOpen ? "text-brand-blue" : "text-brand-blue";

  const linkBase =
    "relative transition-all font-black uppercase text-[11px] tracking-[0.35em]";

  const linkColor = scrolled || isOpen ? "text-slate-600 hover:text-slate-900" : "text-white/70 hover:text-white";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] px-6 md:px-12 transition-all duration-500 ${navShell}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center font-display">
          {/* BRAND */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 z-[70] group focus:outline-none"
            aria-label="Ir para Home"
          >
            <img
              src="/logolalocadora.png"
              alt="Logo L.A. Locadora"
              className={`w-10 h-10 rounded-full border ${
                scrolled || isOpen ? "border-slate-200" : "border-white/20"
              } shadow-sm`}
            />
            <span
              className={`${brandText} font-extrabold text-xl md:text-2xl tracking-[-0.03em] uppercase italic`}
            >
              L.A. <span className={brandSub}>LOCADORA</span>
            </span>
          </Link>

          {/* LINKS DESKTOP */}
          <div className="hidden lg:flex items-center gap-14">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`${linkBase} ${linkColor} group outline-none`}
                >
                  {item.name}
                  {/* underline */}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-brand-blue transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  {/* focus ring */}
                  <span className="sr-only">{active ? " (atual)" : ""}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + MOBILE BUTTON */}
          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className={`hidden sm:inline-flex items-center justify-center rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-[0.22em] transition-all
                ${
                  scrolled || isOpen
                    ? "bg-brand-blue text-slate-900 hover:bg-slate-900 hover:text-white shadow-lg shadow-brand-blue/25"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-md"
                }
              `}
            >
              Reservar agora
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden z-[70] rounded-full p-3 transition-all border focus:outline-none focus:ring-2 focus:ring-brand-blue/60
                ${
                  scrolled || isOpen
                    ? "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/15 backdrop-blur-md"
                }
              `}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 210 }}
            className="fixed inset-0 z-[55] bg-white lg:hidden"
          >
            {/* Topbar do drawer */}
            <div className="px-6 pt-6 flex items-center justify-between border-b border-slate-200">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-4"
              >
                <img
                  src="/logolalocadora.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-full border border-slate-200"
                />
                <span className="text-slate-900 font-extrabold text-lg uppercase italic">
                  L.A. <span className="text-brand-blue">LOCADORA</span>
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-3 border border-slate-200 hover:bg-slate-50 transition"
                aria-label="Fechar menu"
              >
                <X size={22} className="text-slate-900" />
              </button>
            </div>

            <div className="px-6 py-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] text-[42vw] font-black font-display whitespace-nowrap text-slate-900">
                L.A.
              </div>

              <nav className="flex flex-col gap-7">
                {menuItems.map((item, index) => {
                  const active = isActive(item.path);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 group font-display font-black uppercase tracking-[-0.04em] transition-colors
                          ${
                            active ? "text-brand-blue" : "text-slate-900 hover:text-brand-blue"
                          }
                          text-5xl md:text-7xl
                        `}
                      >
                        <span className="text-brand-blue text-xs font-sans tracking-widest opacity-50 group-hover:opacity-100">
                          0{index + 1}
                        </span>
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 mb-3 font-display">
                  Contato imediato
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                    (00) 00000-0000
                  </p>

                  <Link
                    href="/contato"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-7 py-3 text-[11px] font-black uppercase tracking-[0.22em] hover:bg-brand-blue hover:text-slate-900 transition shadow-lg shadow-slate-900/15"
                  >
                    Reservar agora
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
