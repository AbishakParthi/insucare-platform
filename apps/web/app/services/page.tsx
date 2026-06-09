import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, services } from "@insucare/domain";
import { ArrowRight, Shield } from "lucide-react";
import { CtaBand } from "../../components/cta-band";
import { Section } from "../../components/section";

export const metadata: Metadata = {
  title: "Insurance Services",
  description: "Corporate, group, retail and specialized insurance broking services from InsuCARE."
};

export default function ServicesPage() {
  return (
    <>
      <Section eyebrow="Services" title="Insurance solutions designed around real risk." intro="Explore business, employee-benefit, retail and specialized insurance advisory services with claim support built in.">
        <div className="grid gap-12">
          {serviceCategories.map((category) => (
            <div key={category}>
              <h2 className="font-display text-4xl font-bold text-oxblood">{category}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.filter((service) => service.category === category).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-[2rem] border border-oxblood/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
                    <Shield className="h-8 w-8 text-champagne" />
                    <h3 className="mt-5 font-display text-3xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/65">{service.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-oxblood">
                      View details <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
