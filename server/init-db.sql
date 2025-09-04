-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de empreendimentos
CREATE TABLE IF NOT EXISTS empreendimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de licenças
CREATE TABLE IF NOT EXISTS licencas (
    id SERIAL PRIMARY KEY,
    empreendimento_id INTEGER REFERENCES empreendimentos(id),
    tipo VARCHAR(100) NOT NULL,
    numero VARCHAR(100),
    data_emissao DATE,
    data_vencimento DATE,
    status VARCHAR(50) DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);