import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TenantService, UserService } from '../tenant-service';

export async function login(req: Request, res: Response) {
  try {
    const { email, senha, tenant_slug } = req.body;

    // Buscar tenant
    const tenant = await TenantService.getTenantBySlug(tenant_slug);
    if (!tenant) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    // Buscar usuário
    const user = await UserService.getUserByEmail(tenant.id, email);
    if (!user || user.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, tenantId: tenant.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Buscar configurações do tenant
    const tenantConfig = await TenantService.getTenantConfig(tenant.id);

    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil
      },
      tenant: tenantConfig
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { nome, email, senha, perfil, tenant_slug } = req.body;

    const tenant = await TenantService.getTenantBySlug(tenant_slug);
    if (!tenant) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    const user = await UserService.createUser(tenant.id, {
      nome,
      email,
      senha,
      perfil
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}