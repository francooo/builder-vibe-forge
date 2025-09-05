import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTenant } from "@/contexts/TenantContext";
import NovaCondicionanteForm from "@/components/forms/NovaCondicionanteForm";

const DATA = [
  {
    codigo: "C-01/2023",
    descricao: "Monitoramento da qualidade da água trimestral",
    responsavel: "Equipe Ambiental",
    prazo: "30/09/2025",
    status: "No prazo",
  },
  {
    codigo: "C-02/2023",
    descricao: "Relatório semestral de fauna",
    responsavel: "Bióloga Ana",
    prazo: "10/09/2025",
    status: "Prazo próximo",
  },
  {
    codigo: "C-07/2022",
    descricao: "Programa de Educação Ambiental - módulo II",
    responsavel: "Comunicação",
    prazo: "01/09/2025",
    status: "Em atraso",
  },
];

export default function Condicionantes() {
  const [condicionantes, setCondicionantes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { token } = useTenant();

  useEffect(() => {
    if (token) {
      fetchCondicionantes();
    }
  }, [token]);

  const fetchCondicionantes = async () => {
    try {
      const response = await fetch('/api/tenant/condicionantes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCondicionantes(data);
      }
    } catch (error) {
      console.error('Erro ao buscar condicionantes:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Condicionantes</h1>
        </div>
        <Button onClick={() => setShowForm(true)}>Nova Condicionante</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {condicionantes.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.codigo}</TableCell>
                  <TableCell className="max-w-xl truncate" title={r.descricao}>
                    {r.descricao}
                  </TableCell>
                  <TableCell>{r.responsavel}</TableCell>
                  <TableCell>{r.prazo ? new Date(r.prazo).toLocaleDateString('pt-BR') : '-'}</TableCell>
                  <TableCell>{statusPill(r.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <NovaCondicionanteForm 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        onSuccess={fetchCondicionantes}
      />
    </div>
  );
}

function statusPill(s: string) {
  const map: Record<string, string> = {
    "No prazo":
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    "Prazo próximo":
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    "Em atraso":
      "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[s]}`}
    >
      {s}
    </span>
  );
}
