import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { testConnection } from "./routes/database";
import { login, register } from "./routes/auth";
import { tenantMiddleware } from "./tenant-middleware";
import { getEmpreendimentos, createEmpreendimento } from "./routes/empreendimentos";
import { getLicencas, createLicenca } from "./routes/licencas";
import { getEstudos, createEstudo } from "./routes/estudos";
import { getCondicionantes, createCondicionante } from "./routes/condicionantes";
import { getVistorias, createVistoria } from "./routes/vistorias";
import { getAgenda } from "./routes/agenda";
import { getProximos15Dias } from "./routes/proximos15dias";
import { upload, uploadLogo } from "./routes/upload";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "./routes/usuarios";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

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
  app.get("/api/tenant/licencas", getLicencas);
  app.post("/api/tenant/licencas", createLicenca);
  app.get("/api/tenant/estudos", getEstudos);
  app.post("/api/tenant/estudos", createEstudo);
  app.get("/api/tenant/condicionantes", getCondicionantes);
  app.post("/api/tenant/condicionantes", createCondicionante);
  app.get("/api/tenant/vistorias", getVistorias);
  app.post("/api/tenant/vistorias", createVistoria);
  app.get("/api/tenant/agenda", getAgenda);
  app.get("/api/tenant/proximos-15-dias", getProximos15Dias);
  app.post("/api/tenant/logo", upload.single('file'), uploadLogo);
  app.get("/api/tenant/usuarios", getUsuarios);
  app.post("/api/tenant/usuarios", createUsuario);
  app.put("/api/tenant/usuarios/:id", updateUsuario);
  app.delete("/api/tenant/usuarios/:id", deleteUsuario);

  return app;
}
