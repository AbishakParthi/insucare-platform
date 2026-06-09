import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config.js";

type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

export function signAccessToken(payload: { id: string; email: string; role: Role }) {
  const options: SignOptions = { expiresIn: config.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, options);
}

export function signRefreshToken(payload: { id: string; email: string; role: Role }) {
  const options: SignOptions = { expiresIn: config.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, options);
}

export async function hashToken(token: string) {
  return bcrypt.hash(token, 12);
}

export async function compareToken(token: string, hash?: string | null) {
  if (!hash) return false;
  return bcrypt.compare(token, hash);
}
