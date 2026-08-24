// ============================================================
// js/charts.js
// GRÁFICOS E VISUALIZAÇÕES DO SISTEMA
// ============================================================

// ============================================================
// 1. GAUGE (VELOCÍMETRO)
// ============================================================

/**
 * Desenha o velocímetro no canvas
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {number} value - Valor percentual (0-100)
 * @param {Object} options - Opções de configuração
 */
function drawGauge(canvasId, value, options = {}) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement?.getBoundingClientRect() || { width: 140 };
  const size = Math.min(rect.width || 140, 140);
  
  // Configurações
  const config = {
    strokeWidth: 14,
    padding: 20,
    startAngle: Math.PI * 0.75,
    endAngle: Math.PI * 2.25,
    colors: {
      background: 'rgba(248,244,239,0.08)',
      gradient: ['#ff1744', '#ff9100', '#ffea00', '#00e676'],
      pointer: '#E8621A',
      markLow: 'rgba(248,244,239,0.2)',
      markHigh: 'rgba(232,98,26,0.6)'
    },
    ...options
  };
  
  // Configura canvas para alta resolução
  canvas.width = size * 2;
  canvas.height = size * 2;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 10;
  const radius = canvas.width / 2 - config.padding;
  const totalAngle = config.endAngle - config.startAngle;
  const currentAngle = config.startAngle + (value / 100) * totalAngle;
  
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha o arco de fundo
  drawArc(ctx, cx, cy, radius, config.startAngle, config.endAngle, {
    strokeStyle: config.colors.background,
    lineWidth: config.strokeWidth
  });
  
  // Desenha o arco colorido (gradiente)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  const stops = config.colors.gradient;
  stops.forEach((color, i) => {
    gradient.addColorStop(i / (stops.length - 1), color);
  });
  
  drawArc(ctx, cx, cy, radius, config.startAngle, currentAngle, {
    strokeStyle: gradient,
    lineWidth: config.strokeWidth,
    lineCap: 'round'
  });
  
  // Desenha o ponto indicador
  const dotAngle = currentAngle;
  const dotX = cx + (radius - 6) * Math.cos(dotAngle);
  const dotY = cy + (radius - 6) * Math.sin(dotAngle);
  
  ctx.beginPath();
  ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = config.colors.pointer;
  ctx.fill();
  ctx.shadowColor = 'rgba(232,98,26,0.4)';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Desenha as marcas de referência
  for (let i = 0; i <= 10; i++) {
    const angle = config.startAngle + (i / 10) * totalAngle;
    const isMain = i % 5 === 0;
    const len = isMain ? 12 : 6;
    const x1 = cx + (radius - 4) * Math.cos(angle);
    const y1 = cy + (radius - 4) * Math.sin(angle);
    const x2 = cx + (radius - 4 - len) * Math.cos(angle);
    const y2 = cy + (radius - 4 - len) * Math.sin(angle);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = i / 10 <= value / 100 ? config.colors.markHigh : config.colors.markLow;
    ctx.lineWidth = isMain ? 2 : 1;
    ctx.stroke();
  }
}

/**
 * Função auxiliar para desenhar um arco
 */
function drawArc(ctx, cx, cy, radius, startAngle, endAngle, options = {}) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = options.strokeStyle || '#fff';
  ctx.lineWidth = options.lineWidth || 2;
  ctx.lineCap = options.lineCap || 'butt';
  ctx.stroke();
}

// ============================================================
// 2. RADAR CHART
// ============================================================

/**
 * Cria um gráfico radar
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {Object} data - Dados do gráfico
 * @param {Object} options - Opções de configuração
 * @returns {Chart} Instância do Chart.js
 */
function createRadarChart(canvasId, data, options = {}) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return null;
  
  // Configuração padrão
  const defaultColors = {
    primary: '#E8621A',
    primaryBg: 'rgba(232,98,26,0.15)',
    secondary: 'rgba(248,244,239,0.25)',
    grid: 'rgba(248,244,239,0.06)',
    text: '#F8F4EF'
  };
  
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: options.legendPosition || 'bottom',
        labels: {
          color: defaultColors.text,
          font: { size: options.legendFontSize || 10 }
        }
      }
    },
    scales: {
      r: {
        angleLines: { color: defaultColors.grid },
        grid: { color: defaultColors.grid },
        pointLabels: {
          color: defaultColors.text,
          font: { size: options.labelFontSize || 9 }
        },
        ticks: { display: false, stepSize: 20 },
        min: 0,
        max: 100
      }
    },
    ...options
  };
  
  return new Chart(canvas, {
    type: 'radar',
    data: data,
    options: config
  });
}

