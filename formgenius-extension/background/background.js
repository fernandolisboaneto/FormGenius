// FormGenius Background Script

console.log('FormGenius background script carregado');

// Configurações
const API_BASE_URL = 'http://localhost:5001/api';

// Estado global
let activeRecordings = new Map();
let activeExtractions = new Map();

// Listener para instalação da extensão
chrome.runtime.onInstalled.addListener((details) => {
    console.log('FormGenius instalado:', details.reason);
    
    if (details.reason === 'install') {
        // Primeira instalação
        showWelcomeNotification();
        openWelcomePage();
    } else if (details.reason === 'update') {
        // Atualização
        console.log('FormGenius atualizado para versão:', chrome.runtime.getManifest().version);
    }
});

// Listener para mensagens
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Mensagem recebida no background:', message);
    
    switch (message.action) {
        case 'saveFormModel':
            handleSaveFormModel(message.data, sender.tab.id);
            break;
        case 'saveExtractionModel':
            handleSaveExtractionModel(message.data, sender.tab.id);
            break;
        case 'executeFormFill':
            handleExecuteFormFill(message.data, sender.tab.id);
            break;
        case 'executeDataExtraction':
            handleExecuteDataExtraction(message.data, sender.tab.id);
            break;
        case 'getUserData':
            handleGetUserData(sendResponse);
            return true; // Manter canal aberto para resposta assíncrona
        case 'updateCredits':
            handleUpdateCredits(message.credits);
            break;
        default:
            console.log('Ação não reconhecida:', message.action);
    }
    
    sendResponse({ success: true });
});

// Listener para mudanças de aba
chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Aba ativada:', activeInfo.tabId);
    // Pode ser usado para pausar gravações/extrações em outras abas
});

// Listener para atualizações de aba
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        console.log('Página carregada:', tab.url);
        // Pode ser usado para sugerir modelos baseados na URL
        checkForSuggestedModels(tabId, tab.url);
    }
});

// Mostrar notificação de boas-vindas
function showWelcomeNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'FormGenius Instalado!',
        message: 'Clique no ícone da extensão para começar a automatizar formulários.'
    });
}

// Abrir página de boas-vindas
function openWelcomePage() {
    chrome.tabs.create({
        url: 'http://localhost:5173'
    });
}

// Salvar modelo de formulário
async function handleSaveFormModel(data, tabId) {
    try {
        console.log('Salvando modelo de formulário:', data);
        
        // Obter dados do usuário
        const userData = await getUserDataFromStorage();
        if (!userData) {
            throw new Error('Usuário não autenticado');
        }
        
        // Preparar dados do modelo
        const modelData = {
            name: data.name || `Modelo ${new Date().toLocaleString()}`,
            type: 'form_fill',
            url: data.url,
            actions: data.actions,
            fields: data.fields,
            created_at: new Date().toISOString()
        };
        
        // Salvar no storage local (em produção, enviar para API)
        const models = await getModelsFromStorage();
        models.push(modelData);
        await chrome.storage.local.set({ models: models });
        
        // Notificar sucesso
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Modelo Salvo!',
            message: `Modelo "${modelData.name}" foi salvo com sucesso.`
        });
        
        console.log('Modelo de formulário salvo com sucesso');
        
    } catch (error) {
        console.error('Erro ao salvar modelo de formulário:', error);
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Erro',
            message: 'Erro ao salvar modelo. Tente novamente.'
        });
    }
}

// Salvar modelo de extração
async function handleSaveExtractionModel(data, tabId) {
    try {
        console.log('Salvando modelo de extração:', data);
        
        // Obter dados do usuário
        const userData = await getUserDataFromStorage();
        if (!userData) {
            throw new Error('Usuário não autenticado');
        }
        
        // Preparar dados do modelo
        const modelData = {
            name: data.name || `Extração ${new Date().toLocaleString()}`,
            type: 'data_extract',
            url: data.url,
            selectors: data.selectors,
            fields: data.fields,
            created_at: new Date().toISOString()
        };
        
        // Salvar no storage local (em produção, enviar para API)
        const models = await getModelsFromStorage();
        models.push(modelData);
        await chrome.storage.local.set({ models: models });
        
        // Notificar sucesso
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Modelo Salvo!',
            message: `Modelo "${modelData.name}" foi salvo com sucesso.`
        });
        
        console.log('Modelo de extração salvo com sucesso');
        
    } catch (error) {
        console.error('Erro ao salvar modelo de extração:', error);
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Erro',
            message: 'Erro ao salvar modelo. Tente novamente.'
        });
    }
}

