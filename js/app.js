// ============================================================
// APP.JS - Lógica Principal da Aplicação
// BAREN Diagnóstico Estratégico
// ============================================================

// ============================================================
// 1. ESTADO GLOBAL
// ============================================================

const state = {
  currentStep: 0,
  questions: [],
  answers: [],
  ramosSelecionados: [],
  rootSelected: [],
  isComplete: false,
  startTime: null,
  endTime: null
};

// ============================================================
// 2. FUNÇÕES DE NAVEGAÇÃO
// ============================================================

/**
 * Mostra uma tela específica e esconde as demais
 * @param {string} id - ID da tela a ser mostrada
 */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    // Re-aplica animação
    target.style.animation = 'none';
    requestAnimationFrame(() => {
      target.style.animation = '';
    });
  }
}

/**
 * Atualiza a barra de progresso
 */
function updateProgress() {
  const total = state.questions.length;
  const step = state.currentStep;
  
  if (total === 0) {
    document.getElementById('progressContainer').style.display = 'none';
    return;
  }
  
  const pct = Math.min(100, Math.round(((step + 1) / total) * 100));
  const progressContainer = document.getElementById('progressContainer');
  const stepCounter = document.getElementById('stepCounter');
  const progressFill = document.getElementById('progressFillGlobal');
  const percentProgress = document.getElementById('percentProgress');
  
  progressContainer.style.display = 'flex';
  stepCounter.innerText = `${String(step + 1).padStart(2, '0')} / ${total}`;
  progressFill.style.width = `${pct}%`;
  percentProgress.innerText = `${pct}%`;
}

// ============================================================
// 3. SELEÇÃO DE PERGUNTAS (Algoritmo Inteligente)
// ============================================================

/**
 * Seleciona perguntas de forma inteligente baseado nos pilares escolhidos
 * @param {Array} ramos - Lista de códigos dos pilares selecionados
 * @returns {Array} Lista de perguntas selecionadas
 */
function selecionarPerguntas(ramos) {
  // 1. Coleta todas as perguntas dos pilares selecionados
  let todas = [];
  for (let r of ramos) {
    if (QUESTION_BANK[r]) {
      const perguntas = QUESTION_BANK[r].map(q => ({ ...q, ramo: r }));
      todas = todas.concat(perguntas);
    }
  }
  
  // 2. Ordena por peso (mais importantes primeiro)
  todas.sort((a, b) => (b.peso || 0) - (a.peso || 0));
  
  const alvo = CONFIG.MAX_QUESTIONS;
  let selecionadas = [];
  
  // 3. Se tem poucas perguntas, pega todas
  if (todas.length <= alvo + 4) {
    selecionadas = todas;
  } else {
    // 4. Distribuição proporcional por pilar
    const porRamo = {};
    for (let r of ramos) {
      porRamo[r] = QUESTION_BANK[r] ? QUESTION_BANK[r].length : 0;
    }
    
    const total = Object.values(porRamo).reduce((a, b) => a + b, 0);
    let quota = {};
    let soma = 0;
    
    // Calcula quota inicial baseada na proporção
    for (let r of ramos) {
      quota[r] = Math.max(1, Math.floor((porRamo[r] / total) * alvo));
      soma += quota[r];
    }
    
    // Ajusta para atingir o número alvo
    while (soma < alvo - 2) {
      for (let r of ramos) {
        if (soma >= alvo) break;
        if (quota[r] < porRamo[r]) {
          quota[r]++;
          soma++;
        }
      }
    }
    
    // Seleciona as perguntas de cada pilar
    for (let r of ramos) {
      const pool = QUESTION_BANK[r].map(q => ({ ...q, ramo: r }));
      pool.sort((a, b) => (b.peso || 0) - (a.peso || 0));
      const qtd = Math.min(quota[r] || 0, pool.length);
      selecionadas = selecionadas.concat(pool.slice(0, qtd));
    }
    
    // 5. Completa com perguntas adicionais se necessário
    if (selecionadas.length < CONFIG.MIN_QUESTIONS) {
      const restantes = todas.filter(q => !selecionadas.some(s => s.id === q.id));
      restantes.sort((a, b) => (b.peso || 0) - (a.peso || 0));
      const faltam = Math.min(CONFIG.MAX_QUESTIONS - selecionadas.length, restantes.length);
      selecionadas = selecionadas.concat(restantes.slice(0, faltam));
    }
  }
  
  // 6. Limita ao máximo configurado
  if (selecionadas.length > CONFIG.MAX_QUESTIONS) {
    selecionadas = selecionadas.slice(0, CONFIG.MAX_QUESTIONS);
  }
  
  // 7. Embaralha levemente para não ficar sempre na mesma ordem
  // Mas mantém as mais importantes no início
  const importantes = selecionadas.filter(q => q.peso >= 4);
  const outras = selecionadas.filter(q => q.peso < 4);
  
  // Embaralha as outras
  for (let i = outras.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outras[i], outras[j]] = [outras[j], outras[i]];
  }
  
  return [...importantes, ...outras];
}

