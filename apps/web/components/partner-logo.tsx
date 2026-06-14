"use client";

export function PartnerLogo({ partner }: { partner: { name: string; slug: string; logoExt?: string } }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src={`/partners/${partner.slug}.${partner.logoExt || "png"}`}
        alt={partner.name}
        className="max-h-full max-w-full object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const sibling = e.currentTarget.nextElementSibling as HTMLElement;
          if (sibling) sibling.classList.remove("hidden");
        }}
      />
      <span className="hidden leading-tight">{partner.name}</span>
    </div>
  );
}
