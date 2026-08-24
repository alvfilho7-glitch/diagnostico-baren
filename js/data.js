// ============================================================
// js/data.js
// DADOS DO SISTEMA - PERGUNTAS, AÇÕES, SOLUÇÕES E CONFIGURAÇÕES
// ============================================================

// ============================================================
// 1. PERGUNTAS DO DIAGNÓSTICO
// ============================================================
const QUESTIONS = {
  // GOVERNANÇA (g1-g5)
  g1: { 
    text: 'A empresa possui conselho de administração ou consultivo?', 
    options: ['Não', 'Informal, apenas sócios', 'Sim, formalizado'] 
  },
  g2: { 
    text: 'Existe acordo de sócios formalizado e registrado?', 
    options: ['Não', 'Acordo informal', 'Sim, registrado'] 
  },
  g3: { 
    text: 'A separação entre patrimônio pessoal e jurídico é clara?', 
    options: ['Misturado', 'Parcialmente separado', 'Totalmente separado'] 
  },
  g4: { 
    text: 'A empresa possui plano de sucessão definido?', 
    options: ['Não', 'Em estudo', 'Sim, formalizado'] 
  },
  g5: { 
    text: 'Existe programa de compliance estruturado?', 
    options: ['Não', 'Básico', 'Estruturado'] 
  },

  // FINANCEIRO (f1-f5)
  f1: { 
    text: 'As demonstrações financeiras são auditadas por empresa externa?', 
    options: ['Não', 'Auditoria interna', 'Auditoria externa'] 
  },
  f2: { 
    text: 'Qual o nível de endividamento da empresa (Dívida/EBITDA)?', 
    options: ['>4x', '2x a 4x', '<2x'] 
  },
  f3: { 
    text: 'A empresa possui reserva de emergência?', 
    options: ['Zero', 'Menos de 3 meses', 'Mais de 6 meses'] 
  },
  f4: { 
    text: 'Existe DRE gerencial estruturada e acompanhada?', 
    options: ['Não', 'Parcialmente', 'Sim, completa'] 
  },
  f5: { 
    text: 'O fluxo de caixa é previsto e monitorado?', 
    options: ['Não', 'Parcialmente', 'Sim, com projeções'] 
  },

  // JURÍDICO (j1-j5)
  j1: { 
    text: 'Os contratos estratégicos estão atualizados e revisados?', 
    options: ['Desatualizados', 'Parcialmente', 'Totalmente revisados'] 
  },
  j2: { 
    text: 'Existem processos fiscais ou trabalhistas em andamento?', 
    options: ['Sim, vários', 'Sim, alguns', 'Não'] 
  },
  j3: { 
    text: 'A documentação societária está regular e atualizada?', 
    options: ['Irregular', 'Parcialmente regular', 'Totalmente regular'] 
  },
  j4: { 
    text: 'A empresa possui registro de marcas e patentes?', 
    options: ['Não', 'Em processo', 'Sim, registrado'] 
  },
  j5: { 
    text: 'Existe programa de compliance fiscal estruturado?', 
    options: ['Não', 'Básico', 'Estruturado'] 
  },

  // OPERACIONAL (o1-o5)
  o1: { 
    text: 'Os processos operacionais estão documentados (SOPs)?', 
    options: ['Não', 'Em desenvolvimento', 'Totalmente documentados'] 
  },
  o2: { 
    text: 'A empresa possui ERP ou sistema integrado de gestão?', 
    options: ['Não', 'Parcialmente', 'Totalmente integrado'] 
  },
  o3: { 
    text: 'A empresa tem eficiência energética otimizada?', 
    options: ['Não', 'Parcialmente', 'Sim, com redução de custos'] 
  },
  o4: { 
    text: 'O BPO financeiro é estruturado e integrado?', 
    options: ['Não', 'Parcialmente', 'Sim, completo'] 
  },
  o5: { 
    text: 'A cadeia de suprimentos é otimizada e monitorada?', 
    options: ['Não', 'Parcialmente', 'Sim, otimizada'] 
  },

  // ESTRATÉGIA (e1-e5)
  e1: { 
    text: 'A empresa possui plano de negócios para 3-5 anos?', 
    options: ['Não', 'Informal', 'Sim, detalhado'] 
  },
  e2: { 
    text: 'O posicionamento de mercado é claro e documentado?', 
    options: ['Não', 'Parcialmente', 'Sim, claro'] 
  },
  e3: { 
    text: 'A empresa possui pitch deck profissional?', 
    options: ['Não', 'Básico', 'Sim, profissional'] 
  },
  e4: { 
    text: 'O data room está estruturado para M&A?', 
    options: ['Não', 'Em desenvolvimento', 'Sim, completo'] 
  },
  e5: { 
    text: 'Existe mapa de riscos estratégicos atualizado?', 
    options: ['Não', 'Em desenvolvimento', 'Sim, atualizado'] 
  },

  // PESSOAS (p1-p5)
  p1: { 
    text: 'A equipe está alinhada com os objetivos estratégicos?', 
    options: ['Não', 'Parcialmente', 'Sim, alinhada'] 
  },
  p2: { 
    text: 'Existe plano de carreira estruturado para os colaboradores?', 
    options: ['Não', 'Em desenvolvimento', 'Sim, estruturado'] 
  },
  p3: { 
    text: 'Os benefícios oferecidos são competitivos no mercado?', 
    options: ['Não', 'Parcialmente', 'Sim, competitivos'] 
  },
  p4: { 
    text: 'A empresa possui programa de treinamento contínuo?', 
    options: ['Não', 'Básico', 'Sim, estruturado'] 
  },
  p5: { 
    text: 'A retenção de talentos é alta (baixa rotatividade)?', 
    options: ['Baixa retenção', 'Média retenção', 'Alta retenção'] 
  }
};

