import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs, company } from "@insucare/domain";
import { CtaBand } from "../../../components/cta-band";
import { Section } from "../../../components/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((item) => item.slug === slug);
  if (!post) return {};
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.insucareindia.com";
  const postUrl = `${siteUrl}/blogs/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [company.displayName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((item) => item.slug === slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.insucareindia.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: company.displayName,
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: company.displayName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/insucare-logo.jpeg`
      }
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Section eyebrow={post.category} title={post.title} intro={post.excerpt}>
        <article className="prose prose-lg max-w-none rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-sm">
          <p>
            Insurance decisions become easier when you evaluate coverage, exclusions, claim process, insurer service and long-term suitability together. This article gives a practical framework for that evaluation.
          </p>
          <h2>What to review first</h2>
          <p>
            Start with the risk you want to transfer. For health insurance, this may include family medical history, hospital network, room rent limits and waiting periods. For business insurance, it may include property values, liability exposure, employee strength and supply chain dependencies.
          </p>
          <h2>How InsuCARE helps</h2>
          <p>
            InsuCARE compares available insurer options, explains trade-offs, supports documentation and remains available when claims need coordination.
          </p>
        </article>
      </Section>
      <CtaBand />
    </>
  );
}
