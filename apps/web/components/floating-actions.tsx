import Link from "next/link";
import { company } from "@insucare/domain";
import { MessageCircle, PhoneCall } from "lucide-react";

export function FloatingActions() {
  const whatsapp = company.whatsapp.replace(/\D/g, "");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <Link
        href={`https://wa.me/${whatsapp}`}
        className="inline-flex items-center gap-2 rounded-full bg-[#128C7E] px-4 py-3 text-sm font-bold text-white shadow-premium"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-oxblood px-4 py-3 text-sm font-bold text-white shadow-premium"
      >
        <PhoneCall className="h-4 w-4" />
        Callback
      </Link>
    </div>
  );
}
