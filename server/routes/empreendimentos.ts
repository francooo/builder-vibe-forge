import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getEmpreendimentos(req: TenantRequest, res: Response) {
  try {
    const query = 'SELECT * FROM empreendimentos WHERE tenant_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empreendimentos' });
  }
}

export async function createEmpreendimento(req: TenantRequest, res: Response) {
  try {
    const { nome, cnpj, municipio, uf, atividade, descricao } = req.body;
    
    const query = `
      INSERT INTO empreendimentos (tenant_id, nome, cnpj, municipio, uf, atividade, descricao)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      req.tenantId, nome, cnpj, municipio, uf, atividade, descricao
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empreendimento' });
  }
}