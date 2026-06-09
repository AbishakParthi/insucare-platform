import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { apiRateLimiter, helmetMiddleware, issueCsrfToken } from "./middleware/security.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { publicRouter } from "./routes/public.js";

export function createApp() {
  const app = express();

  app.use(helmetMiddleware);
  app.use(
    cors({
      origin: config.WEB_ORIGIN,
      credentials: true
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(apiRateLimiter);
  app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/api/v1/csrf-token", issueCsrfToken);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1", publicRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
