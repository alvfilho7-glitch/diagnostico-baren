let currentScores = { governance: 0, finance: 0, legal: 0, valuation: 0, operacional: 0 };

function computeResults() {
  const grupos = { governance: [], finance: [], legal: [], valuation: [], operacional: [] };
  state.answers.forEach(a => {
    if (grupos[a.pilar]) grupos[a.pilar].push(a.weight);
  });
  const avg = (arr) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  const scores = {
    governance: avg(grupos.governance),
    finance: avg(grupos.finance),
    legal: avg(grupos.legal),
    valuation: avg(grupos.valuation),
    operacional: avg(grupos.operacional)
  };
  renderAdvancedDashboard(scores);
}

function renderAdvancedDashboard(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  currentScores = scores;
  document.getElementById('scoreValuation').innerText = valuation + '%';
  document.getElementById('scoreGovernance').innerText = governance + '%';
  document.getElementById('scoreFinance').innerText = finance + '%';
  document.getElementById('scoreLegal').innerText = legal + '%';
  document.getElementById('scoreOperacional').innerText = operacional + '%';

  const ctxRadar = document.getElementById('radarChart').getContext('2d');
  if (window.radarChartInstance) window.radarChartInstance.destroy();
  window.radarChartInstance = new Chart(ctxRadar, {
    type: 'radar',
    data: {
      labels: ['Governança', 'Financeiro', 'Jurídico', 'Valuation', 'Operacional'],
      datasets: [{
        label: 'Score atual',
        data: [governance, finance, legal, valuation, operacional],
        backgroundColor: 'rgba(255,59,0,0.15)',
        borderColor: '#FF3B00',
        borderWidth: 2,
        pointBackgroundColor: '#FF3B00',
        pointBorderColor: '#fff',
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, bottom: 8, left: 4, right: 4 } },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F5F2EE', font: { size: 10 }, boxWidth: 10, boxHeight: 10, padding: 12 }
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          grid: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#F5F2EE', font: { size: 9, family: 'Inter' } },
          ticks: { display: false, stepSize: 20 },
          min: 0, max: 100
        }
      }
    }
  });

  const ctxBar = document.getElementById('barChart').getContext('2d');
  if (window.barChartInstance) window.barChartInstance.destroy();
  const benchmark = [70, 65, 60, 75, 70];
  window.barChartInstance = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Gov', 'Fin', 'Jur', 'Val', 'Op'],
      datasets: [
        { label: 'Empresa', data: [governance, finance, legal, valuation, operacional], backgroundColor: '#FF3B00', borderRadius: 4 },
        { label: 'Benchmark', data: benchmark, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, bottom: 4, left: 4, right: 8 } },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F5F2EE', font: { size: 10 }, boxWidth: 10, boxHeight: 10, padding: 12 }
        }
      },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#F5F2EE', font: { size: 8 } } },
        x: { ticks: { color: '#F5F2EE', font: { size: 8 } } }
      }
    }
  });

  gerarAlertas(scores);
  gerarChecklist(scores);
  configurarSimulador(scores);
  configurarTabs();

  showScreen('resultScreen');
  document.getElementById('progressContainer').style.display = 'none';
}

