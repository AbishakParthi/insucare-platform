import Link from "next/link";
import { company, navLinks, serviceCategories } from "@insucare/domain";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink dark:bg-[#151c26] text-white">
      <div className="gold-rule" aria-hidden="true" />
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
        <nav aria-label="Footer Quick Links">
          <h2 className="font-bold text-champagne">Quick Links</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer Services Links">
          <h2 className="font-bold text-champagne">Services</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70">
            {serviceCategories.map((category) => (
              <li key={category}>
                <Link href="/services" className="hover:text-white transition-colors">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic">
          <h2 className="font-bold text-champagne">Contact</h2>
          <ul className="mt-4 grid gap-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 text-champagne" aria-hidden="true" />
              <span>{company.addressLines.join(", ")}</span>
            </li>
            <li>
              <a className="flex gap-3 hover:text-white transition-colors" href={`tel:${company.phone.replace(/\s/g, "")}`} aria-label={`Call us at ${company.phone}`}>
                <Phone className="h-4 w-4 text-champagne" aria-hidden="true" />
                {company.phone}
              </a>
            </li>
            <li>
              <a className="flex gap-3 hover:text-white transition-colors" href={`mailto:${company.email}`} aria-label={`Email us at ${company.email}`}>
                <Mail className="h-4 w-4 text-champagne" aria-hidden="true" />
                {company.email}
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        Copyright &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
