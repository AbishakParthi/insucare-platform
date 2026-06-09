import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "../../components/contact-form";
import { Section } from "../../components/section";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact InsuCARE for insurance consultation, claims assistance, corporate risk advisory and career enquiries."
};

export default function ContactPage() {
  return (
    <Section eyebrow="Contact Us" title="Talk to InsuCARE." intro="Share your requirement and the advisory team will respond with the next practical step.">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-5">
          <ContactCard icon={<Phone />} title="Phone" value={company.phone} href={`tel:${company.phone.replace(/\s/g, "")}`} />
          <ContactCard icon={<MessageCircle />} title="WhatsApp" value={company.whatsapp} href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`} />
          <ContactCard icon={<Mail />} title="Email" value={company.email} href={`mailto:${company.email}`} />
          <div className="rounded-[2rem] border border-oxblood/10 bg-white p-7 shadow-sm">
            <MapPin className="h-8 w-8 text-oxblood" />
            <h2 className="mt-4 font-display text-3xl font-bold">Office Address</h2>
            <p className="mt-3 leading-8 text-ink/70">{company.addressLines.join(", ")}</p>
          </div>
          <div className="rounded-[2rem] bg-porcelain p-7">
            <Clock className="h-8 w-8 text-oxblood" />
            <h2 className="mt-4 font-display text-3xl font-bold">Business Hours</h2>
            <p className="mt-3 text-ink/70">{company.businessHours}</p>
          </div>
        </div>
        <div>
          <ContactForm />
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-oxblood/10 bg-porcelain">
            <iframe
              title="InsuCARE Hyderabad Office Map"
              src="https://www.google.com/maps?q=Goodlife%20Retreat%20Kakatiya%20Nagar%20Hyderabad%20500007&output=embed"
              className="h-80 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href: string }) {
  return (
    <a href={href} className="rounded-[2rem] border border-oxblood/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
      <div className="text-oxblood [&>svg]:h-8 [&>svg]:w-8">{icon}</div>
      <h2 className="mt-4 font-display text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-ink/70">{value}</p>
    </a>
  );
}
