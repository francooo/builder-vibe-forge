import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTenant } from "@/contexts/TenantContext";
import NovoEmpreendimentoForm from "@/components/forms/NovoEmpreendimentoForm";

interface Empreendimento {
  id: number;
  nome: string;
  cnpj: string;
  municipio: string;
  uf: string;
  atividade: string;
}

export default function Empreendimentos() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { token, tenant } = useTenant();

  useEffect(() => {
    if (token) {
      fetchEmpreendimentos();
    }
  }, [token]);

  const fetchEmpreendimentos = async () => {
    try {
      const response = await fetch('/api/tenant/empreendimentos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmpreendimentos(data);
      }
    } catch (error) {
      console.error('Erro ao buscar empreendimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Empreendimentos</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Importar</Button>
          <Button onClick={() => setShowForm(true)}>Novo Empreendimento</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Buscar por nome, CNPJ ou município" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista ({empreendimentos.length} empreendimentos)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empreendimento</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Município/UF</TableHead>
                <TableHead>Atividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empreendimentos.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.nome}</TableCell>
                  <TableCell>{emp.cnpj}</TableCell>
                  <TableCell>{emp.municipio}/{emp.uf}</TableCell>
                  <TableCell>{emp.atividade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <NovoEmpreendimentoForm 
        open={showForm} 
        onClose={() => setShowForm(false)} 
        onSuccess={fetchEmpreendimentos}
      />
    </div>
  );
}
