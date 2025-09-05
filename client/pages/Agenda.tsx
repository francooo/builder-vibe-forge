import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import { useTenant } from "@/contexts/TenantContext";
import { CalendarDays, Clock, FileText } from "lucide-react";

const PRAZOS = [
  {
    data: new Date(),
    titulo: "Relatório de monitoramento trimestral",
    tipo: "Condicionante",
    ref: "C-01/2023",
  },
  {
    data: addDays(new Date(), 3),
    titulo: "Protocolo de renovação LO",
    tipo: "Licença",
    ref: "LIC-2021-0777",
  },
  {
    data: addDays(new Date(), 9),
    titulo: "Vistoria de campo - Rio Verde",
    tipo: "Vistoria",
    ref: "VIS-2025-019",
  },
];

export default function Agenda() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [agenda, setAgenda] = useState([]);
  const { token } = useTenant();

  useEffect(() => {
    if (token) {
      fetchAgenda();
    }
  }, [token]);

  const fetchAgenda = async () => {
    try {
      const response = await fetch('/api/tenant/agenda', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAgenda(data);
      }
    } catch (error) {
      console.error('Erro ao buscar agenda:', error);
    }
  };

  const [licencasData, setLicencasData] = useState([]);
  
  const selectedDateEvents = useMemo(() => {
    if (!selected) return [];
    return licencasData;
  }, [selected, licencasData]);
  
  const carregarAtividades = async (dataSelecionada: Date) => {
    if (!token || !dataSelecionada) return;
    
    try {
      const dateStr = dataSelecionada.toISOString().split('T')[0];
      const response = await fetch(`/api/tenant/licencas?validade=${dateStr}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLicencasData(data);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      setLicencasData([]);
    }
  };
  
  useEffect(() => {
    if (selected) {
      carregarAtividades(selected);
    }
  }, [selected, token]);

  const [proximos15Dias, setProximos15Dias] = useState({ count: 0, items: [] });
  
  const fetchProximos15Dias = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/tenant/proximos-15-dias', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProximos15Dias(data);
      }
    } catch (error) {
      console.error('Erro ao buscar próximos 15 dias:', error);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchProximos15Dias();
    }
  }, [token]);
  
  const groupedByDate = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    proximos15Dias.items.forEach((item: any) => {
      const dateKey = new Date(item.validade).toLocaleDateString('pt-BR');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    
    return groups;
  }, [proximos15Dias.items]);

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'Condicionante': return <FileText className="size-4" />;
      case 'Licença': return <CalendarDays className="size-4" />;
      case 'Vistoria': return <Clock className="size-4" />;
      default: return <FileText className="size-4" />;
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'Condicionante': return 'bg-blue-100 text-blue-800';
      case 'Licença': return 'bg-green-100 text-green-800';
      case 'Vistoria': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
      </div>
      
      {/* 1. Bloco Calendário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" />
            Calendário
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CustomCalendar
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              carregarAtividades(date);
            }}
            className="border rounded-md"
          />
        </CardContent>
      </Card>

      {/* 2. Bloco Atividades da Data Selecionada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Atividades {selected ? `- ${formatDate(selected)}` : ''}
            </span>
            {selectedDateEvents.length > 0 && (
              <Badge variant="secondary">{selectedDateEvents.length} atividades</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="size-12 mx-auto mb-4 opacity-50" />
              <p>{selected ? 'Nenhuma atividade para esta data' : 'Selecione uma data no calendário'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map((licenca: any) => (
                <div key={licenca.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="mt-1">
                    <CalendarDays className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{licenca.numero}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {licenca.empreendimento_nome || 'Empreendimento não informado'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">{licenca.tipo}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Validade: {new Date(licenca.data_vencimento).toLocaleDateString('pt-BR')}
                      </span>
                      <Badge variant="outline">{licenca.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. Bloco Próximos 15 Dias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Próximos 15 dias</span>
            <Badge variant="outline">{proximos15Dias.count} atividades</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {proximos15Dias.count === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="size-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma atividade nos próximos 15 dias</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedByDate).map(([date, items]) => (
                <div key={date} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground border-b pb-1">
                    {date} ({items.length} licenças)
                  </h4>
                  <div className="space-y-2">
                    {items.map((licenca: any) => {
                      const isUrgent = licenca.urgencia !== null && licenca.urgencia <= 3;
                      const licencaDate = new Date(licenca.validade);
                      
                      return (
                        <div 
                          key={licenca.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${
                            isUrgent ? 'bg-red-50 border-red-200' : 'bg-card'
                          }`}
                          onClick={() => setSelected(licencaDate)}
                        >
                          <CalendarDays className="size-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium truncate">{licenca.nome}</h5>
                            <p className="text-sm text-muted-foreground truncate">
                              {licenca.responsavel || 'Responsável não informado'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">{licenca.tipo}</Badge>
                            <Badge variant="outline">{licenca.status}</Badge>
                            {isUrgent && (
                              <Badge variant="destructive">
                                {licenca.urgencia === 0 ? 'Vence hoje' : `${licenca.urgencia}d`}
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d?: Date) {
  if (!d) return "-";
  return d.toLocaleDateString("pt-BR");
}
