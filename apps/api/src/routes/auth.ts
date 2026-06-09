import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config.js";
import { prisma } from "../db.js";
import { ApiError } from "../middleware/error.js";
import { authRateLimiter } from "../middleware/security.js";
import { compareToken, hashToken, signAccessToken, signRefreshToken } from "../utils/tokens.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

authRouter.post("/login", authRateLimiter, async (req, res, next) => {
  try {
    const values = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: values.email } });
    if (!user || !user.isActive) throw new ApiError(401, "Invalid credentials");

    const ok = await bcrypt.compare(values.password, user.passwordHash);
    if (!ok) throw new ApiError(401, "Invalid credentials");

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    await prisma.user.update({ where: { id: user.id }, data: { refreshHash: await hashToken(refreshToken) } });
    await prisma.auditLog.create({ data: { userId: user.id, action: "LOGIN", entity: "User", entityId: user.id, ipAddress: req.ip } });

    res.json({ accessToken, refreshToken, user: payload });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const refreshToken = z.object({ refreshToken: z.string().min(1) }).parse(req.body).refreshToken;
    const payload = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as { id: string; email: string; role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER" };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || !(await compareToken(refreshToken, user.refreshHash))) throw new ApiError(401, "Invalid refresh token");
    const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    const { userId } = z.object({ userId: z.string().min(1) }).parse(req.body);
    await prisma.user.update({ where: { id: userId }, data: { refreshHash: null } });
    res.json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
});