// ============================================================
// 4. RENDERIZAÇÃO DE TELAS
// ============================================================

/**
 * Renderiza a tela de seleção de objetivos (Root)
 */
function renderRoot() {
  const container = document.getElementById('rootOptions');
  
  container.innerHTML = ROOT_OPTIONS.map(o => `
    <label class="opt-row">
      <input 
        type="checkbox" 
        class="opt-radio" 
        value="${o.code}" 
        ${state.rootSelected.includes(o.code) ? 'checked' : ''}
      >
      <div class="opt-box">
        <div class="custom-radio" style="border-radius:4px;"></div>
        <div>
          <div class="opt-label-main">${o.code} - ${o.label}</div>
        </div>
      </div>
    </label>
  `).join('');
  
  // Event listeners para os checkboxes
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!state.rootSelected.includes(e.target.value)) {
          state.rootSelected.push(e.target.value);
        }
      } else {
        state.rootSelected = state.rootSelected.filter(v => v !== e.target.value);
      }
    });
  });
}

/**
 * Renderiza a tela de perguntas dinâmicas
 * @param {number} step - Índice da pergunta atual
 */
function renderQuestionScreen(step) {
  const container = document.getElementById('dynamicQuestions');
  const q = state.questions[step];
  
  if (!q) return;
  
  // Mapeia o nome do pilar para exibição
  const pilarLabel = getPilarLabel(q.pilar) || q.pilar;
  
  container.innerHTML = `
    <div class="screen active" id="qScreen">
      <div class="q-card">
        <div class="q-header">
          <div class="q-header-left">
            <span class="q-step">Pergunta ${step + 1}</span>
            <span class="q-index">${String(step + 1).padStart(2, '0')}</span>
          </div>
          <div class="q-header-right">
            <span class="q-text">${q.text}</span>
            <span class="q-hint">
              <span class="badge-pilar">${pilarLabel}</span>
              <span style="margin-left:8px;font-size:11px;color:var(--white-muted);">
                ${step + 1} de ${state.questions.length}
              </span>
            </span>
          </div>
        </div>
        
        <div class="options-group">
          ${q.options.map((opt, idx) => `
            <label class="opt-row">
              <input 
                type="radio" 
                name="qChoice" 
                value="${idx}" 
                class="opt-radio"
                ${state.answers.find(a => a.id === q.id && a.idx === idx) ? 'checked' : ''}
              >
              <div class="opt-box">
                <div class="custom-radio"></div>
                <div>
                  <div class="opt-label-main">${opt}</div>
                </div>
              </div>
            </label>
          `).join('')}
        </div>
        
        <div class="nav-buttons">
          <button class="btn-secondary" id="prevBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            VOLTAR
          </button>
          <button class="btn-next" id="nextBtn">
            ${step === state.questions.length - 1 ? 'FINALIZAR' : 'PRÓXIMA'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Event listener para o botão "Próxima"
  document.getElementById('nextBtn').addEventListener('click', handleNextQuestion);
  
  // Event listener para o botão "Voltar"
  document.getElementById('prevBtn').addEventListener('click', handlePrevQuestion);
  
  // Atualiza a tela
  showScreen('qScreen');
  updateProgress();
}

// ============================================================
// 5. HANDLERS DE NAVEGAÇÃO
// ============================================================

/**
 * Avança para a próxima pergunta ou finaliza
 */
function handleNextQuestion() {
  const selected = document.querySelector('input[name="qChoice"]:checked');
  if (!selected) {
    // Feedback visual: pisca a opção
    const options = document.querySelectorAll('.opt-row');
    options.forEach(opt => {
      opt.style.borderColor = 'rgba(255,59,0,0.5)';
      setTimeout(() => {
        opt.style.borderColor = '';
      }, 500);
    });
    return;
  }
  
  const idx = parseInt(selected.value);
  const q = state.questions[state.currentStep];
  const weight = q.weights[idx];
  
  // Salva a resposta
  const exist = state.answers.findIndex(a => a.id === q.id);
  if (exist >= 0) {
    state.answers[exist] = { id: q.id, weight, pilar: q.pilar, idx };
  } else {
    state.answers.push({ id: q.id, weight, pilar: q.pilar, idx });
  }
  
  // Avança ou finaliza
  if (state.currentStep === state.questions.length - 1) {
    state.isComplete = true;
    state.endTime = Date.now();
    computeResults();
  } else {
    state.currentStep++;
    renderQuestionScreen(state.currentStep);
  }
}

/**
 * Volta para a pergunta anterior
 */
function handlePrevQuestion() {
  if (state.currentStep > 0) {
    state.currentStep--;
    renderQuestionScreen(state.currentStep);
    updateProgress();
  } else {
    showRoot();
  }
}

/**
 * Mostra a tela de seleção de objetivos
 */
function showRoot() {
  renderRoot();
  showScreen('rootScreen');
  document.getElementById('progressContainer').style.display = 'none';
}

/**
 * Mostra a tela inicial (Intro)
 */
function showIntro() {
  showScreen('introScreen');
  document.getElementById('progressContainer').style.display = 'none';
  
  // Reseta o estado
  state.questions = [];
  state.answers = [];
  state.rootSelected = [];
  state.currentStep = 0;
  state.isComplete = false;
  state.startTime = null;
  state.endTime = null;
  
  // Destroi gráficos se existirem
  if (window.radarChartInstance) {
    window.radarChartInstance.destroy();
    window.radarChartInstance = null;
  }
  if (window.barChartInstance) {
    window.barChartInstance.destroy();
    window.barChartInstance = null;
  }
  if (window.lineChartInstance) {
    window.lineChartInstance.destroy();
    window.lineChartInstance = null;
  }
  if (window.areaChartInstance) {
    window.areaChartInstance.destroy();
    window.areaChartInstance = null;
  }
}

// ============================================================
// 6. INICIALIZAÇÃO
// ============================================================

/**
 * Inicia o diagnóstico
 */
function startDiagnostic() {
  state.rootSelected = [];
  renderRoot();
  showRoot();
}

/**
 * Inicia as perguntas após seleção dos objetivos
 */
function goToQuestions() {
  if (state.rootSelected.length === 0) {
    alert('Selecione pelo menos um objetivo para continuar.');
    return;
  }
  
  state.ramosSelecionados = [...state.rootSelected];
  state.questions = selecionarPerguntas(state.ramosSelecionados);
  
  if (state.questions.length === 0) {
    alert('Nenhuma pergunta disponível para os objetivos selecionados.');
    return;
  }
  
  state.answers = [];
  state.currentStep = 0;
  state.startTime = Date.now();
  
  document.getElementById('progressContainer').style.display = 'flex';
  renderQuestionScreen(0);
}

/**
 * Reinicia o diagnóstico
 */
function restartDiagnostic() {
  if (confirm('Tem certeza que deseja reiniciar o diagnóstico?')) {
    showIntro();
  }
}

// ============================================================
// 7. EVENT LISTENERS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Botão "Iniciar Diagnóstico"
  document.getElementById('startBtn').addEventListener('click', startDiagnostic);
  
  // Botão "Avançar" na tela de objetivos
  document.getElementById('rootNextBtn').addEventListener('click', goToQuestions);
  
  // Botão "Voltar" na tela de objetivos
  document.getElementById('rootBackBtn').addEventListener('click', showIntro);
  
  // Botão "Reiniciar" no dashboard
  document.getElementById('restartBtn').addEventListener('click', restartDiagnostic);
  
  // Teclas de atalho
  document.addEventListener('keydown', function(e) {
    // Enter para avançar
    if (e.key === 'Enter') {
      const activeScreen = document.querySelector('.screen.active');
      if (activeScreen) {
        if (activeScreen.id === 'rootScreen') {
          document.getElementById('rootNextBtn').click();
        } else if (activeScreen.id === 'qScreen') {
          document.getElementById('nextBtn').click();
        }
      }
    }
    
    // Escape para voltar
    if (e.key === 'Escape') {
      const activeScreen = document.querySelector('.screen.active');
      if (activeScreen) {
        if (activeScreen.id === 'qScreen') {
          document.getElementById('prevBtn').click();
        } else if (activeScreen.id === 'rootScreen') {
          document.getElementById('rootBackBtn').click();
        }
      }
    }
  });
  
  // Inicia na tela de introdução
  showIntro();
});

// ============================================================
// 8. FUNÇÕES DE UTILIDADE (exportadas para outros módulos)
// ============================================================

/**
 * Obtém o tempo total do diagnóstico em segundos
 */
function getDiagnosticTime() {
  if (!state.startTime) return 0;
  const end = state.endTime || Date.now();
  return Math.round((end - state.startTime) / 1000);
}

/**
 * Verifica se o diagnóstico está completo
 */
function isDiagnosticComplete() {
  return state.isComplete && state.answers.length === state.questions.length;
}

/**
 * Obtém o resumo das respostas
 */
function getAnswersSummary() {
  return state.answers.map(a => {
    const q = state.questions.find(q => q.id === a.id);
    return {
      id: a.id,
      pilar: a.pilar,
      weight: a.weight,
      text: q ? q.text : '',
      selected: q ? q.options[a.idx] : ''
    };
  });
}

// ============================================================
// 9. EXPORTAÇÃO (disponível globalmente)
// ============================================================

window.state = state;
window.showScreen = showScreen;
window.updateProgress = updateProgress;
window.selecionarPerguntas = selecionarPerguntas;
window.renderRoot = renderRoot;
window.renderQuestionScreen = renderQuestionScreen;
window.showRoot = showRoot;
window.showIntro = showIntro;
window.startDiagnostic = startDiagnostic;
window.goToQuestions = goToQuestions;
window.restartDiagnostic = restartDiagnostic;
window.getDiagnosticTime = getDiagnosticTime;
window.isDiagnosticComplete = isDiagnosticComplete;
window.getAnswersSummary = getAnswersSummary;
