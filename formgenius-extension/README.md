# FormGenius Chrome Extension

Extensão do Chrome para automação de formulários e extração de dados.

## Estrutura do Projeto

```
formgenius-extension/
├── manifest.json          # Configuração da extensão
├── popup/                 # Interface do popup
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/               # Scripts injetados nas páginas
│   ├── content.js
│   └── content.css
├── background/            # Service worker
│   └── background.js
├── icons/                 # Ícones da extensão
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── assets/               # Recursos adicionais
```

## Funcionalidades

### 1. Gravação de Formulários
- Grave o preenchimento de formulários automaticamente
- Detecta campos de entrada automaticamente
- Salva modelos reutilizáveis

### 2. Extração de Dados
- Extraia dados de tabelas e listas
- Seleção visual de elementos
- Exportação em múltiplos formatos

### 3. Gerenciamento de Modelos
- Salve e organize seus modelos
- Sugestões baseadas na página atual
- Sincronização com dashboard web

## Instalação para Desenvolvimento

1. Abra o Chrome e vá para `chrome://extensions/`
2. Ative o "Modo do desenvolvedor"
3. Clique em "Carregar sem compactação"
4. Selecione a pasta `formgenius-extension`

## Configuração dos Ícones

Para adicionar os ícones da extensão:

1. Crie ou obtenha ícones PNG nos tamanhos:
   - 16x16 pixels (icon16.png)
   - 32x32 pixels (icon32.png)
   - 48x48 pixels (icon48.png)
   - 128x128 pixels (icon128.png)

2. Coloque os arquivos na pasta `icons/`

3. Os ícones devem representar o logo do FormGenius (raio/⚡)

## Uso

1. **Login**: Faça login com suas credenciais do FormGenius
2. **Gravar Formulário**: 
   - Clique em "Gravar Preenchimento"
   - Preencha o formulário normalmente
   - Clique em "Parar" para salvar o modelo
3. **Extrair Dados**:
   - Clique em "Extrair Dados"
   - Selecione os elementos desejados
   - Clique em "Finalizar" para extrair

## Integração com API

A extensão se conecta com o backend do FormGenius em:
- Desenvolvimento: `http://localhost:5001/api`
- Produção: `https://api.formgenius.com`

## Permissões

A extensão requer as seguintes permissões:
- `activeTab`: Para interagir com a aba atual
- `storage`: Para salvar dados localmente
- `scripting`: Para injetar scripts nas páginas
- `tabs`: Para gerenciar abas
- `host_permissions`: Para acessar todos os sites

## Desenvolvimento

### Estrutura de Mensagens

A extensão usa um sistema de mensagens entre componentes:

```javascript
// Popup -> Content Script
chrome.tabs.sendMessage(tabId, {
    action: 'startRecording',
    userId: currentUser.id
});

// Content Script -> Background
chrome.runtime.sendMessage({
    action: 'saveFormModel',
    data: modelData
});
```

### Estados da Extensão

- **Idle**: Estado padrão, mostra sugestões
- **Recording**: Gravando ações do usuário
- **Extracting**: Selecionando elementos para extração
- **Processing**: Processando dados

### Armazenamento Local

A extensão usa `chrome.storage.local` para:
- Dados do usuário autenticado
- Modelos salvos localmente
- Histórico de operações
- Configurações da extensão

## Troubleshooting

### Problemas Comuns

1. **Extensão não carrega**:
   - Verifique se todos os arquivos estão presentes
   - Verifique o console de extensões para erros

2. **Popup não abre**:
   - Recarregue a extensão
   - Verifique permissões

3. **Content script não funciona**:
   - Verifique se a página permite scripts
   - Recarregue a página após instalar a extensão

### Logs de Debug

Para debug, abra:
- Console do popup: Clique com botão direito no popup > Inspecionar
- Console da página: F12 > Console
- Console do background: chrome://extensions/ > Detalhes > Inspecionar visualizações

## Próximas Funcionalidades

- [ ] Sincronização offline
- [ ] Modelos compartilhados
- [ ] Agendamento de extrações
- [ ] Integração com APIs externas
- [ ] Suporte a mais tipos de elementos

