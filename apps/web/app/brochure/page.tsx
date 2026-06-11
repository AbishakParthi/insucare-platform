import type { Metadata } from "next";
import { company, partners, serviceCategories } from "@insucare/domain";
import { Section } from "../../components/section";

export const metadata: Metadata = { title: "Company Brochure" };

export default function BrochurePage() {
  return (
    <Section eyebrow="Brochure" title="InsuCARE Company Brochure" intro="Use browser print to save this production-ready brochure as PDF.">
      <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-sm print:shadow-none">
        <h2 className="font-display text-4xl font-bold">{company.legalName}</h2>
        <p className="mt-3 text-oxblood dark:text-champagne font-bold">{company.license}</p>
        <p className="mt-5 leading-8 text-ink/ dark:text-porcelain/">
          InsuCARE provides insurance broking, risk advisory, claims assistance and multi-insurer comparison for individuals, families, SMEs, startups and enterprises.
        </p>
        <h3 className="mt-8 font-display text-3xl font-bold">Services</h3>
        <p className="mt-3 text-ink/ dark:text-porcelain/">{serviceCategories.join(", ")}</p>
        <h3 className="mt-8 font-display text-3xl font-bold">Claims Assistance</h3>
        <p className="mt-3 text-ink/ dark:text-porcelain/">Claim notification, documentation, insurer coordination, survey assistance, settlement follow-up and closure.</p>
        <h3 className="mt-8 font-display text-3xl font-bold">Insurance Partners</h3>
        <p className="mt-3 text-ink/ dark:text-porcelain/">{partners.map((partner) => partner.name).join(", ")}</p>
        <h3 className="mt-8 font-display text-3xl font-bold">Contact</h3>
        <p className="mt-3 text-ink/ dark:text-porcelain/">{company.phone} · {company.email} · {company.addressLines.join(", ")}</p>
      </div>
    </Section>
  );
}
