const QUESTION_BANK = {
  A: [
    { id: 'A1', text: 'Qual é a faixa de faturamento anual da empresa?', options: ['Menos de R$ 5 milhões', 'R$ 5 milhões a R$ 20 milhões', 'R$ 20 milhões a R$ 50 milhões', 'Acima de R$ 50 milhões'], weights: [0, 30, 70, 100], pilar: 'finance', peso: 5 },
    { id: 'A2', text: 'A empresa possui demonstrações financeiras auditadas nos últimos 3 anos?', options: ['Não', 'Apenas internas', 'Auditadas por big four'], weights: [0, 50, 100], pilar: 'finance', peso: 5 },
    { id: 'A3', text: 'Já realizou valuation nos últimos 12 meses?', options: ['Não', 'Sim, interno', 'Sim, externo'], weights: [0, 50, 100], pilar: 'valuation', peso: 5 },
    { id: 'A4', text: 'Os processos operacionais estão documentados (SOPs)?', options: ['Não', 'Em desenvolvimento', 'Totalmente documentados'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'A5', text: 'Existe concentração de clientes?', options: ['Cliente único >50% da receita', '2-3 clientes principais', 'Carteira pulverizada'], weights: [0, 50, 100], pilar: 'finance', peso: 4 },
    { id: 'A6', text: 'A empresa possui vantagem competitiva sustentável?', options: ['Baixa (commodity)', 'Moderada (diferencial parcial)', 'Alta e defensável (moat)'], weights: [0, 50, 100], pilar: 'valuation', peso: 5 },
    { id: 'A7', text: 'Existem passivos trabalhistas ou fiscais relevantes?', options: ['Sim, alto risco', 'Risco moderado', 'Controlado com auditoria'], weights: [0, 50, 100], pilar: 'legal', peso: 4 },
    { id: 'A8', text: 'O mercado onde atua tem alto potencial de crescimento?', options: ['Estagnado ou em declínio', 'Crescimento moderado (5-10% ao ano)', 'Mercado em expansão (>10% ao ano)'], weights: [0, 50, 100], pilar: 'valuation', peso: 4 },
    { id: 'A9', text: 'A equipe de gestão tem experiência em M&A ou transações?', options: ['Nenhuma experiência', 'Pouca experiência', 'Experiência relevante comprovada'], weights: [0, 50, 100], pilar: 'governance', peso: 4 }
  ],
  B: [
    { id: 'B1', text: 'Qual o estágio atual da empresa?', options: ['Startup (MVP/validação)', 'Growth (receita recorrente)', 'Expansão (crescendo rápido)', 'Maturidade (lucro consistente)'], weights: [0, 33, 66, 100], pilar: 'valuation', peso: 5 },
    { id: 'B2', text: 'Já possui pitch deck atualizado?', options: ['Não', 'Sim, básico', 'Sim, profissional'], weights: [0, 50, 100], pilar: 'governance', peso: 4 },
    { id: 'B3', text: 'A governança é estruturada com conselho?', options: ['Não', 'Informal, apenas sócios', 'Sim, com independentes'], weights: [0, 50, 100], pilar: 'governance', peso: 5 },
    { id: 'B4', text: 'Existe plano de negócios para 3-5 anos?', options: ['Não', 'Informal', 'Plano detalhado com metas'], weights: [0, 50, 100], pilar: 'valuation', peso: 4 },
    { id: 'B5', text: 'O sistema de gestão (ERP/CRM) é integrado?', options: ['Sem sistema', 'Parcialmente integrado', 'Totalmente integrado'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'B6', text: 'A empresa tem vantagem competitiva defensável?', options: ['Baixa', 'Moderada', 'Alta (moat)'], weights: [0, 50, 100], pilar: 'valuation', peso: 5 },
    { id: 'B7', text: 'O mercado é promissor para investidores?', options: ['Baixo potencial', 'Médio potencial', 'Alto potencial'], weights: [0, 50, 100], pilar: 'valuation', peso: 4 },
    { id: 'B8', text: 'A equipe tem experiência em captação?', options: ['Nenhuma', 'Pouca', 'Experiência relevante'], weights: [0, 50, 100], pilar: 'governance', peso: 4 }
  ],
  C: [
    { id: 'C1', text: 'Qual o faturamento anual atual?', options: ['Menos de R$ 5 milhões', 'R$ 5 milhões a R$ 20 milhões', 'R$ 20 milhões a R$ 50 milhões', 'Acima de R$ 50 milhões'], weights: [0, 30, 70, 100], pilar: 'finance', peso: 4 },
    { id: 'C2', text: 'A empresa atua em mercado com alto potencial de crescimento?', options: ['Estagnado', 'Crescimento moderado', 'Mercado em expansão'], weights: [0, 50, 100], pilar: 'valuation', peso: 4 },
    { id: 'C3', text: 'Existe plano de expansão para novos mercados?', options: ['Não', 'Em estudo', 'Sim, formalizado'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'C4', text: 'A empresa possui vantagem competitiva sustentável?', options: ['Baixa', 'Moderada', 'Alta e defensável'], weights: [0, 50, 100], pilar: 'valuation', peso: 4 },
    { id: 'C5', text: 'Os processos são escaláveis sem grandes investimentos?', options: ['Não', 'Parcialmente', 'Totalmente escalável'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'C6', text: 'O sistema de gestão suporta crescimento?', options: ['Não suporta', 'Suporta parcialmente', 'Totalmente preparado'], weights: [0, 50, 100], pilar: 'operacional', peso: 3 },
    { id: 'C7', text: 'Existe capacidade de investimento interno para expansão?', options: ['Baixa', 'Moderada', 'Alta'], weights: [0, 50, 100], pilar: 'finance', peso: 3 },
    { id: 'C8', text: 'A equipe está preparada para crescimento acelerado?', options: ['Não', 'Parcialmente', 'Totalmente'], weights: [0, 50, 100], pilar: 'governance', peso: 3 }
  ],
  D: [
    { id: 'D1', text: 'Possui conselho de administração ou consultivo?', options: ['Não', 'Informal, apenas sócios', 'Sim, com membros independentes'], weights: [0, 50, 100], pilar: 'governance', peso: 5 },
    { id: 'D2', text: 'Existe acordo de sócios formalizado?', options: ['Não', 'Acordo informal', 'Sim, registrado em cartório'], weights: [0, 50, 100], pilar: 'governance', peso: 5 },
    { id: 'D3', text: 'A separação patrimônio pessoal/jurídico é clara?', options: ['Totalmente misturado', 'Parcialmente separado', 'Totalmente separado (holding)'], weights: [0, 50, 100], pilar: 'governance', peso: 4 },
    { id: 'D4', text: 'As atas e documentos societários estão atualizados?', options: ['Desatualizados >2 anos', 'Parcialmente', 'Revisão anual com registros em dia'], weights: [0, 50, 100], pilar: 'governance', peso: 4 },
    { id: 'D5', text: 'Existem processos operacionais documentados?', options: ['Não', 'Em desenvolvimento', 'Totalmente documentados'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'D6', text: 'Há plano de sucessão?', options: ['Não', 'Em estudo', 'Sim, formalizado'], weights: [0, 50, 100], pilar: 'governance', peso: 3 },
    { id: 'D7', text: 'Existe programa de compliance?', options: ['Não', 'Básico', 'Estruturado'], weights: [0, 50, 100], pilar: 'legal', peso: 3 }
  ],
  E: [
    { id: 'E1', text: 'Realizou revisão tributária nos últimos 12 meses?', options: ['Não', 'Sim, internamente', 'Sim, com consultoria externa'], weights: [0, 50, 100], pilar: 'legal', peso: 4 },
    { id: 'E2', text: 'O regime tributário é adequado ao negócio?', options: ['Não', 'Não sei', 'Sim'], weights: [0, 30, 100], pilar: 'legal', peso: 4 },
    { id: 'E3', text: 'Existem processos fiscais em andamento?', options: ['Sim, vários', 'Sim, alguns', 'Não'], weights: [0, 50, 100], pilar: 'legal', peso: 4 },
    { id: 'E4', text: 'Há oportunidade de recuperação de créditos tributários?', options: ['Não sei', 'Sim, identificadas', 'Já em processo'], weights: [0, 50, 100], pilar: 'legal', peso: 3 },
    { id: 'E5', text: 'A contabilidade é terceirizada ou interna?', options: ['Interna', 'Terceirizada', 'Mix (interna + externa)'], weights: [0, 50, 100], pilar: 'finance', peso: 3 },
    { id: 'E6', text: 'Existe planejamento tributário estruturado?', options: ['Não', 'Básico', 'Planejamento completo'], weights: [0, 50, 100], pilar: 'legal', peso: 4 },
    { id: 'E7', text: 'A empresa opera em qual regime tributário?', options: ['Lucro Presumido', 'Lucro Real', 'Simples Nacional'], weights: [50, 100, 30], pilar: 'legal', peso: 2 }
  ],
  F: [
    { id: 'F1', text: 'Os processos operacionais são padronizados?', options: ['Não', 'Em desenvolvimento', 'Totalmente padronizados'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'F2', text: 'Existe ERP ou sistema integrado de gestão?', options: ['Não', 'Parcialmente', 'Totalmente integrado'], weights: [0, 50, 100], pilar: 'operacional', peso: 4 },
    { id: 'F3', text: 'A empresa tem reserva de emergência?', options: ['Zero', 'Menos de 3 meses de despesa', 'Mais de 6 meses de despesa'], weights: [0, 50, 100], pilar: 'finance', peso: 4 },
    { id: 'F4', text: 'Qual o nível de endividamento (Dívida/EBITDA)?', options: ['>4x', '2x a 4x', '<2x'], weights: [0, 50, 100], pilar: 'finance', peso: 4 },
    { id: 'F5', text: 'Já realizou análise de eficiência operacional?', options: ['Não', 'Parcial', 'Sim, completa'], weights: [0, 50, 100], pilar: 'operacional', peso: 3 },
    { id: 'F6', text: 'Há oportunidades de redução de custos identificadas?', options: ['Não', 'Sim, algumas', 'Sim, várias oportunidades'], weights: [0, 50, 100], pilar: 'operacional', peso: 3 }
  ],
  G: [
    { id: 'G1', text: 'Existe plano de sucessão formal?', options: ['Não', 'Em estudo', 'Sim, definido'], weights: [0, 50, 100], pilar: 'governance', peso: 4 },
    { id: 'G2', text: 'A próxima geração está preparada para assumir?', options: ['Não', 'Parcialmente', 'Sim'], weights: [0, 50, 100], pilar: 'governance', peso: 4 },
    { id: 'G3', text: 'Os herdeiros atuam na empresa?', options: ['Não', 'Parcialmente', 'Sim, integralmente'], weights: [0, 50, 100], pilar: 'governance', peso: 3 },
    { id: 'G4', text: 'Existe acordo de sócios com cláusulas sucessórias?', options: ['Não', 'Em elaboração', 'Sim'], weights: [0, 50, 100], pilar: 'legal', peso: 3 },
    { id: 'G5', text: 'O patrimônio está em holding familiar?', options: ['Não', 'Em estudo', 'Sim'], weights: [0, 50, 100], pilar: 'governance', peso: 3 },
    { id: 'G6', text: 'Há governança familiar estruturada?', options: ['Não', 'Básica', 'Conselho de família'], weights: [0, 50, 100], pilar: 'governance', peso: 3 }
  ],
  H: [
    { id: 'H1', text: 'A empresa já exporta ou atua no exterior?', options: ['Não', 'Sim, parcialmente', 'Sim, totalmente'], weights: [0, 50, 100], pilar: 'valuation', peso: 3 },
    { id: 'H2', text: 'O produto/serviço é adaptável a outros mercados?', options: ['Não', 'Parcialmente', 'Totalmente'], weights: [0, 50, 100], pilar: 'operacional', peso: 3 },
    { id: 'H3', text: 'A equipe fala outro idioma?', options: ['Não', 'Parcialmente', 'Sim, fluente'], weights: [0, 50, 100], pilar: 'governance', peso: 2 },
    { id: 'H4', text: 'Existe know-how em exportação?', options: ['Não', 'Pouco', 'Experiência relevante'], weights: [0, 50, 100], pilar: 'operacional', peso: 3 }
  ],
  I: [
    { id: 'I1', text: 'A empresa tem histórico de pagamento em dia?', options: ['Não', 'Parcial', 'Sim, sempre'], weights: [0, 50, 100], pilar: 'finance', peso: 3 },
    { id: 'I2', text: 'As demonstrações financeiras estão auditadas?', options: ['Não', 'Em processo', 'Sim'], weights: [0, 50, 100], pilar: 'finance', peso: 3 },
    { id: 'I3', text: 'Já possui rating de crédito?', options: ['Não', 'Em análise', 'Sim'], weights: [0, 50, 100], pilar: 'finance', peso: 2 }
  ],
  J: [
    { id: 'J1', text: 'Gostaria de receber um diagnóstico gratuito da sua empresa?', options: ['Sim', 'Não', 'Talvez'], weights: [100, 0, 50], pilar: 'valuation', peso: 1 }
  ]
};

const ROOT_OPTIONS = [
  { code: 'A', label: 'Venda total ou parcial da empresa' },
  { code: 'B', label: 'Captação de investimento (sócios, fundos, FIP, VC)' },
  { code: 'C', label: 'Crescimento e expansão de mercado' },
  { code: 'D', label: 'Profissionalização da gestão e governança' },
  { code: 'E', label: 'Reestruturação tributária e recuperação de créditos' },
  { code: 'F', label: 'Redução de custos e eficiência operacional' },
  { code: 'G', label: 'Sucessão familiar ou planejamento patrimonial' },
  { code: 'H', label: 'Internacionalização ou entrada em novos mercados' },
  { code: 'I', label: 'Melhorar rating de crédito e acesso a financiamentos' },
  { code: 'J', label: 'Não tenho um plano definido ainda' }
];
