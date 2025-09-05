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
import { Button } from "@/components/ui/button";
import { useTenant } from "@/contexts/TenantContext";
import NovaVistoriaForm from "@/components/forms/NovaVistoriaForm";

const DATA = [
  {
    data: "05/09/2025",
    empreendimento: "Fazenda Boa Vista",
    tipo: "Campo",
    responsavel: "João",
    status: "Agendada",
  },
  {
    data: "12/09/2025",
    empreendimento: "Porto Amazônia",
    tipo: "Auditoria",
    responsavel: "Maria",
    status: "Aguardando",
  },
  {
    data: "20/09/2025",
    empreendimento: "Usina Rio Verde",
    tipo: "Campo",
    responsavel: "Lucas",
    status: "Agendada",
  },
];

export default function Vistorias() {
  const [vistorias, setVistorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { token } = useTenant();

  useEffect(() => {
    if (token) {
      fetchVistorias();
    }
  }, [token]);

  const fetchVistorias = async () => {
    try {
      const response = await fetch('/api/tenant/vistorias', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setVistorias(data);
      }
    } catch (error) {
      console.error('Erro ao buscar vistorias:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vistorias</h1>
        </div>
        <Button onClick={() => setShowForm(true)}>Novo agendamento</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Empreendimento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vistorias.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{new Date(r.data_agendada).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{r.empreendimento_nome || 'N/A'}</TableCell>
                  <TableCell>{r.tipo}</TableCell>
                  <TableCell>{r.responsavel}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <NovaVistoriaForm 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        onSuccess={fetchVistorias}
      />
    </div>
  );
}
