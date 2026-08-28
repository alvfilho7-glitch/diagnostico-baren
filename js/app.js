// ============================================================
// app.js - Lógica principal da aplicação
// ============================================================

// ============================================================
// 1. VARIÁVEIS GLOBAIS
// ============================================================
let currentPage = 1;
let selectedObjectives = [];
let answers = {};
let scores = {};
let simChecked = {};
let gaugeCtx = null;

// ============================================================
// 2. RENDERIZAÇÃO DA APLICAÇÃO
// ============================================================
function renderApp() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="app">
            <!-- HEADER -->
            <header class="app-header">
                <div class="container">
                    <a href="#" class="logo" onclick="goToPage(1)">
                        <img src="https://uploads.onecompiler.io/43scgwdnz/44qmu8ync/WhatsApp%20Image%202026-05-27%20at%2012.42.22.jpeg" alt="BAREN Logo" />
                        <div class="logo-text-group">
                            <span class="logo-text">BAREN</span>
                            <span class="logo-sub">estratégia</span>
                        </div>
                    </a>
                    <span class="header-badge">⚡ M&A Readiness</span>
                </div>
            </header>

            <!-- NAVEGAÇÃO -->
            <nav class="page-nav" id="pageNav">
                <div class="container">
                    <button class="step active" data-page="1" onclick="goToPage(1)">
                        <span class="num">1</span>
                        <span class="label">Home</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="2" onclick="goToPage(2)">
                        <span class="num">2</span>
                        <span class="label">Objetivos</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="3" onclick="goToPage(3)">
                        <span class="num">3</span>
                        <span class="label">Pilar 1-2</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="4" onclick="goToPage(4)">
                        <span class="num">4</span>
                        <span class="label">Pilar 3-4</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="5" onclick="goToPage(5)">
                        <span class="num">5</span>
                        <span class="label">Pilar 5-6</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="6" onclick="goToPage(6)">
                        <span class="num">6</span>
                        <span class="label">Visão Geral</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="7" onclick="goToPage(7)">
                        <span class="num">7</span>
                        <span class="label">Alertas</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="7b" onclick="goToPage('7b')">
                        <span class="num">7b</span>
                        <span class="label">Oportunidades</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="8" onclick="goToPage(8)">
                        <span class="num">8</span>
                        <span class="label">Simulador</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="9" onclick="goToPage(9)">
                        <span class="num">9</span>
                        <span class="label">Plano Ação</span>
                    </button>
                    <span class="step-divider">/</span>
                    <button class="step" data-page="10" onclick="goToPage(10)">
                        <span class="num">10</span>
                        <span class="label">Relatório</span>
                    </button>
                </div>
            </nav>

            <!-- PROGRESS BAR -->
            <div class="progress-container" id="progressContainer">
                <div class="container">
                    <span class="progress-text" id="progressText">0%</span>
                    <div class="progress-track">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                </div>
            </div>

            <!-- CONTEÚDO PRINCIPAL -->
            <main class="main-content" id="mainContent">
                <!-- As páginas serão injetadas aqui -->
            </main>
        </div>
    `;
    
    renderPages();
    updateProgress(1);
}

// ============================================================
// 3. RENDERIZAÇÃO DAS PÁGINAS
// ============================================================
function renderPages() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <!-- PÁGINA 1: HOME -->
        <div class="page active" id="page1">
            <div class="container">
                <div style="max-width:720px; margin:0 auto;">
                    <span class="hero-badge">⚡ M&A Readiness Intelligence Hub</span>
                    <h1 class="page-title">Onde sua empresa <br /><em>está perdendo valor?</em></h1>
                    <p class="page-subtitle">Descubra o nível de preparação da sua empresa para fusões, aquisições e captação de investimentos. <strong>Diagnóstico gratuito</strong> em 5 minutos.</p>
                    <div class="hero-metric">
                        <span class="number">40%</span>
                        <span class="text">das empresas perdem valor por falta de preparação estratégica</span>
                    </div>
                    <div class="benefits-grid">
                        <div class="benefit-item"><span class="icon">📊</span><span class="text"><strong>Score Geral</strong><br />M&A Readiness 0-100%</span></div>
                        <div class="benefit-item"><span class="icon">🎯</span><span class="text"><strong>6 Pilares</strong><br />Análise completa da empresa</span></div>
                        <div class="benefit-item"><span class="icon">📈</span><span class="text"><strong>Projeção</strong><br />Impacto no valuation</span></div>
                        <div class="benefit-item"><span class="icon">🔍</span><span class="text"><strong>Alertas</strong><br />50+ pontos críticos</span></div>
                        <div class="benefit-item"><span class="icon">📋</span><span class="text"><strong>Plano de Ação</strong><br />30+ ações concretas</span></div>
                        <div class="benefit-item"><span class="icon">🤝</span><span class="text"><strong>Parceiros</strong><br />Matchmaking inteligente</span></div>
                    </div>
                    <button class="btn-primary" onclick="goToPage(2)" style="font-size:11px; padding:14px 40px;">
                        Iniciar Diagnóstico
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 2: OBJETIVOS -->
        <div class="page" id="page2">
            <div class="container">
                <div style="max-width:780px; margin:0 auto;">
                    <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Qual o <em>principal objetivo</em> da sua empresa?</span>
                    <p class="page-subtitle">Selecione todas as opções que se aplicam ao momento atual da sua empresa.</p>
                    <div class="objectives-grid" id="objectivesGrid">
                        <div class="obj-card" data-value="A" onclick="toggleObjective(this)"><span class="icon">🏛️</span><span class="label">Venda total ou parcial</span><span class="check"></span></div>
                        <div class="obj-card" data-value="B" onclick="toggleObjective(this)"><span class="icon">💰</span><span class="label">Captação de investimento</span><span class="check"></span></div>
                        <div class="obj-card" data-value="C" onclick="toggleObjective(this)"><span class="icon">📈</span><span class="label">Crescimento e expansão</span><span class="check"></span></div>
                        <div class="obj-card" data-value="D" onclick="toggleObjective(this)"><span class="icon">⚙️</span><span class="label">Profissionalização da gestão</span><span class="check"></span></div>
                        <div class="obj-card" data-value="E" onclick="toggleObjective(this)"><span class="icon">📋</span><span class="label">Reestruturação tributária</span><span class="check"></span></div>
                        <div class="obj-card" data-value="F" onclick="toggleObjective(this)"><span class="icon">🔧</span><span class="label">Redução de custos</span><span class="check"></span></div>
                        <div class="obj-card" data-value="G" onclick="toggleObjective(this)"><span class="icon">👨‍👩‍👧‍👦</span><span class="label">Sucessão familiar</span><span class="check"></span></div>
                        <div class="obj-card" data-value="H" onclick="toggleObjective(this)"><span class="icon">🌍</span><span class="label">Internacionalização</span><span class="check"></span></div>
                        <div class="obj-card" data-value="I" onclick="toggleObjective(this)"><span class="icon">⭐</span><span class="label">Melhorar rating de crédito</span><span class="check"></span></div>
                        <div class="obj-card" data-value="J" onclick="toggleObjective(this)"><span class="icon">🎯</span><span class="label">Planejamento estratégico</span><span class="check"></span></div>
                    </div>
                    <div class="page-footer">
                        <button class="btn-secondary" onclick="goToPage(1)">← Voltar</button>
                        <button class="btn-primary" onclick="goToPage(3)">Continuar →</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PÁGINA 3: PERGUNTAS 1/3 -->
        <div class="page" id="page3">
            <div class="container">
                <div style="max-width:720px; margin:0 auto;">
                    <span class="page-title" style="font-size:clamp(28px,3.5vw,38px);">Diagnóstico <em>Parte 1/3</em></span>
                    <p class="page-subtitle">Reflexões sobre <strong>Governança e Estrutura Societária</strong> e <strong>Financeiro, Crédito & Capital de Giro</strong>.</p>
                    <div id="questions1" class="question-card"></div>
                    <div class="page-footer">
                        <button class="btn-secondary" onclick="goToPage(2)">← Voltar</button>
                        <button class="btn-primary" onclick="goToPage(4)">Próxima Parte →</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PÁGINA 4: PERGUNTAS 2/3 -->
        <div class="page" id="page4">
            <div class="container">
                <div style="max-width:720px; margin:0 auto;">
                    <span class="page-title" style="font-size:clamp(28px,3.5vw,38px);">Diagnóstico <em>Parte 2/3</em></span>
                    <p class="page-subtitle">Reflexões sobre <strong>Jurídico, Tributário & Regulatório</strong> e <strong>Operacional, Energia & Sustentabilidade</strong>.</p>
                    <div id="questions2" class="question-card"></div>
                    <div class="page-footer">
                        <button class="btn-secondary" onclick="goToPage(3)">← Voltar</button>
                        <button class="btn-primary" onclick="goToPage(5)">Próxima Parte →</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PÁGINA 5: PERGUNTAS 3/3 -->
        <div class="page" id="page5">
            <div class="container">
                <div style="max-width:720px; margin:0 auto;">
                    <span class="page-title" style="font-size:clamp(28px,3.5vw,38px);">Diagnóstico <em>Parte 3/3</em></span>
                    <p class="page-subtitle">Reflexões sobre <strong>Estratégia, Internacionalização & Câmbio</strong> e <strong>Pessoas, Benefícios & Talentos</strong>.</p>
                    <div id="questions3" class="question-card"></div>
                    <div class="page-footer">
                        <button class="btn-secondary" onclick="goToPage(4)">← Voltar</button>
                        <button class="btn-primary" onclick="goToPage(6)">Ver Resultados →</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- PÁGINA 6: DASHBOARD -->
        <div class="page" id="page6">
            <div class="container">
                <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Visão <em>Geral</em></span>
                <p class="page-subtitle">Resumo do nível de preparação da sua empresa para M&A.</p>
                <div class="overall-score" id="overallScore">
                    <div class="gauge-container" id="gaugeContainer">
                        <canvas id="gaugeCanvas"></canvas>
                        <div class="gauge-center"><span class="value" id="mainScore">--</span><span class="label">Readiness</span></div>
                    </div>
                    <div class="overall-info">
                        <div class="title">M&A Readiness</div>
                        <span class="risk" id="riskBadge">Aguardando respostas</span>
                        <p class="diagnostic" id="diagnosticText">Responda todas as perguntas para gerar seu diagnóstico estratégico.</p>
                    </div>
                </div>
                <div class="pillar-scores" id="pillarScores">
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><div class="name">Governança</div><div class="score" id="scoreGov">--</div><div class="bar"><div class="fill" id="barGov" style="width:0%;"></div></div></div>
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><line x1="18" y1="12" x2="18" y2="17"/><line x1="14" y1="12" x2="14" y2="17"/><line x1="10" y1="12" x2="10" y2="17"/></svg><div class="name">Financeiro</div><div class="score" id="scoreFin">--</div><div class="bar"><div class="fill" id="barFin" style="width:0%;"></div></div></div>
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg><div class="name">Jurídico</div><div class="score" id="scoreJur">--</div><div class="bar"><div class="fill" id="barJur" style="width:0%;"></div></div></div>
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v12"/><path d="M6 12h12"/></svg><div class="name">Operacional</div><div class="score" id="scoreOp">--</div><div class="bar"><div class="fill" id="barOp" style="width:0%;"></div></div></div>
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><div class="name">Estratégia</div><div class="score" id="scoreEstrat">--</div><div class="bar"><div class="fill" id="barEstrat" style="width:0%;"></div></div></div>
                    <div class="pillar-card"><svg class="icon-svg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><div class="name">Pessoas</div><div class="score" id="scorePessoas">--</div><div class="bar"><div class="fill" id="barPessoas" style="width:0%;"></div></div></div>
                </div>
                <div class="charts-row">
                    <div class="chart-container"><div class="chart-title">📊 Maturidade por Sub-pilar</div><canvas id="subPillarChart"></canvas></div>
                    <div class="chart-container"><div class="chart-title">📈 Valuation Projetado vs. Potencial</div><canvas id="valuationChart"></canvas></div>
                </div>
                <div class="chart-container" style="height:300px; margin-bottom:16px;"><div class="chart-title">🎯 Radar de Maturidade vs. Benchmark</div><canvas id="radarChart"></canvas></div>
                <div class="page-footer">
                    <button class="btn-secondary" onclick="goToPage(5)">← Voltar</button>
                    <button class="btn-primary" onclick="goToPage(7)">Ver Alertas →</button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 7: ALERTAS -->
        <div class="page" id="page7">
            <div class="container">
                <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Alertas por <em>Severidade</em></span>
                <p class="page-subtitle">Clique em cada alerta para ver o plano de ação detalhado.</p>
                <div class="alerts-list" id="alertsList"><div class="alert-item" style="text-align:center;padding:40px;color:var(--cream-faint);border-left-color:transparent;">Responda todas as perguntas para gerar os alertas.</div></div>
                <div class="page-footer">
                    <button class="btn-secondary" onclick="goToPage(6)">← Voltar</button>
                    <button class="btn-primary" onclick="goToPage('7b')">Ver Oportunidades →</button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 7B: OPORTUNIDADES -->
        <div class="page" id="page7b">
            <div class="container">
                <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Soluções <em>Recomendadas</em></span>
                <p class="page-subtitle">Serviços e parceiros estratégicos para acelerar sua prontidão.</p>
                <div class="opportunities-grid" id="opportunitiesGrid"></div>
                <div class="page-footer">
                    <button class="btn-secondary" onclick="goToPage(7)">← Voltar</button>
                    <button class="btn-primary" onclick="goToPage(8)">Ir para Simulador →</button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 8: SIMULADOR -->
        <div class="page" id="page8">
            <div class="container">
                <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Calculador de <em>Ganho de Valuation</em></span>
                <p class="page-subtitle">Selecione as ações que sua empresa pode implementar e veja o impacto financeiro.</p>
                <div class="simulator-grid">
                    <div class="sim-actions" id="simActions"><div class="section-title">📋 Ações Recomendadas</div></div>
                    <div class="sim-results-panel" id="simResultsPanel">
                        <div class="section-title">📈 Retorno sobre o Investimento</div>
                        <div class="mini-gauge">
                            <span style="font-size:11px;color:var(--cream-dim);min-width:100px;">M&A Readiness</span>
                            <div class="track"><div class="fill" id="simGaugeFill" style="width:0%;"></div><div class="benchmark-line" id="simBenchmarkLine" style="left:60%;"></div></div>
                            <span class="label" id="simGaugeLabel">0%</span>
                        </div>
                        <div class="sim-metric"><span class="label">Múltiplo de EBITDA Adicional</span><span class="value" id="simMultiple">0.0x</span></div>
                        <div class="sim-metric"><span class="label">Redução de Desconto de Risco</span><span class="value green" id="simRiskReduction">-0%</span></div>
                        <div class="sim-metric"><span class="label">Tempo de Due Diligence</span><span class="value" id="simTimeToMarket">12 meses</span></div>
                        <div class="sim-metric"><span class="label">Atratividade do Comprador</span><span class="value" style="font-size:14px;font-family:'Inter',sans-serif;font-weight:500;" id="simBuyerProfile">⚠️ Restrita</span></div>
                    </div>
                </div>
                <div class="page-footer">
                    <button class="btn-secondary" onclick="goToPage('7b')">← Voltar</button>
                    <button class="btn-primary" onclick="goToPage(9)">Ver Plano de Ação →</button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 9: PLANO DE AÇÃO -->
        <div class="page" id="page9">
            <div class="container">
                <span class="page-title" style="font-size:clamp(28px,3.5vw,40px);">Plano de <em>Ação Personalizado</em></span>
                <p class="page-subtitle">Ações priorizadas com base no seu diagnóstico. As tarefas já pré-selecionadas vieram do simulador.</p>
                <div class="action-groups" id="actionGroups"></div>
                <div class="page-footer">
                    <button class="btn-secondary" onclick="goToPage(8)">← Voltar</button>
                    <button class="btn-primary" onclick="goToPage(10)">Ver Relatório →</button>
                </div>
            </div>
        </div>

        <!-- PÁGINA 10: RELATÓRIO -->
        <div class="page" id="page10">
            <div class="container">
                <div class="report-container" id="reportContainer">
                    <div class="report-header">
                        <div class="left"><div class="sub">M&A Readiness Intelligence Hub</div><div class="title">Relatório <em>Executivo</em></div><div class="sub" style="margin-top:2px;">BAREN · Diagnóstico Estratégico</div></div>
                        <div class="right"><div class="score-number" id="reportScoreNumber">--</div><div class="score-label">M&A Readiness</div></div>
                    </div>
                    <div class="report-body">
                        <div class="report-grid">
                            <div class="report-card full-width" style="height:260px;padding:12px 16px;"><div class="card-title">🎯 Radar de Maturidade</div><div style="height:200px;"><canvas id="reportRadarChart"></canvas></div></div>
                            <div class="report-card"><div class="card-title">📊 Diagnóstico</div><div class="card-content" id="reportDiagnostic">Aguardando dados</div></div>
                            <div class="report-card"><div class="card-title">💰 Impacto no Valuation</div><div class="card-content" id="reportValuationImpact">Aguardando dados</div></div>
                            <div class="report-card full-width"><div class="card-title">🗓️ Roadmap de Prontidão</div><div class="report-roadmap" id="reportRoadmap"></div></div>
                            <div class="report-card full-width"><div class="card-title">🤝 Soluções Recomendadas</div><div class="card-content" id="reportSolutions">Aguardando dados</div></div>
                        </div>
                    </div>
                    <div class="report-footer">
                        <button class="btn-secondary" onclick="goToPage(9)">← Voltar</button>
                        <button class="btn-primary" onclick="generatePDF()">📄 Baixar Relatório PDF</button>
                        <button class="btn-secondary" onclick="goToPage(1)">Novo Diagnóstico</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar perguntas
    renderQuestions('questions1', ['g1', 'g2', 'g3', 'g4', 'g5', 'f1', 'f2', 'f3', 'f4', 'f5']);
    renderQuestions('questions2', ['j1', 'j2', 'j3', 'j4', 'j5', 'o1', 'o2', 'o3', 'o4', 'o5']);
    renderQuestions('questions3', ['e1', 'e2', 'e3', 'e4', 'e5', 'p1', 'p2', 'p3', 'p4', 'p5']);
}

// ============================================================
// 4. FUNÇÕES DE NAVEGAÇÃO
// ============================================================
function goToPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page' + page);
    if (target) {
        target.classList.add('active');
        currentPage = page;
    }
    document.querySelectorAll('.page-nav .step').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page == page) btn.classList.add('active');
    });
    updateProgress(page);
    const mainContent = document.getElementById('mainContent');
    if (mainContent) mainContent.scrollTop = 0;
    if (page == 6) renderDashboard();
    if (page == 7) renderAlerts();
    if (page == '7b') renderOpportunities();
    if (page == 8) renderSimulator();
    if (page == 9) renderActions();
    if (page == 10) renderReport();
}

function updateProgress(page) {
    const pages = ['1', '2', '3', '4', '5', '6', '7', '7b', '8', '9', '10'];
    const index = pages.indexOf(String(page));
    const pct = Math.round(((index + 1) / pages.length) * 100);
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
}

// ============================================================
// 5. OBJETIVOS
// ============================================================
function toggleObjective(el) {
    el.classList.toggle('selected');
    const value = el.dataset.value;
    if (el.classList.contains('selected')) {
        if (!selectedObjectives.includes(value)) selectedObjectives.push(value);
    } else {
        selectedObjectives = selectedObjectives.filter(v => v !== value);
    }
}

// ============================================================
// 6. PERGUNTAS
// ============================================================
function renderQuestions(containerId, questionIds) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    let qNum = 0;
    questionIds.forEach(id => {
        const q = window.QUESTIONS && window.QUESTIONS[id];
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

function selectOption(el, qid, idx) {
    const parent = el.closest('.q-options');
    parent.querySelectorAll('.q-opt').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    answers[qid] = idx;
}

// ============================================================
// 7. DASHBOARD
// ============================================================
function getPillarScores() {
    const pillars = {
        governance: ['g1', 'g2', 'g3', 'g4', 'g5'],
        finance: ['f1', 'f2', 'f3', 'f4', 'f5'],
        legal: ['j1', 'j2', 'j3', 'j4', 'j5'],
        operational: ['o1', 'o2', 'o3', 'o4', 'o5'],
        strategy: ['e1', 'e2', 'e3', 'e4', 'e5'],
        people: ['p1', 'p2', 'p3', 'p4', 'p5']
    };
    const result = {};
    Object.keys(pillars).forEach(key => {
        const qs = pillars[key];
        let sum = 0, total = 0;
        qs.forEach(qid => {
            if (answers[qid] !== undefined) {
                const q = window.QUESTIONS && window.QUESTIONS[qid];
                const maxIdx = q?.options?.length - 1 || 0;
                sum += (answers[qid] / maxIdx) * 100;
                total++;
            }
        });
        result[key] = total > 0 ? Math.round(sum / total) : 0;
    });
    return result;
}

function getSubPillarData() {
    const subMap = window.SUB_PILLAR_MAP || {};
    const result = {};
    Object.keys(subMap).forEach(label => {
        const qs = subMap[label];
        let sum = 0, total = 0;
        qs.forEach(qid => {
            if (answers[qid] !== undefined) {
                const q = window.QUESTIONS && window.QUESTIONS[qid];
                const maxIdx = q?.options?.length - 1 || 0;
                sum += (answers[qid] / maxIdx) * 100;
                total++;
            }
        });
        result[label] = total > 0 ? Math.round(sum / total) : 0;
    });
    return result;
}

function renderDashboard() {
    const scoresResult = getPillarScores();
    scores = scoresResult;
    const subData = getSubPillarData();

    const overall = Object.values(scoresResult).reduce((a, b) => a + b, 0) / Object.values(scoresResult).length;
    const overallRounded = Math.round(overall);

    const mainScore = document.getElementById('mainScore');
    if (mainScore) mainScore.textContent = overallRounded + '%';

    const riskBadge = document.getElementById('riskBadge');
    let riskClass = 'medium', riskText = 'Atenção';
    let diagnosticMsg = '';
    if (overallRounded >= 80) { riskClass = 'low'; riskText = 'Baixo Risco'; diagnosticMsg = 'Sua empresa está bem posicionada para atrair fundos de Private Equity e compradores estratégicos.'; }
    else if (overallRounded >= 60) { riskClass = 'medium'; riskText = 'Atenção'; diagnosticMsg = 'Seu nível atual de prontidão restringe o interesse de fundos e reduz seu poder de barganha.'; }
    else if (overallRounded >= 40) { riskClass = 'high'; riskText = 'Alto Risco'; diagnosticMsg = 'Sua empresa está vulnerável a descontos severos em negociações. Priorize a estruturação.'; }
    else { riskClass = 'critical'; riskText = 'Crítico'; diagnosticMsg = 'Sem governança e finanças organizadas, a venda ou captação se torna inviável.'; }
    if (riskBadge) {
        riskBadge.className = 'risk ' + riskClass;
        riskBadge.textContent = riskText;
    }
    const diagnosticText = document.getElementById('diagnosticText');
    if (diagnosticText) diagnosticText.textContent = diagnosticMsg;

    // Pillar scores
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
        const scoreEl = document.getElementById(pillarMap[key].score);
        const barEl = document.getElementById(pillarMap[key].bar);
        if (scoreEl) scoreEl.textContent = val + '%';
        if (barEl) barEl.style.width = val + '%';
    });

    drawGauge(overallRounded);
    
    // Inicializar gráficos via charts.js
    if (typeof initCharts === 'function') {
        initCharts(scoresResult, subData);
    }
}

// ============================================================
// 8. GAUGE
// ============================================================
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

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(248,244,239,0.08)';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.stroke();

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
// 9. ALERTAS
// ============================================================
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

function toggleAlert(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    body.classList.toggle('open');
    icon.classList.toggle('open');
}

function generateAlerts() {
    const alerts = [];
    const s = scores;
    if (s.governance < 40) alerts.push({
        severity: 'critical',
        msg: 'Governança crítica: ausência de fórum formal de decisão e estrutura societária frágil.',
        action: 'Estruturar governança com conselho consultivo e acordo de sócios formalizado.',
        details: ['Formalizar acordo de sócios com regras de entrada e saída', 'Instituir conselho consultivo ou reuniões estruturadas']
    });
    if (s.governance < 60 && s.governance >= 40) alerts.push({
        severity: 'high',
        msg: 'Governança em atenção: formalize as regras de tomada de decisão e sucessão.',
        action: 'Criar estrutura de governança básica.',
        details: ['Documentar processo de tomada de decisão', 'Criar plano de sucessão para sócios']
    });
    if (s.finance < 40) alerts.push({
        severity: 'critical',
        msg: 'Financeiro crítico: falta de auditoria, reserva de caixa insuficiente e capital de giro desotimizado.',
        action: 'Reestruturar finanças com auditoria e otimização de capital de giro.',
        details: ['Contratar auditoria externa', 'Constituir reserva de emergência', 'Otimizar fontes de crédito']
    });
    if (s.finance < 60 && s.finance >= 40) alerts.push({
        severity: 'high',
        msg: 'Financeiro em atenção: melhore a gestão de capital de giro e revise tributos.',
        action: 'Otimizar gestão financeira.',
        details: ['Revisar taxas bancárias', 'Realizar revisão tributária para recuperação de créditos']
    });
    if (s.legal < 40) alerts.push({
        severity: 'critical',
        msg: 'Jurídico crítico: contratos desatualizados e documentação societária com pendências.',
        action: 'Regularizar contratos e documentação societária.',
        details: ['Revisar contratos de clientes e fornecedores', 'Regularizar documentação societária', 'Proteger marcas e propriedade intelectual']
    });
    if (s.legal < 60 && s.legal >= 40) alerts.push({
        severity: 'high',
        msg: 'Jurídico em atenção: revise contratos e planeje o impacto da Reforma Tributária.',
        action: 'Revisar contratos estratégicos e planejamento tributário.',
        details: ['Revisar contratos de longo prazo', 'Simular impacto da Reforma Tributária']
    });
    if (s.operational < 40) alerts.push({
        severity: 'critical',
        msg: 'Operacional crítico: processos não documentados e dependência de pessoas específicas.',
        action: 'Documentar processos e implementar ERP.',
        details: ['Documentar SOPs', 'Implementar ERP integrado', 'Analisar conta de energia']
    });
    if (s.operational < 60 && s.operational >= 40) alerts.push({
        severity: 'high',
        msg: 'Operacional em atenção: padronize processos e avalie Mercado Livre de Energia.',
        action: 'Padronizar processos operacionais.',
        details: ['Documentar processos críticos', 'Avaliar migração para Mercado Livre de Energia']
    });
    if (s.strategy < 40) alerts.push({
        severity: 'critical',
        msg: 'Estratégia crítica: ausência de plano de negócios e materiais para investidores.',
        action: 'Elaborar plano de negócios e preparar materiais.',
        details: ['Elaborar plano de negócios 3-5 anos', 'Desenvolver pitch deck e estruturar data room']
    });
    if (s.strategy < 60 && s.strategy >= 40) alerts.push({
        severity: 'high',
        msg: 'Estratégia em atenção: desenvolva plano de internacionalização e proteção cambial.',
        action: 'Fortalecer planejamento estratégico.',
        details: ['Avaliar oportunidades de internacionalização', 'Implementar hedge cambial']
    });
    if (s.people < 40) alerts.push({
        severity: 'critical',
        msg: 'Pessoas crítico: falta de plano de carreira e sucessão de líderes.',
        action: 'Estruturar RH com plano de carreira e mapeamento de sucessão.',
        details: ['Estruturar plano de carreira', 'Mapear sucessores para posições-chave', 'Revisar benefícios']
    });
    if (s.people < 60 && s.people >= 40) alerts.push({
        severity: 'high',
        msg: 'Pessoas em atenção: crie programa de desenvolvimento e benefícios competitivos.',
        action: 'Melhorar gestão de pessoas.',
        details: ['Implementar programa de treinamento', 'Revisar benefícios para serem competitivos']
    });
    return alerts;
}

// ============================================================
// 10. OPORTUNIDADES
// ============================================================
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

function generateSolutions() {
    const s = scores;
    const sorted = Object.keys(s).sort((a, b) => s[a] - s[b]);
    const worst = sorted.slice(0, 2);

    const solutionMap = window.SOLUTIONS || {};
    const result = [];
    worst.forEach(key => {
        if (s[key] < 70 && solutionMap[key]) {
            result.push(solutionMap[key]);
        }
    });
    return result;
}

// ============================================================
// 11. SIMULADOR
// ============================================================
function renderSimulator() {
    const container = document.getElementById('simActions');
    const actions = getSimActions();
    let html = `<div class="section-title">📋 Ações Recomendadas</div>`;
    actions.forEach((a) => {
        const checked = simChecked[a.id] ? 'checked' : '';
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

function getSimActions() {
    const s = scores;
    const actions = [];
    if (s.governance < 60) {
        actions.push({ id: 'gov1', label: 'Formalizar Acordo de Sócios', desc: 'Regras de entrada, saída e tomada de decisão.', impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 });
        actions.push({ id: 'gov2', label: 'Instituir Conselho Consultivo', desc: 'Com membro independente.', impact: 'critical', score: 20, multiple: 0.5, riskReduction: 12, timeReduction: 3 });
    }
    if (s.finance < 60) {
        actions.push({ id: 'fin1', label: 'Auditar Balanços (3 anos)', desc: 'Empresa homologada.', impact: 'critical', score: 25, multiple: 0.6, riskReduction: 15, timeReduction: 4 });
        actions.push({ id: 'fin2', label: 'Otimizar Capital de Giro', desc: 'Antecipação de recebíveis e crédito competitivo.', impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 });
    }
    if (s.legal < 60) {
        actions.push({ id: 'leg1', label: 'Revisão Tributária e Contratos', desc: 'Identificar créditos e revisar cláusulas.', impact: 'critical', score: 20, multiple: 0.4, riskReduction: 10, timeReduction: 3 });
        actions.push({ id: 'leg2', label: 'Proteção de Marcas', desc: 'Registro de propriedade intelectual.', impact: 'medium', score: 12, multiple: 0.2, riskReduction: 5, timeReduction: 1 });
    }
    if (s.operational < 60) {
        actions.push({ id: 'op1', label: 'Documentar Processos (SOPs)', desc: 'Padronização operacional.', impact: 'high', score: 18, multiple: 0.35, riskReduction: 10, timeReduction: 3 });
        actions.push({ id: 'op2', label: 'Migrar para Mercado Livre de Energia', desc: 'Redução de custos energéticos.', impact: 'medium', score: 12, multiple: 0.2, riskReduction: 5, timeReduction: 2 });
    }
    if (s.strategy < 60) {
        actions.push({ id: 'est1', label: 'Elaborar Plano de Negócios', desc: '3-5 anos com projeções.', impact: 'high', score: 15, multiple: 0.3, riskReduction: 8, timeReduction: 2 });
        actions.push({ id: 'est2', label: 'Estruturar Data Room e Pitch Deck', desc: 'Para apresentação a investidores.', impact: 'high', score: 15, multiple: 0.25, riskReduction: 10, timeReduction: 3 });
    }
    if (s.people < 60) {
        actions.push({ id: 'peo1', label: 'Estruturar Plano de Carreira', desc: 'Com metas e benefícios.', impact: 'high', score: 14, multiple: 0.25, riskReduction: 6, timeReduction: 2 });
        actions.push({ id: 'peo2', label: 'Mapeamento de Sucessão', desc: 'Identificar líderes potenciais.', impact: 'medium', score: 12, multiple: 0.2, riskReduction: 5, timeReduction: 1 });
    }
    return actions;
}

function toggleSimAction(id) {
    simChecked[id] = !simChecked[id];
    const checkbox = document.getElementById('simCheck_' + id);
    if (checkbox) checkbox.classList.toggle('checked');
    updateSimulator();
}

function updateSimulator() {
    const actions = getSimActions();
    let totalScore = 0;
    let totalMultiple = 0;
    let totalRiskReduction = 0;
    let totalTimeReduction = 0;

    actions.forEach(a => {
        if (simChecked[a.id]) {
            totalScore += a.score;
            totalMultiple += a.multiple;
            totalRiskReduction += a.riskReduction;
            totalTimeReduction += a.timeReduction;
        }
    });

    const mainScoreEl = document.getElementById('mainScore');
    const baseScore = mainScoreEl ? parseInt(mainScoreEl.textContent) || 0 : 0;
    const projected = Math.min(100, baseScore + totalScore);
    const gaugeFill = document.getElementById('simGaugeFill');
    const gaugeLabel = document.getElementById('simGaugeLabel');
    if (gaugeFill) gaugeFill.style.width = projected + '%';
    if (gaugeLabel) gaugeLabel.textContent = projected + '%';

    const multipleEl = document.getElementById('simMultiple');
    if (multipleEl) multipleEl.textContent = '+' + totalMultiple.toFixed(1) + 'x';
    
    const riskEl = document.getElementById('simRiskReduction');
    if (riskEl) riskEl.textContent = '-' + Math.round(totalRiskReduction) + '%';

    const baseTime = 14;
    const newTime = Math.max(4, baseTime - totalTimeReduction);
    const timeEl = document.getElementById('simTimeToMarket');
    if (timeEl) timeEl.textContent = newTime + ' meses';

    const profileEl = document.getElementById('simBuyerProfile');
    if (profileEl) {
        if (projected >= 80) profileEl.textContent = '🚀 Fundos de Private Equity e Players Estratégicos';
        else if (projected >= 60) profileEl.textContent = '🏢 Compradores Nacionais e Regionais';
        else if (projected >= 40) profileEl.textContent = '⚠️ Compradores Oportunistas e Locais';
        else profileEl.textContent = '❌ Atratividade Muito Restrita';
    }
}

// ============================================================
// 12. PLANO DE AÇÃO
// ============================================================
function renderActions() {
    const container = document.getElementById('actionGroups');
    const s = scores;
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
        filtered.sort((a, b) => b.score - a.score);
        html += `
            <div class="action-group">
                <div class="group-title">${name} <span class="score-badge">${score}%</span></div>
        `;
        filtered.forEach(a => {
            const preselected = simChecked[a.id] ? 'preselect' : '';
            const checked = simChecked[a.id] ? 'checked' : '';
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

function getActionsForPillar(pillar) {
    const map = window.ACTION_PLANS || {};
    return map[pillar] || [];
}

// ============================================================
// 13. RELATÓRIO
// ============================================================
function renderReport() {
    const s = scores;
    const overall = Object.values(s).reduce((a, b) => a + b, 0) / Object.values(s).length;
    const overallRounded = Math.round(overall);

    const reportScore = document.getElementById('reportScoreNumber');
    if (reportScore) reportScore.textContent = overallRounded + '%';

    let diagMsg = '';
    if (overallRounded >= 80) diagMsg = 'Sua empresa está <span class="highlight">bem posicionada</span> para M&A. Fundos de Private Equity e compradores estratégicos demonstram interesse.';
    else if (overallRounded >= 60) diagMsg = 'Seu nível de prontidão <span class="highlight">restringe o interesse</span> de fundos e reduz seu poder de barganha. Foco em estruturação.';
    else if (overallRounded >= 40) diagMsg = 'Sua empresa está <span class="highlight">vulnerável a descontos severos</span> em negociações. Priorize a organização financeira e governança.';
    else diagMsg = 'Sem governança e finanças organizadas, a venda ou captação se torna <span class="highlight">inviável</span>. Ação imediata necessária.';
    const diagnostic = document.getElementById('reportDiagnostic');
    if (diagnostic) diagnostic.innerHTML = diagMsg;

    const potential = Math.min(95, overallRounded + 40);
    const gain = potential - overallRounded;
    const valuation = document.getElementById('reportValuationImpact');
    if (valuation) {
        valuation.innerHTML = `
            <div><strong>Atual:</strong> ${overallRounded}% de prontidão</div>
            <div><strong>Potencial:</strong> ${potential}% com ações corretivas</div>
            <div style="margin-top:6px; color:var(--gold);">📈 Ganho estimado: <strong>+${gain}%</strong> em múltiplo de EBITDA</div>
            <div style="font-size:11px; color:var(--cream-faint); margin-top:4px;">Empresas com >80% de prontidão negociam com prêmio de até 2x EBITDA.</div>
        `;
    }

    const roadmap = document.getElementById('reportRoadmap');
    if (roadmap) {
        roadmap.innerHTML = `
            <div class="phase urgent">
                <div class="phase-title">🔴 Urgente (30 dias)</div>
                <div class="phase-items">
                    ${s.governance < 40 ? '<div class="item">Formalizar acordo de sócios</div>' : ''}
                    ${s.finance < 40 ? '<div class="item">Contratar auditoria financeira</div>' : ''}
                    ${s.legal < 40 ? '<div class="item">Revisão contratual e tributária</div>' : ''}
                    ${s.governance >= 40 && s.finance >= 40 && s.legal >= 40 ? '<div class="item">Nenhuma ação urgente identificada</div>' : ''}
                </div>
            </div>
            <div class="phase structure">
                <div class="phase-title">🟡 Estruturação (30-90 dias)</div>
                <div class="phase-items">
                    ${s.governance < 60 ? '<div class="item">Criar conselho consultivo</div>' : ''}
                    ${s.finance < 60 ? '<div class="item">Otimizar capital de giro</div>' : ''}
                    ${s.operational < 60 ? '<div class="item">Implementar ERP e documentar SOPs</div>' : ''}
                    ${s.governance >= 60 && s.finance >= 60 && s.operational >= 60 ? '<div class="item">Manter excelência operacional</div>' : ''}
                </div>
            </div>
            <div class="phase expand">
                <div class="phase-title">🟢 Expansão (90+ dias)</div>
                <div class="phase-items">
                    ${s.strategy < 60 ? '<div class="item">Elaborar pitch deck e data room</div>' : ''}
                    ${s.people < 60 ? '<div class="item">Estruturar plano de carreira e sucessão</div>' : ''}
                    ${s.strategy >= 60 && s.people >= 60 ? '<div class="item">Preparar para rodada de investimento</div>' : ''}
                </div>
            </div>
        `;
    }

    const solutions = generateSolutions();
    let solHtml = '<ul>';
    if (solutions.length === 0) {
        solHtml += '<li>✅ Sua empresa está bem posicionada. Nenhuma solução urgente necessária.</li>';
    } else {
        solutions.forEach(o => {
            solHtml += `<li><span class="bullet">•</span> <strong>${o.title}</strong> — ${o.desc} <span style="color:var(--gold);font-size:10px;">(${o.partner})</span></li>`;
        });
    }
    solHtml += '</ul>';
    const solutionsEl = document.getElementById('reportSolutions');
    if (solutionsEl) solutionsEl.innerHTML = solHtml;

    // Inicializar radar chart do relatório via charts.js
    if (typeof initReportRadar === 'function') {
        initReportRadar(s);
    }
}

// ============================================================
// 14. GERAR PDF
// ============================================================
function generatePDF() {
    const element = document.getElementById('reportContainer');
    if (!element) return;
    
    const originalOverflow = document.body.style.overflow;
    const originalHeight = element.style.height;
    
    element.style.height = 'auto';
    document.body.style.overflow = 'visible';
    
    const opt = {
        margin: [5, 5, 5, 5],
        filename: 'relatorio-ma-readiness-baren.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            letterRendering: true,
            useCORS: true,
            allowTaint: true,
            scrollY: 0,
            scrollX: 0,
            windowHeight: element.scrollHeight,
            windowWidth: element.scrollWidth,
            height: element.scrollHeight,
            width: element.scrollWidth
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    setTimeout(() => {
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                document.body.style.overflow = originalOverflow;
                element.style.height = originalHeight;
            })
            .catch((err) => {
                console.error('Erro ao gerar PDF:', err);
                document.body.style.overflow = originalOverflow;
                element.style.height = originalHeight;
            });
    }, 300);
}

// ============================================================
// 15. INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    renderApp();
    updateProgress(1);
});

// Redraw gauge on resize
window.addEventListener('resize', () => {
    if (currentPage == 6) {
        const mainScore = document.getElementById('mainScore');
        if (mainScore) drawGauge(parseInt(mainScore.textContent) || 0);
    }
});
