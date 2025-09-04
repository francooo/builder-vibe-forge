import pool from './database';

export class TenantService {
  static async createTenant(data: {
    nome: string;
    slug: string;
    logo_url?: string;
    cor_primaria?: string;
    cor_secundaria?: string;
  }) {
    const query = `
      INSERT INTO tenants (nome, slug, logo_url, cor_primaria, cor_secundaria)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.nome,
      data.slug,
      data.logo_url,
      data.cor_primaria || '#3b82f6',
      data.cor_secundaria || '#1e40af'
    ]);
    return result.rows[0];
  }

  static async getTenantBySlug(slug: string) {
    const query = 'SELECT * FROM tenants WHERE slug = $1 AND status = $2';
    const result = await pool.query(query, [slug, 'ativo']);
    return result.rows[0];
  }

  static async getTenantConfig(tenantId: number) {
    const query = 'SELECT nome, logo_url, cor_primaria, cor_secundaria, configuracoes FROM tenants WHERE id = $1';
    const result = await pool.query(query, [tenantId]);
    return result.rows[0];
  }
}

export class UserService {
  static async createUser(tenantId: number, data: {
    nome: string;
    email: string;
    senha: string;
    perfil: string;
  }) {
    const query = `
      INSERT INTO usuarios (tenant_id, nome, email, senha, perfil)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nome, email, perfil
    `;
    const result = await pool.query(query, [
      tenantId,
      data.nome,
      data.email,
      data.senha,
      data.perfil
    ]);
    return result.rows[0];
  }

  static async getUserByEmail(tenantId: number, email: string) {
    const query = 'SELECT * FROM usuarios WHERE tenant_id = $1 AND email = $2 AND status = $3';
    const result = await pool.query(query, [tenantId, email, 'ativo']);
    return result.rows[0];
  }
}