// ============================================================
// 2. MAPEAMENTO DE PERGUNTAS POR PILAR
// ============================================================
const PILLAR_MAP = {
  governance: ['g1', 'g2', 'g3', 'g4', 'g5'],
  finance: ['f1', 'f2', 'f3', 'f4', 'f5'],
  legal: ['j1', 'j2', 'j3', 'j4', 'j5'],
  operational: ['o1', 'o2', 'o3', 'o4', 'o5'],
  strategy: ['e1', 'e2', 'e3', 'e4', 'e5'],
  people: ['p1', 'p2', 'p3', 'p4', 'p5']
};

// ============================================================
// 3. MAPEAMENTO DE PERGUNTAS POR SUB-PILAR
// ============================================================
const SUB_PILLAR_MAP = {
  'Acordo de Sócios': ['g2'],
  'Compliance': ['g5', 'j5'],
  'Transparência': ['g3', 'f4'],
  'Auditoria': ['f1'],
  'Endividamento': ['f2'],
  'Reserva de Caixa': ['f3'],
  'Contratos': ['j1', 'j3'],
  'Processos Fiscais': ['j2'],
  'Propriedade Intelectual': ['j4'],
  'SOPs': ['o1'],
  'ERP': ['o2'],
  'Eficiência Energética': ['o3'],
  'BPO': ['o4'],
  'Cadeia de Suprimentos': ['o5'],
  'Plano de Negócios': ['e1', 'e2'],
  'Pitch Deck': ['e3'],
  'Data Room': ['e4'],
  'Mapa de Riscos': ['e5'],
  'Plano de Carreira': ['p2', 'p3'],
  'Treinamento': ['p4'],
  'Retenção': ['p5']
};

// ============================================================
// 4. SOLUÇÕES POR PILAR (OPORTUNIDADES)
// ============================================================
const SOLUTION_MAP = {
  governance: {
    title: 'Estruturação de Governança Corporativa',
    desc: 'Criação de conselho consultivo, formalização de acordo de sócios e plano de sucessão.',
    partner: 'Baren Estratégia',
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
  },
  finance: {
    title: 'Due Diligence Financeira e Auditoria',
    desc: 'Auditoria de balanços, reestruturação de endividamento e otimização de fluxo de caixa.',
    partner: 'Auditoria Homologada',
    svg: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><line x1="18" y1="12" x2="18" y2="17"/><line x1="14" y1="12" x2="14" y2="17"/><line x1="10" y1="12" x2="10" y2="17"/>'
  },
  legal: {
    title: 'Regularização Jurídica e Compliance',
    desc: 'Revisão de contratos, registro de marcas, compliance fiscal e trabalhista.',
    partner: 'Nicacio & Associados',
    svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>'
  },
  operational: {
    title: 'Eficiência Operacional e ERP',
    desc: 'Documentação de processos, implementação de ERP e BPO financeiro integrado.',
    partner: 'Trillia Soluções',
    svg: '<path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v12"/><path d="M6 12h12"/>'
  },
  strategy: {
    title: 'Planejamento Estratégico e Pitch Deck',
    desc: 'Desenvolvimento de plano de negócios, pitch deck e estruturação de data room.',
    partner: 'Baren Estratégia',
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
  },
  people: {
    title: 'Gestão de Pessoas e Retenção de Talentos',
    desc: 'Plano de carreira, benefícios competitivos e programa de treinamento contínuo.',
    partner: 'EA Partners',
    svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  }
};

