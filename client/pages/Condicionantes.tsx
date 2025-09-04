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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Condicionantes</h1>
        <p className="text-muted-foreground">
          Controle de condicionantes e obrigações
        </p>
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
              {DATA.map((r) => (
                <TableRow key={r.codigo}>
                  <TableCell className="font-medium">{r.codigo}</TableCell>
                  <TableCell className="max-w-xl truncate" title={r.descricao}>
                    {r.descricao}
                  </TableCell>
                  <TableCell>{r.responsavel}</TableCell>
                  <TableCell>{r.prazo}</TableCell>
                  <TableCell>{statusPill(r.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