function gerarAlertas(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const alertContainer = document.getElementById('alertContainer');
  let alerts = [];
  if (state.ramosSelecionados.includes('A') && valuation < 50) alerts.push({ severity: 'Crítico', msg: 'Valuation baixo para venda. Recomenda-se valuation externo.' });
  if (state.ramosSelecionados.includes('B') && governance < 50) alerts.push({ severity: 'Crítico', msg: 'Governança frágil para captação. Estruture conselho.' });
  if (governance < 40) alerts.push({ severity: 'Crítico', msg: 'Governança muito baixa: formalize conselho e separe patrimônio.' });
  else if (governance < 60) alerts.push({ severity: 'Médio', msg: 'Governança em desenvolvimento: considere acordo de sócios.' });
  if (finance < 40) alerts.push({ severity: 'Crítico', msg: 'Financeiro crítico: reduza endividamento e contrate auditoria.' });
  else if (finance < 60) alerts.push({ severity: 'Médio', msg: 'Financeiro moderado: melhore reserva de caixa.' });
  if (legal < 40) alerts.push({ severity: 'Crítico', msg: 'Risco jurídico elevado: regularize passivos e crie compliance.' });
  else if (legal < 60) alerts.push({ severity: 'Médio', msg: 'Jurídico em atenção: revise contratos e planejamento.' });
  if (operacional < 40) alerts.push({ severity: 'Crítico', msg: 'Operacional frágil: documente processos e implemente ERP.' });
  else if (operacional < 60) alerts.push({ severity: 'Médio', msg: 'Operacional em desenvolvimento: padronize SOPs.' });
  if (valuation < 40) alerts.push({ severity: 'Crítico', msg: 'Valuation muito baixo: construa vantagem competitiva.' });
  else if (valuation < 60) alerts.push({ severity: 'Médio', msg: 'Valuation moderado: fortaleça mercado e documente diferenciais.' });
  const ordem = { Crítico: 0, Médio: 1, Baixo: 2 };
  alerts.sort((a,b) => ordem[a.severity] - ordem[b.severity]);
  if (alerts.length === 0) {
    alertContainer.innerHTML = `<div style="padding:8px;color:var(--white-dim);font-size:13px;">✅ Nenhum alerta crítico identificado.</div>`;
  } else {
    alertContainer.innerHTML = alerts.map(a => `
      <div class="alert-box ${a.severity === 'Crítico' ? 'alert-critical' : a.severity === 'Médio' ? 'alert-medium' : 'alert-low'}">
        <strong style="text-transform:uppercase;font-size:10px;color:${a.severity === 'Crítico' ? '#ff1744' : a.severity === 'Médio' ? '#ff9100' : '#ffea00'};">
          ${a.severity}
        </strong>
        <span style="margin-left:8px;font-size:12px;">${a.msg}</span>
      </div>
    `).join('');
  }
}

function gerarChecklist(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const checklist = [];
  if (governance < 60) checklist.push('📌 Formalize conselho');
  if (finance < 60) checklist.push('📌 Auditoria financeira');
  if (legal < 60) checklist.push('📌 Regularize passivos');
  if (valuation < 60) checklist.push('📌 Documente processos');
  if (operacional < 60) checklist.push('📌 Padronize SOPs');
  if (state.ramosSelecionados.includes('A') && valuation < 50) checklist.push('📌 Prepare due diligence');
  if (state.ramosSelecionados.includes('B') && governance < 50) checklist.push('📌 Estruture governança');
  if (checklist.length === 0) checklist.push('✅ Bem posicionado!');
  const container = document.getElementById('checklistContainer');
  container.innerHTML = checklist.map(item => `
    <span style="font-size:12px;color:var(--white-dim);background:rgba(255,255,255,0.03);padding:2px 10px;border-radius:12px;border:1px solid var(--border-dim);">
      ${item}
    </span>
  `).join('');
}

function configurarSimulador(scores) {
  document.getElementById('simGov').value = 0;
  document.getElementById('simFin').value = 0;
  document.getElementById('simLeg').value = 0;
  document.getElementById('simOp').value = 0;
  document.getElementById('simGovLabel').innerText = '+0%';
  document.getElementById('simFinLabel').innerText = '+0%';
  document.getElementById('simLegLabel').innerText = '+0%';
  document.getElementById('simOpLabel').innerText = '+0%';
  atualizarSimulador(scores);
  atualizarGraficosProjecao(scores, 0, 0, 0, 0);
  ['simGov','simFin','simLeg','simOp'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
      const label = document.getElementById(id+'Label');
      label.innerText = `+${this.value}%`;
      const gov = parseInt(document.getElementById('simGov').value) || 0;
      const fin = parseInt(document.getElementById('simFin').value) || 0;
      const leg = parseInt(document.getElementById('simLeg').value) || 0;
      const op = parseInt(document.getElementById('simOp').value) || 0;
      atualizarSimulador(currentScores);
      atualizarGraficosProjecao(currentScores, gov, fin, leg, op);
    });
  });
}

