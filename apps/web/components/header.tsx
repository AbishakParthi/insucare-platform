import Image from "next/image";
import Link from "next/link";
import { company, navLinks } from "@insucare/domain";
import { Menu, Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-oxblood/10 bg-white/90 backdrop-blur-xl">
      <div className="container-padded flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="InsuCARE home">
          <Image
            src="/brand/insucare-logo.jpeg"
            alt="InsuCARE logo"
            width={132}
            height={72}
            className="h-12 w-auto rounded-sm object-contain"
            priority
          />
          <span className="hidden border-l border-oxblood/20 pl-3 text-xs font-bold uppercase tracking-[0.28em] text-oxblood md:block">
            IRDAI Registered
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-oxblood">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-oxblood/15 px-4 py-2 text-sm font-bold text-oxblood"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </Link>
          <Link href="/contact" className="rounded-full bg-oxblood px-5 py-2.5 text-sm font-bold text-white shadow-premium">
            Get Consultation
          </Link>
        </div>
        <button className="rounded-full border border-oxblood/15 p-3 text-oxblood lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
