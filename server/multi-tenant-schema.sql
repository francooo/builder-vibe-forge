-- Remover tabelas existentes
DROP TABLE IF EXISTS agenda CASCADE;
DROP TABLE IF EXISTS documentos CASCADE;
DROP TABLE IF EXISTS vistorias CASCADE;
DROP TABLE IF EXISTS estudos_ambientais CASCADE;
DROP TABLE IF EXISTS condicionantes CASCADE;
DROP TABLE IF EXISTS licencas CASCADE;
DROP TABLE IF EXISTS empreendimentos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabela de tenants (empresas)
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    cor_primaria VARCHAR(7) DEFAULT '#3b82f6',
    cor_secundaria VARCHAR(7) DEFAULT '#1e40af',
    configuracoes JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'suspenso')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários com tenant_id
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL CHECK (perfil IN ('Admin', 'Gestor', 'Analista')),
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, email)
);

-- Tabela de empreendimentos com tenant_id
CREATE TABLE empreendimentos (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    municipio VARCHAR(255),
    uf VARCHAR(2),
    atividade VARCHAR(255),
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de licenças com tenant_id
CREATE TABLE licencas (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    numero VARCHAR(100) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('LP', 'LI', 'LO')),
    status VARCHAR(50) DEFAULT 'Válida' CHECK (status IN ('Válida', 'Pendente', 'Em Análise', 'Vencida')),
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE CASCADE,
    orgao VARCHAR(100),
    data_emissao DATE,
    data_vencimento DATE,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, numero)
);

-- Tabela de condicionantes com tenant_id
CREATE TABLE condicionantes (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    codigo VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    responsavel VARCHAR(255),
    prazo DATE,
    status VARCHAR(50) DEFAULT 'No prazo' CHECK (status IN ('No prazo', 'Prazo próximo', 'Em atraso')),
    licenca_id INTEGER REFERENCES licencas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, codigo)
);

-- Tabela de estudos ambientais com tenant_id
CREATE TABLE estudos_ambientais (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
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

-- Tabela de vistorias com tenant_id
CREATE TABLE vistorias (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    data_agendada DATE NOT NULL,
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Campo', 'Auditoria')),
    responsavel VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Agendada' CHECK (status IN ('Agendada', 'Aguardando', 'Realizada', 'Cancelada')),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de documentos com tenant_id
CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Modelo', 'Checklist', 'Procedimento', 'Relatório')),
    arquivo_path VARCHAR(500),
    tamanho_kb INTEGER,
    empreendimento_id INTEGER REFERENCES empreendimentos(id) ON DELETE SET NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agenda com tenant_id
CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
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

-- Índices para performance e segurança
CREATE INDEX idx_usuarios_tenant ON usuarios(tenant_id);
CREATE INDEX idx_empreendimentos_tenant ON empreendimentos(tenant_id);
CREATE INDEX idx_licencas_tenant ON licencas(tenant_id);
CREATE INDEX idx_condicionantes_tenant ON condicionantes(tenant_id);
CREATE INDEX idx_estudos_tenant ON estudos_ambientais(tenant_id);
CREATE INDEX idx_vistorias_tenant ON vistorias(tenant_id);
CREATE INDEX idx_documentos_tenant ON documentos(tenant_id);
CREATE INDEX idx_agenda_tenant ON agenda(tenant_id);