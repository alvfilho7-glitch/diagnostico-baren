// ============================================================
// DASHBOARD.JS - Gráficos, Alertas e Simulador
// BAREN Diagnóstico Estratégico
// ============================================================

// ============================================================
// 1. VARIÁVEIS GLOBAIS
// ============================================================

let currentScores = {
  governance: 0,
  finance: 0,
  legal: 0,
  valuation: 0,
  operacional: 0
};

let chartInstances = {
  radar: null,
  bar: null,
  line: null,
  area: null
};

// ============================================================
// 2. CÁLCULO DOS RESULTADOS
// ============================================================

/**
 * Calcula os scores por pilar baseado nas respostas
 */
function computeResults() {
  // Agrupa respostas por pilar
  const grupos = {
    governance: [],
    finance: [],
    legal: [],
    valuation: [],
    operacional: []
  };
  
  state.answers.forEach(a => {
    if (grupos[a.pilar]) {
      grupos[a.pilar].push(a.weight);
    }
  });
  
  // Calcula a média de cada pilar
  const avg = (arr) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  
  const scores = {
    governance: avg(grupos.governance),
    finance: avg(grupos.finance),
    legal: avg(grupos.legal),
    valuation: avg(grupos.valuation),
    operacional: avg(grupos.operacional)
  };
  
  // Salva para uso global
  currentScores = scores;
  
  // Renderiza o dashboard
  renderAdvancedDashboard(scores);
}

// ============================================================
// 3. DASHBOARD PRINCIPAL
// ============================================================

/**
 * Renderiza o dashboard completo com gráficos e métricas
 * @param {Object} scores - Scores calculados por pilar
 */
function renderAdvancedDashboard(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  
  // 3.1 Atualiza métricas
  updateMetrics(scores);
  
  // 3.2 Renderiza gráficos
  renderRadarChart(scores);
  renderBarChart(scores);
  
  // 3.3 Gera alertas
  gerarAlertas(scores);
  
  // 3.4 Gera checklist
  gerarChecklist(scores);
  
  // 3.5 Configura simulador
  configurarSimulador(scores);
  
  // 3.6 Configura abas
  configurarTabs();
  
  // 3.7 Configura relatório
  configurarRelatorio(scores);
  
  // 3.8 Mostra a tela de resultado
  showScreen('resultScreen');
  document.getElementById('progressContainer').style.display = 'none';
  
  // 3.9 Atualiza score geral
  const overall = Math.round((governance + finance + legal + valuation + operacional) / 5);
  document.getElementById('overallScore').innerText = overall + '%';
}

// ============================================================
// 4. MÉTRICAS
// ============================================================

/**
 * Atualiza os cards de métricas
 * @param {Object} scores - Scores calculados
 */
function updateMetrics(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  
  // Atualiza valores
  document.getElementById('scoreValuation').innerText = valuation + '%';
  document.getElementById('scoreGovernance').innerText = governance + '%';
  document.getElementById('scoreFinance').innerText = finance + '%';
  document.getElementById('scoreLegal').innerText = legal + '%';
  document.getElementById('scoreOperacional').innerText = operacional + '%';
  
  // Atualiza barras de progresso
  updateMetricBar('barValuation', valuation);
  updateMetricBar('barGovernance', governance);
  updateMetricBar('barFinance', finance);
  updateMetricBar('barLegal', legal);
  updateMetricBar('barOperacional', operacional);
}

/**
 * Atualiza uma barra de progresso individual
 * @param {string} id - ID da barra
 * @param {number} value - Valor (0-100)
 */
function updateMetricBar(id, value) {
  const bar = document.getElementById(id);
  if (bar) {
    setTimeout(() => {
      bar.style.width = value + '%';
    }, 100);
  }
}

// ============================================================
// 5. GRÁFICOS
// ============================================================

/**
 * Renderiza o gráfico Radar
 * @param {Object} scores - Scores calculados
 */
