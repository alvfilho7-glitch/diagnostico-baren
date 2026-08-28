// ============================================================
// data.js - Dados e configurações da aplicação
// ============================================================

// ============================================================
// 1. PERGUNTAS DO DIAGNÓSTICO
// ============================================================
const QUESTIONS = {
    // PILAR 1: GOVERNANÇA & ESTRUTURA SOCIETÁRIA (5)
    g1: { 
        text: 'Como os sócios tomam decisões estratégicas? Existe um fórum formal para isso?', 
        options: ['Informal, no dia a dia', 'Reuniões eventuais sem pauta', 'Sim, conselho ou reuniões estruturadas'] 
    },
    g2: { 
        text: 'As regras de entrada e saída de sócios estão claras e documentadas?', 
        options: ['Não, tudo é conversado', 'Temos um entendimento informal', 'Sim, acordo de sócios formalizado'] 
    },
    g3: { 
        text: 'O patrimônio da empresa está devidamente separado do patrimônio pessoal dos sócios?', 
        options: ['Totalmente misturado', 'Parcialmente separado', 'Completamente separado'] 
    },
    g4: { 
        text: 'Se um dos sócios principais se afastasse amanhã, a empresa saberia como conduzir a transição?', 
        options: ['Não, seria um caos', 'Temos uma ideia, mas não documentada', 'Sim, plano de sucessão definido'] 
    },
    g5: { 
        text: 'A estrutura jurídica atual (MEI, ME, EIRELI, LTDA, S/A) ainda é a mais adequada para o tamanho e planos do negócio?', 
        options: ['Nunca pensamos sobre isso', 'Já consideramos, mas não agimos', 'Sim, já revisamos e adequamos'] 
    },

    // PILAR 2: FINANCEIRO, CRÉDITO & CAPITAL DE GIRO (5)
    f1: { 
        text: 'As demonstrações financeiras da empresa já passaram por uma auditoria externa nos últimos anos?', 
        options: ['Não, nunca', 'Já, mas há mais de 3 anos', 'Sim, anualmente'] 
    },
    f2: { 
        text: 'Se as vendas caíssem 30% amanhã, por quanto tempo a empresa conseguiria operar sem precisar de capital externo?', 
        options: ['Menos de 1 mês', 'Entre 1 e 3 meses', 'Mais de 6 meses'] 
    },
    f3: { 
        text: 'Como a empresa financia seu capital de giro? Utiliza recursos próprios ou linhas de crédito?', 
        options: ['Só recursos próprios', 'Principalmente crédito caro', 'Mix otimizado com crédito competitivo'] 
    },
    f4: { 
        text: 'A empresa já comparou as taxas dos bancos que utiliza com outras opções disponíveis no mercado?', 
        options: ['Não, ficamos com o mesmo banco', 'Já olhamos, mas não mudamos', 'Sim, temos um processo de benchmarking'] 
    },
    f5: { 
        text: 'Quando foi a última vez que a empresa revisou os tributos pagos para identificar valores recuperáveis?', 
        options: ['Nunca', 'Há mais de 2 anos', 'Nos últimos 12 meses'] 
    },

    // PILAR 3: JURÍDICO, TRIBUTÁRIO & REGULATÓRIO (5)
    j1: { 
        text: 'Os contratos com clientes e fornecedores são revisados periodicamente ou ficam "adormecidos" por anos?', 
        options: ['Ficam adormecidos', 'Revisamos quando há problema', 'Sim, temos revisão periódica'] 
    },
    j2: { 
        text: 'A documentação societária (contrato social, alterações, alvarás) está sempre atualizada ou acumula pendências?', 
        options: ['Acumula muitas pendências', 'Algumas pendências', 'Totalmente regularizada'] 
    },
    j3: { 
        text: 'A empresa já protegeu sua marca, logotipo ou algum diferencial competitivo por meio de registro?', 
        options: ['Não, nunca', 'Estamos em processo', 'Sim, tudo registrado'] 
    },
    j4: { 
        text: 'O planejamento tributário da empresa é feito reativamente (na hora de pagar) ou proativamente (antes de decidir)?', 
        options: ['Reativo', 'Um pouco dos dois', 'Proativo, com estudos'] 
    },
    j5: { 
        text: 'A equipe já simulou o impacto da Reforma Tributária no negócio ou está esperando para ver no que dá?', 
        options: ['Esperando para ver', 'Já discutimos internamente', 'Sim, temos uma simulação'] 
    },

    // PILAR 4: OPERACIONAL, ENERGIA & SUSTENTABILIDADE (5)
    o1: { 
        text: 'Os processos operacionais da empresa são executados com base em procedimentos documentados ou dependem da experiência de pessoas específicas?', 
        options: ['Dependem de pessoas', 'Alguns processos documentados', 'Todos documentados (SOPs)'] 
    },
    o2: { 
        text: 'As informações da empresa (financeiro, estoque, produção) estão integradas em um único sistema ou cada área usa uma planilha diferente?', 
        options: ['Cada área tem sua planilha', 'Algumas integrações', 'ERP totalmente integrado'] 
    },
    o3: { 
        text: 'A conta de luz da empresa já foi objeto de análise para identificar desperdícios ou oportunidades de redução?', 
        options: ['Nunca', 'Já fizemos uma análise básica', 'Sim, temos eficiência otimizada'] 
    },
    o4: { 
        text: 'A empresa já avaliou se poderia economizar na conta de energia migrando para o Mercado Livre de Energia?', 
        options: ['Não conhecemos', 'Já avaliamos, mas não migramos', 'Sim, já migramos ou estamos em processo'] 
    },
    o5: { 
        text: 'Como a empresa acompanha o desempenho da cadeia de suprimentos? Existem indicadores que são monitorados regularmente?', 
        options: ['Não acompanhamos', 'Acompanhamos informalmente', 'Sim, KPIs estruturados'] 
    },

    // PILAR 5: ESTRATÉGIA, INTERNACIONALIZAÇÃO & CÂMBIO (5)
    e1: { 
        text: 'A empresa tem um plano escrito para os próximos 3 a 5 anos ou a estratégia é definida no dia a dia?', 
        options: ['Definida no dia a dia', 'Temos um plano informal', 'Sim, plano formal e revisado'] 
    },
    e2: { 
        text: 'Se um investidor ou comprador aparecesse amanhã, a empresa teria materiais prontos (pitch deck, data room) para apresentar?', 
        options: ['Não, nada pronto', 'Temos algumas informações', 'Sim, pitch deck e data room estruturados'] 
    },
    e3: { 
        text: 'As operações internacionais da empresa (se houver) estão protegidas contra oscilações bruscas do câmbio?', 
        options: ['Não temos proteção', 'Proteção parcial', 'Sim, hedge cambial estruturado'] 
    },
    e4: { 
        text: 'A empresa já analisou se os custos de câmbio nas operações internacionais estão otimizados?', 
        options: ['Não', 'Já olhamos superficialmente', 'Sim, temos otimização contínua'] 
    },
    e5: { 
        text: 'Exportar ou importar faz parte do radar de crescimento da empresa ou é algo nunca considerado?', 
        options: ['Nunca considerado', 'Já pensamos, mas não agimos', 'Sim, faz parte do plano'] 
    },

    // PILAR 6: PESSOAS, BENEFÍCIOS & TALENTOS (5)
    p1: { 
        text: 'Os colaboradores sabem como seu trabalho contribui para os objetivos estratégicos da empresa?', 
        options: ['Não, não comunicamos', 'Alguns sabem', 'Sim, todos estão alinhados'] 
    },
    p2: { 
        text: 'Existe um caminho de crescimento claro para os talentos da empresa ou eles precisam "inventar" a própria carreira?', 
        options: ['Precisam inventar', 'Temos um plano informal', 'Sim, plano de carreira estruturado'] 
    },
    p3: { 
        text: 'Os benefícios oferecidos pela empresa são comparáveis aos que os funcionários encontrariam em empresas concorrentes?', 
        options: ['Não, são inferiores', 'São equivalentes', 'São superiores ou diferenciados'] 
    },
    p4: { 
        text: 'A empresa investe regularmente no desenvolvimento de suas equipes ou o treinamento é visto como custo?', 
        options: ['Visto como custo', 'Investimos pontualmente', 'Sim, programa estruturado de treinamento'] 
    },
    p5: { 
        text: 'Se um líder-chave saísse hoje, a empresa saberia quem poderia assumir o lugar?', 
        options: ['Não', 'Temos uma ideia', 'Sim, mapeamento de sucessão definido'] 
    }
};

