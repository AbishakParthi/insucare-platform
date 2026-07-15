"use client";

import Image from "next/image";
import { useState } from "react";

export function PartnerLogo({ partner }: { partner: { name: string; slug: string; logoExt?: string } }) {
  const [error, setError] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md">
      {!error ? (
        <Image
          src={`/partners/${partner.slug}.${partner.logoExt || "png"}`}
          alt={`${partner.name} logo`}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className={`${
            partner.slug === "bajaj-allianz"
              ? "object-cover"
              : "object-contain"
          } ${partner.slug === "icici-prudential" ? "scale-[2.25]" : ""}`}
          onError={() => setError(true)}
        />
      ) : (
        <span className="leading-tight text-center px-2">{partner.name}</span>
      )}
    </div>
  );
}
