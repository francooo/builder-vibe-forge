import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';
import bcrypt from 'bcrypt';

export async function getUsuarios(req: TenantRequest, res: Response) {
  try {
    const query = `
      SELECT id, nome, email, perfil as papel, created_at as criado_em
      FROM usuarios 
      WHERE tenant_id = $1 
      ORDER BY nome ASC
    `;
    const result = await pool.query(query, [req.tenantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

export async function createUsuario(req: TenantRequest, res: Response) {
  try {
    const { nome, email, senha, papel } = req.body;
    
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    if (senha.length < 8) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    
    const query = `
      INSERT INTO usuarios (tenant_id, nome, email, senha, perfil)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nome, email, perfil as papel, created_at as criado_em
    `;
    
    const result = await pool.query(query, [
      req.tenantId, nome, email, senhaHash, papel || 'Colaborador'
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email já existe' });
    } else {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export async function updateUsuario(req: TenantRequest, res: Response) {
  try {
    const { id } = req.params;
    const { nome, email, papel, senha } = req.body;
    
    let query = 'UPDATE usuarios SET nome = $1, email = $2, perfil = $3';
    let params = [nome, email, papel, req.tenantId, id];
    
    if (senha) {
      if (senha.length < 8) {
        return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres' });
      }
      const senhaHash = await bcrypt.hash(senha, 10);
      query += ', senha = $6';
      params.splice(4, 0, senhaHash);
    }
    
    query += ' WHERE tenant_id = $4 AND id = $5 RETURNING id, nome, email, perfil as papel';
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

export async function deleteUsuario(req: TenantRequest, res: Response) {
  try {
    const { id } = req.params;
    
    // Verificar se não é o próprio usuário
    if (parseInt(id) === req.userId) {
      return res.status(400).json({ error: 'Não é possível excluir seu próprio usuário' });
    }
    
    const result = await pool.query(
      'DELETE FROM usuarios WHERE tenant_id = $1 AND id = $2 RETURNING id',
      [req.tenantId, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}