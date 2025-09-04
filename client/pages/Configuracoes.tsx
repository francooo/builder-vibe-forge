import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Configuracoes() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Preferências e integrações do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome da organização</Label>
              <Input placeholder="EcoLicenças LTDA" />
            </div>
            <div>
              <Label>Fuso horário</Label>
              <Input placeholder="America/Sao_Paulo" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <Label>Modo escuro</Label>
              <p className="text-xs text-muted-foreground">
                Ativar tema escuro
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <Label>Alertas por e-mail</Label>
              <p className="text-xs text-muted-foreground">
                Receber notificações de prazos
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button>Salvar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border p-4">
            <div className="font-medium">Mapas</div>
            <p className="text-sm text-muted-foreground">Mapbox, Google Maps</p>
            <Button variant="outline" className="mt-3">
              Conectar
            </Button>
          </div>
          <div className="rounded-md border p-4">
            <div className="font-medium">Armazenamento</div>
            <p className="text-sm text-muted-foreground">S3, Supabase</p>
            <Button variant="outline" className="mt-3">
              Conectar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