/**
 * Prepara os dados para o radar chart
 * @param {Object} scores - Scores por pilar
 * @param {Array} labels - Labels dos pilares
 * @param {Array} benchmark - Dados de benchmark
 * @returns {Object} Dados formatados para o Chart.js
 */
function prepareRadarData(scores, labels, benchmark = null) {
  const datasets = [
    {
      label: 'Sua Empresa',
      data: labels.map(label => scores[label.toLowerCase()] || 0),
      backgroundColor: 'rgba(232,98,26,0.15)',
      borderColor: '#E8621A',
      borderWidth: 2,
      pointBackgroundColor: '#E8621A',
      pointBorderColor: '#fff',
      pointRadius: 4
    }
  ];
  
  if (benchmark) {
    datasets.push({
      label: 'Benchmark Mercado',
      data: benchmark,
      backgroundColor: 'transparent',
      borderColor: 'rgba(248,244,239,0.25)',
      borderWidth: 1.5,
      borderDash: [4, 4],
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointRadius: 0
    });
  }
  
  return {
    labels: labels,
    datasets: datasets
  };
}

// ============================================================
// 3. BAR CHART (SUB-PILARES)
// ============================================================

/**
 * Cria um gráfico de barras
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {Object} data - Dados do gráfico
 * @param {Object} options - Opções de configuração
 * @returns {Chart} Instância do Chart.js
 */
function createBarChart(canvasId, data, options = {}) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return null;
  
  const defaultColors = {
    text: '#F8F4EF',
    grid: 'rgba(248,244,239,0.06)'
  };
  
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: options.showLegend || false }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: defaultColors.text,
          font: { size: options.yTickSize || 8 },
          stepSize: options.yStepSize || 25
        },
        grid: { color: defaultColors.grid }
      },
      x: {
        ticks: {
          color: defaultColors.text,
          font: { size: options.xTickSize || 7 },
          maxRotation: options.xRotation || 45
        }
      }
    },
    ...options
  };
  
  return new Chart(canvas, {
    type: 'bar',
    data: data,
    options: config
  });
}

/**
 * Prepara os dados para o gráfico de barras de sub-pilares
 * @param {Object} subData - Dados dos sub-pilares
 * @param {number} limit - Limite de itens a mostrar
 * @returns {Object} Dados formatados para o Chart.js
 */
function prepareSubPillarData(subData, limit = 12) {
  const labels = Object.keys(subData).slice(0, limit);
  const values = Object.values(subData).slice(0, limit);
  
  const colors = values.map(v => {
    if (v >= 70) return 'rgba(0,230,118,0.7)';
    if (v >= 40) return 'rgba(255,145,0,0.7)';
    return 'rgba(255,23,68,0.7)';
  });
  
  const borderColors = values.map(v => {
    if (v >= 70) return '#00e676';
    if (v >= 40) return '#ff9100';
    return '#ff1744';
  });
  
  return {
    labels: labels,
    datasets: [{
      label: 'Maturidade %',
      data: values,
      backgroundColor: colors,
      borderColor: borderColors,
      borderWidth: 1,
      borderRadius: 2
    }]
  };
}

// ============================================================
// 4. LINE CHART (VALUATION)
// ============================================================

/**
 * Cria um gráfico de linha
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {Object} data - Dados do gráfico
 * @param {Object} options - Opções de configuração
 * @returns {Chart} Instância do Chart.js
 */
function createLineChart(canvasId, data, options = {}) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return null;
  
  const defaultColors = {
    text: '#F8F4EF',
    grid: 'rgba(248,244,239,0.06)',
    primary: '#E8621A',
    primaryBg: 'rgba(232,98,26,0.05)',
    secondary: 'rgba(248,244,239,0.2)'
  };
  
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: options.legendPosition || 'bottom',
        labels: {
          color: defaultColors.text,
          font: { size: options.legendFontSize || 9 }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: defaultColors.text,
          font: { size: options.yTickSize || 8 },
          stepSize: options.yStepSize || 25
        },
        grid: { color: defaultColors.grid }
      },
      x: {
        ticks: {
          color: defaultColors.text,
          font: { size: options.xTickSize || 8 }
        }
      }
    },
    ...options
  };
  
  return new Chart(canvas, {
    type: 'line',
    data: data,
    options: config
  });
}

