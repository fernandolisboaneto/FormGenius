# Refinamento de Funcionalidades e Especificações Técnicas: FormGenius

O FormGenius é uma extensão do Google Chrome projetada para otimizar o preenchimento de formulários online e a extração de dados de páginas web. Sua principal inovação reside na capacidade de "aprender" padrões de uso do usuário, tornando a automação mais inteligente e menos suscetível a erros do que as abordagens tradicionais. Abaixo, detalhamos as funcionalidades principais e secundárias, com considerações sobre sua implementação e as tecnologias mais adequadas.

## Funcionalidades Principais

### 1. Preenchimento Inteligente de Formulários

Esta funcionalidade central permite que o usuário "treine" a extensão para preencher automaticamente formulários repetitivos. O processo envolve a gravação do preenchimento manual, o mapeamento inteligente de campos e a reprodução automatizada.

#### Detalhes de Implementação:

*   **Gravação do Preenchimento:**
    *   **Mecanismo:** A extensão precisará de um modo de gravação ativável pelo usuário. Ao ativar, ela monitorará e registrará as interações do usuário com os campos do formulário (digitação, seleção de dropdowns, cliques em checkboxes/radio buttons).
    *   **Captura de Eventos:** Utilizará as APIs de extensão do Chrome (`chrome.tabs.executeScript`, `chrome.scripting.executeScript` para injetar scripts de conteúdo) para capturar eventos DOM como `input`, `change`, `click` nos elementos de formulário (`<input>`, `<textarea>`, `<select>`, etc.).
    *   **Identificação de Elementos:** Cada interação será associada a um identificador único do elemento HTML (ex: `id`, `name`, `class`, `xpath` ou uma combinação robusta para garantir a resiliência a pequenas mudanças no HTML).
    *   **Armazenamento Temporário:** Os dados gravados (sequência de ações, valores inseridos, identificadores de campo) serão armazenados temporariamente no `chrome.storage.local` ou `IndexedDB` da extensão.

*   **Mapeamento Inteligente:**
    *   **Análise de Padrões:** Após a gravação, a extensão analisará os dados inseridos e os identificadores dos campos. O "treinamento" envolverá o usuário associando os campos gravados a tipos de dados genéricos (ex: "Nome Completo", "Email", "Endereço", "CPF").
    *   **Sugestão de Mapeamento:** A extensão pode usar heurísticas (ex: `name` ou `id` do campo contendo "email", "nome", "address") e, opcionalmente, um modelo de Machine Learning leve (treinado offline e empacotado com a extensão ou acessível via um pequeno backend) para sugerir automaticamente o tipo de dado para cada campo. Isso reduziria o esforço do usuário.
    *   **Armazenamento do Modelo:** O modelo de mapeamento (identificador do campo -> tipo de dado) será salvo como um "modelo de formulário" no armazenamento local da extensão ou, se o usuário optar por sincronização, em um backend.

*   **Reprodução Automatizada:**
    *   **Execução:** Quando o usuário acionar a reprodução de um modelo de formulário, a extensão injetará scripts na página para localizar os campos mapeados e preenchê-los com os dados correspondentes.
    *   **Resiliência:** Implementar mecanismos para lidar com carregamento assíncrono de páginas (esperar por elementos, retentar preenchimento) e pequenas variações no HTML (usando seletores mais flexíveis ou múltiplos seletores por campo).
    *   **Validação:** Após o preenchimento, a extensão pode verificar se os campos foram preenchidos corretamente (ex: valor do campo corresponde ao esperado).

#### Tecnologias Sugeridas:

*   **Frontend (Extensão Chrome):** HTML, CSS, JavaScript (Vanilla JS para o core da interação com o DOM, talvez React/Vue.js para a interface de gerenciamento de modelos e gravação).
*   **Manipulação do DOM:** `document.querySelector`, `document.evaluate` (para XPath), `MutationObserver` (para detectar mudanças dinâmicas na página).
*   **Armazenamento:** `chrome.storage.local` (para dados locais do usuário), `IndexedDB` (para modelos maiores ou mais complexos), ou um backend (Firebase Firestore, Supabase) para sincronização e persistência de modelos entre dispositivos.
*   **Machine Learning (Opcional, para sugestão de mapeamento):** Um modelo pequeno de classificação de texto (ex: baseado em `scikit-learn` ou `TensorFlow.js` para execução no navegador) treinado para reconhecer tipos de campos de formulário com base em seus atributos HTML e rótulos. Isso pode ser executado no próprio navegador para privacidade e velocidade.

### 2. Extração de Dados de Páginas

Esta funcionalidade permite ao usuário selecionar elementos em uma página web e "treinar" a extensão para extrair esses dados de forma estruturada, como tabelas, listas ou parágrafos específicos.

