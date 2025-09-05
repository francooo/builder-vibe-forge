import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTenant } from "@/contexts/TenantContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Upload, Users as UsersIcon, Edit, Trash2 } from "lucide-react";

export default function Configuracoes() {
  const { logout, tenant, token, setTenant } = useTenant();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [usuarios, setUsuarios] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userForm, setUserForm] = useState({
    nome: '',
    email: '',
    senha: '',
    papel: 'Colaborador'
  });

  useEffect(() => {
    if (token) {
      fetchUsuarios();
    }
  }, [token]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('/api/tenant/usuarios', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/tenant/logo', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        const updatedTenant = { ...tenant, logo_url: data.logo_url };
        setTenant(updatedTenant);
        
        // Mostrar popup de sucesso
        alert('Logo atualizado com sucesso!');
      } else {
        alert('Erro ao fazer upload do logo');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload do logo');
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingUser 
        ? `/api/tenant/usuarios/${editingUser.id}`
        : '/api/tenant/usuarios';
      
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userForm)
      });

      if (response.ok) {
        fetchUsuarios();
        setShowUserForm(false);
        setEditingUser(null);
        setUserForm({ nome: '', email: '', senha: '', papel: 'Colaborador' });
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      const response = await fetch(`/api/tenant/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const openEditUser = (user: any) => {
    setEditingUser(user);
    setUserForm({
      nome: user.nome,
      email: user.email,
      senha: '',
      papel: user.papel
    });
    setShowUserForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
              <Input value={tenant?.nome || ''} readOnly />
            </div>
            <div>
              <Label>Fuso horário</Label>
              <Input placeholder="America/Sao_Paulo" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Logo da Empresa</Label>
            <div className="flex items-center gap-4">
              {tenant?.logo_url ? (
                <img 
                  src={tenant.logo_url} 
                  alt="Logo atual" 
                  className="h-16 w-auto max-w-[200px] object-contain border rounded p-2"
                />
              ) : (
                <div className="h-16 w-32 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                  Sem logo
                </div>
              )}
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="size-4" />
                Alterar Logo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: PNG, JPG, SVG. Tamanho máximo: 2MB.
            </p>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UsersIcon className="size-5" />
              Usuários da Empresa
            </span>
            <Button onClick={() => setShowUserForm(true)}>
              Novo Usuário
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.papel === 'Admin' ? 'default' : 'secondary'}>
                      {user.papel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => openEditUser(user)}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

      <Card>
        <CardHeader>
          <CardTitle>Sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Sair do sistema</Label>
              <p className="text-sm text-muted-foreground">
                Fazer logout e voltar para a tela de login
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={userForm.nome}
                onChange={(e) => setUserForm({...userForm, nome: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="senha">Senha {editingUser && '(deixe vazio para manter)'}</Label>
              <Input
                id="senha"
                type="password"
                value={userForm.senha}
                onChange={(e) => setUserForm({...userForm, senha: e.target.value})}
                required={!editingUser}
                minLength={8}
              />
            </div>
            <div>
              <Label htmlFor="papel">Papel</Label>
              <Select value={userForm.papel} onValueChange={(value) => setUserForm({...userForm, papel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Colaborador">Colaborador</SelectItem>
                  <SelectItem value="Visualizador">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowUserForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingUser ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
