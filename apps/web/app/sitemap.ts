import type { MetadataRoute } from "next";
import { blogs, jobs, services } from "@insucare/domain";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.insucareindia.com";
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/claims-assistance",
    "/insurance-partners",
    "/blogs",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/brochure"
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date() })),
    ...services.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, lastModified: new Date() })),
    ...blogs.map((post) => ({ url: `${siteUrl}/blogs/${post.slug}`, lastModified: new Date(post.publishedAt) })),
    ...jobs.map((job) => ({ url: `${siteUrl}/careers/${job.slug}`, lastModified: new Date() }))
  ];
}
