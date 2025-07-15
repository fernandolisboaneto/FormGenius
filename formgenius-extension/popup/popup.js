// Estado da aplicação
let currentUser = null;
let isRecording = false;
let isExtracting = false;

// Configurações da API
const API_BASE_URL = 'http://localhost:5001/api';

// Elementos DOM
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const recordingScreen = document.getElementById('recording-screen');
const extractionScreen = document.getElementById('extraction-screen');

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadUserData();
    setupEventListeners();
    await checkCurrentPage();
});

// Carregar dados do usuário
async function loadUserData() {
    try {
        const userData = await chrome.storage.local.get(['user', 'token']);
        if (userData.user && userData.token) {
            currentUser = userData.user;
            showMainScreen();
            updateUserInfo();
        } else {
            showLoginScreen();
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        showLoginScreen();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Ações principais
    document.getElementById('record-form-btn').addEventListener('click', startRecording);
    document.getElementById('extract-data-btn').addEventListener('click', startExtraction);
    document.getElementById('my-models-btn').addEventListener('click', openModelsPage);
    
    // Gravação
    document.getElementById('stop-recording-btn').addEventListener('click', stopRecording);
    document.getElementById('pause-recording-btn').addEventListener('click', pauseRecording);
    document.getElementById('cancel-recording-btn').addEventListener('click', cancelRecording);
    
    // Extração
    document.getElementById('finish-extraction-btn').addEventListener('click', finishExtraction);
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('save-model-btn').addEventListener('click', saveExtractionModel);
    document.getElementById('cancel-extraction-btn').addEventListener('click', cancelExtraction);
    
    // Footer
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    document.getElementById('help-btn').addEventListener('click', openHelp);
    document.getElementById('upgrade-btn').addEventListener('click', openUpgrade);
    
    // Avatar (logout)
    document.getElementById('user-avatar').addEventListener('click', handleLogout);
}

// Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    
    // Mostrar loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    loginBtn.disabled = true;
    
    try {
        // Simular login (em produção, fazer requisição real para API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userData = {
            id: 1,
            username: 'testuser',
            email: email,
            credits: 150,
            plan: 'professional'
        };
        
        const token = 'fake-jwt-token';
        
        // Salvar dados
        await chrome.storage.local.set({ user: userData, token: token });
        currentUser = userData;
        
        showMainScreen();
        updateUserInfo();
        
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login. Tente novamente.');
    } finally {
        // Esconder loading
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        loginBtn.disabled = false;
    }
}

// Logout
async function handleLogout() {
    if (confirm('Deseja sair da sua conta?')) {
        await chrome.storage.local.clear();
        currentUser = null;
        showLoginScreen();
    }
}

// Mostrar telas
function showLoginScreen() {
    loginScreen.style.display = 'block';
    mainScreen.style.display = 'none';
    recordingScreen.style.display = 'none';
    extractionScreen.style.display = 'none';
}

function showMainScreen() {
    loginScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    recordingScreen.style.display = 'none';
    extractionScreen.style.display = 'none';
}

function showRecordingScreen() {
    loginScreen.style.display = 'none';
    mainScreen.style.display = 'none';
    recordingScreen.style.display = 'block';
    extractionScreen.style.display = 'none';
}

function showExtractionScreen() {
    loginScreen.style.display = 'none';
    mainScreen.style.display = 'none';
    recordingScreen.style.display = 'none';
    extractionScreen.style.display = 'block';
}

// Atualizar informações do usuário
function updateUserInfo() {
    if (currentUser) {
        document.getElementById('credits-count').textContent = `${currentUser.credits} créditos`;
        document.getElementById('user-avatar').querySelector('span').textContent = 
            currentUser.username.charAt(0).toUpperCase();
    }
}

// Verificar página atual e mostrar sugestões
async function checkCurrentPage() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url) {
            await analyzeCurrentPage(tab);
        }
    } catch (error) {
        console.error('Erro ao verificar página atual:', error);
    }
}

// Analisar página atual
async function analyzeCurrentPage(tab) {
    try {
        // Injetar script para analisar a página
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: analyzePage
        });
        
        if (results && results[0] && results[0].result) {
            const pageData = results[0].result;
            showSuggestions(pageData);
        }
    } catch (error) {
        console.error('Erro ao analisar página:', error);
    }
}

// Função injetada para analisar a página
function analyzePage() {
    const forms = document.querySelectorAll('form');
    const tables = document.querySelectorAll('table');
    const lists = document.querySelectorAll('ul, ol');
    
    return {
        url: window.location.href,
        title: document.title,
        forms: forms.length,
        tables: tables.length,
        lists: lists.length,
        hasFormInputs: document.querySelectorAll('input, textarea, select').length > 0,
        hasDataTables: document.querySelectorAll('table, .table, [class*="table"]').length > 0
    };
}

