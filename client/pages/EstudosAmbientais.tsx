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
import NovoEstudoForm from "@/components/forms/NovoEstudoForm";

const DATA = [
  {
    doc: "EIA-RIMA",
    empreendimento: "Usina Rio Verde",
    status: "Aprovado",
    orgao: "SEMA/MT",
    data: "22/07/2024",
  },
  {
    doc: "PCA",
    empreendimento: "Fazenda Boa Vista",
    status: "Em elaboração",
    orgao: "SEMAD/GO",
    data: "-",
  },
  {
    doc: "RCA",
    empreendimento: "Porto Amazônia",
    status: "Em análise",
    orgao: "SEMA/AM",
    data: "05/08/2025",
  },
];

export default function EstudosAmbientais() {
  const [estudos, setEstudos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { token } = useTenant();

  useEffect(() => {
    if (token) {
      fetchEstudos();
    }
  }, [token]);

  const fetchEstudos = async () => {
    try {
      const response = await fetch('/api/tenant/estudos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEstudos(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estudos:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Estudos Ambientais
          </h1>
        </div>
        <Button onClick={() => setShowForm(true)}>Novo Estudo</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Empreendimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Órgão</TableHead>
                <TableHead>Última atualização</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estudos.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.tipo}</TableCell>
                  <TableCell>{r.empreendimento_nome || 'N/A'}</TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                  <TableCell>{r.orgao}</TableCell>
                  <TableCell>{r.data_protocolo ? new Date(r.data_protocolo).toLocaleDateString('pt-BR') : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <NovoEstudoForm 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        onSuccess={fetchEstudos}
      />
    </div>
  );
}

function statusBadge(s: string) {
  const map: Record<string, string> = {
    Aprovado:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    "Em elaboração":
      "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    "Em análise":
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  };
  return <Badge className={`border-0 ${map[s]}`}>{s}</Badge>;
}
