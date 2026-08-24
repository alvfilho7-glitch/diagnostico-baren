// ============================================================
// js/app.js
// LÓGICA PRINCIPAL DO SISTEMA
// ============================================================

// ============================================================
// 1. ESTADO GLOBAL
// ============================================================
const state = {
  currentPage: 1,
  answers: {},
  selectedObjectives: [],
  simChecked: {},
  scores: {},
  chartInstances: {
    radar: null,
    subPillar: null,
    valuation: null,
    reportRadar: null
  }
};

// ============================================================
// 2. NAVEGAÇÃO
// ============================================================

/**
 * Navega para uma página específica
 * @param {string|number} page - Número ou ID da página (ex: 1, '7b')
 */
function goToPage(page) {
  // Esconde todas as páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Mostra a página alvo
  const target = document.getElementById('page' + page);
  if (target) {
    target.classList.add('active');
    state.currentPage = page;
  }
  
  // Atualiza a navegação
  document.querySelectorAll('.page-nav .step').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page == page) btn.classList.add('active');
  });
  
  // Atualiza a barra de progresso
  updateProgress(page);
  
  // Scroll para o topo
  document.querySelector('.main-content').scrollTop = 0;
  
  // Renderiza conteúdo específico da página
  renderPageContent(page);
}

/**
 * Atualiza a barra de progresso
 * @param {string|number} page - Página atual
 */
