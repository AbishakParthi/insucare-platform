import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "@insucare/domain";
import { CtaBand } from "../../../components/cta-band";
import { Section } from "../../../components/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((item) => item.slug === slug);
  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <>
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
