import Link from "next/link";
import { brand, blogs, claimSteps, partners, services, stats, testimonials, whyChooseUs } from "@insucare/domain";
import { ArrowRight, BadgeCheck, BarChart3, Building2, FileCheck, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { Section } from "../components/section";

export default function HomePage() {
  const featured = services.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-insurance-grid insurance-pattern opacity-20" />
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-champagne/20 blur-3xl" />
        <div className="absolute -left-16 bottom-8 h-80 w-80 rounded-full bg-oxblood/60 blur-3xl" />
        <div className="container-padded relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-champagne/40 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-champagne">
              IRDAI Registered Insurance Broker
            </p>
            <h1 className="mt-7 max-w-4xl font-display text-6xl font-bold leading-[0.95] text-balance md:text-8xl">
              {brand.tagline}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/75">{brand.subheadline}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-champagne px-7 py-4 font-extrabold text-ink dark:text-porcelain">
                Get Free Consultation
              </Link>
              <Link href="/services" className="rounded-full border border-white/20 px-7 py-4 font-extrabold text-white">
                Explore Insurance Solutions
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {["IRDAI Registered", "Expert Insurance Advisors", "Claims Assistance", "Corporate Risk Specialists"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white dark:bg-white/5 px-4 py-3">
                  <BadgeCheck className="h-5 w-5 text-champagne" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-card rounded-[2.5rem] border-white/15 bg-white/10 p-6 text-white shadow-premium">
              <div className="rounded-[2rem] bg-white dark:bg-ink/80 p-6 text-ink dark:text-porcelain dark:text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-oxblood dark:text-champagne">Risk Command View</p>
                    <h2 className="mt-2 font-display text-4xl font-bold">Insurance clarity, not complexity.</h2>
                  </div>
                  <ShieldCheck className="h-12 w-12 text-oxblood dark:text-champagne" />
                </div>
                <div className="mt-8 grid gap-4">
                  {["Coverage gap review", "Multi-insurer comparison", "Claims desk coordination"].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-oxblood/10 dark:border-white/10 bg-porcelain dark:bg-white/5 p-5">
                      <div className="flex items-center gap-4">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-oxblood text-sm font-bold text-white">0{index + 1}</span>
                        <p className="font-bold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Trusted Numbers" intro="Built for individuals and businesses who want transparent advice, responsive service and confident claims support.">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm">
              <p className="font-display text-5xl font-bold text-oxblood dark:text-champagne">{stat.value}</p>
              <p className="mt-2 font-semibold text-ink/70 dark:text-porcelain/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why InsuCARE" title="Advice before policy. Support after purchase.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item} className="group rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
              <Sparkles className="h-8 w-8 text-champagne" />
              <h3 className="mt-5 font-display text-3xl font-bold">{item}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">
                Practical insurance guidance delivered with clear documentation, transparent recommendations and responsive service.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Featured Services" title="Insurance programs for business and life." className="bg-porcelain dark:bg-[#253040]">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-[2rem] bg-white dark:bg-white/5 dark:border-white/10 border border-transparent p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
              <Building2 className="h-9 w-9 text-oxblood dark:text-champagne" />
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-oxblood dark:text-champagne">{service.category}</p>
              <h3 className="mt-3 font-display text-3xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{service.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-oxblood dark:text-champagne">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Claims Assistance" title="A guided claims workflow from notification to closure.">
        <div className="grid gap-4 md:grid-cols-3">
          {claimSteps.map((step, index) => (
            <div key={step} className="rounded-[1.6rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <span className="text-sm font-extrabold text-oxblood dark:text-champagne">Step {index + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Client Voices" title="Trusted by business owners, HR leaders and families." className="bg-ink dark:bg-[#1a222e] text-white">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-white dark:bg-white/5 p-7">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-champagne font-display text-2xl font-bold text-ink dark:text-porcelain">
                {item.name.charAt(0)}
              </div>
              <p className="mt-5 text-sm leading-7 text-white/75">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-5 font-bold text-white">{item.name}</p>
              <p className="text-sm text-champagne">{item.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Insurance Partners" title="Multi-insurer access for better comparison.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {partners.slice(0, 12).map((partner) => (
            <div key={partner.name} className="grid min-h-24 place-items-center rounded-2xl border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-center text-sm font-extrabold text-ink/75 dark:text-porcelain/75">
              {partner.name}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Latest Blogs" title="Insurance insights for better decisions." className="bg-porcelain dark:bg-[#253040]">
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="rounded-[2rem] bg-white dark:bg-white/5 dark:border-white/10 border border-transparent p-7 shadow-sm">
              <BarChart3 className="h-8 w-8 text-oxblood dark:text-champagne" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-oxblood dark:text-champagne">{post.category}</p>
              <h3 className="mt-3 font-display text-3xl font-bold">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