function renderRadarChart(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const ctx = document.getElementById('radarChart').getContext('2d');
  
  // Destroi instância anterior se existir
  if (chartInstances.radar) {
    chartInstances.radar.destroy();
  }
  
  chartInstances.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Governança', 'Financeiro', 'Jurídico', 'Valuation', 'Operacional'],
      datasets: [{
        label: 'Score atual',
        data: [governance, finance, legal, valuation, operacional],
        backgroundColor: 'rgba(255, 59, 0, 0.15)',
        borderColor: '#FF3B00',
        borderWidth: 2,
        pointBackgroundColor: '#FF3B00',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#F5F2EE',
            font: { size: 10, family: 'Inter' },
            boxWidth: 12,
            boxHeight: 12,
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.06)',
            lineWidth: 1
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.06)',
            circular: true
          },
          pointLabels: {
            color: '#F5F2EE',
            font: { size: 10, family: 'Inter', weight: '500' }
          },
          ticks: {
            display: false,
            stepSize: 20,
            backdropColor: 'transparent'
          },
          min: 0,
          max: 100
        }
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    }
  });
}

/**
 * Renderiza o gráfico de Barras com Benchmark
 * @param {Object} scores - Scores calculados
 */
function renderBarChart(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const ctx = document.getElementById('barChart').getContext('2d');
  
  // Destroi instância anterior se existir
  if (chartInstances.bar) {
    chartInstances.bar.destroy();
  }
  
  const benchmark = CONFIG.BENCHMARK;
  
  chartInstances.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gov', 'Fin', 'Jur', 'Val', 'Op'],
      datasets: [
        {
          label: 'Sua Empresa',
          data: [governance, finance, legal, valuation, operacional],
          backgroundColor: '#FF3B00',
          borderRadius: 4,
          borderSkipped: false
        },
        {
          label: 'Benchmark',
          data: [benchmark.governance, benchmark.finance, benchmark.legal, benchmark.valuation, benchmark.operacional],
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          borderRadius: 4,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#F5F2EE',
            font: { size: 10, family: 'Inter' },
            boxWidth: 12,
            boxHeight: 12,
            padding: 16,
            usePointStyle: true,
            pointStyle: 'rectRounded'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 9, family: 'Inter' },
            stepSize: 25
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 10, family: 'Inter', weight: '600' }
          }
        }
      },
      animation: {
        duration: 600,
        easing: 'easeOutQuart'
      }
    }
  });
}

// ============================================================
// 6. ALERTAS
// ============================================================

/**
 * Gera alertas baseados nos scores
 * @param {Object} scores - Scores calculados
 */
