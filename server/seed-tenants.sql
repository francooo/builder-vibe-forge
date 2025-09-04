-- Inserir tenants de exemplo
INSERT INTO tenants (nome, slug, logo_url, cor_primaria, cor_secundaria) VALUES
('EcoConsult Ambiental', 'ecoconsult', 'https://via.placeholder.com/150x50/22c55e/ffffff?text=EcoConsult', '#22c55e', '#16a34a'),
('GreenTech Solutions', 'greentech', 'https://via.placeholder.com/150x50/3b82f6/ffffff?text=GreenTech', '#3b82f6', '#1e40af'),
('Sustenta Corp', 'sustenta', 'https://via.placeholder.com/150x50/f59e0b/ffffff?text=Sustenta', '#f59e0b', '#d97706');

-- Inserir usuários para cada tenant
INSERT INTO usuarios (tenant_id, nome, email, senha, perfil) VALUES
-- EcoConsult
(1, 'Ana Silva', 'ana@ecoconsult.com', '123456', 'Admin'),
(1, 'Carlos Santos', 'carlos@ecoconsult.com', '123456', 'Gestor'),
-- GreenTech
(2, 'Maria Oliveira', 'maria@greentech.com', '123456', 'Admin'),
(2, 'João Costa', 'joao@greentech.com', '123456', 'Analista'),
-- Sustenta
(3, 'Pedro Lima', 'pedro@sustenta.com', '123456', 'Admin');

-- Inserir empreendimentos para cada tenant
INSERT INTO empreendimentos (tenant_id, nome, cnpj, municipio, uf, atividade) VALUES
-- EcoConsult
(1, 'Fazenda Verde', '11.111.111/0001-11', 'Goiânia', 'GO', 'Agropecuária'),
(1, 'Usina Solar', '22.222.222/0001-22', 'Brasília', 'DF', 'Energia Solar'),
-- GreenTech
(2, 'Porto Norte', '33.333.333/0001-33', 'Manaus', 'AM', 'Logística'),
(2, 'Mineração Sul', '44.444.444/0001-44', 'Belo Horizonte', 'MG', 'Mineração'),
-- Sustenta
(3, 'Parque Eólico', '55.555.555/0001-55', 'Fortaleza', 'CE', 'Energia Eólica');