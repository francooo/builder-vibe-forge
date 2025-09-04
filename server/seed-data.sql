-- Inserir usuários
INSERT INTO usuarios (nome, email, perfil, status) VALUES
('Andrews Franco', 'andrews@example.com', 'Admin', 'Ativo'),
('Maria Silva', 'maria@example.com', 'Gestor', 'Ativo'),
('João Souza', 'joao@example.com', 'Analista', 'Inativo');

-- Inserir empreendimentos
INSERT INTO empreendimentos (nome, cnpj, municipio, uf, atividade) VALUES
('Fazenda Boa Vista', '12.345.678/0001-99', 'Goiânia', 'GO', 'Agropecuária'),
('Usina Rio Verde', '98.765.432/0001-11', 'Cuiabá', 'MT', 'Geração de Energia'),
('Porto Amazônia', '01.234.567/0001-22', 'Manaus', 'AM', 'Logística Portuária'),
('Loteamento Serra Azul', '11.222.333/0001-44', 'Belo Horizonte', 'MG', 'Loteamento');

-- Inserir licenças
INSERT INTO licencas (numero, tipo, status, empreendimento_id, orgao, data_emissao, data_vencimento) VALUES
('LIC-2024-0012', 'LO', 'Válida', 1, 'SEMAD/GO', '2024-09-12', '2026-09-12'),
('LIC-2023-0145', 'LP', 'Pendente', 2, 'SEMA/MT', '2023-10-15', '2025-10-15'),
('LIC-2022-0981', 'LI', 'Em Análise', 3, 'SEMA/AM', '2022-08-20', NULL),
('LIC-2021-0777', 'LO', 'Vencida', 4, 'SEMAD/MG', '2021-07-01', '2024-07-01');

-- Inserir condicionantes
INSERT INTO condicionantes (codigo, descricao, responsavel, prazo, status, licenca_id) VALUES
('C-01/2023', 'Monitoramento da qualidade da água trimestral', 'Equipe Ambiental', '2025-09-30', 'No prazo', 1),
('C-02/2023', 'Relatório semestral de fauna', 'Bióloga Ana', '2025-09-10', 'Prazo próximo', 1),
('C-07/2022', 'Programa de Educação Ambiental - módulo II', 'Comunicação', '2025-09-01', 'Em atraso', 2);

-- Inserir estudos ambientais
INSERT INTO estudos_ambientais (tipo, empreendimento_id, status, orgao, data_protocolo) VALUES
('EIA-RIMA', 2, 'Aprovado', 'SEMA/MT', '2024-07-22'),
('PCA', 1, 'Em elaboração', 'SEMAD/GO', NULL),
('RCA', 3, 'Em análise', 'SEMA/AM', '2025-08-05');

-- Inserir vistorias
INSERT INTO vistorias (data_agendada, empreendimento_id, tipo, responsavel, status) VALUES
('2025-09-05', 1, 'Campo', 'João', 'Agendada'),
('2025-09-12', 3, 'Auditoria', 'Maria', 'Aguardando'),
('2025-09-20', 2, 'Campo', 'Lucas', 'Agendada');

-- Inserir documentos
INSERT INTO documentos (nome, tipo, usuario_id) VALUES
('Modelo - Requerimento de Licença', 'Modelo', 1),
('Check-list de Renovação LO', 'Checklist', 2),
('Plano de Monitoramento - Água', 'Procedimento', 1);

-- Inserir agenda
INSERT INTO agenda (data_prazo, titulo, tipo, referencia_id, referencia_tipo, usuario_responsavel_id) VALUES
(CURRENT_DATE, 'Relatório de monitoramento trimestral', 'Condicionante', 1, 'condicionantes', 1),
(CURRENT_DATE + INTERVAL '3 days', 'Protocolo de renovação LO', 'Licença', 4, 'licencas', 2),
(CURRENT_DATE + INTERVAL '9 days', 'Vistoria de campo - Rio Verde', 'Vistoria', 3, 'vistorias', 1);