function gerarAlertas(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const alertContainer = document.getElementById('alertContainer');
  let alerts = [];
  let criticalCount = 0;
  let mediumCount = 0;
  
  // Alerta: Governança
  if (governance < CONFIG.ALERT_THRESHOLDS.critical) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Governança muito baixa: formalize conselho, separe patrimônio e crie acordo de sócios.',
      icon: '🔴'
    });
    criticalCount++;
  } else if (governance < CONFIG.ALERT_THRESHOLDS.medium) {
    alerts.push({
      severity: 'Médio',
      msg: 'Governança em desenvolvimento: considere estruturar conselho e formalizar processos.',
      icon: '🟡'
    });
    mediumCount++;
  }
  
  // Alerta: Financeiro
  if (finance < CONFIG.ALERT_THRESHOLDS.critical) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Financeiro crítico: reduza endividamento, aumente reserva e contrate auditoria.',
      icon: '🔴'
    });
    criticalCount++;
  } else if (finance < CONFIG.ALERT_THRESHOLDS.medium) {
    alerts.push({
      severity: 'Médio',
      msg: 'Financeiro moderado: melhore gestão de caixa e revise custos.',
      icon: '🟡'
    });
    mediumCount++;
  }
  
  // Alerta: Jurídico
  if (legal < CONFIG.ALERT_THRESHOLDS.critical) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Risco jurídico elevado: regularize passivos, crie compliance e revise contratos.',
      icon: '🔴'
    });
    criticalCount++;
  } else if (legal < CONFIG.ALERT_THRESHOLDS.medium) {
    alerts.push({
      severity: 'Médio',
      msg: 'Jurídico em atenção: revise planejamento tributário e documentação societária.',
      icon: '🟡'
    });
    mediumCount++;
  }
  
  // Alerta: Operacional
  if (operacional < CONFIG.ALERT_THRESHOLDS.critical) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Operacional frágil: documente processos, implemente ERP e padronize SOPs.',
      icon: '🔴'
    });
    criticalCount++;
  } else if (operacional < CONFIG.ALERT_THRESHOLDS.medium) {
    alerts.push({
      severity: 'Médio',
      msg: 'Operacional em desenvolvimento: padronize processos e melhore eficiência.',
      icon: '🟡'
    });
    mediumCount++;
  }
  
  // Alerta: Valuation
  if (valuation < CONFIG.ALERT_THRESHOLDS.critical) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Valuation muito baixo: construa vantagem competitiva e documente diferenciais.',
      icon: '🔴'
    });
    criticalCount++;
  } else if (valuation < CONFIG.ALERT_THRESHOLDS.medium) {
    alerts.push({
      severity: 'Médio',
      msg: 'Valuation moderado: fortaleça posição de mercado e prepare due diligence.',
      icon: '🟡'
    });
    mediumCount++;
  }
  
  // Alerta específico por objetivo selecionado
  if (state.ramosSelecionados.includes('A') && valuation < 50) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Valuation baixo para venda. Recomenda-se valuation externo imediato.',
      icon: '🔴'
    });
    criticalCount++;
  }
  
  if (state.ramosSelecionados.includes('B') && governance < 50) {
    alerts.push({
      severity: 'Crítico',
      msg: 'Governança frágil para captação. Estruture conselho e pitch deck.',
      icon: '🔴'
    });
    criticalCount++;
  }
  
  // Ordena alertas por severidade
  const ordem = { Crítico: 0, Médio: 1, Baixo: 2 };
  alerts.sort((a, b) => ordem[a.severity] - ordem[b.severity]);
  
  // Atualiza contador
  document.getElementById('alertCount').innerText = alerts.length;
  
  // Renderiza alertas
  if (alerts.length === 0) {
    alertContainer.innerHTML = `
      <div style="padding:16px;color:var(--white-dim);font-size:13px;text-align:center;background:rgba(0,255,0,0.03);border-radius:6px;border:1px solid rgba(0,255,0,0.1);">
        ✅ Nenhum alerta crítico identificado. 
        <span style="display:block;font-size:11px;margin-top:4px;color:var(--white-muted);">
          Sua empresa está bem posicionada!
        </span>
      </div>
    `;
  } else {
    alertContainer.innerHTML = alerts.map(a => `
      <div class="alert-box ${a.severity === 'Crítico' ? 'alert-critical' : a.severity === 'Médio' ? 'alert-medium' : 'alert-low'}">
        <strong style="text-transform:uppercase;font-size:10px;color:${a.severity === 'Crítico' ? '#ff1744' : a.severity === 'Médio' ? '#ff9100' : '#ffea00'};">
          ${a.icon} ${a.severity}
        </strong>
        <span style="margin-left:8px;font-size:12px;line-height:1.4;">${a.msg}</span>
      </div>
    `).join('');
  }
}

// ============================================================
// 7. CHECKLIST
// ============================================================

/**
 * Gera checklist personalizado baseado nos scores
 * @param {Object} scores - Scores calculados
 */
