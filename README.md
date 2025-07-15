# FormGenius - Automação Inteligente de Formulários e Extração de Dados

Este repositório contém o projeto completo do **FormGenius**, uma solução de micro SaaS com extensão para o Google Chrome, desenvolvida para automatizar o preenchimento de formulários e a extração de dados de páginas web. O projeto foi concebido para ser uma ferramenta poderosa e intuitiva para usuários que precisam otimizar tarefas repetitivas online.

## 🚀 Visão Geral do Projeto

O FormGenius é composto por três partes principais:

1.  **Backend (API)**: Desenvolvido em Flask, responsável pela lógica de negócios, gerenciamento de usuários, modelos de automação, operações e transações de créditos.
2.  **Dashboard Web (Frontend)**: Uma aplicação React que oferece uma interface de usuário para gerenciamento de conta, visualização de modelos, histórico de operações e compra de créditos.
3.  **Extensão do Google Chrome**: A interface principal de interação com o usuário, permitindo a gravação de fluxos de preenchimento de formulários e a seleção visual de dados para extração diretamente no navegador.

## ✨ Funcionalidades Principais

*   **Preenchimento Inteligente de Formulários**: Grave e reproduza sequências de preenchimento em qualquer formulário web.
*   **Extração de Dados Estruturados**: Selecione visualmente elementos em páginas web e extraia dados para exportação.
*   **Gerenciamento de Modelos**: Salve, edite e organize seus modelos de automação e extração de dados.
*   **Sistema de Créditos Pay-per-use**: Modelo de monetização flexível baseado no consumo de operações.
*   **Dashboard de Usuário**: Acompanhe seu uso, gerencie sua conta e compre créditos.

## 🌐 Links do Projeto Deployado

Todos os componentes do FormGenius foram deployados e estão acessíveis publicamente:

*   **Landing Page**: [https://izbhwleg.manus.space](https://izbhwleg.manus.space)
*   **Dashboard de Usuário**: [https://jagnuoan.manus.space](https://jagnuoan.manus.space)
*   **API Backend**: [https://w5hni7coz1jo.manus.space](https://w5hni7coz1jo.manus.space)

**Credenciais de Teste para o Dashboard:**
*   **Email**: `test@formgenius.com`
*   **Senha**: `123456`

## 🛠️ Tecnologias Utilizadas

*   **Backend**: Python, Flask, SQLAlchemy, SQLite (para desenvolvimento/demo), JWT (autenticação), Stripe (simulado para pagamentos).
*   **Frontend (Dashboard)**: React, JavaScript, HTML, CSS.
*   **Extensão Chrome**: JavaScript, HTML, CSS.
*   **Gerenciamento de Pacotes**: pnpm (para frontend), pip (para backend).

## 🚀 Roteiro de Desenvolvimento (MVP e Futuro)

### MVP (Produto Mínimo Viável) - Concluído

1.  **Análise de Mercado**: Detalhamento do tamanho do mercado, público-alvo, concorrentes e análise SWOT.
2.  **Refinamento de Funcionalidades**: Definição das funcionalidades principais e secundárias com detalhes de implementação.
3.  **Design de UX/UI**: Esboço da jornada do usuário e mockups visuais das interfaces.
4.  **Plano de Monetização e Marketing**: Estratégias de precificação (pay-per-use) e canais de aquisição de usuários.
5.  **Roteiro de Desenvolvimento e Estimativas**: Definição de passos para o MVP e estimativas de tempo/custo.
6.  **Desenvolvimento do Backend (API)**: Implementação das APIs de autenticação, gerenciamento de modelos, operações e pagamentos.
7.  **Desenvolvimento do Frontend (Dashboard)**: Criação da interface de usuário para gerenciamento de conta e modelos.
8.  **Desenvolvimento da Extensão do Chrome**: Implementação da lógica de gravação e extração de dados no navegador.
9.  **Integração de Pagamentos e Testes**: Simulação de pagamentos e testes de integração de todo o sistema.
10. **Deploy e Configuração Final**: Deploy de todos os componentes (Landing Page, Dashboard, Backend) em ambiente de produção.

### Próximas Etapas (Desenvolvimento Futuro)

*   **Melhorias na IA de Extração**: Implementar algoritmos mais avançados para detecção automática de padrões e elementos.
*   **Integração com Outras Plataformas**: Conectores para CRMs, planilhas, etc.
*   **Agendamento de Tarefas**: Permitir que os usuários agendem preenchimentos e extrações recorrentes.
*   **Modelos Compartilháveis**: Funcionalidade para usuários compartilharem e venderem seus modelos de automação.
*   **Suporte a Múltiplos Navegadores**: Expandir a extensão para Firefox, Edge, etc.
*   **Relatórios e Análises Avançadas**: Dashboards mais detalhados sobre o uso e performance dos modelos.

## ⚙️ Como Rodar Localmente (para Desenvolvimento)

### Backend

```bash
cd formgenius_backend
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
python src/main.py
```

O backend estará disponível em `http://localhost:5001`.

### Dashboard Web (Frontend)

```bash
cd formgenius-dashboard
pnpm install
pnpm run dev
```

O dashboard estará disponível em `http://localhost:5173`.

### Extensão do Chrome

1.  Abra o Chrome e vá para `chrome://extensions/`.
2.  Ative o 

