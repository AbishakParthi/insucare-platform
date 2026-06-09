import type { Metadata } from "next";
import { blogs, jobs, partners, services, testimonials } from "@insucare/domain";
import { BarChart3, Briefcase, FileText, Handshake, Inbox, Shield } from "lucide-react";
import { Section } from "../../components/section";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Secure InsuCARE admin dashboard overview for content, enquiries, careers and analytics."
};

export default function AdminPage() {
  const modules = [
    { label: "Services", value: services.length, icon: Shield },
    { label: "Blogs", value: blogs.length, icon: FileText },
    { label: "Partners", value: partners.length, icon: Handshake },
    { label: "Testimonials", value: testimonials.length, icon: BarChart3 },
    { label: "Careers", value: jobs.length, icon: Briefcase },
    { label: "Recent Enquiries", value: 0, icon: Inbox }
  ];

  return (
    <Section eyebrow="Admin" title="Operational cockpit for InsuCARE teams." intro="Production APIs include authentication, RBAC, audit logs and CRUD endpoints. This screen provides the first dashboard shell.">
      <div className="grid gap-5 md:grid-cols-3">
        {modules.map((module) => (
          <div key={module.label} className="rounded-[2rem] border border-oxblood/10 bg-white p-7 shadow-sm">
            <module.icon className="h-8 w-8 text-oxblood" />
            <p className="mt-5 font-display text-5xl font-bold">{module.value}</p>
            <p className="mt-1 font-bold text-ink/65">{module.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-[2rem] bg-ink p-8 text-white">
        <h2 className="font-display text-4xl font-bold">Admin Modules</h2>
        <p className="mt-4 text-white/70">
          Services CRUD, Blogs CRUD, Testimonials CRUD, Partners CRUD, Careers CRUD, Users CRUD, Media Library, Enquiry Management, Export CSV, Settings and Audit Logs.
        </p>
      </div>
    </Section>
  );
}