// ============================================================
// 2. MAPEAMENTO DE PERGUNTAS POR PILAR
// ============================================================
const PILLAR_QUESTIONS = {
    governance: ['g1', 'g2', 'g3', 'g4', 'g5'],
    finance: ['f1', 'f2', 'f3', 'f4', 'f5'],
    legal: ['j1', 'j2', 'j3', 'j4', 'j5'],
    operational: ['o1', 'o2', 'o3', 'o4', 'o5'],
    strategy: ['e1', 'e2', 'e3', 'e4', 'e5'],
    people: ['p1', 'p2', 'p3', 'p4', 'p5']
};

// ============================================================
// 3. SUB-PILARES PARA GRÁFICO DE BARRAS
// ============================================================
const SUB_PILLAR_MAP = {
    'Conselho/Decisão': ['g1'],
    'Acordo de Sócios': ['g2'],
    'Blindagem Patrimonial': ['g3'],
    'Sucessão': ['g4'],
    'Estrutura Jurídica': ['g5'],
    'Auditoria': ['f1'],
    'Reserva de Caixa': ['f2'],
    'Capital de Giro': ['f3'],
    'Taxas Bancárias': ['f4'],
    'Revisão Tributária': ['f5'],
    'Contratos': ['j1'],
    'Documentação Societária': ['j2'],
    'Propriedade Intelectual': ['j3'],
    'Planejamento Tributário': ['j4'],
    'Reforma Tributária': ['j5'],
    'SOPs': ['o1'],
    'ERP': ['o2'],
    'Eficiência Energética': ['o3'],
    'Mercado Livre de Energia': ['o4'],
    'Cadeia de Suprimentos': ['o5'],
    'Plano Estratégico': ['e1'],
    'Pitch Deck/Data Room': ['e2'],
    'Hedge Cambial': ['e3'],
    'Otimização Cambial': ['e4'],
    'Internacionalização': ['e5'],
    'Alinhamento': ['p1'],
    'Plano de Carreira': ['p2'],
    'Benefícios': ['p3'],
    'Treinamento': ['p4'],
    'Sucessão de Líderes': ['p5']
};

