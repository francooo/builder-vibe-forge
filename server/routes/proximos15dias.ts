import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getProximos15Dias(req: TenantRequest, res: Response) {
  try {
    const query = `
      SELECT 
        l.id, 
        l.numero as nome, 
        l.tipo, 
        l.data_vencimento as validade, 
        l.status,
        e.nome as responsavel
      FROM licencas l
      LEFT JOIN empreendimentos e ON l.empreendimento_id = e.id
      WHERE l.tenant_id = $1
        AND l.data_vencimento IS NOT NULL
        AND l.data_vencimento::date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '14 days')
      ORDER BY l.data_vencimento ASC, l.numero ASC
    `;
    
    const result = await pool.query(query, [req.tenantId]);
    
    const items = result.rows.map((item: any) => {
      const hoje = new Date();
      const validade = new Date(item.validade);
      const diasRestantes = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        ...item,
        dias_restantes: diasRestantes,
        urgencia: diasRestantes <= 3 ? diasRestantes : null
      };
    });
    
    res.json({
      count: items.length,
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items
    });
  } catch (error) {
    console.error('Erro na API próximos 15 dias:', error);
    res.status(500).json({ error: 'Erro ao buscar próximos 15 dias' });
  }
}