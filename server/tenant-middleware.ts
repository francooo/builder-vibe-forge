import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TenantRequest extends Request {
  tenantId?: number;
  userId?: number;
}

export function tenantMiddleware(req: TenantRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    req.tenantId = decoded.tenantId;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export { TenantRequest };