function updateProgress(page) {
  const pages = ['1', '2', '3', '4', '5', '6', '7', '7b', '8', '9', '10'];
  const index = pages.indexOf(String(page));
  const pct = Math.round(((index + 1) / pages.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = pct + '%';
}

/**
 * Renderiza conteúdo específico da página
 * @param {string|number} page - Página atual
 */
function renderPageContent(page) {
  switch(page) {
    case 6:
      renderDashboard();
      break;
    case 7:
      renderAlerts();
      break;
    case '7b':
      renderOpportunities();
      break;
    case 8:
      renderSimulator();
      break;
    case 9:
      renderActions();
      break;
    case 10:
      renderReport();
      break;
  }
}

// ============================================================
// 3. OBJETIVOS
// ============================================================

/**
 * Alterna a seleção de um objetivo
 * @param {HTMLElement} el - Elemento do card clicado
 */
function toggleObjective(el) {
  el.classList.toggle('selected');
  const value = el.dataset.value;
  if (el.classList.contains('selected')) {
    if (!state.selectedObjectives.includes(value)) {
      state.selectedObjectives.push(value);
    }
  } else {
    state.selectedObjectives = state.selectedObjectives.filter(v => v !== value);
  }
}

// ============================================================
// 4. PERGUNTAS
// ============================================================

/**
 * Renderiza as perguntas em um container
 * @param {string} containerId - ID do container
 * @param {string[]} questionIds - Lista de IDs das perguntas
 */
function renderQuestions(containerId, questionIds) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let html = '';
  let qNum = 0;
  
  questionIds.forEach(id => {
    const q = QUESTIONS[id];
    if (!q) return;
    qNum++;
    
    html += `
      <div style="margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:9px; color:var(--cream-faint); letter-spacing:1px; font-weight:600;">Pergunta ${qNum}</span>
        </div>
        <div style="font-size:14px; color:var(--cream); font-weight:500; margin-bottom:10px;">${q.text}</div>
        <div class="q-options" data-qid="${id}">
          ${q.options.map((opt, idx) => `
            <div class="q-opt" onclick="selectOption(this, '${id}', ${idx})">
              <span class="radio"></span>
              <span class="label">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

/**
 * Seleciona uma opção de resposta
 * @param {HTMLElement} el - Elemento clicado
 * @param {string} qid - ID da pergunta
 * @param {number} idx - Índice da opção selecionada
 */
function selectOption(el, qid, idx) {
  const parent = el.closest('.q-options');
  parent.querySelectorAll('.q-opt').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  state.answers[qid] = idx;
}

// ============================================================
// 5. DASHBOARD
// ============================================================

/**
 * Calcula os scores por pilar baseado nas respostas
 * @returns {Object} Scores por pilar
 */
function getPillarScores() {
  const result = {};
  
  Object.keys(PILLAR_MAP).forEach(key => {
    const qs = PILLAR_MAP[key];
    let sum = 0, total = 0;
    
    qs.forEach(qid => {
      if (state.answers[qid] !== undefined) {
        const maxIdx = getMaxOptionIndex(qid);
        sum += (state.answers[qid] / maxIdx) * 100;
        total++;
      }
    });
    
    result[key] = total > 0 ? Math.round(sum / total) : 0;
  });
  
  return result;
}

/**
 * Calcula os dados por sub-pilar
 * @returns {Object} Dados por sub-pilar
 */
function getSubPillarData() {
  const result = {};
  
  Object.keys(SUB_PILLAR_MAP).forEach(label => {
    const qs = SUB_PILLAR_MAP[label];
    let sum = 0, total = 0;
    
    qs.forEach(qid => {
      if (state.answers[qid] !== undefined) {
        const maxIdx = getMaxOptionIndex(qid);
        sum += (state.answers[qid] / maxIdx) * 100;
        total++;
      }
    });
    
    result[label] = total > 0 ? Math.round(sum / total) : 0;
  });
  
  return result;
}

/**
 * Renderiza o dashboard completo
 */
function renderDashboard() {
  const scoresResult = getPillarScores();
  state.scores = scoresResult;
  const subData = getSubPillarData();
  
  // Calcula score geral
  const overall = Object.values(scoresResult).reduce((a, b) => a + b, 0) / Object.values(scoresResult).length;
  const overallRounded = Math.round(overall);
  
  // Atualiza score principal
  document.getElementById('mainScore').textContent = overallRounded + '%';
  
  // Atualiza badge de risco
  updateRiskBadge(overallRounded);
  
  // Atualiza scores dos pilares
  updatePillarScores(scoresResult);
  
  // Desenha o velocímetro
  drawGauge(overallRounded);
  
  // Renderiza gráficos
  renderCharts(scoresResult, subData, overallRounded);
}

/**
 * Atualiza o badge de risco
 * @param {number} score - Score geral
 */
function updateRiskBadge(score) {
  const riskBadge = document.getElementById('riskBadge');
  let riskClass = 'medium', riskText = 'Atenção';
  let diagnosticMsg = '';
  
  if (score >= 80) {
    riskClass = 'low';
    riskText = 'Baixo Risco';
    diagnosticMsg = 'Sua empresa está bem posicionada para atrair fundos de Private Equity e compradores estratégicos.';
  } else if (score >= 60) {
    riskClass = 'medium';
    riskText = 'Atenção';
    diagnosticMsg = 'Seu nível atual de prontidão restringe o interesse de fundos e reduz seu poder de barganha.';
  } else if (score >= 40) {
    riskClass = 'high';
    riskText = 'Alto Risco';
    diagnosticMsg = 'Sua empresa está vulnerável a descontos severos em negociações. Priorize a estruturação.';
  } else {
    riskClass = 'critical';
    riskText = 'Crítico';
    diagnosticMsg = 'Sem governança e finanças organizadas, a venda ou captação se torna inviável.';
  }
  
  riskBadge.className = 'risk ' + riskClass;
  riskBadge.textContent = riskText;
  document.getElementById('diagnosticText').textContent = diagnosticMsg;
}

/**
 * Atualiza os scores dos pilares
 * @param {Object} scoresResult - Scores por pilar
 */
function updatePillarScores(scoresResult) {
  const pillarMap = {
    governance: { score: 'scoreGov', bar: 'barGov' },
    finance: { score: 'scoreFin', bar: 'barFin' },
    legal: { score: 'scoreJur', bar: 'barJur' },
    operational: { score: 'scoreOp', bar: 'barOp' },
    strategy: { score: 'scoreEstrat', bar: 'barEstrat' },
    people: { score: 'scorePessoas', bar: 'barPessoas' }
  };
  
  Object.keys(pillarMap).forEach(key => {
    const val = scoresResult[key] || 0;
    document.getElementById(pillarMap[key].score).textContent = val + '%';
    document.getElementById(pillarMap[key].bar).style.width = val + '%';
  });
}

// ============================================================
// 6. GRÁFICOS (Charts.js)
// ============================================================

/**
 * Renderiza todos os gráficos do dashboard
 * @param {Object} scoresResult - Scores por pilar
 * @param {Object} subData - Dados por sub-pilar
 * @param {number} overallRounded - Score geral arredondado
 */
function renderCharts(scoresResult, subData, overallRounded) {
  // Radar Chart
  renderRadarChart(scoresResult);
  
  // Sub-pillar Chart
  renderSubPillarChart(subData);
  
  // Valuation Chart
  renderValuationChart(overallRounded);
}

/**
 * Renderiza o gráfico radar
 * @param {Object} scoresResult - Scores por pilar
 */
function renderRadarChart(scoresResult) {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  
  // Destroi instância anterior se existir
  if (state.chartInstances.radar) {
    state.chartInstances.radar.destroy();
  }
  
  const labels = ['Governança', 'Financeiro', 'Jurídico', 'Operacional', 'Estratégia', 'Pessoas'];
  const data = [
    scoresResult.governance || 0,
    scoresResult.finance || 0,
    scoresResult.legal || 0,
    scoresResult.operational || 0,
    scoresResult.strategy || 0,
    scoresResult.people || 0
  ];
  const benchmark = getBenchmarkData();
  
  state.chartInstances.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Sua Empresa',
          data: data,
          backgroundColor: 'rgba(232,98,26,0.15)',
          borderColor: '#E8621A',
          borderWidth: 2,
          pointBackgroundColor: '#E8621A',
          pointBorderColor: '#fff',
          pointRadius: 4
        },
        {
          label: 'Benchmark Mercado',
          data: benchmark,
          backgroundColor: 'transparent',
          borderColor: 'rgba(248,244,239,0.25)',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F8F4EF', font: { size: 10 } }
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(248,244,239,0.06)' },
          grid: { color: 'rgba(248,244,239,0.06)' },
          pointLabels: { color: '#F8F4EF', font: { size: 9 } },
          ticks: { display: false, stepSize: 20 },
          min: 0,
          max: 100
        }
      }
    }
  });
}

