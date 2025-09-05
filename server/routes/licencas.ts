import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getLicencas(req: TenantRequest, res: Response) {
  try {
    const { validade } = req.query;
    
    let query = `
      SELECT l.*, e.nome as empreendimento_nome 
      FROM licencas l 
      LEFT JOIN empreendimentos e ON l.empreendimento_id = e.id 
      WHERE l.tenant_id = $1
    `;
    
    const params = [req.tenantId];
    
    if (validade) {
      query += ` AND DATE(l.data_vencimento) = $2`;
      params.push(validade as string);
    }
    
    query += ` ORDER BY l.created_at DESC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar licenças' });
  }
}

export async function createLicenca(req: TenantRequest, res: Response) {
  try {
    const { numero, tipo, status, empreendimento_id, orgao, data_vencimento } = req.body;
    
    const query = `
      INSERT INTO licencas (tenant_id, numero, tipo, status, empreendimento_id, orgao, data_vencimento, data_emissao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      req.tenantId, numero, tipo, status, empreendimento_id, orgao, data_vencimento
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar licença' });
  }
}