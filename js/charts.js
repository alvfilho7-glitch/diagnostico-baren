// ============================================================
// charts.js - Gerenciamento de gráficos com Chart.js
// ============================================================

// ============================================================
// 1. INICIALIZAÇÃO DOS GRÁFICOS DO DASHBOARD
// ============================================================
function initCharts(scoresResult, subData) {
    initRadarChart(scoresResult);
    initSubPillarChart(subData);
    initValuationChart(scoresResult);
}

// ============================================================
// 2. RADAR CHART
// ============================================================
function initRadarChart(scoresResult) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    
    // Destruir gráfico existente se houver
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
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
    // Benchmark: média de mercado
    const benchmark = [65, 55, 70, 50, 60, 55];

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sua Empresa',
                data: data,
                backgroundColor: 'rgba(232,98,26,0.15)',
                borderColor: '#E8621A',
                borderWidth: 2,
                pointBackgroundColor: '#E8621A',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Benchmark Mercado',
                data: benchmark,
                backgroundColor: 'transparent',
                borderColor: 'rgba(248,244,239,0.25)',
                borderWidth: 1.5,
                borderDash: [4, 4],
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F8F4EF',
                        font: {
                            size: 10,
                            family: 'Inter'
                        },
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(7,7,10,0.9)',
                    titleColor: '#F8F4EF',
                    bodyColor: '#F8F4EF',
                    borderColor: 'rgba(232,98,26,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(248,244,239,0.06)'
                    },
                    grid: {
                        color: 'rgba(248,244,239,0.06)'
                    },
                    pointLabels: {
                        color: '#F8F4EF',
                        font: {
                            size: 9,
                            family: 'Inter'
                        }
                    },
                    ticks: {
                        display: false,
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// ============================================================
// 3. SUB-PILLAR CHART (Barras)
// ============================================================
function initSubPillarChart(subData) {
    const ctx = document.getElementById('subPillarChart');
    if (!ctx) return;
    
    if (window.subPillarChartInstance) {
        window.subPillarChartInstance.destroy();
    }

    const labels = Object.keys(subData);
    const values = Object.values(subData);
    
    // Limitar a 15 itens para não poluir o gráfico
    const displayLabels = labels.slice(0, 15);
    const displayValues = values.slice(0, 15);

    window.subPillarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: displayLabels,
            datasets: [{
                label: 'Maturidade %',
                data: displayValues,
                backgroundColor: displayValues.map(v => 
                    v >= 70 ? 'rgba(0,230,118,0.7)' :
                    v >= 40 ? 'rgba(255,145,0,0.7)' :
                    'rgba(255,23,68,0.7)'
                ),
                borderColor: displayValues.map(v =>
                    v >= 70 ? '#00e676' :
                    v >= 40 ? '#ff9100' :
                    '#ff1744'
                ),
                borderWidth: 1,
                borderRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(7,7,10,0.9)',
                    titleColor: '#F8F4EF',
                    bodyColor: '#F8F4EF',
                    borderColor: 'rgba(232,98,26,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: '#F8F4EF',
                        font: {
                            size: 8,
                            family: 'Inter'
                        },
                        stepSize: 25,
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(248,244,239,0.06)'
                    }
                },
                x: {
                    ticks: {
                        color: '#F8F4EF',
                        font: {
                            size: 7,
                            family: 'Inter'
                        },
                        maxRotation: 45,
                        minRotation: 30
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ============================================================
// 4. VALUATION CHART (Linha)
// ============================================================
function initValuationChart(scoresResult) {
    const ctx = document.getElementById('valuationChart');
    if (!ctx) return;
    
    if (window.valuationChartInstance) {
        window.valuationChartInstance.destroy();
    }

    const overall = Object.values(scoresResult).reduce((a, b) => a + b, 0) / Object.values(scoresResult).length;
    const currentScore = Math.round(overall);
    const potentialScore = Math.min(95, currentScore + 40);

    window.valuationChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Atual', 'Mês 3', 'Mês 6', 'Mês 12', 'Potencial'],
            datasets: [{
                label: 'Sua Empresa',
                data: [
                    currentScore, 
                    Math.min(100, currentScore + 5), 
                    Math.min(100, currentScore + 12), 
                    Math.min(100, currentScore + 20),
                    potentialScore
                ],
                borderColor: '#E8621A',
                backgroundColor: 'rgba(232,98,26,0.05)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#E8621A',
                pointBorderColor: '#fff',
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2
            }, {
                label: 'Valuação Máxima',
                data: [
                    potentialScore - 15,
                    potentialScore - 8,
                    potentialScore - 3,
                    potentialScore,
                    potentialScore
                ],
                borderColor: 'rgba(248,244,239,0.2)',
                borderDash: [4, 4],
                fill: false,
                tension: 0.3,
                pointBackgroundColor: 'rgba(248,244,239,0.2)',
                pointBorderColor: 'transparent',
                pointRadius: 2,
                borderWidth: 1.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F8F4EF',
                        font: {
                            size: 9,
                            family: 'Inter'
                        },
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(7,7,10,0.9)',
                    titleColor: '#F8F4EF',
                    bodyColor: '#F8F4EF',
                    borderColor: 'rgba(232,98,26,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: '#F8F4EF',
                        font: {
                            size: 8,
                            family: 'Inter'
                        },
                        stepSize: 25,
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(248,244,239,0.06)'
                    }
                },
                x: {
                    ticks: {
                        color: '#F8F4EF',
                        font: {
                            size: 8,
                            family: 'Inter'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ============================================================
// 5. RELATÓRIO RADAR CHART
// ============================================================
function initReportRadar(scoresResult) {
    const ctx = document.getElementById('reportRadarChart');
    if (!ctx) return;
    
    if (window.reportRadarChartInstance) {
        window.reportRadarChartInstance.destroy();
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
    const benchmark = [65, 55, 70, 50, 60, 55];

    window.reportRadarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sua Empresa',
                data: data,
                backgroundColor: 'rgba(232,98,26,0.15)',
                borderColor: '#E8621A',
                borderWidth: 2,
                pointBackgroundColor: '#E8621A',
                pointBorderColor: '#fff',
                pointRadius: 3,
                pointHoverRadius: 5
            }, {
                label: 'Benchmark',
                data: benchmark,
                backgroundColor: 'transparent',
                borderColor: 'rgba(248,244,239,0.2)',
                borderDash: [4, 4],
                borderWidth: 1.5,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#F8F4EF',
                        font: {
                            size: 9,
                            family: 'Inter'
                        },
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(7,7,10,0.9)',
                    titleColor: '#F8F4EF',
                    bodyColor: '#F8F4EF',
                    borderColor: 'rgba(232,98,26,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(248,244,239,0.06)'
                    },
                    grid: {
                        color: 'rgba(248,244,239,0.06)'
                    },
                    pointLabels: {
                        color: '#F8F4EF',
                        font: {
                            size: 8,
                            family: 'Inter'
                        }
                    },
                    ticks: {
                        display: false,
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// ============================================================
// 6. FUNÇÃO DE LIMPEZA DE GRÁFICOS
// ============================================================
function destroyAllCharts() {
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
        window.radarChartInstance = null;
    }
    if (window.subPillarChartInstance) {
        window.subPillarChartInstance.destroy();
        window.subPillarChartInstance = null;
    }
    if (window.valuationChartInstance) {
        window.valuationChartInstance.destroy();
        window.valuationChartInstance = null;
    }
    if (window.reportRadarChartInstance) {
        window.reportRadarChartInstance.destroy();
        window.reportRadarChartInstance = null;
    }
}

// ============================================================
// 7. EXPORTAÇÃO DAS FUNÇÕES PARA USO GLOBAL
// ============================================================
// Tornar as funções disponíveis globalmente
window.initCharts = initCharts;
window.initRadarChart = initRadarChart;
window.initSubPillarChart = initSubPillarChart;
window.initValuationChart = initValuationChart;
window.initReportRadar = initReportRadar;
window.destroyAllCharts = destroyAllCharts;