/**
 * Renderiza o gráfico de sub-pilares
 * @param {Object} subData - Dados por sub-pilar
 */
function renderSubPillarChart(subData) {
  const ctx = document.getElementById('subPillarChart');
  if (!ctx) return;
  
  if (state.chartInstances.subPillar) {
    state.chartInstances.subPillar.destroy();
  }
  
  const subLabels = Object.keys(subData);
  const subValues = Object.values(subData);
  const colors = subValues.map(v => {
    if (v >= 70) return 'rgba(0,230,118,0.7)';
    if (v >= 40) return 'rgba(255,145,0,0.7)';
    return 'rgba(255,23,68,0.7)';
  });
  const borderColors = subValues.map(v => {
    if (v >= 70) return '#00e676';
    if (v >= 40) return '#ff9100';
    return '#ff1744';
  });
  
  state.chartInstances.subPillar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subLabels.slice(0, 12),
      datasets: [{
        label: 'Maturidade %',
        data: subValues.slice(0, 12),
        backgroundColor: colors.slice(0, 12),
        borderColor: borderColors.slice(0, 12),
        borderWidth: 1,
        borderRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { color: '#F8F4EF', font: { size: 8 }, stepSize: 25 },
          grid: { color: 'rgba(248,244,239,0.06)' }
        },
        x: {
          ticks: { color: '#F8F4EF', font: { size: 7 }, maxRotation: 45 }
        }
      }
    }
  });
}

/**
 * Renderiza o gráfico de valuation
 * @param {number} currentScore - Score atual
 */
function renderValuationChart(currentScore) {
  const ctx = document.getElementById('valuationChart');
  if (!ctx) return;
  
  if (state.chartInstances.valuation) {
    state.chartInstances.valuation.destroy();
  }
  
  const potentialScore = Math.min(CONFIG.maxPotentialScore, currentScore + 40);
  
  state.chartInstances.valuation = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Atual', 'Mês 3', 'Mês 6', 'Mês 12', 'Potencial'],
      datasets: [
        {
          label: 'Sua Empresa',
          data: [currentScore, currentScore + 5, currentScore + 12, currentScore + 20, potentialScore],
          borderColor: '#E8621A',
          backgroundColor: 'rgba(232,98,26,0.05)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#E8621A',
          pointRadius: 3
        },
        {
          label: 'Valuação Máxima',
          data: [potentialScore - 15, potentialScore - 8, potentialScore - 3, potentialScore, potentialScore],
          borderColor: 'rgba(248,244,239,0.2)',
          borderDash: [4, 4],
          fill: false,
          tension: 0.3,
          pointBackgroundColor: 'rgba(248,244,239,0.2)',
          pointRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F8F4EF', font: { size: 9 } }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { color: '#F8F4EF', font: { size: 8 }, stepSize: 25 },
          grid: { color: 'rgba(248,244,239,0.06)' }
        },
        x: {
          ticks: { color: '#F8F4EF', font: { size: 8 } }
        }
      }
    }
  });
}

// ============================================================
// 7. VELOCÍMETRO (GAUGE)
// ============================================================

/**
 * Desenha o velocímetro no canvas
 * @param {number} value - Valor percentual (0-100)
 */
function drawGauge(value) {
  const canvas = document.getElementById('gaugeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  const size = Math.min(rect.width || 140, 140);
  
  canvas.width = size * 2;
  canvas.height = size * 2;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 10;
  const radius = canvas.width / 2 - 20;
  const startAngle = Math.PI * 0.75;
  const endAngle = Math.PI * 2.25;
  const totalAngle = endAngle - startAngle;
  const currentAngle = startAngle + (value / 100) * totalAngle;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Fundo do arco
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(248,244,239,0.08)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Arco colorido (gradiente)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#ff1744');
  gradient.addColorStop(0.4, '#ff9100');
  gradient.addColorStop(0.7, '#ffea00');
  gradient.addColorStop(1, '#00e676');
  
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, currentAngle);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Ponto indicador
  const dotAngle = currentAngle;
  const dotX = cx + (radius - 6) * Math.cos(dotAngle);
  const dotY = cy + (radius - 6) * Math.sin(dotAngle);
  
  ctx.beginPath();
  ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#E8621A';
  ctx.fill();
  ctx.shadowColor = 'rgba(232,98,26,0.4)';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Marcas de referência
  for (let i = 0; i <= 10; i++) {
    const angle = startAngle + (i / 10) * totalAngle;
    const isMain = i % 5 === 0;
    const len = isMain ? 12 : 6;
    const x1 = cx + (radius - 4) * Math.cos(angle);
    const y1 = cy + (radius - 4) * Math.sin(angle);
    const x2 = cx + (radius - 4 - len) * Math.cos(angle);
    const y2 = cy + (radius - 4 - len) * Math.sin(angle);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = i / 10 <= value / 100 ? 'rgba(232,98,26,0.6)' : 'rgba(248,244,239,0.2)';
    ctx.lineWidth = isMain ? 2 : 1;
    ctx.stroke();
  }
}

