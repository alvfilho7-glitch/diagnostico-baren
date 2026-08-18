const state = {
  currentStep: 0,
  questions: [],
  answers: [],
  ramosSelecionados: [],
  rootSelected: []
};

function selecionarPerguntas(ramos) {
  let todas = [];
  for (let r of ramos) {
    if (QUESTION_BANK[r]) {
      const perguntas = QUESTION_BANK[r].map(q => ({ ...q, ramo: r }));
      todas = todas.concat(perguntas);
    }
  }
  todas.sort((a,b) => (b.peso || 0) - (a.peso || 0));
  const alvo = 20;
  let selecionadas = [];
  if (todas.length <= alvo + 4) {
    selecionadas = todas;
  } else {
    const porRamo = {};
    for (let r of ramos) {
      porRamo[r] = QUESTION_BANK[r] ? QUESTION_BANK[r].length : 0;
    }
    const total = Object.values(porRamo).reduce((a,b)=>a+b,0);
    let quota = {};
    let soma = 0;
    for (let r of ramos) {
      quota[r] = Math.max(1, Math.floor((porRamo[r] / total) * alvo));
      soma += quota[r];
    }
    while (soma < alvo - 2) {
      for (let r of ramos) {
        if (soma >= alvo) break;
        if (quota[r] < porRamo[r]) { quota[r]++; soma++; }
      }
    }
    for (let r of ramos) {
      const pool = QUESTION_BANK[r].map(q => ({ ...q, ramo: r }));
      pool.sort((a,b) => (b.peso || 0) - (a.peso || 0));
      const qtd = Math.min(quota[r] || 0, pool.length);
      selecionadas = selecionadas.concat(pool.slice(0, qtd));
    }
    if (selecionadas.length < 18) {
      const restantes = todas.filter(q => !selecionadas.includes(q));
      restantes.sort((a,b) => (b.peso || 0) - (a.peso || 0));
      const faltam = Math.min(22 - selecionadas.length, restantes.length);
      selecionadas = selecionadas.concat(restantes.slice(0, faltam));
    }
  }
  if (selecionadas.length > 22) selecionadas = selecionadas.slice(0, 22);
  return selecionadas;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function updateProgress() {
  const total = state.questions.length;
  const step = state.currentStep;
  if (total === 0) return;
  const pct = Math.min(100, Math.round(((step+1)/total)*100));
  document.getElementById('stepCounter').innerText = `${String(step+1).padStart(2,'0')} / ${total}`;
  document.getElementById('progressFillGlobal').style.width = `${pct}%`;
  document.getElementById('percentProgress').innerText = `${pct}%`;
}

function renderRoot() {
  const container = document.getElementById('rootOptions');
  container.innerHTML = ROOT_OPTIONS.map(o => `
    <label class="opt-row">
      <input type="checkbox" class="opt-radio" value="${o.code}" ${state.rootSelected.includes(o.code) ? 'checked' : ''}>
      <div class="opt-box">
        <div class="custom-radio" style="border-radius:4px;"></div>
        <div><div class="opt-label-main">${o.code} - ${o.label}</div></div>
      </div>
    </label>
  `).join('');
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!state.rootSelected.includes(e.target.value)) state.rootSelected.push(e.target.value);
      } else {
        state.rootSelected = state.rootSelected.filter(v => v !== e.target.value);
      }
    });
  });
}

function renderQuestionScreen(step) {
  const container = document.getElementById('dynamicQuestions');
  const q = state.questions[step];
  if (!q) return;
  container.innerHTML = `
    <div class="screen active" id="qScreen">
      <div class="q-card">
        <div class="q-header">
          <span class="q-index">${String(step+1).padStart(2,'0')}</span>
          <span class="q-text">${q.text} <span class="badge-pilar">${q.pilar}</span></span>
        </div>
        <div class="options-group">
          ${q.options.map((opt, idx) => `
            <label class="opt-row">
              <input type="radio" name="qChoice" value="${idx}" class="opt-radio">
              <div class="opt-box">
                <div class="custom-radio"></div>
                <div><div class="opt-label-main">${opt}</div></div>
              </div>
            </label>
          `).join('')}
        </div>
        <div class="nav-buttons">
          <button class="btn-secondary" id="prevBtn">VOLTAR</button>
          <button class="btn-next" id="nextBtn">${step === state.questions.length-1 ? 'FINALIZAR' : 'PRÓXIMA'}</button>
        </div>
      </div>
    </div>
  `;
  const prev = state.answers.find(a => a.id === q.id);
  if (prev) {
    const radio = document.querySelector(`input[name="qChoice"][value="${prev.idx}"]`);
    if (radio) radio.checked = true;
  }
  document.getElementById('nextBtn').addEventListener('click', () => {
    const selected = document.querySelector('input[name="qChoice"]:checked');
    if (!selected) return;
    const idx = parseInt(selected.value);
    const weight = q.weights[idx];
    const exist = state.answers.findIndex(a => a.id === q.id);
    if (exist >= 0) state.answers[exist] = { id: q.id, weight, pilar: q.pilar, idx };
    else state.answers.push({ id: q.id, weight, pilar: q.pilar, idx });
    if (step === state.questions.length-1) {
      computeResults();
    } else {
      state.currentStep++;
      renderQuestionScreen(state.currentStep);
    }
    updateProgress();
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (step > 0) {
      state.currentStep--;
      renderQuestionScreen(state.currentStep);
      updateProgress();
    } else {
      showRoot();
    }
  });
  showScreen('qScreen');
  updateProgress();
}

function showRoot() {
  renderRoot();
  showScreen('rootScreen');
  document.getElementById('progressContainer').style.display = 'none';
}

function showIntro() {
  showScreen('introScreen');
  document.getElementById('progressContainer').style.display = 'none';
  state.questions = [];
  state.answers = [];
  state.rootSelected = [];
  state.currentStep = 0;
  if (window.radarChartInstance) { window.radarChartInstance.destroy(); window.radarChartInstance = null; }
  if (window.barChartInstance) { window.barChartInstance.destroy(); window.barChartInstance = null; }
  if (window.lineChartInstance) { window.lineChartInstance.destroy(); window.lineChartInstance = null; }
  if (window.areaChartInstance) { window.areaChartInstance.destroy(); window.areaChartInstance = null; }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startBtn').addEventListener('click', () => {
    state.rootSelected = [];
    renderRoot();
    showRoot();
  });
  document.getElementById('rootNextBtn').addEventListener('click', () => {
    if (state.rootSelected.length === 0) {
      alert('Selecione pelo menos um objetivo para continuar.');
      return;
    }
    state.ramosSelecionados = [...state.rootSelected];
    state.questions = selecionarPerguntas(state.ramosSelecionados);
    if (state.questions.length === 0) {
      alert('Nenhuma pergunta disponível para os ramos selecionados.');
      return;
    }
    state.answers = [];
    state.currentStep = 0;
    document.getElementById('progressContainer').style.display = 'flex';
    renderQuestionScreen(0);
  });
  document.getElementById('rootBackBtn').addEventListener('click', showIntro);
  document.getElementById('restartBtn').addEventListener('click', showIntro);
  showIntro();
});
