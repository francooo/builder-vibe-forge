import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTenant } from '@/contexts/TenantContext';

interface NovoEmpreendimentoFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NovoEmpreendimentoForm({ open, onClose, onSuccess }: NovoEmpreendimentoFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    municipio: '',
    uf: '',
    atividade: ''
  });
  const [loading, setLoading] = useState(false);
  const { token } = useTenant();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tenant/empreendimentos', {
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
          nome: '',
          cnpj: '',
          municipio: '',
          uf: '',
          atividade: ''
        });
      }
    } catch (error) {
      console.error('Erro ao criar empreendimento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Empreendimento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Empreendimento</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="municipio">Município</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => setFormData({...formData, municipio: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                value={formData.uf}
                onChange={(e) => setFormData({...formData, uf: e.target.value})}
                maxLength={2}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="atividade">Atividade</Label>
            <Input
              id="atividade"
              value={formData.atividade}
              onChange={(e) => setFormData({...formData, atividade: e.target.value})}
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