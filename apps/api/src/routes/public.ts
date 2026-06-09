import { Router } from "express";
import { z } from "zod";
import { blogCategories, blogs, jobs, partners, serviceCategories, services, testimonials } from "@insucare/domain";
import { prisma } from "../db.js";
import { notifyEnquiry } from "../services/email.js";

export const publicRouter = Router();

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  interest: z.string().min(2),
  message: z.string().min(10),
  source: z.string().default("website")
});

const applicationSchema = enquirySchema.extend({
  careerSlug: z.string().optional(),
  resumeUrl: z.string().url().optional()
});

publicRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "insucare-api" });
});

publicRouter.get("/services", (_req, res) => {
  res.json({ categories: serviceCategories, data: services });
});

publicRouter.get("/blogs", (_req, res) => {
  res.json({ categories: blogCategories, data: blogs });
});

publicRouter.get("/partners", (_req, res) => {
  res.json({ data: partners });
});

publicRouter.get("/testimonials", (_req, res) => {
  res.json({ data: testimonials });
});

publicRouter.get("/careers", (_req, res) => {
  res.json({ data: jobs });
});

publicRouter.post("/enquiries", async (req, res, next) => {
  try {
    const values = enquirySchema.parse(req.body);
    const enquiry = await prisma.enquiry.create({ data: values });
    await notifyEnquiry(values);
    res.status(201).json({ message: "Enquiry submitted", data: enquiry });
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/applications", async (req, res, next) => {
  try {
    const values = applicationSchema.parse(req.body);
    const career = values.careerSlug ? await prisma.career.findUnique({ where: { slug: values.careerSlug } }) : null;
    const application = await prisma.application.create({
      data: {
        careerId: career?.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        resumeUrl: values.resumeUrl
      }
    });
    await notifyEnquiry({ ...values, interest: `Career: ${values.interest}` });
    res.status(201).json({ message: "Application submitted", data: application });
  } catch (error) {
    next(error);
  }
});
