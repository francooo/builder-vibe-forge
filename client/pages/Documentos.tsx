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

const DOCS = [
  {
    nome: "Modelo - Requerimento de Licença",
    tipo: "Modelo",
    atualizado: "01/08/2025",
  },
  {
    nome: "Check-list de Renovação LO",
    tipo: "Checklist",
    atualizado: "17/07/2025",
  },
  {
    nome: "Plano de Monitoramento - Água",
    tipo: "Procedimento",
    atualizado: "09/06/2025",
  },
];

export default function Documentos() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">
            Repositório de arquivos e modelos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Nova Pasta</Button>
          <Button>Enviar</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DOCS.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.nome}</TableCell>
                  <TableCell>{d.tipo}</TableCell>
                  <TableCell>{d.atualizado}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Baixar
                    </Button>
                    <Button size="sm" variant="ghost">
                      Renomear
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
