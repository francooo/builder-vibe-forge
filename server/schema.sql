-- Remover tabelas existentes se necessário
DROP TABLE IF EXISTS agenda CASCADE;
DROP TABLE IF EXISTS documentos CASCADE;
DROP TABLE IF EXISTS vistorias CASCADE;
DROP TABLE IF EXISTS estudos_ambientais CASCADE;
DROP TABLE IF EXISTS condicionantes CASCADE;
DROP TABLE IF EXISTS licencas CASCADE;
DROP TABLE IF EXISTS empreendimentos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabela de usuários/equipe
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    perfil VARCHAR(50) NOT NULL CHECK (perfil IN ('Admin', 'Gestor', 'Analista')),
    status VARCHAR(20) DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de empreendimentos
CREATE TABLE empreendimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    municipio VARCHAR(255),
    uf VARCHAR(2),
    atividade VARCHAR(255),
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de licenças
CREATE TABLE licencas (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(100) UNIQUE NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('LP', 'LI', 'LO')),
    status VARCHAR(50) DEFAULT 'Válida' CHECK (status IN ('Válida', 'Pendente', 'Em Análise', 'Vencida')),
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE CASCADE,
    orgao VARCHAR(100),
    data_emissao DATE,
    data_vencimento DATE,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de condicionantes
CREATE TABLE condicionantes (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descricao TEXT NOT NULL,
    responsavel VARCHAR(255),
    prazo DATE,
    status VARCHAR(50) DEFAULT 'No prazo' CHECK (status IN ('No prazo', 'Prazo próximo', 'Em atraso')),
    licenca_id INTEGER REFERENCES licencas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de estudos ambientais
CREATE TABLE estudos_ambientais (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('EIA-RIMA', 'PCA', 'RCA', 'PRAD')),
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Em elaboração' CHECK (status IN ('Aprovado', 'Em elaboração', 'Em análise')),
    orgao VARCHAR(100),
    data_protocolo DATE,
    data_aprovacao DATE,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de vistorias
CREATE TABLE vistorias (
    id SERIAL PRIMARY KEY,
    data_agendada DATE NOT NULL,
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Campo', 'Auditoria')),
    responsavel VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Agendada' CHECK (status IN ('Agendada', 'Aguardando', 'Realizada', 'Cancelada')),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de documentos
CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Modelo', 'Checklist', 'Procedimento', 'Relatório')),
    arquivo_path VARCHAR(500),
    tamanho_kb INTEGER,
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE SET NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agenda/prazos
CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    data_prazo DATE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Condicionante', 'Licença', 'Vistoria', 'Documento')),
    referencia_id INTEGER,
    referencia_tipo VARCHAR(50),
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Concluído', 'Atrasado')),
    usuario_responsavel_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_licencas_empreendimento ON licencas(empreendimento_id);
CREATE INDEX idx_condicionantes_licenca ON condicionantes(licenca_id);
CREATE INDEX idx_estudos_empreendimento ON estudos_ambientais(empreendimento_id);
CREATE INDEX idx_vistorias_empreendimento ON vistorias(empreendimento_id);
CREATE INDEX idx_documentos_empreendimento ON documentos(empreendimento_id);
CREATE INDEX idx_agenda_data ON agenda(data_prazo);
CREATE INDEX idx_agenda_usuario ON agenda(usuario_responsavel_id);