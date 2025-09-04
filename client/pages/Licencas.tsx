import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const DATA = [
  {
    id: "LIC-2024-0012",
    tipo: "LO",
    status: "Válida",
    empreendimento: "Fazenda Boa Vista",
    uf: "GO",
    validade: "12/09/2026",
  },
  {
    id: "LIC-2023-0145",
    tipo: "LP",
    status: "Pendente",
    empreendimento: "Usina Rio Verde",
    uf: "MT",
    validade: "15/10/2025",
  },
  {
    id: "LIC-2022-0981",
    tipo: "LI",
    status: "Em Análise",
    empreendimento: "Porto Amazônia",
    uf: "AM",
    validade: "-",
  },
  {
    id: "LIC-2021-0777",
    tipo: "LO",
    status: "Vencida",
    empreendimento: "Loteamento Serra Azul",
    uf: "MG",
    validade: "01/07/2024",
  },
];

export default function Licencas() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("todos");
  const [tipo, setTipo] = useState<string>("todos");

  const filtered = useMemo(() => {
    return DATA.filter((r) => {
      const matchesQ = q
        ? Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase())
        : true;
      const matchesStatus =
        status === "todos" ? true : r.status.toLowerCase() === status;
      const matchesTipo =
        tipo === "todos" ? true : r.tipo.toLowerCase() === tipo;
      return matchesQ && matchesStatus && matchesTipo;
    });
  }, [q, status, tipo]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Licenças</h1>
          <p className="text-muted-foreground">
            Gerencie todo o ciclo de vida das licenças ambientais
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Importar</Button>
          <Button asChild>
            <Link to="#">Nova Licença</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Buscar por ID, empreendimento, órgão..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="válida">Válida</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em análise">Em Análise</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="lp">LP</SelectItem>
              <SelectItem value="li">LI</SelectItem>
              <SelectItem value="lo">LO</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Licença</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Empreendimento</TableHead>
                <TableHead>UF</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{r.tipo}</Badge>
                  </TableCell>
                  <TableCell>{renderStatus(r.status)}</TableCell>
                  <TableCell>{r.empreendimento}</TableCell>
                  <TableCell>{r.uf}</TableCell>
                  <TableCell>{r.validade}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Ver
                    </Button>
                    <Button size="sm" variant="ghost">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function renderStatus(s: string) {
  const map: Record<string, string> = {
    Válida:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Pendente:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    "Em Análise":
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
    Vencida: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[s]}`}
    >
      {s}
    </span>
  );
}
