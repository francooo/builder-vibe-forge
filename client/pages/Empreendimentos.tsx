import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DATA = [
  { nome: "Fazenda Boa Vista", cnpj: "12.345.678/0001-99", municipio: "Goiânia/GO", atividade: "Agropecuária", licencas: 4 },
  { nome: "Usina Rio Verde", cnpj: "98.765.432/0001-11", municipio: "Cuiabá/MT", atividade: "Geração de Energia", licencas: 6 },
  { nome: "Porto Amazônia", cnpj: "01.234.567/0001-22", municipio: "Manaus/AM", atividade: "Logística Portuária", licencas: 3 },
];

export default function Empreendimentos() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Empreendimentos</h1>
          <p className="text-muted-foreground">Cadastro de empreendimentos e empresas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Importar</Button>
          <Button>Novo Empreendimento</Button>
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
          <CardTitle>Lista</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empreendimento</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Município/UF</TableHead>
                <TableHead>Atividade</TableHead>
                <TableHead className="text-right">Licenças</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DATA.map((r) => (
                <TableRow key={r.cnpj}>
                  <TableCell className="font-medium">{r.nome}</TableCell>
                  <TableCell>{r.cnpj}</TableCell>
                  <TableCell>{r.municipio}</TableCell>
                  <TableCell>{r.atividade}</TableCell>
                  <TableCell className="text-right">{r.licencas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
