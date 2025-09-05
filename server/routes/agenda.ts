import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';

export async function getAgenda(req: TenantRequest, res: Response) {
  try {
    const query = 'SELECT * FROM agenda WHERE tenant_id = $1 ORDER BY data_prazo ASC';
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agenda' });
  }
}