function gerarChecklist(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  const checklist = [];
  
  // Adiciona itens baseados nos scores baixos
  if (governance < CONFIG.ALERT_THRESHOLDS.medium) {
    checklist.push(MESSAGES.checklist.governance);
  }
  
  if (finance < CONFIG.ALERT_THRESHOLDS.medium) {
    checklist.push(MESSAGES.checklist.finance);
  }
  
  if (legal < CONFIG.ALERT_THRESHOLDS.medium) {
    checklist.push(MESSAGES.checklist.legal);
  }
  
  if (valuation < CONFIG.ALERT_THRESHOLDS.medium) {
    checklist.push(MESSAGES.checklist.valuation);
  }
  
  if (operacional < CONFIG.ALERT_THRESHOLDS.medium) {
    checklist.push(MESSAGES.checklist.operational);
  }
  
  // Adiciona itens específicos por objetivo
  if (state.ramosSelecionados.includes('A') && valuation < 50) {
    checklist.push('📌 Prepare due diligence para venda');
  }
  
  if (state.ramosSelecionados.includes('B') && governance < 50) {
    checklist.push('📌 Estruture governança para captação');
  }
  
  if (state.ramosSelecionados.includes('E') && legal < 50) {
    checklist.push('📌 Contrate revisão tributária');
  }
  
  if (state.ramosSelecionados.includes('F') && operacional < 50) {
    checklist.push('📌 Mapeie oportunidades de redução de custos');
  }
  
  if (state.ramosSelecionados.includes('G') && governance < 50) {
    checklist.push('📌 Elabore plano de sucessão');
  }
  
  // Se não houver itens, mostra mensagem de sucesso
  if (checklist.length === 0) {
    checklist.push('✅ Sua empresa está bem posicionada! Mantenha o foco na excelência.');
  }
  
  // Renderiza checklist
  const container = document.getElementById('checklistContainer');
  container.innerHTML = checklist.map(item => `
    <span style="font-size:12px;color:var(--white-dim);background:rgba(255,255,255,0.03);padding:6px 14px;border-radius:20px;border:1px solid var(--border-dim);transition:all 0.2s;cursor:default;">
      ${item}
    </span>
  `).join('');
}

// ============================================================
// 8. SIMULADOR
// ============================================================

/**
 * Configura o simulador interativo
 * @param {Object} scores - Scores base
 */
function configurarSimulador(scores) {
  // Reseta sliders
  ['simGov', 'simFin', 'simLeg', 'simOp'].forEach(id => {
    document.getElementById(id).value = 0;
    document.getElementById(id + 'Label').innerText = '+0%';
  });
  
  // Atualiza valores iniciais
  atualizarSimulador(scores);
  atualizarGraficosProjecao(scores, 0, 0, 0, 0);
  
  // Adiciona event listeners
  ['simGov', 'simFin', 'simLeg', 'simOp'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
      const label = document.getElementById(id + 'Label');
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

/**
 * Atualiza o valor do simulador
 * @param {Object} scoresBase - Scores base
 */
function atualizarSimulador(scoresBase) {
  const govBonus = parseInt(document.getElementById('simGov').value) || 0;
  const finBonus = parseInt(document.getElementById('simFin').value) || 0;
  const legBonus = parseInt(document.getElementById('simLeg').value) || 0;
  const opBonus = parseInt(document.getElementById('simOp').value) || 0;
  
  // Aplica bônus (limitado a 100)
  const newGov = Math.min(100, scoresBase.governance + govBonus);
  const newFin = Math.min(100, scoresBase.finance + finBonus);
  const newLeg = Math.min(100, scoresBase.legal + legBonus);
  const newOp = Math.min(100, scoresBase.operacional + opBonus);
  
  // Impacto no valuation (60% da média dos bônus)
  const incMedio = (govBonus + finBonus + legBonus + opBonus) / 4;
  const newVal = Math.min(100, Math.round(scoresBase.valuation + incMedio * CONFIG.SIMULATOR.valuationImpact));
  
  // Score geral projetado
  const projecao = Math.round((newGov + newFin + newLeg + newVal + newOp) / 5);
  document.getElementById('simResultValue').innerText = projecao + '%';
}

/**
 * Atualiza os gráficos de projeção
 * @param {Object} scoresBase - Scores base
 * @param {number} govB - Bônus de governança
 * @param {number} finB - Bônus financeiro
 * @param {number} legB - Bônus jurídico
 * @param {number} opB - Bônus operacional
 */
function atualizarGraficosProjecao(scoresBase, govB, finB, legB, opB) {
  const base = scoresBase.valuation || 50;
  const incMedio = (govB + finB + legB + opB) / 4;
  
  // Projeções para 12, 24 e 36 meses
  const val12 = Math.min(100, Math.round(base + incMedio * 0.3));
  const val24 = Math.min(100, Math.round(base + incMedio * 0.6));
  const val36 = Math.min(100, Math.round(base + incMedio * 0.9));
  
  renderLineChart(base, val12, val24, val36);
  renderAreaChart(base, incMedio);
}

/**
 * Renderiza o gráfico de linha (tendência)
 */
function renderLineChart(base, val12, val24, val36) {
  const ctx = document.getElementById('lineChart').getContext('2d');
  
  if (chartInstances.line) {
    chartInstances.line.destroy();
  }
  
  chartInstances.line = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Atual', '12 meses', '24 meses', '36 meses'],
      datasets: [{
        label: 'Valuation Projetado',
        data: [base, val12, val24, val36],
        borderColor: '#FF3B00',
        backgroundColor: 'rgba(255, 59, 0, 0.08)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#FF3B00',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#F5F2EE',
            font: { size: 9, family: 'Inter' },
            boxWidth: 10,
            boxHeight: 10,
            padding: 10,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 8, family: 'Inter' },
            stepSize: 25
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 8, family: 'Inter' }
          }
        }
      },
      animation: {
        duration: 500,
        easing: 'easeOutQuart'
      }
    }
  });
}

