// Estado do content script
let isRecording = false;
let isExtracting = false;
let recordedActions = [];
let selectedElements = [];
let overlayElement = null;

// Configurações
const HIGHLIGHT_CLASS = 'formgenius-highlight';
const OVERLAY_CLASS = 'formgenius-overlay';

// Inicialização
console.log('FormGenius content script carregado');

// Listener para mensagens do popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Mensagem recebida:', message);
    
    switch (message.action) {
        case 'startRecording':
            startRecording(message.userId);
            break;
        case 'stopRecording':
            stopRecording();
            break;
        case 'pauseRecording':
            pauseRecording();
            break;
        case 'cancelRecording':
            cancelRecording();
            break;
        case 'startExtraction':
            startExtraction(message.userId);
            break;
        case 'finishExtraction':
            finishExtraction();
            break;
        case 'cancelExtraction':
            cancelExtraction();
            break;
        default:
            console.log('Ação não reconhecida:', message.action);
    }
    
    sendResponse({ success: true });
});

// Iniciar gravação de formulário
function startRecording(userId) {
    console.log('Iniciando gravação para usuário:', userId);
    
    isRecording = true;
    recordedActions = [];
    
    // Criar overlay de gravação
    createRecordingOverlay();
    
    // Destacar elementos interativos
    highlightInteractiveElements();
    
    // Adicionar listeners para capturar ações
    addRecordingListeners();
    
    showNotification('Gravação iniciada! Preencha o formulário normalmente.', 'success');
}

// Parar gravação
function stopRecording() {
    console.log('Parando gravação');
    
    isRecording = false;
    
    // Remover overlay e highlights
    removeRecordingOverlay();
    removeHighlights();
    
    // Remover listeners
    removeRecordingListeners();
    
    // Salvar modelo (simulado)
    saveFormModel();
    
    showNotification('Gravação finalizada e modelo salvo!', 'success');
}

// Pausar gravação
function pauseRecording() {
    console.log('Pausando gravação');
    // Implementar lógica de pausa se necessário
    showNotification('Gravação pausada', 'info');
}

// Cancelar gravação
function cancelRecording() {
    console.log('Cancelando gravação');
    
    isRecording = false;
    recordedActions = [];
    
    removeRecordingOverlay();
    removeHighlights();
    removeRecordingListeners();
    
    showNotification('Gravação cancelada', 'warning');
}

// Iniciar extração de dados
function startExtraction(userId) {
    console.log('Iniciando extração para usuário:', userId);
    
    isExtracting = true;
    selectedElements = [];
    
    // Criar overlay de extração
    createExtractionOverlay();
    
    // Destacar elementos extraíveis
    highlightExtractableElements();
    
    // Adicionar listeners para seleção
    addExtractionListeners();
    
    showNotification('Modo de extração ativado! Clique nos elementos para selecionar.', 'success');
}

// Finalizar extração
function finishExtraction() {
    console.log('Finalizando extração');
    
    isExtracting = false;
    
    // Extrair dados dos elementos selecionados
    const extractedData = extractDataFromElements();
    
    // Remover overlay e highlights
    removeExtractionOverlay();
    removeHighlights();
    removeExtractionListeners();
    
    // Enviar dados extraídos (simulado)
    console.log('Dados extraídos:', extractedData);
    
    showNotification('Extração finalizada!', 'success');
}

// Cancelar extração
function cancelExtraction() {
    console.log('Cancelando extração');
    
    isExtracting = false;
    selectedElements = [];
    
    removeExtractionOverlay();
    removeHighlights();
    removeExtractionListeners();
    
    showNotification('Extração cancelada', 'warning');
}

