import { Response } from 'express';
import { TenantRequest } from '../tenant-middleware';
import pool from '../database';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/logos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const tenantId = (req as TenantRequest).tenantId;
    const ext = path.extname(file.originalname);
    cb(null, `tenant-${tenantId}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato não permitido. Use PNG, JPG ou SVG.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

export async function uploadLogo(req: TenantRequest, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const logoUrl = `http://localhost:5000/uploads/logos/${req.file.filename}`;
    
    await pool.query(
      'UPDATE tenants SET logo_url = $1 WHERE id = $2',
      [logoUrl, req.tenantId]
    );

    res.json({ logo_url: logoUrl });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload do logo' });
  }
}