"use client";

import { useDeferredValue, useState } from "react";

type Partner = {
  name: string;
  slug: string;
  category: string;
};

export function SearchablePartners({ partners }: { partners: Partner[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const deferredQuery = useDeferredValue(query.toLowerCase());
  const categories = ["All", ...Array.from(new Set(partners.map((partner) => partner.category)))];
  const filtered = partners.filter((partner) => {
    const matchesQuery = partner.name.toLowerCase().includes(deferredQuery);
    const matchesCategory = category === "All" || partner.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="glass-card mb-8 grid gap-4 rounded-[2rem] p-4 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search insurer"
          className="rounded-full border border-oxblood/10 px-5 py-3 outline-none focus:border-oxblood"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-full border border-oxblood/10 px-5 py-3 outline-none focus:border-oxblood"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((partner) => (
          <div key={partner.slug} className="rounded-[1.6rem] border border-oxblood/10 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-oxblood font-display text-2xl font-bold text-white">
              {partner.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
            </div>
            <h2 className="mt-4 font-bold">{partner.name}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{partner.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