/**
 * Renderiza o gráfico de área (redução de riscos)
 */
function renderAreaChart(base, incMedio) {
  const ctx = document.getElementById('areaChart').getContext('2d');
  
  if (chartInstances.area) {
    chartInstances.area.destroy();
  }
  
  // Índice de risco (quanto menor, melhor)
  const riscoBase = 100 - base;
  const risco12 = Math.max(0, riscoBase - incMedio * 0.2);
  const risco24 = Math.max(0, riscoBase - incMedio * 0.4);
  const risco36 = Math.max(0, riscoBase - incMedio * 0.6);
  
  chartInstances.area = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Atual', '12 meses', '24 meses', '36 meses'],
      datasets: [{
        label: 'Índice de Risco',
        data: [riscoBase, risco12, risco24, risco36],
        borderColor: '#FF3B00',
        backgroundColor: 'rgba(255, 59, 0, 0.15)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#FF3B00',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#F5F2EE',
            font: { size: 9, family: 'Inter' },
            boxWidth: 10,
            boxHeight: 10,
            padding: 10,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 8, family: 'Inter' },
            stepSize: 25
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#F5F2EE',
            font: { size: 8, family: 'Inter' }
          }
        }
      },
      animation: {
        duration: 500,
        easing: 'easeOutQuart'
      }
    }
  });
}

// ============================================================
// 9. RELATÓRIO
// ============================================================

/**
 * Configura o relatório da terceira tab
 * @param {Object} scores - Scores calculados
 */
