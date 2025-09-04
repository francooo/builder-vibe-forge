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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Estudos Ambientais
        </h1>
        <p className="text-muted-foreground">
          Gestão de EIA/RIMA, RCA, PCA, PRAD e mais
        </p>
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
              {DATA.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.doc}</TableCell>
                  <TableCell>{r.empreendimento}</TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                  <TableCell>{r.orgao}</TableCell>
                  <TableCell>{r.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