// Mostrar sugestões
function showSuggestions(pageData) {
    const suggestionsSection = document.getElementById('suggestions-section');
    const suggestionList = document.getElementById('suggestion-list');
    
    const suggestions = [];
    
    if (pageData.hasFormInputs) {
        suggestions.push({
            title: 'Gravar preenchimento de formulário',
            description: 'Esta página tem formulários que podem ser automatizados',
            action: 'record-form'
        });
    }
    
    if (pageData.hasDataTables) {
        suggestions.push({
            title: 'Extrair dados da tabela',
            description: 'Esta página tem tabelas com dados que podem ser extraídos',
            action: 'extract-data'
        });
    }
    
    if (suggestions.length > 0) {
        suggestionList.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-action="${suggestion.action}">
                <h4>${suggestion.title}</h4>
                <p>${suggestion.description}</p>
            </div>
        `).join('');
        
        // Adicionar event listeners
        suggestionList.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'record-form') {
                    startRecording();
                } else if (action === 'extract-data') {
                    startExtraction();
                }
            });
        });
        
        suggestionsSection.style.display = 'block';
    } else {
        suggestionsSection.style.display = 'none';
    }
}

// Iniciar gravação
async function startRecording() {
    if (!currentUser) return;
    
    try {
        isRecording = true;
        showRecordingScreen();
        
        // Enviar mensagem para content script
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { 
            action: 'startRecording',
            userId: currentUser.id 
        });
        
        // Simular detecção de campos
        setTimeout(() => {
            updateDetectedFields([
                { name: 'Nome', type: 'text', selector: 'input[name="name"]' },
                { name: 'Email', type: 'email', selector: 'input[name="email"]' },
                { name: 'Telefone', type: 'tel', selector: 'input[name="phone"]' }
            ]);
        }, 1000);
        
    } catch (error) {
        console.error('Erro ao iniciar gravação:', error);
        alert('Erro ao iniciar gravação');
        isRecording = false;
        showMainScreen();
    }
}

// Atualizar campos detectados
function updateDetectedFields(fields) {
    const detectedFields = document.getElementById('detected-fields');
    detectedFields.innerHTML = fields.map((field, index) => `
        <div class="field-item">
            <input type="checkbox" class="field-checkbox" checked data-index="${index}">
            <span class="field-name">${field.name}</span>
            <span class="field-type">${field.type}</span>
        </div>
    `).join('');
}

// Parar gravação
async function stopRecording() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: 'stopRecording' });
        
        isRecording = false;
        showMainScreen();
        alert('Gravação salva com sucesso!');
        
    } catch (error) {
        console.error('Erro ao parar gravação:', error);
    }
}

// Pausar gravação
async function pauseRecording() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: 'pauseRecording' });
        
    } catch (error) {
        console.error('Erro ao pausar gravação:', error);
    }
}

// Cancelar gravação
async function cancelRecording() {
    if (confirm('Deseja cancelar a gravação?')) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.tabs.sendMessage(tab.id, { action: 'cancelRecording' });
            
            isRecording = false;
            showMainScreen();
            
        } catch (error) {
            console.error('Erro ao cancelar gravação:', error);
        }
    }
}

// Iniciar extração
async function startExtraction() {
    if (!currentUser) return;
    
    try {
        isExtracting = true;
        showExtractionScreen();
        
        // Enviar mensagem para content script
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { 
            action: 'startExtraction',
            userId: currentUser.id 
        });
        
        // Simular dados extraídos
        setTimeout(() => {
            updateExtractionPreview([
                { produto: 'Produto A', preco: 'R$ 99,90', categoria: 'Eletrônicos' },
                { produto: 'Produto B', preco: 'R$ 149,90', categoria: 'Casa' },
                { produto: 'Produto C', preco: 'R$ 79,90', categoria: 'Livros' }
            ]);
        }, 1000);
        
    } catch (error) {
        console.error('Erro ao iniciar extração:', error);
        alert('Erro ao iniciar extração');
        isExtracting = false;
        showMainScreen();
    }
}

// Atualizar preview da extração
function updateExtractionPreview(data) {
    const previewTable = document.getElementById('preview-table');
    
    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        const headerRow = `<div class="preview-row">${headers.map(h => `<div class="preview-cell"><strong>${h}</strong></div>`).join('')}</div>`;
        const dataRows = data.map(row => 
            `<div class="preview-row">${headers.map(h => `<div class="preview-cell">${row[h]}</div>`).join('')}</div>`
        ).join('');
        
        previewTable.innerHTML = headerRow + dataRows;
    }
}

// Finalizar extração
async function finishExtraction() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: 'finishExtraction' });
        
        isExtracting = false;
        showMainScreen();
        
    } catch (error) {
        console.error('Erro ao finalizar extração:', error);
    }
}

// Exportar dados
async function exportData() {
    try {
        // Simular exportação
        alert('Dados exportados com sucesso!');
        
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
    }
}

// Salvar modelo de extração
async function saveExtractionModel() {
    try {
        const modelName = prompt('Nome do modelo:');
        if (modelName) {
            // Simular salvamento
            alert(`Modelo "${modelName}" salvo com sucesso!`);
        }
        
    } catch (error) {
        console.error('Erro ao salvar modelo:', error);
    }
}

// Cancelar extração
async function cancelExtraction() {
    if (confirm('Deseja cancelar a extração?')) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.tabs.sendMessage(tab.id, { action: 'cancelExtraction' });
            
            isExtracting = false;
            showMainScreen();
            
        } catch (error) {
            console.error('Erro ao cancelar extração:', error);
        }
    }
}

// Abrir página de modelos
function openModelsPage() {
    chrome.tabs.create({ url: 'http://localhost:5173' });
}

// Abrir configurações
function openSettings() {
    alert('Configurações em desenvolvimento');
}

// Abrir ajuda
function openHelp() {
    alert('Ajuda em desenvolvimento');
}

// Abrir upgrade
function openUpgrade() {
    chrome.tabs.create({ url: 'http://localhost:5173' });
}