// Executar preenchimento de formulário
async function handleExecuteFormFill(data, tabId) {
    try {
        console.log('Executando preenchimento de formulário:', data);
        
        // Verificar créditos do usuário
        const userData = await getUserDataFromStorage();
        if (!userData || userData.credits < 1) {
            throw new Error('Créditos insuficientes');
        }
        
        // Enviar comandos para content script
        await chrome.tabs.sendMessage(tabId, {
            action: 'executeFormFill',
            model: data.model,
            values: data.values
        });
        
        // Debitar crédito
        await updateUserCredits(userData.credits - 1);
        
        // Registrar operação
        await logOperation({
            type: 'form_fill',
            model_id: data.model.id,
            credits_used: 1,
            status: 'completed'
        });
        
        console.log('Preenchimento executado com sucesso');
        
    } catch (error) {
        console.error('Erro ao executar preenchimento:', error);
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Erro',
            message: 'Erro ao executar preenchimento. Verifique seus créditos.'
        });
    }
}

// Executar extração de dados
async function handleExecuteDataExtraction(data, tabId) {
    try {
        console.log('Executando extração de dados:', data);
        
        // Verificar créditos do usuário
        const userData = await getUserDataFromStorage();
        if (!userData || userData.credits < 2) {
            throw new Error('Créditos insuficientes');
        }
        
        // Enviar comandos para content script
        const response = await chrome.tabs.sendMessage(tabId, {
            action: 'executeDataExtraction',
            model: data.model
        });
        
        // Debitar créditos
        await updateUserCredits(userData.credits - 2);
        
        // Registrar operação
        await logOperation({
            type: 'data_extract',
            model_id: data.model.id,
            credits_used: 2,
            status: 'completed',
            data_count: response.dataCount || 0
        });
        
        console.log('Extração executada com sucesso');
        
    } catch (error) {
        console.error('Erro ao executar extração:', error);
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Erro',
            message: 'Erro ao executar extração. Verifique seus créditos.'
        });
    }
}

// Obter dados do usuário
async function handleGetUserData(sendResponse) {
    try {
        const userData = await getUserDataFromStorage();
        sendResponse({ success: true, user: userData });
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Atualizar créditos
async function handleUpdateCredits(credits) {
    try {
        await updateUserCredits(credits);
        console.log('Créditos atualizados:', credits);
    } catch (error) {
        console.error('Erro ao atualizar créditos:', error);
    }
}

// Verificar modelos sugeridos para a página
async function checkForSuggestedModels(tabId, url) {
    try {
        const models = await getModelsFromStorage();
        const suggestedModels = models.filter(model => {
            // Verificar se a URL é similar
            const modelDomain = new URL(model.url).hostname;
            const currentDomain = new URL(url).hostname;
            return modelDomain === currentDomain;
        });
        
        if (suggestedModels.length > 0) {
            // Enviar sugestões para content script
            chrome.tabs.sendMessage(tabId, {
                action: 'showSuggestions',
                models: suggestedModels
            });
        }
        
    } catch (error) {
        console.error('Erro ao verificar modelos sugeridos:', error);
    }
}

// Utilitários de storage
async function getUserDataFromStorage() {
    const result = await chrome.storage.local.get(['user']);
    return result.user;
}

async function getModelsFromStorage() {
    const result = await chrome.storage.local.get(['models']);
    return result.models || [];
}

async function updateUserCredits(credits) {
    const userData = await getUserDataFromStorage();
    if (userData) {
        userData.credits = credits;
        await chrome.storage.local.set({ user: userData });
    }
}

async function logOperation(operation) {
    const operations = await getOperationsFromStorage();
    operations.push({
        ...operation,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    
    // Manter apenas as últimas 100 operações
    if (operations.length > 100) {
        operations.splice(0, operations.length - 100);
    }
    
    await chrome.storage.local.set({ operations: operations });
}

async function getOperationsFromStorage() {
    const result = await chrome.storage.local.get(['operations']);
    return result.operations || [];
}

// Cleanup ao descarregar
chrome.runtime.onSuspend.addListener(() => {
    console.log('FormGenius background script sendo descarregado');
    // Limpar recursos se necessário
});

