"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Cpu,
  Battery,
  MousePointer2,
  Wind,
  ArrowRight,
} from "lucide-react";
import MouseFloat from "@/components/MouseFloat";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] overflow-hidden">
      {/* ========= NAV ========= */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <MousePointer2 className="size-6 text-cyan-400" />
          <span className="text-lg font-semibold tracking-wider text-white">
            AERO-LIFT
          </span>
        </div>
        <button className="rounded-full border border-cyan-400/30 px-5 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-400/10 hover:border-cyan-400/60">
          Pre-order
        </button>
      </nav>

      {/* ========= HERO ========= */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center md:px-0">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow blob behind title */}
        <div className="absolute top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400/80"
        >
          Antigravity Technology
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl text-glow"
        >
          O fim do{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            atrito
          </span>
          .
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/50 md:text-lg"
        >
          O <strong className="text-white/80">Aero-Lift</strong> utiliza
          suspensÃ£o eletromagnÃ©tica para eliminar completamente o contato com a
          superfÃ­cie. Deslize, clique e jogue flutuando.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10"
        >
          <button className="group relative inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition hover:bg-cyan-300 glow-cyan">
            EXPERIMENTE O FUTURO
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Floating Mouse */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <MouseFloat />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-cyan-400/50 to-transparent" />
        </motion.div>
      </section>

      {/* ========= SPECS ========= */}
      <section className="relative px-6 py-28 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-2 text-center text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400/70">
            Tecnologia
          </p>
          <h2 className="mb-14 text-center text-3xl font-bold tracking-tight md:text-5xl">
            Specs do ImpossÃ­vel
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-sm transition hover:border-cyan-400/30"
            >
              <div className="mb-5 flex justify-center">
                <div className="grid size-14 place-items-center rounded-full bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/20 group-hover:bg-cyan-400/15 transition">
                  <Wind className="size-6" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                Peso Zero
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                LevitaÃ§Ã£o magnÃ©tica ativa elimina 100% do atrito com o mouse
                pad. Movimentos em 0.001g de resistÃªncia.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-sm transition hover:border-cyan-400/30"
            >
              <div className="mb-5 flex justify-center">
                <div className="grid size-14 place-items-center rounded-full bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/20 group-hover:bg-cyan-400/15 transition">
                  <Cpu className="size-6" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                Sensor QuÃ¢ntico
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                Sensor Ã³ptico de 42.000 DPI com rastreamento sub-pixel em
                qualquer superfÃ­cie, incluindo ar.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-sm transition hover:border-cyan-400/30"
            >
              <div className="mb-5 flex justify-center">
                <div className="grid size-14 place-items-center rounded-full bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/20 group-hover:bg-cyan-400/15 transition">
                  <Battery className="size-6" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                Bateria de Grafeno
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                300 horas de uso contÃ­nuo com carga completa em 12 minutos via
                USB-C sem fio indutivo.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========= EXTRA SPECS STRIP ========= */}
      <section className="border-y border-white/5 bg-white/[0.01] py-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 md:gap-16">
          {[
            { icon: Zap, label: "Polling Rate", value: "8000 Hz" },
            { icon: Cpu, label: "DPI MÃ¡ximo", value: "42.000" },
            { icon: Battery, label: "Bateria", value: "300h" },
            { icon: Wind, label: "Peso", value: "0g (em uso)" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <item.icon className="mx-auto mb-2 size-5 text-cyan-400/60" />
              <p className="text-2xl font-bold tracking-tight text-cyan-400">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] tracking-wider uppercase text-white/30">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <footer className="py-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MousePointer2 className="size-5 text-cyan-400/50" />
          <span className="text-sm font-medium tracking-wider text-white/30">
            AERO-LIFT
          </span>
        </div>
        <p className="text-xs text-white/20">
          &copy; 2026 Aero-Lift Technologies. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
