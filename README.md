# Builder Vibe Forge - SaaS Multi-Tenant

Sistema SaaS multi-tenant para gestão ambiental com PostgreSQL e Docker.

## 🚀 Funcionalidades

- **Multi-tenant**: Múltiplas empresas no mesmo sistema
- **Autenticação**: Login por empresa com JWT
- **Gestão Ambiental**: Licenças, empreendimentos, condicionantes
- **Banco PostgreSQL**: Com Docker Compose
- **Interface React**: Com Tailwind CSS e shadcn/ui

## 🏗️ Arquitetura

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Banco**: PostgreSQL com Docker
- **Autenticação**: JWT com contexto de tenant

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/andrews-franco/builder-vibe-forge-saas.git
cd builder-vibe-forge-saas
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o PostgreSQL:
```bash
docker-compose up -d
```

4. Execute o projeto:
```bash
npm run dev
```

## 🔐 Credenciais de Teste

### Empresas Disponíveis:

1. **EcoConsult** (`ecoconsult`)
   - Email: `ana@ecoconsult.com`
   - Senha: `123456`

2. **GreenTech** (`greentech`)
   - Email: `maria@greentech.com`
   - Senha: `123456`

3. **Sustenta** (`sustenta`)
   - Email: `pedro@sustenta.com`
   - Senha: `123456`

## 📊 Banco de Dados

O sistema utiliza PostgreSQL com as seguintes tabelas:
- `tenants` - Empresas/inquilinos
- `usuarios` - Usuários por tenant
- `empreendimentos` - Projetos ambientais
- `licencas` - Licenças ambientais
- `condicionantes` - Obrigações das licenças
- `estudos_ambientais` - EIA/RIMA, PCA, RCA
- `vistorias` - Agendamentos
- `documentos` - Arquivos
- `agenda` - Prazos e compromissos

## 🌐 Endpoints da API

### Públicos:
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro

### Protegidos (requer token):
- `GET /api/tenant/empreendimentos` - Listar empreendimentos
- `POST /api/tenant/empreendimentos` - Criar empreendimento

## 🎨 Multi-Tenant

Cada empresa possui:
- Logo personalizado
- Cores da marca
- Dados isolados
- Usuários próprios

## 📱 Acesso

- **URL**: http://localhost:5173
- **Login**: http://localhost:5173/login
- **Dashboard**: Após login bem-sucedido