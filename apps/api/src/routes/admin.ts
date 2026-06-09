import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { verifyCsrf } from "../middleware/security.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, verifyCsrf);

adminRouter.get("/dashboard", async (_req, res) => {
  const [enquiries, applications, services, blogs, partners, testimonials] = await Promise.all([
    prisma.enquiry.count(),
    prisma.application.count(),
    prisma.service.count(),
    prisma.blog.count(),
    prisma.partner.count(),
    prisma.testimonial.count()
  ]);
  res.json({ enquiries, applications, services, blogs, partners, testimonials });
});

adminRouter.get("/enquiries", async (_req, res) => {
  const data = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  res.json({ data });
});

adminRouter.patch("/enquiries/:id", requireRole("SUPER_ADMIN", "ADMIN", "EDITOR"), async (req, res, next) => {
  try {
    const status = z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"]).parse(req.body.status);
    const data = await prisma.enquiry.update({ where: { id: String(req.params.id) }, data: { status } });
    await prisma.auditLog.create({ data: { userId: req.user?.id, action: "UPDATE_STATUS", entity: "Enquiry", entityId: data.id, ipAddress: req.ip } });
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/export/enquiries.csv", async (_req, res) => {
  const data = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  const csv = toCsv(data);
  res.header("Content-Type", "text/csv");
  res.attachment("insucare-enquiries.csv");
  res.send(csv);
});

function toCsv(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return "id,name,email,phone,interest,message,source,status,createdAt\n";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
}
