import bcrypt from "bcryptjs";
import { blogCategories, blogs, jobs, partners, serviceCategories, services, testimonials } from "@insucare/domain";
import { prisma } from "../src/db.js";

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@insucareindia.com" },
    update: {},
    create: {
      name: "InsuCARE Admin",
      email: "admin@insucareindia.com",
      passwordHash: await bcrypt.hash("ChangeMe@12345", 12),
      role: "SUPER_ADMIN"
    }
  });

  for (const name of serviceCategories) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) }
    });

    for (const service of services.filter((item) => item.category === name)) {
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: {
          title: service.title,
          summary: service.summary,
          overview: service.overview,
          benefits: service.benefits,
          coverage: service.coverage,
          claimProcess: service.claimProcess,
          faqs: service.faqs,
          categoryId: category.id
        },
        create: {
          title: service.title,
          slug: service.slug,
          summary: service.summary,
          overview: service.overview,
          benefits: service.benefits,
          coverage: service.coverage,
          claimProcess: service.claimProcess,
          faqs: service.faqs,
          categoryId: category.id
        }
      });
    }
  }

  for (const name of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) }
    });
  }

  for (const blog of blogs) {
    const category = await prisma.blogCategory.findUniqueOrThrow({ where: { slug: slugify(blog.category) } });
    const { category: _category, ...blogData } = blog;
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: { ...blogData, content: blog.excerpt, categoryId: category.id, publishedAt: new Date(blog.publishedAt) },
      create: { ...blogData, content: blog.excerpt, categoryId: category.id, publishedAt: new Date(blog.publishedAt) }
    });
  }

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { slug: partner.slug },
      update: partner,
      create: partner
    });
  }

  await prisma.testimonial.deleteMany();
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  for (const job of jobs) {
    await prisma.career.upsert({
      where: { slug: job.slug },
      update: { ...job, description: job.summary },
      create: { ...job, description: job.summary }
    });
  }
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
