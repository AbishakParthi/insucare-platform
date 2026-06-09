import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Section } from "../../components/section";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms & Conditions">
      <div className="rounded-[2rem] border border-oxblood/10 bg-white p-8 text-lg leading-9 text-ink/75 shadow-sm">
        <p>Website information is provided for general awareness and should be evaluated with policy wordings, insurer terms, underwriting requirements and professional advice.</p>
        <p>{company.legalName} provides insurance broking and risk advisory services under {company.license}. Product availability and premium depend on insurer underwriting and applicable regulation.</p>
        <p>Using this website or submitting an enquiry does not create an insurance contract. Coverage begins only after insurer acceptance and premium realization as per policy terms.</p>
      </div>
    </Section>
  );
}