// ============================================================
// 5. AÇÕES POR PILAR (PLANO DE AÇÃO)
// ============================================================
const ACTION_MAP = {
  governance: [
    { id: 'gov1', label: 'Implementar Conselho Consultivo', impact: 'critical', score: 20 },
    { id: 'gov2', label: 'Formalizar Acordo de Sócios', impact: 'high', score: 15 },
    { id: 'gov3', label: 'Criar Holding Patrimonial', impact: 'high', score: 12 },
    { id: 'gov4', label: 'Estruturar Comitê de Auditoria', impact: 'medium', score: 10 },
    { id: 'gov5', label: 'Implementar Código de Conduta', impact: 'medium', score: 8 },
    { id: 'gov6', label: 'Criar Plano de Sucessão', impact: 'high', score: 14 }
  ],
  finance: [
    { id: 'fin1', label: 'Contratar Auditoria Financeira', impact: 'critical', score: 22 },
    { id: 'fin2', label: 'Otimizar Fluxo de Caixa', impact: 'high', score: 16 },
    { id: 'fin3', label: 'Constituir Reserva de Emergência', impact: 'high', score: 14 },
    { id: 'fin4', label: 'Reestruturar Endividamento', impact: 'critical', score: 18 },
    { id: 'fin5', label: 'Implementar DRE Gerencial', impact: 'medium', score: 10 },
    { id: 'fin6', label: 'Realizar Valuation', impact: 'medium', score: 8 }
  ],
  legal: [
    { id: 'leg1', label: 'Realizar Revisão Tributária', impact: 'critical', score: 20 },
    { id: 'leg2', label: 'Revisar Contratos e NDAs', impact: 'high', score: 15 },
    { id: 'leg3', label: 'Implementar Programa de Compliance', impact: 'high', score: 14 },
    { id: 'leg4', label: 'Regularizar Documentação Societária', impact: 'high', score: 12 },
    { id: 'leg5', label: 'Registrar Marcas e Patentes', impact: 'medium', score: 10 }
  ],
  operational: [
    { id: 'op1', label: 'Implementar ERP Integrado', impact: 'critical', score: 22 },
    { id: 'op2', label: 'Documentar Processos (SOPs)', impact: 'high', score: 16 },
    { id: 'op3', label: 'Migrar para Mercado Livre de Energia', impact: 'medium', score: 10 },
    { id: 'op4', label: 'Implementar BPO Financeiro', impact: 'high', score: 14 },
    { id: 'op5', label: 'Otimizar Cadeia de Suprimentos', impact: 'medium', score: 10 }
  ],
  strategy: [
    { id: 'est1', label: 'Elaborar Plano de Negócios 3-5 anos', impact: 'critical', score: 18 },
    { id: 'est2', label: 'Desenvolver Pitch Deck', impact: 'high', score: 14 },
    { id: 'est3', label: 'Realizar Análise de Mercado', impact: 'medium', score: 10 },
    { id: 'est4', label: 'Estruturar Data Room', impact: 'high', score: 12 },
    { id: 'est5', label: 'Criar Mapa de Riscos', impact: 'medium', score: 10 }
  ],
  people: [
    { id: 'peo1', label: 'Estruturar Plano de Carreira', impact: 'critical', score: 16 },
    { id: 'peo2', label: 'Implementar Programa de Benefícios', impact: 'high', score: 12 },
    { id: 'peo3', label: 'Contratar Headhunter', impact: 'medium', score: 8 },
    { id: 'peo4', label: 'Criar Programa de Treinamento', impact: 'high', score: 10 }
  ]
};