/**
 * Prepara os dados para o gráfico de valuation
 * @param {number} currentScore - Score atual
 * @param {number} maxScore - Score máximo potencial
 * @returns {Object} Dados formatados para o Chart.js
 */
function prepareValuationData(currentScore, maxScore = 95) {
  const potential = Math.min(maxScore, currentScore + 40);
  
  return {
    labels: ['Atual', 'Mês 3', 'Mês 6', 'Mês 12', 'Potencial'],
    datasets: [
      {
        label: 'Sua Empresa',
        data: [currentScore, currentScore + 5, currentScore + 12, currentScore + 20, potential],
        borderColor: '#E8621A',
        backgroundColor: 'rgba(232,98,26,0.05)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#E8621A',
        pointRadius: 3
      },
      {
        label: 'Valuação Máxima',
        data: [potential - 15, potential - 8, potential - 3, potential, potential],
        borderColor: 'rgba(248,244,239,0.2)',
        borderDash: [4, 4],
        fill: false,
        tension: 0.3,
        pointBackgroundColor: 'rgba(248,244,239,0.2)',
        pointRadius: 2
      }
    ]
  };
}

// ============================================================
// 5. GAUGE (MINI - PARA SIMULADOR)
// ============================================================

/**
 * Atualiza um mini gauge no simulador
 * @param {string} fillId - ID do elemento fill
 * @param {string} labelId - ID do elemento label
 * @param {number} value - Valor percentual
 * @param {number} benchmark - Valor do benchmark
 */
function updateMiniGauge(fillId, labelId, value, benchmark = 60) {
  const fill = document.getElementById(fillId);
  const label = document.getElementById(labelId);
  
  if (fill) {
    fill.style.width = Math.min(100, Math.max(0, value)) + '%';
  }
  
  if (label) {
    label.textContent = Math.round(value) + '%';
  }
  
  // Atualiza a linha de benchmark
  const track = fill?.parentElement;
  if (track) {
    const benchmarkLine = track.querySelector('.benchmark-line');
    if (benchmarkLine) {
      benchmarkLine.style.left = Math.min(100, Math.max(0, benchmark)) + '%';
    }
  }
}

// ============================================================
// 6. FUNÇÕES DE UTILIDADE PARA CORES
// ============================================================

/**
 * Retorna uma cor baseada no valor (semáforo)
 * @param {number} value - Valor (0-100)
 * @param {string} format - Formato de retorno ('hex', 'rgba', 'object')
 * @returns {string|Object} Cor no formato solicitado
 */
function getScoreColor(value, format = 'hex') {
  let color;
  
  if (value >= 70) {
    color = { hex: '#00e676', rgba: 'rgba(0,230,118,0.7)', rgb: '0,230,118' };
  } else if (value >= 40) {
    color = { hex: '#ff9100', rgba: 'rgba(255,145,0,0.7)', rgb: '255,145,0' };
  } else {
    color = { hex: '#ff1744', rgba: 'rgba(255,23,68,0.7)', rgb: '255,23,68' };
  }
  
  switch (format) {
    case 'hex':
      return color.hex;
    case 'rgba':
      return color.rgba;
    case 'rgb':
      return color.rgb;
    case 'object':
      return color;
    default:
      return color.hex;
  }
}

/**
 * Retorna um gradiente de cores para um conjunto de valores
 * @param {Array} values - Array de valores
 * @param {string} format - Formato de retorno
 * @returns {Array} Array de cores
 */
function getScoreColors(values, format = 'hex') {
  return values.map(v => getScoreColor(v, format));
}

// ============================================================
// 7. FUNÇÕES DE DESTRUIÇÃO DE GRÁFICOS
// ============================================================

/**
 * Destroi uma instância de gráfico
 * @param {Chart} chartInstance - Instância do Chart.js
 */
function destroyChart(chartInstance) {
  if (chartInstance && typeof chartInstance.destroy === 'function') {
    chartInstance.destroy();
  }
}

/**
 * Destroi múltiplas instâncias de gráficos
 * @param {Object} chartInstances - Objeto com instâncias
 * @param {Array} keys - Chaves a destruir
 */
function destroyCharts(chartInstances, keys) {
  keys.forEach(key => {
    if (chartInstances[key]) {
      destroyChart(chartInstances[key]);
      chartInstances[key] = null;
    }
  });
}

// ============================================================
// 8. FUNÇÕES DE EXPORTAÇÃO DE GRÁFICOS
// ============================================================