#### Detalhes de Implementação:

*   **Modo de Seleção:** Um modo visual onde o usuário clica ou arrasta para selecionar os elementos da página que deseja extrair. A extensão destacará os elementos selecionados.
*   **Identificação de Padrões:** Quando o usuário seleciona múltiplos elementos semelhantes (ex: itens de uma lista de produtos, linhas de uma tabela), a extensão deve identificar o padrão repetitivo (ex: todos os elementos são `div.product-item`, ou `tr` dentro de um `table`).
*   **Extração de Campos:** Para cada elemento selecionado, o usuário poderá definir quais "campos" deseja extrair (ex: para um produto, extrair "Nome", "Preço", "URL da Imagem"). A extensão ajudará a identificar os seletores CSS/XPath para esses sub-campos dentro do elemento pai.
*   **Pré-visualização:** Exibir uma pré-visualização dos dados que seriam extraídos com base no padrão identificado, permitindo ao usuário refinar a seleção.
*   **Execução da Extração:** Uma vez definido o modelo de extração, o usuário pode acioná-lo para coletar os dados da página atual ou de múltiplas páginas (se houver navegação).

*   **Exportação de Dados:**
    *   **Formatos:** Suporte para exportação em CSV (Comma Separated Values) para planilhas, JSON (JavaScript Object Notation) para desenvolvedores e integração com APIs, e integração direta com Google Sheets.
    *   **Google Sheets API:** Para a integração com Google Sheets, a extensão precisará da permissão do usuário para acessar o Google Drive e criar/atualizar planilhas. Isso envolverá o uso da Google API Client Library para JavaScript e o fluxo de autenticação OAuth 2.0.

#### Tecnologias Sugeridas:

