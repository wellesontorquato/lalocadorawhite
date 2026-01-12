"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Frota", path: "/frota" },
  { name: "Empresa", path: "/empresa" },
  { name: "Contato", path: "/contato" },
];

export default function NavbarPages() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR FIXA, CLARA */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between font-display">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logolalocadora.png"
              alt="L.A. Locadora"
              className="w-9 h-9 rounded-full border border-slate-200"
            />
            <span className="text-slate-900 font-black text-lg uppercase italic tracking-tight">
              L.A. <span className="text-brand-blue">LOCADORA</span>
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex gap-14 text-[11px] uppercase tracking-[0.4em] font-black text-slate-500">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative hover:text-slate-900 transition-colors"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-blue transition-all hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <Link
              href="/contato"
              className="hidden sm:inline-flex rounded-full bg-brand-blue px-6 py-3 text-[11px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition"
            >
              Reservar agora
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 border border-slate-200 rounded-md"
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-50 bg-white px-8 flex flex-col justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Fechar menu"
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-black uppercase tracking-tight text-slate-900 hover:text-brand-blue transition"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
