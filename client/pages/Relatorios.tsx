import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  Area,
  AreaChart,
} from "recharts";

const SERIES = [
  { month: "Jan", novas: 5, renovacoes: 2 },
  { month: "Fev", novas: 8, renovacoes: 3 },
  { month: "Mar", novas: 6, renovacoes: 4 },
  { month: "Abr", novas: 10, renovacoes: 5 },
  { month: "Mai", novas: 7, renovacoes: 6 },
  { month: "Jun", novas: 12, renovacoes: 3 },
];

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Indicadores e exportação</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">PDF</Button>
          <Button variant="outline">CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Licenças emitidas (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                novas: { label: "Novas" },
                renovacoes: { label: "Renovações" },
              }}
              className="h-[280px]"
            >
              <LineChart data={SERIES}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="novas"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="renovacoes"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Backlog (em análise)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ pendentes: { label: "Pendentes" } }}
              className="h-[280px]"
            >
              <AreaChart
                data={SERIES.map((d) => ({
                  month: d.month,
                  pendentes: Math.round((d.novas + d.renovacoes) * 0.7),
                }))}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey="pendentes"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