// ============================================================
// 6. NOMES DOS PILARES (EXIBIÇÃO)
// ============================================================
const PILLAR_NAMES = {
  governance: 'Governança',
  finance: 'Financeiro',
  legal: 'Jurídico',
  operational: 'Operacional',
  strategy: 'Estratégia',
  people: 'Pessoas'
};

// ============================================================
// 7. BENCHMARK DE MERCADO (RADAR)
// ============================================================
const BENCHMARK_DATA = [65, 55, 70, 50, 60, 55];

// ============================================================
// 8. CONFIGURAÇÕES DO SISTEMA
// ============================================================
const CONFIG = {
  // Limites para classificação de risco
  riskThresholds: {
    critical: 40,
    high: 60,
    medium: 80,
    low: 100
  },
  // Tempo base para due diligence (meses)
  baseTimeToMarket: 14,
  // Score máximo potencial
  maxPotentialScore: 95,
  // Benchmark para simulação
  benchmarkLine: 60
};

// ============================================================
// 9. FUNÇÕES AUXILIARES DE DADOS
// ============================================================

/**
 * Retorna as perguntas agrupadas por seção
 */
function getQuestionsBySection() {
  return {
    'Governança e Financeiro': ['g1', 'g2', 'g3', 'g4', 'g5', 'f1', 'f2', 'f3', 'f4', 'f5'],
    'Jurídico e Operacional': ['j1', 'j2', 'j3', 'j4', 'j5', 'o1', 'o2', 'o3', 'o4', 'o5'],
    'Estratégia e Pessoas': ['e1', 'e2', 'e3', 'e4', 'e5', 'p1', 'p2', 'p3', 'p4', 'p5']
  };
}

/**
 * Retorna o número total de perguntas
 */
function getTotalQuestions() {
  return Object.keys(QUESTIONS).length;
}

/**
 * Retorna as opções de uma pergunta pelo ID
 */
function getQuestionOptions(qid) {
  return QUESTIONS[qid]?.options || [];
}

/**
 * Retorna o número máximo de opções de uma pergunta (base 0)
 */
function getMaxOptionIndex(qid) {
  return (QUESTIONS[qid]?.options?.length || 1) - 1;
}

/**
 * Verifica se uma pergunta existe
 */
function questionExists(qid) {
  return !!QUESTIONS[qid];
}

/**
 * Retorna todos os IDs dos pilares
 */
function getPillarKeys() {
  return Object.keys(PILLAR_MAP);
}

/**
 * Retorna as perguntas de um pilar específico
 */
function getPillarQuestions(pillarKey) {
  return PILLAR_MAP[pillarKey] || [];
}

/**
 * Retorna o nome de exibição de um pilar
 */
function getPillarName(pillarKey) {
  return PILLAR_NAMES[pillarKey] || pillarKey;
}

/**
 * Retorna as ações de um pilar específico
 */
function getActionsForPillar(pillarKey) {
  return ACTION_MAP[pillarKey] || [];
}

/**
 * Retorna a solução para um pilar específico
 */
function getSolutionForPillar(pillarKey) {
  return SOLUTION_MAP[pillarKey] || null;
}

/**
 * Retorna os dados do benchmark para o radar
 */
function getBenchmarkData() {
  return BENCHMARK_DATA;
}

/**
 * Retorna a configuração do sistema
 */
function getConfig() {
  return CONFIG;
}

// ============================================================
// EXPORTAÇÃO (para uso em outros arquivos)
// ============================================================
// Se estiver usando módulos ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUESTIONS,
    PILLAR_MAP,
    SUB_PILLAR_MAP,
    SOLUTION_MAP,
    ACTION_MAP,
    PILLAR_NAMES,
    BENCHMARK_DATA,
    CONFIG,
    getQuestionsBySection,
    getTotalQuestions,
    getQuestionOptions,
    getMaxOptionIndex,
    questionExists,
    getPillarKeys,
    getPillarQuestions,
    getPillarName,
    getActionsForPillar,
    getSolutionForPillar,
    getBenchmarkData,
    getConfig
  };
}