function atualizarSimulador(scoresBase) {
  const govBonus = parseInt(document.getElementById('simGov').value) || 0;
  const finBonus = parseInt(document.getElementById('simFin').value) || 0;
  const legBonus = parseInt(document.getElementById('simLeg').value) || 0;
  const opBonus = parseInt(document.getElementById('simOp').value) || 0;
  const newGov = Math.min(100, scoresBase.governance + govBonus);
  const newFin = Math.min(100, scoresBase.finance + finBonus);
  const newLeg = Math.min(100, scoresBase.legal + legBonus);
  const newOp = Math.min(100, scoresBase.operacional + opBonus);
  const incMedio = (govBonus + finBonus + legBonus + opBonus) / 4;
  const newVal = Math.min(100, Math.round(scoresBase.valuation + incMedio * 0.6));
  const projecao = Math.round((newGov + newFin + newLeg + newVal + newOp) / 5);
  document.getElementById('simResultValue').innerText = projecao + '%';
}

function atualizarGraficosProjecao(scoresBase, govB, finB, legB, opB) {
  const base = scoresBase.valuation || 50;
  const incMedio = (govB + finB + legB + opB) / 4;
  const val12 = Math.min(100, Math.round(base + incMedio * 0.3));
  const val24 = Math.min(100, Math.round(base + incMedio * 0.6));
  const val36 = Math.min(100, Math.round(base + incMedio * 0.9));

  const ctxLine = document.getElementById('lineChart').getContext('2d');
  if (window.lineChartInstance) window.lineChartInstance.destroy();
  window.lineChartInstance = new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ['Atual', '12m', '24m', '36m'],
      datasets: [{
        label: 'Valuation Projetado',
        data: [base, val12, val24, val36],
        borderColor: '#FF3B00',
        backgroundColor: 'rgba(255,59,0,0.1)',
        tension: 0.2,
        fill: false,
        pointBackgroundColor: '#FF3B00'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, bottom: 4, left: 4, right: 8 } },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F5F2EE', font: { size: 9 }, boxWidth: 10, boxHeight: 10, padding: 10 }
        }
      },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#F5F2EE', font: { size: 8 } } },
        x: { ticks: { color: '#F5F2EE', font: { size: 8 } } }
      }
    }
  });

  const riscoBase = 100 - base;
  const risco12 = Math.max(0, riscoBase - incMedio * 0.2);
  const risco24 = Math.max(0, riscoBase - incMedio * 0.4);
  const risco36 = Math.max(0, riscoBase - incMedio * 0.6);
  const ctxArea = document.getElementById('areaChart').getContext('2d');
  if (window.areaChartInstance) window.areaChartInstance.destroy();
  window.areaChartInstance = new Chart(ctxArea, {
    type: 'line',
    data: {
      labels: ['Atual', '12m', '24m', '36m'],
      datasets: [{
        label: 'Índice de Risco',
        data: [riscoBase, risco12, risco24, risco36],
        borderColor: '#FF3B00',
        backgroundColor: 'rgba(255,59,0,0.25)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8, bottom: 4, left: 4, right: 8 } },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F5F2EE', font: { size: 9 }, boxWidth: 10, boxHeight: 10, padding: 10 }
        }
      },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#F5F2EE', font: { size: 8 } } },
        x: { ticks: { color: '#F5F2EE', font: { size: 8 } } }
      }
    }
  });
}

function configurarTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(this.dataset.tab).classList.add('active');
      setTimeout(() => {
        if (window.radarChartInstance) window.radarChartInstance.resize();
        if (window.barChartInstance) window.barChartInstance.resize();
        if (window.lineChartInstance) window.lineChartInstance.resize();
        if (window.areaChartInstance) window.areaChartInstance.resize();
      }, 100);
    });
  });
}
