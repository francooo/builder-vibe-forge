import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export default function Mapa() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mapa Geoespacial</h1>
        <p className="text-muted-foreground">
          Visualize empreendimentos, áreas de influência e camadas ambientais
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Camadas</CardTitle>
          <div className="flex gap-2 text-xs">
            <Badge variant="outline">Licenças</Badge>
            <Badge variant="outline">UCs</Badge>
            <Badge variant="outline">Hidrografia</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-emerald-200 via-sky-200 to-amber-100 dark:from-emerald-950 dark:via-sky-950 dark:to-amber-950 overflow-hidden">
              <svg
                className="size-full opacity-30"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-background/80 px-3 py-1 text-sm shadow">
                  Integre um provedor de mapas (Mapbox, Google Maps) para
                  funcionalidade completa
                </div>
              </div>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  );
}