// ============================================================
// 4. SOLUÇÕES E PARCEIROS
// ============================================================
const SOLUTIONS = {
    governance: {
        title: 'Estruturação de Governança e Acordo de Sócios',
        desc: 'Formalização de conselho consultivo, acordo de sócios e plano de sucessão.',
        partner: 'Baren Estratégia',
        svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
    },
    finance: {
        title: 'Due Diligence Financeira e Otimização de Capital',
        desc: 'Auditoria de balanços, reestruturação de capital de giro e revisão tributária.',
        partner: 'Studio Fiscal / Globus',
        svg: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><line x1="18" y1="12" x2="18" y2="17"/><line x1="14" y1="12" x2="14" y2="17"/><line x1="10" y1="12" x2="10" y2="17"/>'
    },
    legal: {
        title: 'Regularização Jurídica e Tributária',
        desc: 'Revisão de contratos, registro de marcas, compliance e planejamento tributário.',
        partner: 'Nicacio & Studio Fiscal',
        svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>'
    },
    operational: {
        title: 'Eficiência Operacional e Energética',
        desc: 'Documentação de processos, implementação de ERP e migração para Mercado Livre de Energia.',
        partner: 'Trillia / Ynova',
        svg: '<path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v12"/><path d="M6 12h12"/>'
    },
    strategy: {
        title: 'Planejamento Estratégico e Internacionalização',
        desc: 'Desenvolvimento de plano de negócios, pitch deck, data room e otimização cambial.',
        partner: 'Baren Estratégia / Travellex',
        svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
    },
    people: {
        title: 'Gestão de Talentos e Benefícios',
        desc: 'Plano de carreira, benefícios competitivos, treinamento e mapeamento de sucessão.',
        partner: 'EA Partners',
        svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
    }
};