*   **Frontend (Extensão Chrome):** HTML, CSS, JavaScript.
*   **Manipulação do DOM e Seleção:** `document.elementFromPoint`, `element.getBoundingClientRect`, `MutationObserver` para interações visuais. Bibliotecas como `jQuery` podem simplificar a seleção e manipulação.
*   **Parsing HTML:** O próprio DOM do navegador é eficiente para isso. Para casos mais complexos ou se houver um backend, `BeautifulSoup` (Python) ou `cheerio` (Node.js) seriam opções.
*   **Exportação:** Funções JavaScript para gerar CSV/JSON. Para Google Sheets, a [Google Sheets API](https://developers.google.com/sheets/api) e a [Google Identity Services Library](https://developers.google.com/identity/oauth2/web/guides/use-js-client-library) para autenticação.
*   **Armazenamento:** `chrome.storage.local` ou `IndexedDB` para modelos de extração. Backend para sincronização.

### 3. Gerenciamento de Modelos

Permite ao usuário salvar, organizar e reutilizar os modelos de preenchimento de formulários e extração de dados criados.

#### Detalhes de Implementação:

*   **Interface de Gerenciamento:** Uma página dedicada dentro da extensão (ou um pop-up mais elaborado) onde o usuário pode ver uma lista de seus modelos salvos.
*   **Operações CRUD:** Funcionalidades para Criar (via gravação/seleção), Ler (visualizar detalhes), Atualizar (editar seletores, dados, lógica) e Deletar modelos.
*   **Categorização e Busca:** Opções para nomear, adicionar tags/categorias e buscar modelos, facilitando a organização para usuários com muitos modelos.
*   **Sincronização (Recurso Premium):** Modelos podem ser sincronizados com um backend para acesso em múltiplos dispositivos ou para backup. Isso exigiria um sistema de autenticação de usuário.

#### Tecnologias Sugeridas:

*   **Frontend (Extensão Chrome):** React/Vue.js para uma interface de usuário rica e reativa.
*   **Armazenamento:** `chrome.storage.local` (para modelos locais), ou um backend (Firebase Firestore, Supabase, PostgreSQL com Flask/FastAPI) para sincronização e gerenciamento de usuários.

### 4. Variáveis e Lógica (Funcionalidade Avançada/Opcional para MVP)

Capacidade de adicionar lógica simples aos modelos (ex: "se campo X for Y, preencher campo Z com W") ou usar variáveis para dados dinâmicos.

#### Detalhes de Implementação:

*   **Definição de Variáveis:** Permitir que o usuário defina variáveis (ex: `{{data_atual}}`, `{{nome_cliente}}`) que podem ser usadas nos modelos de preenchimento. Essas variáveis podem ser preenchidas manualmente antes da execução ou extraídas de outras fontes.
*   **Lógica Condicional:** Uma interface visual ou baseada em regras simples (ex: IF-THEN-ELSE) para definir condições. Por exemplo, "SE o campo 'Tipo de Cliente' for 'Pessoa Jurídica', ENTÃO preencher 'CNPJ', SENÃO preencher 'CPF'".
*   **Mini-Linguagem de Expressão:** Poderia ser implementado com uma mini-linguagem de expressão (ex: `Jinja2`-like ou `Handlebars.js`-like) para template de dados e lógica simples, ou um construtor visual de regras.

#### Tecnologias Sugeridas:

*   **Frontend (Extensão Chrome):** Frameworks como React/Vue.js para construir a interface de lógica. Um parser JavaScript leve para a mini-linguagem de expressão.
*   **Backend (se a lógica for complexa ou envolver dados externos):** Python com um motor de regras ou um pequeno interpretador de DSL (Domain Specific Language).

### 5. Visualização de Dados

Um painel dentro da extensão para visualizar os dados extraídos antes da exportação.

#### Detalhes de Implementação:

*   **Tabela Interativa:** Exibir os dados extraídos em um formato de tabela dentro da interface da extensão, permitindo ao usuário revisar, editar (opcionalmente) e confirmar os dados antes de exportar.
*   **Paginação/Filtro:** Para grandes volumes de dados, implementar paginação e filtros básicos.

#### Tecnologias Sugeridas:

*   **Frontend (Extensão Chrome):** Bibliotecas de tabela JavaScript (ex: `TanStack Table`, `ag-Grid` para casos mais complexos) para exibir os dados de forma eficiente.

## Funcionalidades Secundárias (Agregadoras de Valor)

Além das funcionalidades principais, as seguintes características podem enriquecer a experiência do usuário e aumentar o valor percebido do FormGenius:

### 1. Histórico de Operações

Manter um registro das operações de preenchimento e extração realizadas, com data, hora, URL e modelo utilizado. Isso permite ao usuário auditar suas automações e reexecutar tarefas recentes.

*   **Implementação:** Armazenar metadados das execuções no `chrome.storage.local` ou no backend.

### 2. Agendamento de Extrações (Recurso Premium)

Permitir que o usuário agende a execução de modelos de extração de dados em intervalos regulares (ex: diariamente, semanalmente) para monitorar mudanças em páginas ou coletar dados periódicos.

*   **Implementação:** Exigiria um backend robusto (serverless function ou serviço de agendamento) que pudesse "visitar" as URLs e executar as extrações, armazenando os resultados. Isso levanta questões de escalabilidade e anti-bot.

### 3. Compartilhamento de Modelos (Recurso Premium)

Capacidade de compartilhar modelos de preenchimento ou extração com outros usuários do FormGenius, ideal para equipes ou para a criação de uma biblioteca de modelos comunitária.

*   **Implementação:** Necessitaria de um backend com gerenciamento de usuários e permissões, onde os modelos seriam armazenados e compartilhados de forma segura.

### 4. Integração com Outras Ferramentas (Além do Google Sheets)

Expandir as opções de exportação e integração para incluir:

*   **CRMs:** Salesforce, HubSpot (via APIs).
*   **Ferramentas de Marketing:** Mailchimp, ActiveCampaign.
*   **Bancos de Dados:** Conexão direta com PostgreSQL, MySQL (via backend).
*   **Serviços de Armazenamento em Nuvem:** Dropbox, OneDrive.

*   **Implementação:** Cada integração exigiria o desenvolvimento de conectores específicos utilizando as APIs de terceiros, geralmente mediadas por um backend para segurança das credenciais.

### 5. Captura de Tela de Formulários/Dados

Permitir que o usuário capture uma imagem da página ou do formulário preenchido/extraído como prova ou para documentação.

*   **Implementação:** Utilizar a API `chrome.tabs.captureVisibleTab` para capturar a tela e salvar a imagem localmente ou no backend.

### 6. Validação de Dados (Preenchimento)

Adicionar regras de validação para os dados a serem preenchidos (ex: formato de e-mail, número de telefone, CPF/CNPJ). Alertar o usuário se os dados não corresponderem ao formato esperado antes do preenchimento.

*   **Implementação:** Lógica de validação no frontend (JavaScript) baseada em expressões regulares ou regras pré-definidas pelo usuário.

### 7. Detecção de Formulários/Tabelas Inteligente

Quando o usuário visita uma página, a extensão pode proativamente sugerir modelos de preenchimento ou extração se detectar um formulário ou tabela que se assemelhe a um modelo salvo ou a um padrão comum.

*   **Implementação:** Envolveria heurísticas e, possivelmente, um modelo de ML leve para reconhecimento de layout de formulários/tabelas na página.

Essas funcionalidades, tanto as principais quanto as secundárias, visam construir um produto robusto e valioso, capaz de atender a uma ampla gama de necessidades de automação e extração de dados para usuários não-técnicos e profissionais. O foco no "treinamento" e na inteligência da ferramenta será o diferencial competitivo do FormGenius.

