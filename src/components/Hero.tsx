"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-brand-dark overflow-hidden">
      {/* Compensação do Navbar FIXED */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-28" />

      {/* Background com Zoom Lento */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-brand-dark z-10" />
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
          alt="L.A. Locadora Background"
          className="w-full h-full object-cover grayscale-[0.5]"
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-[1400px] px-6 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <img
            src="/logolalocadora.png"
            alt="L.A. Locadora Logo"
            className="w-24 md:w-32 h-auto rounded-full border border-white/10 p-1"
          />
        </motion.div>

        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-brand-blue uppercase text-[10px] tracking-[0.6em] mb-6 block font-bold"
        >
          Premium Car Rental
        </motion.span>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[12vw] md:text-[9vw] font-black tracking-[-0.06em] leading-[0.8] mb-12 uppercase text-center"
        >
          L.A. <span className="text-brand-blue italic">LOCADORA</span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <a
            href="/frota"
            className="group relative px-14 py-5 overflow-hidden border border-white/10 transition-all duration-500"
          >
            <span className="relative z-10 text-white uppercase text-[10px] tracking-[0.4em] font-black group-hover:text-brand-dark transition-colors duration-500">
              Explorar Frota
            </span>
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
          </a>

          <a
            href="/contato"
            className="text-white/50 hover:text-brand-blue uppercase text-[10px] tracking-[0.4em] font-black transition-all"
          >
            Solicitar Reserva →
          </a>
        </motion.div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-0 right-12 h-28 w-[1px] bg-gradient-to-t from-brand-blue to-transparent hidden md:block" />
    </div>
  );
}