/**
 * Exporta um gráfico como imagem
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {string} format - Formato ('png', 'jpeg')
 * @param {number} quality - Qualidade (0-1) para JPEG
 * @returns {string} Data URL da imagem
 */
function exportChartImage(canvasId, format = 'png', quality = 1) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return null;
  
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mimeType, quality);
}

/**
 * Faz o download de um gráfico como imagem
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {string} filename - Nome do arquivo
 * @param {string} format - Formato ('png', 'jpeg')
 * @param {number} quality - Qualidade (0-1) para JPEG
 */
function downloadChartImage(canvasId, filename = 'chart', format = 'png', quality = 1) {
  const dataUrl = exportChartImage(canvasId, format, quality);
  if (!dataUrl) return;
  
  const link = document.createElement('a');
  link.download = `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;
  link.href = dataUrl;
  link.click();
}

// ============================================================
// 9. FUNÇÕES DE ANIMAÇÃO PARA GAUGES
// ============================================================

/**
 * Anima um gauge de um valor inicial para um final
 * @param {string} canvasId - ID do canvas
 * @param {number} startValue - Valor inicial
 * @param {number} endValue - Valor final
 * @param {number} duration - Duração da animação em ms
 * @param {Function} onUpdate - Callback a cada frame
 */
function animateGauge(canvasId, startValue, endValue, duration = 1000, onUpdate = null) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const startTime = performance.now();
  const diff = endValue - startValue;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    
    // Easing function (cubic ease-out)
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + diff * eased;
    
    drawGauge(canvas, currentValue);
    
    if (onUpdate) {
      onUpdate(currentValue);
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// ============================================================
// 10. FUNÇÕES DE RESPONSIVIDADE
// ============================================================

/**
 * Configura um gráfico para ser responsivo
 * @param {Chart} chartInstance - Instância do Chart.js
 * @param {Object} options - Opções de responsividade
 */
function makeChartResponsive(chartInstance, options = {}) {
  if (!chartInstance) return;
  
  const defaultOptions = {
    debounceDelay: 250,
    maintainAspectRatio: false
  };
  
  const config = { ...defaultOptions, ...options };
  
  let resizeTimeout;
  const resizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (chartInstance && chartInstance.resize) {
        chartInstance.resize();
      }
    }, config.debounceDelay);
  };
  
  window.addEventListener('resize', resizeHandler);
  
  // Retorna função para remover o listener
  return () => {
    window.removeEventListener('resize', resizeHandler);
  };
}

// ============================================================
// 11. GRÁFICO DE DONUT (OPCIONAL)
// ============================================================

/**
 * Cria um gráfico de donut
 * @param {string|HTMLCanvasElement} canvasId - ID do canvas ou elemento
 * @param {Object} data - Dados do gráfico
 * @param {Object} options - Opções de configuração
 * @returns {Chart} Instância do Chart.js
 */
function createDonutChart(canvasId, data, options = {}) {
  const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  if (!canvas) return null;
  
  const defaultColors = {
    text: '#F8F4EF'
  };
  
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: options.legendPosition || 'bottom',
        labels: {
          color: defaultColors.text,
          font: { size: options.legendFontSize || 10 }
        }
      }
    },
    cutout: options.cutout || '70%',
    ...options
  };
  
  return new Chart(canvas, {
    type: 'doughnut',
    data: data,
    options: config
  });
}

/**
 * Prepara os dados para o gráfico de donut
 * @param {Object} scores - Scores por pilar
 * @param {Array} labels - Labels dos pilares
 * @returns {Object} Dados formatados para o Chart.js
 */
function prepareDonutData(scores, labels) {
  const data = labels.map(label => scores[label.toLowerCase()] || 0);
  const colors = data.map(v => getScoreColor(v, 'hex'));
  const borderColors = data.map(v => getScoreColor(v, 'hex'));
  
  return {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colors.map(c => c + '80'), // com transparência
      borderColor: colors,
      borderWidth: 2
    }]
  };
}

// ============================================================
// EXPORTAÇÃO (para uso em outros arquivos)
// ============================================================
// Funções disponíveis no escopo global

// Para módulos ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    drawGauge,
    createRadarChart,
    prepareRadarData,
    createBarChart,
    prepareSubPillarData,
    createLineChart,
    prepareValuationData,
    updateMiniGauge,
    getScoreColor,
    getScoreColors,
    destroyChart,
    destroyCharts,
    exportChartImage,
    downloadChartImage,
    animateGauge,
    makeChartResponsive,
    createDonutChart,
    prepareDonutData
  };
}
