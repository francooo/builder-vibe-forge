import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const statusData = [
  { name: "Válidas", total: 42, fill: "hsl(var(--primary))" },
  { name: "Pendente", total: 18, fill: "#f59e0b" },
  { name: "Em Análise", total: 27, fill: "#06b6d4" },
  { name: "Vencidas", total: 6, fill: "#ef4444" },
];

const proximosPrazos = [
  { id: "LIC-2024-0012", empreendimento: "Fazenda Boa Vista", vencimento: "12/09/2025", tipo: "LO", dias: 7 },
  { id: "LIC-2023-0145", empreendimento: "Usina Rio Verde", vencimento: "15/09/2025", tipo: "LP", dias: 10 },
  { id: "LIC-2022-0981", empreendimento: "Porto Amazônia", vencimento: "19/09/2025", tipo: "LI", dias: 14 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Painel Ambiental</h1>
          <p className="text-muted-foreground">Visão geral do CRM de licenciamento ambiental</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/relatorios">Exportar</Link></Button>
          <Button asChild><Link to="/licencas">Nova Licença</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <Metric title="Licenças Ativas" value="42" trend="+5%" className="bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/30" />
        <Metric title="Próximos Prazos (30d)" value="18" trend="+2" className="bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/30" />
        <Metric title="Em Análise" value="27" trend="-3" className="bg-gradient-to-br from-cyan-50 to-transparent dark:from-cyan-950/30" />
        <Metric title="Em Atraso" value="6" trend="+1" className="bg-gradient-to-br from-rose-50 to-transparent dark:from-rose-950/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Status das licenças</CardTitle>
            <Badge variant="secondary">Atualizado hoje</Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ total: { label: "Licenças" } }}
              className="h-[280px] w-full"
            >
              <BarChart data={statusData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="total" radius={6} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximos prazos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Licença</TableHead>
                  <TableHead>Empreendimento</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Dias</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proximosPrazos.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>{p.empreendimento}</TableCell>
                    <TableCell>{p.vencimento} <Badge variant="outline" className="ml-1">{p.tipo}</Badge></TableCell>
                    <TableCell className="text-right">{p.dias}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ title, value, trend, className }: { title: string; value: string; trend: string; className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">{trend} este mês</Badge>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