// ============================================================
// 5. AÇÕES DO PLANO DE AÇÃO POR PILAR
// ============================================================
const ACTION_PLANS = {
    governance: [
        { id: 'gov1', label: 'Implementar Conselho Consultivo', impact: 'critical', score: 20 },
        { id: 'gov2', label: 'Formalizar Acordo de Sócios', impact: 'high', score: 15 },
        { id: 'gov3', label: 'Criar Plano de Sucessão', impact: 'high', score: 14 },
        { id: 'gov4', label: 'Reestruturação Societária (Holding)', impact: 'medium', score: 10 }
    ],
    finance: [
        { id: 'fin1', label: 'Contratar Auditoria Financeira', impact: 'critical', score: 22 },
        { id: 'fin2', label: 'Otimizar Capital de Giro', impact: 'high', score: 16 },
        { id: 'fin3', label: 'Constituir Reserva de Emergência', impact: 'high', score: 14 },
        { id: 'fin4', label: 'Realizar Revisão Tributária', impact: 'high', score: 12 }
    ],
    legal: [
        { id: 'leg1', label: 'Realizar Revisão Contratual', impact: 'critical', score: 18 },
        { id: 'leg2', label: 'Regularizar Documentação Societária', impact: 'high', score: 15 },
        { id: 'leg3', label: 'Registrar Marcas e Patentes', impact: 'high', score: 14 },
        { id: 'leg4', label: 'Simular Impacto da Reforma Tributária', impact: 'medium', score: 10 }
    ],
    operational: [
        { id: 'op1', label: 'Implementar ERP Integrado', impact: 'critical', score: 22 },
        { id: 'op2', label: 'Documentar Processos (SOPs)', impact: 'high', score: 16 },
        { id: 'op3', label: 'Migrar para Mercado Livre de Energia', impact: 'medium', score: 12 },
        { id: 'op4', label: 'Otimizar Cadeia de Suprimentos', impact: 'medium', score: 10 }
    ],
    strategy: [
        { id: 'est1', label: 'Elaborar Plano de Negócios 3-5 anos', impact: 'critical', score: 18 },
        { id: 'est2', label: 'Desenvolver Pitch Deck', impact: 'high', score: 14 },
        { id: 'est3', label: 'Estruturar Data Room', impact: 'high', score: 12 },
        { id: 'est4', label: 'Implementar Hedge Cambial', impact: 'medium', score: 10 }
    ],
    people: [
        { id: 'peo1', label: 'Estruturar Plano de Carreira', impact: 'critical', score: 16 },
        { id: 'peo2', label: 'Implementar Programa de Benefícios', impact: 'high', score: 12 },
        { id: 'peo3', label: 'Criar Programa de Treinamento', impact: 'high', score: 10 },
        { id: 'peo4', label: 'Mapear Sucessão de Líderes', impact: 'medium', score: 10 }
    ]
};

// ============================================================
// 6. BENCHMARK DE MERCADO
// ============================================================
const MARKET_BENCHMARK = {
    governance: 65,
    finance: 55,
    legal: 70,
    operational: 50,
    strategy: 60,
    people: 55
};

// ============================================================
// 7. EXPORTAÇÃO DAS CONSTANTES
// ============================================================
// Tornar as constantes disponíveis globalmente
window.QUESTIONS = QUESTIONS;
window.PILLAR_QUESTIONS = PILLAR_QUESTIONS;
window.SUB_PILLAR_MAP = SUB_PILLAR_MAP;
window.SOLUTIONS = SOLUTIONS;
window.ACTION_PLANS = ACTION_PLANS;
window.MARKET_BENCHMARK = MARKET_BENCHMARK;
