import Link from "next/link";
import { company, navLinks, serviceCategories } from "@insucare/domain";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="gold-rule" />
      <div className="container-padded grid gap-10 py-14 md:grid-cols-[1.3fr_.8fr_.8fr_1fr]">
        <div>
          <p className="font-display text-4xl font-bold">InsuCARE</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            {company.legalName} delivers insurance broking, risk advisory and claims support for retail and corporate clients.
          </p>
          <p className="mt-5 inline-flex rounded-full border border-champagne/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-champagne">
            {company.license}
          </p>
        </div>
        <div>
          <h3 className="font-bold text-champagne">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-champagne">Services</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            {serviceCategories.map((category) => (
              <Link key={category} href="/services" className="hover:text-white">
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-champagne">Contact</h3>
          <div className="mt-4 grid gap-4 text-sm text-white/70">
            <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 text-champagne" />{company.addressLines.join(", ")}</p>
            <a className="flex gap-3 hover:text-white" href={`tel:${company.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4 text-champagne" />{company.phone}</a>
            <a className="flex gap-3 hover:text-white" href={`mailto:${company.email}`}><Mail className="h-4 w-4 text-champagne" />{company.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        Copyright {new Date().getFullYear()} {company.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
