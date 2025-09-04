import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { testConnection } from "./routes/database";
import { login, register } from "./routes/auth";
import { tenantMiddleware } from "./tenant-middleware";
import { getEmpreendimentos, createEmpreendimento } from "./routes/empreendimentos";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Public routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);
  app.get("/api/db-test", testConnection);
  app.post("/api/auth/login", login);
  app.post("/api/auth/register", register);

  // Protected routes (require tenant authentication)
  app.use("/api/tenant", tenantMiddleware);
  app.get("/api/tenant/empreendimentos", getEmpreendimentos);
  app.post("/api/tenant/empreendimentos", createEmpreendimento);

  return app;
}
