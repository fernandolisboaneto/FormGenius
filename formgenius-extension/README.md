# FormGenius Chrome Extension

## Descrição
Extensão do Google Chrome para o FormGenius - Ferramenta que permite preenchimento automático de formulários e extração de dados diretamente no navegador.

## Funcionalidades

### 🔄 Preenchimento Automático
- Detecta formulários automaticamente na página
- Preenche campos com base em modelos salvos
- Suporte a diferentes tipos de input (text, email, select, etc.)
- Validação de dados antes do preenchimento

### 📊 Extração de Dados
- Extrai dados de formulários existentes
- Salva informações para reutilização
- Cria modelos personalizados automaticamente
- Exporta dados em formato JSON

### 🎯 Interface Intuitiva
- Popup compacto e funcional
- Indicadores visuais na página
- Feedback em tempo real
- Integração seamless com o site

### 🔐 Segurança
- Autenticação segura com JWT
- Dados criptografados
- Permissões mínimas necessárias
- Não armazena dados sensíveis localmente

## Estrutura do Projeto
```
formgenius-extension/
├── manifest.json           # Configuração da extensão
├── popup/
│   ├── popup.html          # Interface do popup
│   ├── popup.css           # Estilos do popup
│   └── popup.js            # Lógica do popup
├── content/
│   ├── content.js          # Script injetado nas páginas
│   └── content.css         # Estilos para elementos injetados
├── background/
│   └── background.js       # Service worker da extensão
└── README.md
```

## Instalação

### 1. Download da Extensão
Baixe os arquivos da extensão do repositório GitHub.

### 2. Instalação Manual (Modo Desenvolvedor)
1. Abra o Chrome e vá para `chrome://extensions/`
2. Ative o "Modo do desenvolvedor" no canto superior direito
3. Clique em "Carregar sem compactação"
4. Selecione a pasta `formgenius-extension`
5. A extensão será instalada e aparecerá na barra de ferramentas

### 3. Configuração
1. Clique no ícone da extensão na barra de ferramentas
2. Faça login com suas credenciais do FormGenius
3. A extensão estará pronta para uso

## Como Usar

### 🚀 Preenchimento Automático
1. Navegue até uma página com formulário
2. Clique no ícone da extensão
3. Selecione "Preencher Formulário"
4. Escolha o modelo desejado
5. Clique em "Aplicar"

### 📥 Extração de Dados
1. Navegue até uma página com formulário preenchido
2. Clique no ícone da extensão
3. Selecione "Extrair Dados"
4. Revise os dados extraídos
5. Salve como novo modelo

### 📋 Gerenciar Modelos
1. Acesse o popup da extensão
2. Clique em "Meus Modelos"
3. Visualize, edite ou exclua modelos
4. Crie novos modelos personalizados

## Permissões Necessárias

### activeTab
- Permite acesso à aba ativa
- Necessário para detectar e interagir com formulários

### storage
- Armazena configurações e cache temporário
- Não armazena dados sensíveis

### host_permissions
- Acesso a todos os sites (quando necessário)
- Permite funcionamento em qualquer formulário web

## Arquivos Principais

### manifest.json
Configuração da extensão com:
- Versão e metadados
- Permissões necessárias
- Scripts de conteúdo
- Service worker

### popup.js
Interface principal com:
- Autenticação de usuário
- Seleção de modelos
- Controles de operação
- Status de créditos

### content.js
Script injetado que:
- Detecta formulários na página
- Aplica preenchimento automático
- Extrai dados de campos
- Adiciona indicadores visuais

### background.js
Service worker que:
- Gerencia comunicação com API
- Mantém estado da extensão
- Processa requisições em background

## Integração com API
A extensão se comunica com o backend através de:
- **Endpoint**: https://w5hni7coz1jo.manus.space
- **Autenticação**: JWT tokens
- **Operações**: REST API calls
- **Dados**: JSON format

## Tipos de Formulário Suportados

### ✅ Campos Suportados
- Input text
- Input email
- Input password
- Input number
- Input tel
- Textarea
- Select dropdown
- Radio buttons
- Checkboxes

### 🔄 Funcionalidades Avançadas
- Detecção automática de tipo de campo
- Validação de formato de dados
- Preenchimento condicional
- Suporte a formulários dinâmicos

## Dados de Teste
Para testar a extensão:
- **Email**: test@formgenius.com
- **Senha**: 123456
- **Créditos**: 1000 (para testes)

## Troubleshooting

### Extensão não aparece
- Verifique se o modo desenvolvedor está ativo
- Recarregue a extensão em chrome://extensions/

### Não detecta formulários
- Atualize a página
- Verifique se o formulário tem campos válidos
- Verifique permissões da extensão

### Erro de autenticação
- Faça logout e login novamente
- Verifique conexão com internet
- Verifique se o backend está funcionando

## Desenvolvimento

### Estrutura de Desenvolvimento
```bash
# Instalar dependências (se houver)
npm install

# Testar localmente
# Carregue a extensão no Chrome modo desenvolvedor

# Build para produção
# Compacte a pasta em .zip para publicação
```

### Debug
- Use Chrome DevTools para debug
- Console do popup: clique direito no popup > Inspecionar
- Console da página: F12 na página web
- Background script: chrome://extensions/ > Detalhes > Inspecionar visualizações

## Publicação na Chrome Web Store
Para publicar na Chrome Web Store:
1. Compacte todos os arquivos em .zip
2. Acesse Chrome Web Store Developer Dashboard
3. Faça upload do arquivo .zip
4. Preencha metadados e screenshots
5. Submeta para revisão

## Contribuição
Este projeto faz parte do sistema FormGenius. Para contribuir:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença
Projeto desenvolvido para fins educacionais e comerciais.

