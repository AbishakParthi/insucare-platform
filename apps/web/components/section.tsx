import type { ReactNode } from "react";
import { FadeInStagger, FadeInStaggerItem } from "./animated";

type SectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, intro, children, className = "" }: SectionProps) {
  return (
    <section className={`py-20 overflow-hidden ${className}`}>
      <FadeInStagger className="container-padded">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <FadeInStaggerItem>
              <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-oxblood dark:text-champagne">{eyebrow}</p>
            </FadeInStaggerItem>
          ) : null}
          <FadeInStaggerItem>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-current md:text-6xl">{title}</h2>
          </FadeInStaggerItem>
          {intro ? (
            <FadeInStaggerItem>
              <p className="mt-5 text-lg leading-8 opacity-70">{intro}</p>
            </FadeInStaggerItem>
          ) : null}
        </div>
        <FadeInStaggerItem>
          {children}
        </FadeInStaggerItem>
      </FadeInStagger>
    </section>
  );
}
