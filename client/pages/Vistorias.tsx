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
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vistorias</h1>
          <p className="text-muted-foreground">
            Planejamento e registro de vistorias e auditorias
          </p>
        </div>
        <Button>Novo agendamento</Button>
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
              {DATA.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.data}</TableCell>
                  <TableCell>{r.empreendimento}</TableCell>
                  <TableCell>{r.tipo}</TableCell>
                  <TableCell>{r.responsavel}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
