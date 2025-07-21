# FormGenius Dashboard

## Descrição
Dashboard web do FormGenius - Interface de usuário para gerenciamento de formulários, modelos e operações de preenchimento automático.

## Tecnologias Utilizadas
- **React 18** - Biblioteca JavaScript para UI
- **Vite** - Build tool e dev server
- **CSS3** - Estilização responsiva
- **Fetch API** - Comunicação com backend
- **JWT** - Autenticação no frontend

## Funcionalidades

### 🔐 Autenticação
- Login e registro de usuários
- Gestão de sessão com JWT
- Proteção de rotas privadas

### 📊 Dashboard Principal
- Visão geral de créditos disponíveis
- Estatísticas de uso
- Acesso rápido às funcionalidades

### 📝 Gerenciamento de Modelos
- Criar modelos de formulário personalizados
- Editar modelos existentes
- Visualizar biblioteca de modelos
- Excluir modelos não utilizados

### ⚡ Operações
- Extrair dados de formulários
- Preencher formulários automaticamente
- Histórico de operações realizadas
- Status de processamento em tempo real

### 💳 Sistema de Créditos
- Visualizar saldo atual
- Comprar pacotes de créditos
- Histórico de transações
- Integração com Stripe

## Estrutura do Projeto
```
formgenius-dashboard/
├── public/
│   └── index.html           # Template HTML
├── src/
│   ├── App.jsx              # Componente principal
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── services/           # Serviços de API
│   └── styles/             # Arquivos de estilo
├── package.json
└── README.md
```

## Configuração e Instalação

### 1. Instalar Dependências
```bash
cd formgenius-dashboard
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 4. Build para Produção
```bash
npm run build
```

## Páginas Principais

### 🏠 Home/Dashboard
- Resumo de atividades
- Acesso rápido às funcionalidades
- Estatísticas de uso

### 👤 Perfil do Usuário
- Informações pessoais
- Configurações da conta
- Histórico de atividades

### 📋 Modelos
- Lista de modelos salvos
- Criar novo modelo
- Editar modelos existentes

### 🔄 Operações
- Extrair dados de formulários
- Preencher formulários
- Histórico de operações

### 💰 Créditos
- Saldo atual
- Comprar créditos
- Histórico de compras

## Recursos de UI/UX

### 📱 Design Responsivo
- Compatível com desktop, tablet e mobile
- Layout adaptativo
- Touch-friendly para dispositivos móveis

### 🎨 Interface Moderna
- Design clean e profissional
- Cores consistentes com a marca
- Animações suaves
- Feedback visual para ações do usuário

### ⚡ Performance
- Carregamento rápido
- Lazy loading de componentes
- Otimização de bundle
- Cache inteligente

## Deploy
A aplicação está deployada e pode ser acessada em:
**https://jagnuoan.manus.space**

## Integração com Backend
O dashboard se comunica com a API backend através de:
- Autenticação JWT
- Requisições REST
- Tratamento de erros
- Loading states

## Dados de Teste
Para testar a aplicação, use:
- **Email**: test@formgenius.com
- **Senha**: 123456

## Scripts Disponíveis
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## Contribuição
Este projeto faz parte do sistema FormGenius. Para contribuir:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
Projeto desenvolvido para fins educacionais e comerciais.

