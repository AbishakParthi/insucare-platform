import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Section } from "../../components/section";

export const metadata: Metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <Section eyebrow="Legal" title="Disclaimer">
      <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-lg leading-9 text-ink/ dark:text-porcelain/ shadow-sm">
        <p>Insurance is subject to solicitation, underwriting, policy terms, exclusions and conditions. Please read policy wordings carefully before purchase.</p>
        <p>{company.legalName} does not guarantee claim settlement; claim outcomes depend on insurer assessment, policy coverage, documentation and applicable terms.</p>
        <p>Brand names of insurers are used for identification of partner categories and comparison support.</p>
      </div>
    </Section>
  );
}
