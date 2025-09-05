import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getVistorias(req: TenantRequest, res: Response) {
  try {
    const query = `
      SELECT v.*, e.nome as empreendimento_nome 
      FROM vistorias v 
      LEFT JOIN empreendimentos e ON v.empreendimento_id = e.id 
      WHERE v.tenant_id = $1 
      ORDER BY v.data_agendada DESC
    `;
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vistorias' });
  }
}

export async function createVistoria(req: TenantRequest, res: Response) {
  try {
    const { data_agendada, empreendimento_id, tipo, responsavel, status } = req.body;
    
    const query = `
      INSERT INTO vistorias (tenant_id, data_agendada, empreendimento_id, tipo, responsavel, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      req.tenantId, data_agendada, empreendimento_id, tipo, responsavel, status
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar vistoria' });
  }
}