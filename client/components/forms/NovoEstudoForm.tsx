import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';

interface NovoEstudoFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NovoEstudoForm({ open, onClose, onSuccess }: NovoEstudoFormProps) {
  const [formData, setFormData] = useState({
    tipo: '',
    empreendimento_id: '',
    status: 'Em elaboração',
    orgao: ''
  });
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useTenant();

  useEffect(() => {
    if (open) {
      fetchEmpreendimentos();
    }
  }, [open]);

  const fetchEmpreendimentos = async () => {
    try {
      const response = await fetch('/api/tenant/empreendimentos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmpreendimentos(data);
      }
    } catch (error) {
      console.error('Erro ao buscar empreendimentos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tenant/estudos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setFormData({
          tipo: '',
          empreendimento_id: '',
          status: 'Em elaboração',
          orgao: ''
        });
      }
    } catch (error) {
      console.error('Erro ao criar estudo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Estudo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EIA-RIMA">EIA-RIMA</SelectItem>
                <SelectItem value="PCA">PCA</SelectItem>
                <SelectItem value="RCA">RCA</SelectItem>
                <SelectItem value="PRAD">PRAD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="empreendimento">Empreendimento</Label>
            <Select value={formData.empreendimento_id} onValueChange={(value) => setFormData({...formData, empreendimento_id: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o empreendimento" />
              </SelectTrigger>
              <SelectContent>
                {empreendimentos.map((emp: any) => (
                  <SelectItem key={emp.id} value={emp.id.toString()}>{emp.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Em elaboração">Em elaboração</SelectItem>
                <SelectItem value="Em análise">Em análise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="orgao">Órgão</Label>
            <Input
              id="orgao"
              value={formData.orgao}
              onChange={(e) => setFormData({...formData, orgao: e.target.value})}
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}