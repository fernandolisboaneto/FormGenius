# FormGenius Backend API

## Descrição
API backend do FormGenius - Sistema inteligente de preenchimento automático de formulários e extração de dados.

## Tecnologias Utilizadas
- **Python 3.11**
- **Flask** - Framework web
- **SQLAlchemy** - ORM para banco de dados
- **JWT** - Autenticação
- **Stripe** - Processamento de pagamentos
- **CORS** - Suporte a requisições cross-origin

## Estrutura do Projeto
```
formgenius_backend/
├── src/
│   ├── main.py              # Aplicação principal
│   ├── models/
│   │   └── user.py          # Modelo de usuário
│   └── routes/
│       ├── auth.py          # Rotas de autenticação
│       ├── user.py          # Rotas de usuário
│       ├── models.py        # Rotas de modelos de formulário
│       ├── operations.py    # Rotas de operações
│       └── payments.py      # Rotas de pagamento
├── .env                     # Variáveis de ambiente
└── README.md
```

## Configuração

### 1. Instalar Dependências
```bash
pip install flask flask-sqlalchemy flask-cors flask-jwt-extended stripe python-dotenv
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```
SECRET_KEY=your_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
DATABASE_URL=sqlite:///formgenius.db
```

### 3. Executar a Aplicação
```bash
cd formgenius_backend
python src/main.py
```

A API estará disponível em `http://localhost:5000`

## Endpoints Principais

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login de usuário

### Usuário
- `GET /user/profile` - Obter perfil do usuário
- `PUT /user/profile` - Atualizar perfil
- `GET /user/credits` - Verificar créditos disponíveis

### Modelos de Formulário
- `GET /models` - Listar modelos salvos
- `POST /models` - Criar novo modelo
- `PUT /models/<id>` - Atualizar modelo
- `DELETE /models/<id>` - Deletar modelo

### Operações
- `POST /operations/extract` - Extrair dados de formulário
- `POST /operations/fill` - Preencher formulário automaticamente
- `GET /operations/history` - Histórico de operações

### Pagamentos
- `POST /payments/create-payment-intent` - Criar intenção de pagamento
- `GET /payments/packages` - Listar pacotes de créditos

## Funcionalidades

### Sistema de Créditos
- **Pacote Básico**: 100 créditos por R$ 19,90
- **Pacote Profissional**: 500 créditos por R$ 79,90
- **Pacote Empresarial**: 2000 créditos por R$ 249,90

### Autenticação JWT
- Tokens seguros para autenticação
- Middleware de proteção de rotas
- Renovação automática de tokens

### Integração com Stripe
- Processamento seguro de pagamentos
- Webhooks para confirmação de pagamento
- Gestão de assinaturas e créditos

## Deploy
A aplicação está configurada para deploy em produção e pode ser acessada em:
**https://w5hni7coz1jo.manus.space**

## Dados de Teste
- **Email**: test@formgenius.com
- **Senha**: 123456
- **Créditos**: 1000 (para testes)

## Contribuição
Este projeto faz parte do sistema FormGenius. Para contribuir:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
Projeto desenvolvido para fins educacionais e comerciais.