// Criar overlay de gravação
function createRecordingOverlay() {
    overlayElement = document.createElement('div');
    overlayElement.className = OVERLAY_CLASS;
    overlayElement.innerHTML = `
        <div class="formgenius-recording-panel">
            <div class="formgenius-recording-header">
                <div class="formgenius-recording-indicator">
                    <div class="formgenius-recording-dot"></div>
                    <span>Gravando</span>
                </div>
                <div class="formgenius-recording-actions">
                    <button id="formgenius-pause-btn">Pausar</button>
                    <button id="formgenius-stop-btn">Parar</button>
                </div>
            </div>
            <div class="formgenius-recording-content">
                <h4>Ações gravadas: <span id="formgenius-action-count">0</span></h4>
                <div id="formgenius-action-list"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlayElement);
    
    // Adicionar event listeners aos botões
    document.getElementById('formgenius-pause-btn').addEventListener('click', pauseRecording);
    document.getElementById('formgenius-stop-btn').addEventListener('click', stopRecording);
}

// Criar overlay de extração
function createExtractionOverlay() {
    overlayElement = document.createElement('div');
    overlayElement.className = OVERLAY_CLASS;
    overlayElement.innerHTML = `
        <div class="formgenius-extraction-panel">
            <div class="formgenius-extraction-header">
                <h4>Seleção de Dados</h4>
                <div class="formgenius-extraction-actions">
                    <button id="formgenius-clear-btn">Limpar</button>
                    <button id="formgenius-finish-btn">Finalizar</button>
                </div>
            </div>
            <div class="formgenius-extraction-content">
                <p>Elementos selecionados: <span id="formgenius-selected-count">0</span></p>
                <div id="formgenius-selected-list"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlayElement);
    
    // Adicionar event listeners aos botões
    document.getElementById('formgenius-clear-btn').addEventListener('click', clearSelection);
    document.getElementById('formgenius-finish-btn').addEventListener('click', finishExtraction);
}

// Remover overlays
function removeRecordingOverlay() {
    if (overlayElement) {
        overlayElement.remove();
        overlayElement = null;
    }
}

function removeExtractionOverlay() {
    if (overlayElement) {
        overlayElement.remove();
        overlayElement = null;
    }
}

// Destacar elementos interativos
function highlightInteractiveElements() {
    const interactiveElements = document.querySelectorAll('input, textarea, select, button[type="submit"]');
    
    interactiveElements.forEach(element => {
        element.classList.add(HIGHLIGHT_CLASS);
        element.setAttribute('data-formgenius-type', getElementType(element));
    });
}

// Destacar elementos extraíveis
function highlightExtractableElements() {
    const extractableElements = document.querySelectorAll('table, tr, td, th, ul, ol, li, .card, .item, [class*="product"], [class*="item"]');
    
    extractableElements.forEach(element => {
        element.classList.add(HIGHLIGHT_CLASS);
        element.setAttribute('data-formgenius-extractable', 'true');
    });
}

// Remover highlights
function removeHighlights() {
    const highlightedElements = document.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
    
    highlightedElements.forEach(element => {
        element.classList.remove(HIGHLIGHT_CLASS);
        element.removeAttribute('data-formgenius-type');
        element.removeAttribute('data-formgenius-extractable');
    });
}

// Adicionar listeners de gravação
function addRecordingListeners() {
    document.addEventListener('input', handleInputEvent);
    document.addEventListener('change', handleChangeEvent);
    document.addEventListener('click', handleClickEvent);
}

// Remover listeners de gravação
function removeRecordingListeners() {
    document.removeEventListener('input', handleInputEvent);
    document.removeEventListener('change', handleChangeEvent);
    document.removeEventListener('click', handleClickEvent);
}

// Adicionar listeners de extração
function addExtractionListeners() {
    document.addEventListener('click', handleExtractionClick);
    document.addEventListener('mouseover', handleExtractionHover);
    document.addEventListener('mouseout', handleExtractionMouseOut);
}

// Remover listeners de extração
function removeExtractionListeners() {
    document.removeEventListener('click', handleExtractionClick);
    document.removeEventListener('mouseover', handleExtractionHover);
    document.removeEventListener('mouseout', handleExtractionMouseOut);
}

