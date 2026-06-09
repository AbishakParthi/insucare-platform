import { config } from "./config.js";
import { prisma } from "./db.js";
import { createApp } from "./app.js";

const app = createApp();

const server = app.listen(config.PORT, () => {
  console.log(`InsuCARE API listening on port ${config.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received. Closing API server.`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
