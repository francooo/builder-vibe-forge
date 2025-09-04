import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const PRAZOS = [
  {
    data: new Date(),
    titulo: "Relatório de monitoramento trimestral",
    tipo: "Condicionante",
    ref: "C-01/2023",
  },
  {
    data: addDays(new Date(), 3),
    titulo: "Protocolo de renovação LO",
    tipo: "Licença",
    ref: "LIC-2021-0777",
  },
  {
    data: addDays(new Date(), 9),
    titulo: "Vistoria de campo - Rio Verde",
    tipo: "Vistoria",
    ref: "VIS-2025-019",
  },
];

export default function Agenda() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximos 15 dias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRAZOS.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {formatDate(p.data)}
                  </TableCell>
                  <TableCell>{p.titulo}</TableCell>
                  <TableCell>{p.tipo}</TableCell>
                  <TableCell>{p.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d?: Date) {
  if (!d) return "-";
  return d.toLocaleDateString("pt-BR");
}