// Handlers de eventos de gravação
function handleInputEvent(event) {
    if (!isRecording || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    recordAction({
        type: 'input',
        element: getElementSelector(event.target),
        value: event.target.value,
        timestamp: Date.now()
    });
}

function handleChangeEvent(event) {
    if (!isRecording || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    recordAction({
        type: 'change',
        element: getElementSelector(event.target),
        value: event.target.value,
        timestamp: Date.now()
    });
}

function handleClickEvent(event) {
    if (!isRecording || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    if (event.target.type === 'submit' || event.target.tagName === 'BUTTON') {
        recordAction({
            type: 'click',
            element: getElementSelector(event.target),
            timestamp: Date.now()
        });
    }
}

// Handlers de eventos de extração
function handleExtractionClick(event) {
    if (!isExtracting || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const element = event.target;
    
    if (element.hasAttribute('data-formgenius-extractable')) {
        toggleElementSelection(element);
    }
}

function handleExtractionHover(event) {
    if (!isExtracting || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    const element = event.target;
    
    if (element.hasAttribute('data-formgenius-extractable')) {
        element.style.outline = '2px solid #2563eb';
        element.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
    }
}

function handleExtractionMouseOut(event) {
    if (!isExtracting || event.target.closest(`.${OVERLAY_CLASS}`)) return;
    
    const element = event.target;
    
    if (element.hasAttribute('data-formgenius-extractable') && !selectedElements.includes(element)) {
        element.style.outline = '';
        element.style.backgroundColor = '';
    }
}

// Gravar ação
function recordAction(action) {
    recordedActions.push(action);
    updateActionCount();
    updateActionList();
}

// Alternar seleção de elemento
function toggleElementSelection(element) {
    const index = selectedElements.indexOf(element);
    
    if (index > -1) {
        // Remover seleção
        selectedElements.splice(index, 1);
        element.style.outline = '';
        element.style.backgroundColor = '';
    } else {
        // Adicionar seleção
        selectedElements.push(element);
        element.style.outline = '2px solid #10b981';
        element.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    }
    
    updateSelectedCount();
    updateSelectedList();
}

// Limpar seleção
function clearSelection() {
    selectedElements.forEach(element => {
        element.style.outline = '';
        element.style.backgroundColor = '';
    });
    
    selectedElements = [];
    updateSelectedCount();
    updateSelectedList();
}

// Atualizar contadores e listas
function updateActionCount() {
    const countElement = document.getElementById('formgenius-action-count');
    if (countElement) {
        countElement.textContent = recordedActions.length;
    }
}

function updateActionList() {
    const listElement = document.getElementById('formgenius-action-list');
    if (listElement) {
        listElement.innerHTML = recordedActions.slice(-5).map(action => 
            `<div class="formgenius-action-item">${action.type}: ${action.element}</div>`
        ).join('');
    }
}

function updateSelectedCount() {
    const countElement = document.getElementById('formgenius-selected-count');
    if (countElement) {
        countElement.textContent = selectedElements.length;
    }
}

function updateSelectedList() {
    const listElement = document.getElementById('formgenius-selected-list');
    if (listElement) {
        listElement.innerHTML = selectedElements.slice(-5).map(element => 
            `<div class="formgenius-selected-item">${getElementSelector(element)}</div>`
        ).join('');
    }
}

// Utilitários
function getElementSelector(element) {
    // Gerar seletor CSS único para o elemento
    if (element.id) {
        return `#${element.id}`;
    }
    
    if (element.name) {
        return `${element.tagName.toLowerCase()}[name="${element.name}"]`;
    }
    
    if (element.className) {
        const classes = element.className.split(' ').filter(c => c && !c.startsWith('formgenius-'));
        if (classes.length > 0) {
            return `${element.tagName.toLowerCase()}.${classes[0]}`;
        }
    }
    
    // Fallback: usar posição no DOM
    const siblings = Array.from(element.parentNode.children);
    const index = siblings.indexOf(element);
    return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`;
}

function getElementType(element) {
    if (element.tagName === 'INPUT') {
        return element.type || 'text';
    }
    return element.tagName.toLowerCase();
}

function extractDataFromElements() {
    return selectedElements.map(element => {
        const selector = getElementSelector(element);
        const text = element.textContent.trim();
        const tag = element.tagName.toLowerCase();
        
        return {
            selector,
            text,
            tag,
            attributes: {
                id: element.id,
                className: element.className,
                name: element.name
            }
        };
    });
}

function saveFormModel() {
    // Simular salvamento do modelo
    console.log('Modelo salvo:', {
        url: window.location.href,
        title: document.title,
        actions: recordedActions
    });
}

function showNotification(message, type = 'info') {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.className = `formgenius-notification formgenius-notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

