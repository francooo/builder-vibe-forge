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
import { Button } from "@/components/ui/button";

const USERS = [
  {
    nome: "Andrews Franco",
    email: "andrews@example.com",
    perfil: "Admin",
    status: "Ativo",
  },
  {
    nome: "Maria Silva",
    email: "maria@example.com",
    perfil: "Gestor",
    status: "Ativo",
  },
  {
    nome: "João Souza",
    email: "joao@example.com",
    perfil: "Analista",
    status: "Inativo",
  },
];

export default function Equipe() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipe</h1>
          <p className="text-muted-foreground">
            Gerencie usuários e permissões
          </p>
        </div>
        <Button>Novo usuário</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((u, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{u.nome}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{u.perfil}</Badge>
                  </TableCell>
                  <TableCell>
                    {u.status === "Ativo" ? (
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge
                        className="bg-muted text-foreground/70"
                        variant="secondary"
                      >
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost">
                      Remover
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