// ============================================================
// 8. ALERTAS
// ============================================================

/**
 * Renderiza a lista de alertas
 */
function renderAlerts() {
  const container = document.getElementById('alertsList');
  const alerts = generateAlerts();
  
  if (alerts.length === 0) {
    container.innerHTML = `
      <div class="alert-item low" style="text-align:center; justify-content:center; border-left-color:#00e676; padding:20px;">
        <span style="font-size:14px; color:var(--cream);">✅ Nenhum alerta crítico identificado</span>
      </div>
    `;
    return;
  }
  
  container.innerHTML = alerts.map((a, idx) => `
    <div class="alert-item ${a.severity}">
      <div class="alert-header" onclick="toggleAlert(this)">
        <div class="left">
          <span class="severity ${a.severity}">${a.severity}</span>
          <span class="msg">${a.msg}</span>
        </div>
        <span class="toggle-icon">▾</span>
      </div>
      <div class="alert-body" id="alertBody${idx}">
        <div class="plan-item"><strong>Plano de Ação:</strong> ${a.action}</div>
        ${a.details ? a.details.map(d => `<div class="plan-item">${d}</div>`).join('') : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Alterna a exibição de um alerta (accordion)
 * @param {HTMLElement} header - Cabeçalho do alerta clicado
 */
function toggleAlert(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  body.classList.toggle('open');
  icon.classList.toggle('open');
}

/**
 * Gera os alertas baseados nos scores
 * @returns {Array} Lista de alertas
 */
function generateAlerts() {
  const alerts = [];
  const s = state.scores;
  
  // Governança
  if (s.governance < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Governança crítica: ausência de conselho formal e estrutura de decisão.',
      action: 'Estruturar governança com conselho consultivo e acordo de sócios.',
      details: ['Formalizar acordo de sócios com regras de saída', 'Instituir conselho consultivo com membro independente']
    });
  } else if (s.governance < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Governança em atenção: formalize acordo de sócios e crie conselho.',
      action: 'Criar estrutura de governança básica.',
      details: ['Formalizar acordo de sócios', 'Criar conselho consultivo informal']
    });
  }
  
  // Financeiro
  if (s.finance < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Financeiro crítico: alto endividamento e falta de auditoria.',
      action: 'Reestruturar finanças com auditoria e redução de dívida.',
      details: ['Contratar auditoria externa dos últimos 3 anos', 'Reestruturar endividamento', 'Constituir reserva de emergência']
    });
  } else if (s.finance < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Financeiro em atenção: melhore reserva de caixa e controles.',
      action: 'Otimizar gestão financeira.',
      details: ['Constituir reserva de emergência', 'Implementar DRE gerencial']
    });
  }
  
  // Jurídico
  if (s.legal < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Jurídico crítico: contratos desatualizados e riscos fiscais.',
      action: 'Regularizar contratos e implementar compliance.',
      details: ['Realizar revisão tributária', 'Revisar contratos e NDAs', 'Regularizar documentação societária']
    });
  } else if (s.legal < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Jurídico em atenção: revise contratos e documentação.',
      action: 'Revisar contratos estratégicos.',
      details: ['Revisar contratos de clientes e fornecedores', 'Regularizar marcas e patentes']
    });
  }
  
  // Operacional
  if (s.operational < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Operacional crítico: processos não documentados e falta de ERP.',
      action: 'Documentar processos e implementar ERP.',
      details: ['Documentar SOPs', 'Implementar ERP integrado', 'Estruturar BPO financeiro']
    });
  } else if (s.operational < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Operacional em atenção: padronize processos e implemente ERP.',
      action: 'Padronizar processos operacionais.',
      details: ['Documentar processos críticos', 'Avaliar implementação de ERP']
    });
  }
  
  // Estratégia
  if (s.strategy < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Estratégia crítica: ausência de plano de negócios e posicionamento.',
      action: 'Elaborar plano de negócios e pitch deck.',
      details: ['Elaborar plano de negócios 3-5 anos', 'Desenvolver pitch deck profissional', 'Estruturar data room']
    });
  } else if (s.strategy < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Estratégia em atenção: desenvolva pitch deck e plano de negócios.',
      action: 'Fortalecer planejamento estratégico.',
      details: ['Desenvolver pitch deck', 'Atualizar plano de negócios']
    });
  }
  
  // Pessoas
  if (s.people < 40) {
    alerts.push({
      severity: 'critical',
      msg: 'Pessoas crítico: alta rotatividade e falta de plano de carreira.',
      action: 'Estruturar RH com plano de carreira e benefícios.',
      details: ['Estruturar plano de carreira', 'Implementar programa de benefícios', 'Criar programa de treinamento']
    });
  } else if (s.people < 60) {
    alerts.push({
      severity: 'high',
      msg: 'Pessoas em atenção: crie programa de benefícios e treinamento.',
      action: 'Melhorar gestão de pessoas.',
      details: ['Criar plano de carreira', 'Implementar programa de treinamento']
    });
  }
  
  return alerts;
}

// ============================================================
// 9. OPORTUNIDADES
// ============================================================

/**
 * Renderiza as oportunidades/soluções recomendadas
 */
function renderOpportunities() {
  const container = document.getElementById('opportunitiesGrid');
  const opps = generateSolutions();
  
  if (opps.length === 0) {
    container.innerHTML = `
      <div class="opp-card" style="grid-column:1/-1; text-align:center; padding:40px;">
        <div class="empty-state">✅ Sua empresa está bem posicionada. Nenhuma ação urgente necessária.</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = opps.map(o => `
    <div class="opp-card">
      <svg class="icon-svg" viewBox="0 0 24 24">${o.svg}</svg>
      <div class="title">${o.title}</div>
      <div class="desc">${o.desc}</div>
      <div>
        <span class="partner-badge">${o.partner}</span>
        <button class="btn-connect" onclick="alert('Conectando com ${o.partner}...')">Solicitar Introdução</button>
      </div>
    </div>
  `).join('');
}

/**
 * Gera as soluções baseadas nos scores mais baixos
 * @returns {Array} Lista de soluções
 */
function generateSolutions() {
  const s = state.scores;
  const sorted = Object.keys(s).sort((a, b) => s[a] - s[b]);
  const worst = sorted.slice(0, 2);
  
  const result = [];
  worst.forEach(key => {
    if (s[key] < 70 && SOLUTION_MAP[key]) {
      result.push(SOLUTION_MAP[key]);
    }
  });
  
  return result;
}

// ============================================================
// 10. SIMULADOR
// ============================================================

/**
 * Renderiza o simulador
 */
function renderSimulator() {
  const container = document.getElementById('simActions');
  const actions = getSimActions();
  
  let html = `<div class="section-title">📋 Ações Recomendadas</div>`;
  
  actions.forEach(a => {
    const checked = state.simChecked[a.id] ? 'checked' : '';
    html += `
      <div class="sim-action-item" onclick="toggleSimAction('${a.id}')">
        <div class="checkbox-custom ${checked}" id="simCheck_${a.id}"></div>
        <div class="info">
          <div class="label">${a.label} <span class="impact-tag ${a.impact}">${a.impact}</span></div>
          <div class="desc">${a.desc}</div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  updateSimulator();
}

/**
 * Obtém as ações para o simulador baseado nos scores
 * @returns {Array} Lista de ações
 */
function getSimActions() {
  const s = state.scores;
  const actions = [];
  
  if (s.governance < 60) {
    actions.push({ 
      id: 'gov1', label: 'Formalizar Acordo de Sócios', 
      desc: 'Regras de entrada, saída e drag along.', 
      impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 
    });
    actions.push({ 
      id: 'gov2', label: 'Instituir Conselho Consultivo', 
      desc: 'Com membro independente.', 
      impact: 'critical', score: 20, multiple: 0.5, riskReduction: 12, timeReduction: 3 
    });
  }
  
  if (s.finance < 60) {
    actions.push({ 
      id: 'fin1', label: 'Auditar Balanços (3 anos)', 
      desc: 'Empresa homologada.', 
      impact: 'critical', score: 25, multiple: 0.6, riskReduction: 15, timeReduction: 4 
    });
    actions.push({ 
      id: 'fin2', label: 'Segregação de Contas', 
      desc: 'Fim da mistura física/jurídica.', 
      impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 
    });
  }
  
  if (s.legal < 60) {
    actions.push({ 
      id: 'leg1', label: 'Saneamento de Passivos', 
      desc: 'Trabalhistas e contingências cíveis.', 
      impact: 'medium', score: 12, multiple: 0.2, riskReduction: 6, timeReduction: 2 
    });
    actions.push({ 
      id: 'leg2', label: 'Revisão de Contratos', 
      desc: 'Contratos de longo prazo com clientes.', 
      impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 
    });
  }
  
  if (s.operational < 60) {
    actions.push({ 
      id: 'op1', label: 'Documentar Processos (SOPs)', 
      desc: 'Padronização operacional.', 
      impact: 'high', score: 18, multiple: 0.35, riskReduction: 10, timeReduction: 3 
    });
    actions.push({ 
      id: 'op2', label: 'Implementar ERP Integrado', 
      desc: 'Sistema de gestão completo.', 
      impact: 'critical', score: 22, multiple: 0.5, riskReduction: 12, timeReduction: 4 
    });
  }
  
  if (s.strategy < 60) {
    actions.push({ 
      id: 'est1', label: 'Elaborar Plano de Negócios', 
      desc: '3-5 anos com projeções.', 
      impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 
    });
    actions.push({ 
      id: 'est2', label: 'Desenvolver Pitch Deck', 
      desc: 'Profissional e executivo.', 
      impact: 'medium', score: 10, multiple: 0.2, riskReduction: 5, timeReduction: 1 
    });
  }
  
  if (s.people < 60) {
    actions.push({ 
      id: 'peo1', label: 'Estruturar Plano de Carreira', 
      desc: 'Com metas e benefícios.', 
      impact: 'high', score: 14, multiple: 0.25, riskReduction: 6, timeReduction: 2 
    });
    actions.push({ 
      id: 'peo2', label: 'Programa de Treinamento', 
      desc: 'Capacitação contínua.', 
      impact: 'medium', score: 10, multiple: 0.15, riskReduction: 4, timeReduction: 1 
    });
  }
  
  return actions;
}

/**
 * Alterna a seleção de uma ação no simulador
 * @param {string} id - ID da ação
 */
function toggleSimAction(id) {
  state.simChecked[id] = !state.simChecked[id];
  const checkbox = document.getElementById('simCheck_' + id);
  if (checkbox) checkbox.classList.toggle('checked');
  updateSimulator();
}

/**
 * Atualiza os resultados do simulador
 */
function updateSimulator() {
  const actions = getSimActions();
  let totalScore = 0;
  let totalMultiple = 0;
  let totalRiskReduction = 0;
  let totalTimeReduction = 0;
  
  actions.forEach(a => {
    if (state.simChecked[a.id]) {
      totalScore += a.score;
      totalMultiple += a.multiple;
      totalRiskReduction += a.riskReduction;
      totalTimeReduction += a.timeReduction;
    }
  });
  
  const baseScore = parseInt(document.getElementById('mainScore').textContent) || 0;
  const projected = Math.min(100, baseScore + totalScore);
  
  // Atualiza gauge
  const gaugeFill = document.getElementById('simGaugeFill');
  const gaugeLabel = document.getElementById('simGaugeLabel');
  gaugeFill.style.width = projected + '%';
  gaugeLabel.textContent = projected + '%';
  
  // Benchmark line
  document.getElementById('simBenchmarkLine').style.left = CONFIG.benchmarkLine + '%';
  
  // Métricas
  document.getElementById('simMultiple').textContent = '+' + totalMultiple.toFixed(1) + 'x';
  document.getElementById('simRiskReduction').textContent = '-' + Math.round(totalRiskReduction) + '%';
  
  const newTime = Math.max(4, CONFIG.baseTimeToMarket - totalTimeReduction);
  document.getElementById('simTimeToMarket').textContent = newTime + ' meses';
  
  // Perfil do comprador
  const profile = document.getElementById('simBuyerProfile');
  if (projected >= 80) {
    profile.textContent = '🚀 Fundos de Private Equity e Players Estratégicos';
  } else if (projected >= 60) {
    profile.textContent = '🏢 Compradores Nacionais e Regionais';
  } else if (projected >= 40) {
    profile.textContent = '⚠️ Compradores Oportunistas e Locais';
  } else {
    profile.textContent = '❌ Atratividade Muito Restrita';
  }
}

// ============================================================
// 11. PLANO DE AÇÃO
// ============================================================

/**
 * Renderiza o plano de ação
 */
function renderActions() {
  const container = document.getElementById('actionGroups');
  const s = state.scores;
  
  const pillars = {
    'Governança': { key: 'governance', actions: getActionsForPillar('governance') },
    'Financeiro': { key: 'finance', actions: getActionsForPillar('finance') },
    'Jurídico': { key: 'legal', actions: getActionsForPillar('legal') },
    'Operacional': { key: 'operational', actions: getActionsForPillar('operational') },
    'Estratégia': { key: 'strategy', actions: getActionsForPillar('strategy') },
    'Pessoas': { key: 'people', actions: getActionsForPillar('people') }
  };
  
  let html = '';
  
  Object.keys(pillars).forEach(name => {
    const p = pillars[name];
    const score = s[p.key] || 0;
    
    if (score >= 70) {
      html += `
        <div class="action-group">
          <div class="group-title">${name} <span class="score-badge">✅ Excelência</span></div>
          <div class="excellence-badge">
            <svg class="icon-svg" viewBox="0 0 24 24" style="stroke:#00e676;"><polyline points="20 6 9 17 4 12"/></svg>
            Sua empresa já está em nível de excelência. Nenhuma ação necessária.
          </div>
        </div>
      `;
      return;
    }
    
    const filtered = p.actions.filter(a => a.score > 0);
    
    if (filtered.length === 0) {
      html += `
        <div class="action-group">
          <div class="group-title">${name} <span class="score-badge">${score}%</span></div>
          <div style="padding:12px 0; color:var(--cream-faint); font-size:12px;">Nenhuma ação específica identificada.</div>
        </div>
      `;
      return;
    }
    
    // Ordena por impacto (maior score primeiro)
    filtered.sort((a, b) => b.score - a.score);
    
    html += `
      <div class="action-group">
        <div class="group-title">${name} <span class="score-badge">${score}%</span></div>
    `;
    
    filtered.forEach(a => {
      const preselected = state.simChecked[a.id] ? 'preselect' : '';
      const checked = state.simChecked[a.id] ? 'checked' : '';
      
      html += `
        <div class="action-item ${preselected}">
          <input type="checkbox" ${checked} />
          <span class="label">${a.label}</span>
          <span class="impact-tag ${a.impact}">${a.impact}</span>
        </div>
      `;
    });
    
    html += `</div>`;
  });
  
  container.innerHTML = html;
}

// ============================================================
// 12. RELATÓRIO
// ============================================================

/**
 * Renderiza o relatório executivo
 */
function renderReport() {
  const s = state.scores;
  const overall = Object.values(s).reduce((a, b) => a + b, 0) / Object.values(s).length;
  const overallRounded = Math.round(overall);
  
  // Score principal
  document.getElementById('reportScoreNumber').textContent = overallRounded + '%';
  
  // Diagnóstico
  renderReportDiagnostic(overallRounded);
  
  // Impacto no Valuation
  renderReportValuationImpact(overallRounded);
  
  // Roadmap
  renderReportRoadmap(s);
  
  // Soluções recomendadas
  renderReportSolutions();
  
  // Radar Chart
  renderReportRadar(s);
}

/**
 * Renderiza o diagnóstico no relatório
 * @param {number} score - Score geral
 */
function renderReportDiagnostic(score) {
  let msg = '';
  if (score >= 80) {
    msg = 'Sua empresa está <span class="highlight">bem posicionada</span> para M&A. Fundos de Private Equity e compradores estratégicos demonstram interesse.';
  } else if (score >= 60) {
    msg = 'Seu nível de prontidão <span class="highlight">restringe o interesse</span> de fundos e reduz seu poder de barganha. Foco em estruturação.';
  } else if (score >= 40) {
    msg = 'Sua empresa está <span class="highlight">vulnerável a descontos severos</span> em negociações. Priorize a organização financeira e governança.';
  } else {
    msg = 'Sem governança e finanças organizadas, a venda ou captação se torna <span class="highlight">inviável</span>. Ação imediata necessária.';
  }
  document.getElementById('reportDiagnostic').innerHTML = msg;
}

/**
 * Renderiza o impacto no valuation no relatório
 * @param {number} currentScore - Score atual
 */
function renderReportValuationImpact(currentScore) {
  const potential = Math.min(CONFIG.maxPotentialScore, currentScore + 40);
  const gain = potential - currentScore;
  
  document.getElementById('reportValuationImpact').innerHTML = `
    <div><strong>Atual:</strong> ${currentScore}% de prontidão</div>
    <div><strong>Potencial:</strong> ${potential}% com ações corretivas</div>
    <div style="margin-top:6px; color:var(--gold);">📈 Ganho estimado: <strong>+${gain}%</strong> em múltiplo de EBITDA</div>
    <div style="font-size:11px; color:var(--cream-faint); margin-top:4px;">Empresas com >80% de prontidão negociam com prêmio de até 2x EBITDA.</div>
  `;
}

/**
 * Renderiza o roadmap no relatório
 * @param {Object} scores - Scores por pilar
 */
function renderReportRoadmap(scores) {
  const html = `
    <div class="phase urgent">
      <div class="phase-title">🔴 Urgente (30 dias)</div>
      <div class="phase-items">
        ${scores.governance < 40 ? '<div class="item">Formalizar acordo de sócios</div>' : ''}
        ${scores.finance < 40 ? '<div class="item">Contratar auditoria financeira</div>' : ''}
        ${scores.legal < 40 ? '<div class="item">Revisão tributária imediata</div>' : ''}
        ${scores.governance >= 40 && scores.finance >= 40 && scores.legal >= 40 ? '<div class="item">Nenhuma ação urgente identificada</div>' : ''}
      </div>
    </div>
    <div class="phase structure">
      <div class="phase-title">🟡 Estruturação (30-90 dias)</div>
      <div class="phase-items">
        ${scores.governance < 60 ? '<div class="item">Criar conselho consultivo</div>' : ''}
        ${scores.finance < 60 ? '<div class="item">Reestruturar endividamento</div>' : ''}
        ${scores.operational < 60 ? '<div class="item">Implementar ERP e documentar SOPs</div>' : ''}
        ${scores.governance >= 60 && scores.finance >= 60 && scores.operational >= 60 ? '<div class="item">Manter excelência operacional</div>' : ''}
      </div>
    </div>
    <div class="phase expand">
      <div class="phase-title">🟢 Expansão (90+ dias)</div>
      <div class="phase-items">
        ${scores.strategy < 60 ? '<div class="item">Elaborar pitch deck e plano de negócios</div>' : ''}
        ${scores.people < 60 ? '<div class="item">Estruturar plano de carreira</div>' : ''}
        ${scores.strategy >= 60 && scores.people >= 60 ? '<div class="item">Preparar data room para M&A</div>' : ''}
      </div>
    </div>
  `;
  document.getElementById('reportRoadmap').innerHTML = html;
}

/**
 * Renderiza as soluções recomendadas no relatório
 */
function renderReportSolutions() {
  const solutions = generateSolutions();
  let html = '<ul>';
  
  if (solutions.length === 0) {
    html += '<li>✅ Sua empresa está bem posicionada. Nenhuma solução urgente necessária.</li>';
  } else {
    solutions.forEach(o => {
      html += `<li><span class="bullet">•</span> <strong>${o.title}</strong> — ${o.desc} <span style="color:var(--gold);font-size:10px;">(${o.partner})</span></li>`;
    });
  }
  
  html += '</ul>';
  document.getElementById('reportSolutions').innerHTML = html;
}

/**
 * Renderiza o radar chart no relatório
 * @param {Object} scores - Scores por pilar
 */
function renderReportRadar(scores) {
  const ctx = document.getElementById('reportRadarChart');
  if (!ctx) return;
  
  if (state.chartInstances.reportRadar) {
    state.chartInstances.reportRadar.destroy();
  }
  
  const labels = ['Governança', 'Financeiro', 'Jurídico', 'Operacional', 'Estratégia', 'Pessoas'];
  const data = [
    scores.governance || 0,
    scores.finance || 0,
    scores.legal || 0,
    scores.operational || 0,
    scores.strategy || 0,
    scores.people || 0
  ];
  const benchmark = getBenchmarkData();
  
  state.chartInstances.reportRadar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Sua Empresa',
          data: data,
          backgroundColor: 'rgba(232,98,26,0.15)',
          borderColor: '#E8621A',
          borderWidth: 2,
          pointBackgroundColor: '#E8621A',
          pointBorderColor: '#fff',
          pointRadius: 3
        },
        {
          label: 'Benchmark',
          data: benchmark,
          backgroundColor: 'transparent',
          borderColor: 'rgba(248,244,239,0.2)',
          borderDash: [4, 4],
          borderWidth: 1.5,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F8F4EF', font: { size: 9 } }
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(248,244,239,0.06)' },
          grid: { color: 'rgba(248,244,239,0.06)' },
          pointLabels: { color: '#F8F4EF', font: { size: 8 } },
          ticks: { display: false, stepSize: 20 },
          min: 0,
          max: 100
        }
      }
    }
  });
}

// ============================================================
// 13. PDF
// ============================================================

/**
 * Gera e baixa o relatório em PDF
 */
function generatePDF() {
  const element = document.getElementById('reportContainer');
  const opt = {
    margin: 10,
    filename: 'relatorio-ma-readiness-baren.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

// ============================================================
// 14. INICIALIZAÇÃO
// ============================================================

/**
 * Inicializa a aplicação
 */
function initApp() {
  // Renderiza as perguntas
  renderQuestions('questions1', ['g1', 'g2', 'g3', 'g4', 'g5', 'f1', 'f2', 'f3', 'f4', 'f5']);
  renderQuestions('questions2', ['j1', 'j2', 'j3', 'j4', 'j5', 'o1', 'o2', 'o3', 'o4', 'o5']);
  renderQuestions('questions3', ['e1', 'e2', 'e3', 'e4', 'e5', 'p1', 'p2', 'p3', 'p4', 'p5']);
  
  // Atualiza progresso
  updateProgress(1);
}

// ============================================================
// 15. EVENTOS GLOBAIS
// ============================================================

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// Redesenha o gauge ao redimensionar a janela (apenas na página 6)
window.addEventListener('resize', () => {
  if (state.currentPage == 6) {
    const score = parseInt(document.getElementById('mainScore').textContent) || 0;
    drawGauge(score);
  }
});

// ============================================================
// EXPORTAÇÃO (para uso em outros arquivos)
// ============================================================
// Funções e variáveis já estão no escopo global
// para uso direto nos atributos onclick do HTML
