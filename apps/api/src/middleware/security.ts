import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { ApiError } from "./error.js";

export const helmetMiddleware = (helmet as any)({
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

export const apiRateLimiter = (rateLimit as any)({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});

export const authRateLimiter = (rateLimit as any)({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false
});

export function issueCsrfToken(_req: Request, res: Response) {
  const token = crypto.randomBytes(32).toString("hex");
  res.cookie("csrfToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ csrfToken: token });
}

export function verifyCsrf(req: Request, _res: Response, next: NextFunction) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.header("x-csrf-token");
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return next(new ApiError(403, "Invalid CSRF token"));
  }
  next();
}