function configurarRelatorio(scores) {
  const { governance, finance, legal, valuation, operacional } = scores;
  
  // Oportunidades
  const opportunities = [];
  if (legal < 60) opportunities.push('Recuperação de créditos tributários');
  if (finance < 60) opportunities.push('Otimização de capital de giro');
  if (operacional < 60) opportunities.push('Redução de custos operacionais');
  if (governance < 60) opportunities.push('Profissionalização da gestão');
  if (valuation < 60) opportunities.push('Valorização do negócio');
  if (state.ramosSelecionados.includes('E')) opportunities.push('Reestruturação tributária');
  if (state.ramosSelecionados.includes('F')) opportunities.push('Eficiência energética');
  
  if (opportunities.length === 0) {
    opportunities.push('Empresa bem posicionada - foco em crescimento');
  }
  
  // Pontos de atenção
  const warnings = [];
  if (governance < 40) warnings.push('Governança: estruturar conselho');
  if (finance < 40) warnings.push('Financeiro: reduzir endividamento');
  if (legal < 40) warnings.push('Jurídico: regularizar passivos');
  if (operacional < 40) warnings.push('Operacional: documentar processos');
  if (valuation < 40) warnings.push('Valuation: construir vantagem competitiva');
  
  if (warnings.length === 0) {
    warnings.push('Nenhum ponto crítico identificado');
  }
  
  // Recomendações
  const recommendations = [];
  if (governance < 60) recommendations.push('Estruturar governança e conselho');
  if (finance < 60) recommendations.push('Contratar auditoria financeira');
  if (legal < 60) recommendations.push('Realizar revisão tributária');
  if (operacional < 60) recommendations.push('Implementar ERP e padronizar processos');
  if (valuation < 60) recommendations.push('Preparar due diligence e valuation');
  
  if (recommendations.length === 0) {
    recommendations.push('Manter estratégia atual e buscar crescimento');
  }
  
  // Renderiza no DOM
  document.getElementById('reportOpportunities').innerHTML = `
    <ul>
      ${opportunities.map(o => `<li>${o}</li>`).join('')}
    </ul>
  `;
  
  document.getElementById('reportWarnings').innerHTML = `
    <ul>
      ${warnings.map(w => `<li>${w}</li>`).join('')}
    </ul>
  `;
  
  document.getElementById('reportRecommendations').innerHTML = `
    <ul>
      ${recommendations.map(r => `<li>${r}</li>`).join('')}
    </ul>
  `;
  
  // Botão de download PDF
  document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    gerarPDF(scores);
  });
  
  // Botão de contato
  document.getElementById('contactBtn').addEventListener('click', () => {
    alert('🔗 Em breve: conexão com especialista BAREN!\n\nPor enquanto, entre em contato pelo site: www.baren.com.br');
  });
}

// ============================================================
// 10. PDF (placeholder)
// ============================================================

/**
 * Gera um PDF do relatório (placeholder)
 * @param {Object} scores - Scores calculados
 */
function gerarPDF(scores) {
  // Por enquanto, apenas mostra um alerta
  alert('📄 Função de PDF em desenvolvimento!\n\nEm breve você poderá baixar o relatório completo.\n\nPor enquanto, aqui está o resumo:\n\n' +
    `Governança: ${scores.governance}%\n` +
    `Financeiro: ${scores.finance}%\n` +
    `Jurídico: ${scores.legal}%\n` +
    `Valuation: ${scores.valuation}%\n` +
    `Operacional: ${scores.operacional}%\n\n` +
    `📌 Acesse www.baren.com.br para mais informações.`);
  
  // Quando implementar o PDF real, usar html2pdf.js
  /*
  const element = document.getElementById('relatorio-container');
  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: 'diagnostico-baren.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    })
    .save();
  */
}

// ============================================================
// 11. TABS
// ============================================================

/**
 * Configura o sistema de abas
 */
function configurarTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active de todos os botões
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Mostra o painel correspondente
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(this.dataset.tab);
      if (target) {
        target.classList.add('active');
        
        // Recalcula gráficos após transição
        setTimeout(() => {
          if (chartInstances.radar) chartInstances.radar.resize();
          if (chartInstances.bar) chartInstances.bar.resize();
          if (chartInstances.line) chartInstances.line.resize();
          if (chartInstances.area) chartInstances.area.resize();
        }, 100);
      }
    });
  });
}

// ============================================================
// 12. EXPORTAÇÃO (disponível globalmente)
// ============================================================

window.currentScores = currentScores;
window.chartInstances = chartInstances;
window.computeResults = computeResults;
window.renderAdvancedDashboard = renderAdvancedDashboard;
window.updateMetrics = updateMetrics;
window.updateMetricBar = updateMetricBar;
window.renderRadarChart = renderRadarChart;
window.renderBarChart = renderBarChart;
window.gerarAlertas = gerarAlertas;
window.gerarChecklist = gerarChecklist;
window.configurarSimulador = configurarSimulador;
window.atualizarSimulador = atualizarSimulador;
window.atualizarGraficosProjecao = atualizarGraficosProjecao;
window.renderLineChart = renderLineChart;
window.renderAreaChart = renderAreaChart;
window.configurarRelatorio = configurarRelatorio;
window.gerarPDF = gerarPDF;
window.configurarTabs = configurarTabs;
