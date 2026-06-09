import type { Metadata } from "next";
import Link from "next/link";
import { jobs } from "@insucare/domain";
import { Briefcase } from "lucide-react";
import { ContactForm } from "../../components/contact-form";
import { Section } from "../../components/section";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join InsuCARE across insurance sales, claims coordination and risk advisory roles."
};

export default function CareersPage() {
  return (
    <Section eyebrow="Careers" title="Build meaningful insurance careers with a client-first team.">
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          {jobs.map((job) => (
            <Link key={job.slug} href={`/careers/${job.slug}`} className="rounded-[2rem] border border-oxblood/10 bg-white p-7 shadow-sm">
              <Briefcase className="h-8 w-8 text-oxblood" />
              <h2 className="mt-4 font-display text-3xl font-bold">{job.title}</h2>
              <p className="mt-2 text-sm font-bold text-champagne">{job.location} · {job.type}</p>
              <p className="mt-3 text-sm leading-7 text-ink/65">{job.summary}</p>
            </Link>
          ))}
        </div>
        <ContactForm variant="career" />
      </div>
    </Section>
  );
}
