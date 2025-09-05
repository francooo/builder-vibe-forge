import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getEstudos(req: TenantRequest, res: Response) {
  try {
    const query = `
      SELECT e.*, emp.nome as empreendimento_nome 
      FROM estudos_ambientais e 
      LEFT JOIN empreendimentos emp ON e.empreendimento_id = emp.id 
      WHERE e.tenant_id = $1 
      ORDER BY e.created_at DESC
    `;
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudos' });
  }
}

export async function createEstudo(req: TenantRequest, res: Response) {
  try {
    const { tipo, empreendimento_id, status, orgao } = req.body;
    
    const query = `
      INSERT INTO estudos_ambientais (tenant_id, tipo, empreendimento_id, status, orgao, data_protocolo)
      VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      req.tenantId, tipo, empreendimento_id, status, orgao
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estudo' });
  }
}