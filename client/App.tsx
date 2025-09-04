import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Licencas from "./pages/Licencas";
import Empreendimentos from "./pages/Empreendimentos";
import EstudosAmbientais from "./pages/EstudosAmbientais";
import Condicionantes from "./pages/Condicionantes";
import Vistorias from "./pages/Vistorias";
import Agenda from "./pages/Agenda";
import Mapa from "./pages/Mapa";
import Documentos from "./pages/Documentos";
import Equipe from "./pages/Equipe";
import Configuracoes from "./pages/Configuracoes";
import Relatorios from "./pages/Relatorios";
import Login from "./pages/Login";
import { TenantProvider, useTenant } from "./contexts/TenantContext";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { isAuthenticated } = useTenant();
  
  if (!isAuthenticated) {
    return <Routes><Route path="*" element={<Login />} /></Routes>;
  }
  
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/licencas" element={<Licencas />} />
        <Route path="/empreendimentos" element={<Empreendimentos />} />
        <Route path="/estudos" element={<EstudosAmbientais />} />
        <Route path="/condicionantes" element={<Condicionantes />} />
        <Route path="/vistorias" element={<Vistorias />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TenantProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
