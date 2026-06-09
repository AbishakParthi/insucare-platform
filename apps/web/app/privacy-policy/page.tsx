import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Section } from "../../components/section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>{company.legalName} collects enquiry, application and contact information to respond to requests, provide insurance advisory, coordinate claims and improve service quality.</p>
      <p>We handle personal information responsibly and share it only with relevant insurers, service providers or authorities where required for quotation, placement, servicing, claims or legal compliance.</p>
      <p>For privacy requests, contact {company.email}.</p>
    </LegalPage>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section eyebrow="Legal" title={title}>
      <div className="rounded-[2rem] border border-oxblood/10 bg-white p-8 text-lg leading-9 text-ink/75 shadow-sm">{children}</div>
    </Section>
  );
}
