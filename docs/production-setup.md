# InsuCARE Production Setup

## Overview

This repository contains a production-oriented monorepo for Insucare India Insurance Broking Pvt Ltd:

- `apps/web`: Next.js 15 App Router frontend.
- `apps/api`: Express.js TypeScript API.
- `packages/domain`: Shared company, service, partner, blog, testimonial and career content.
- `apps/api/prisma`: PostgreSQL schema and seed data.
- `infra/nginx`: Reverse proxy configuration.

## Environment

Copy `.env.example` to `.env` and replace every secret before production deployment.

Required production values:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `COOKIE_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `WEB_ORIGIN`
- SMTP credentials for contact, consultation and career notifications.
- Cloudinary credentials when media upload is enabled.

## Local Docker Run

```powershell
copy .env.example .env
docker compose up --build
```

After the first database boot:

```powershell
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

Default seeded admin:

- Email: `saranya@insucareindia.com`
- Password: `ChangeMe@12345`

Change this password immediately after first login.

## Security Checklist

- Use long random JWT secrets and rotate them periodically.
- Keep admin routes behind HTTPS and a strong access policy.
- Store production secrets in a secret manager, not in Git.
- Enable SMTP SPF, DKIM and DMARC for domain deliverability.
- Review insurer logo usage and legal approvals before launch.
- Replace seeded admin credentials before production use.
- Configure backups and point-in-time recovery for PostgreSQL.

## SEO Checklist

- Confirm final domain in `NEXT_PUBLIC_SITE_URL`.
- Submit `/sitemap.xml` to Google Search Console.
- Verify `/robots.txt` allows public pages and blocks `/admin`.
- Add production Open Graph image when final brand artwork is available.
- Keep blog URLs stable and use canonical metadata.

## CI/CD Recommendation

Use a pipeline with these stages:

1. Install dependencies with a lockfile.
2. Run `npm run typecheck`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Run Prisma migrations against staging.
6. Build and push Docker images.
7. Deploy through a release job with health checks.

## Launch Notes

The brochure page at `/brochure` is optimized for browser print-to-PDF. For a dedicated generated PDF workflow, add a server-side renderer such as Playwright or React PDF in a later release.
