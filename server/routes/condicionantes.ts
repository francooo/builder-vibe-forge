import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getCondicionantes(req: TenantRequest, res: Response) {
  try {
    const query = 'SELECT * FROM condicionantes WHERE tenant_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar condicionantes' });
  }
}

export async function createCondicionante(req: TenantRequest, res: Response) {
  try {
    const { codigo, descricao, responsavel, prazo, status } = req.body;
    
    const query = `
      INSERT INTO condicionantes (tenant_id, codigo, descricao, responsavel, prazo, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      req.tenantId, codigo, descricao, responsavel, prazo, status
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar condicionante' });
  }
}