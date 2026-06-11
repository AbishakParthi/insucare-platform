import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, blogs } from "@insucare/domain";
import { Section } from "../../components/section";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Insurance education, risk advisory and employee benefits insights from InsuCARE."
};

export default function BlogsPage() {
  return (
    <Section eyebrow="Blogs" title="Insurance knowledge that helps you decide better.">
      <div className="mb-8 flex flex-wrap gap-3">
        {blogCategories.map((category) => (
          <span key={category} className="rounded-full border border-oxblood/10 dark:border-white/10 px-4 py-2 text-sm font-bold text-oxblood dark:text-champagne">
            {category}
          </span>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {blogs.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-champagne">{post.category}</p>
            <h2 className="mt-4 font-display text-3xl font-bold">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-ink/ dark:text-porcelain/">{post.excerpt}</p>
            <p className="mt-5 text-sm font-bold text-oxblood dark:text-champagne">{post.readingTime}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
