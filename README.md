# InsuCARE Enterprise Insurance Broking Platform

Premium enterprise website and API for **Insucare India Insurance Broking Pvt Ltd**.

## Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack Query-ready architecture
- Express.js, TypeScript, JWT auth, refresh tokens, RBAC, Helmet, rate limiting, CSRF token support
- PostgreSQL with Prisma ORM
- Docker Compose with PostgreSQL, API, Web and Nginx

## Key Routes

- `/` Home
- `/about`
- `/services`
- `/services/[slug]`
- `/claims-assistance`
- `/insurance-partners`
- `/blogs`
- `/careers`
- `/contact`
- `/admin`
- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`
- `/brochure`

## API Routes

- `GET /api/v1/health`
- `GET /api/v1/services`
- `GET /api/v1/blogs`
- `GET /api/v1/partners`
- `GET /api/v1/testimonials`
- `GET /api/v1/careers`
- `POST /api/v1/enquiries`
- `POST /api/v1/applications`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/export/enquiries.csv`

## Getting Started

```powershell
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

In another terminal:

```powershell
npm run dev:api
```

## Production

See [docs/production-setup.md](docs/production-setup.md).
