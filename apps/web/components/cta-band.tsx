import Link from "next/link";
import { company } from "@insucare/domain";
import { SlideInLeft, SlideInRight } from "./animated";

export function CtaBand() {
  return (
    <section className="bg-oxblood py-16 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.4),_transparent_25rem)]" />
      <div className="container-padded grid items-center gap-8 md:grid-cols-[1fr_auto] relative z-10">
        <SlideInLeft>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">Quick response promise</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Need help choosing or claiming insurance?</h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Speak with an InsuCARE advisor for transparent comparison, documentation guidance and claims coordination.
          </p>
        </SlideInLeft>
        <SlideInRight className="flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-bold text-oxblood dark:text-champagne transition-all hover:bg-champagne hover:text-ink dark:hover:text-ink hover:scale-105 active:scale-95 shadow-lg">Get Free Consultation</Link>
          <Link href={`tel:${company.phone.replace(/\s/g, "")}`} className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition-all hover:bg-white/10 hover:border-white hover:scale-105 active:scale-95">Call {company.phone}</Link>
        </SlideInRight>
      </div>
    </section>
  );
}
