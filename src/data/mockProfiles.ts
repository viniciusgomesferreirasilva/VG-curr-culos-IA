import { ResumeData } from '../types';

export const DEMO_PROFILES: { id: string; title: string; levelBadge: string; badgeColor: string; role: string; description: string; data: ResumeData }[] = [
  {
    id: 'junior',
    title: 'Modelo Júnior / Início de Carreira',
    levelBadge: 'Nível Júnior',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    role: 'Auxiliar Administrativo',
    description: 'Ideal para primeiro emprego, transição de carreira ou estágio. Foco em organização, pontualidade e aptidão técnica inicial.',
    data: {
      id: 'demo-junior',
      isDemo: true,
      personalInfo: {
        fullName: 'Gabriel Silva',
        targetTitle: 'Auxiliar Administrativo / Assistente de Operações',
        email: 'gabriel.silva.exemplo@email.com',
        phone: '(11) 98888-7777',
        location: 'São Paulo, SP',
        linkedin: 'linkedin.com/in/gabrielsilva-adm'
      },
      summary: 'Profissional dedicado e organizado com sólida formação técnica em administração e rotinas de escritório. Experiência prática no controle de fluxo de documentos, atendimento ao cliente, arquivamento digital e suporte a processos operacionais. Ávido por aprendizado contínuo, com excelente capacidade de relacionamento interpessoal e domínio de ferramentas do Pacote Office.',
      experiences: [
        {
          id: 'exp_1',
          role: 'Assistente Administrativo Júnior',
          company: 'Soluções Integradas Alpha LTDA',
          location: 'São Paulo, SP',
          startDate: 'Fev 2023',
          endDate: 'Atual',
          current: true,
          highlights: [
            'Responsável pelo atendimento telefônico e recepção de clientes, atendendo em média 35 pessoas por dia com índice de 98% de satisfação.',
            'Digitalização e arquivamento de mais de 1.200 prontuários e notas fiscais, reduzindo o tempo de busca interna em 30%.',
            'Auxílio na elaboração de planilhas de controle de estoque e fluxo de caixa diário via Excel avançado.',
            'Gestão de envio e recebimento de correspondências e malotes corporativos garantindo 100% de pontualidade.'
          ]
        },
        {
          id: 'exp_2',
          role: 'Estagiário em Gestão Operacional',
          company: 'Comércio Varejista Central',
          location: 'São Paulo, SP',
          startDate: 'Mar 2022',
          endDate: 'Jan 2023',
          current: false,
          highlights: [
            'Emissão de pedidos de compras e conferência de notas fiscais de entrada de mercadorias.',
            'Apoio no cadastramento de novos produtos no sistema integrado de gestão (ERP).',
            'Organização da agenda de reuniões internas e atas de alinhamento semanal da equipe.'
          ]
        }
      ],
      educations: [
        {
          id: 'edu_1',
          degree: 'Tecnólogo em Processos Gerenciais',
          field: 'Administração e Negócios',
          institution: 'Universidade Paulista (UNIP)',
          location: 'São Paulo, SP',
          startDate: '2022',
          endDate: '2024',
          current: false
        }
      ],
      skills: [
        'Pacote Office (Word, Excel, PowerPoint)',
        'Sistemas ERP',
        'Atendimento ao Cliente',
        'Controle de Documentos e Notas Fiscais',
        'Organização e Métodos',
        'Comunicação Clara e Assertiva',
        'Trabalho em Equipe'
      ],
      certifications: [
        {
          id: 'cert_1',
          name: 'Excel para Negócios e Tabelas Dinâmicas',
          issuer: 'Fundação Bradesco',
          date: '2023'
        },
        {
          id: 'cert_2',
          name: 'Rotinas Administrativas e Financeiras',
          issuer: 'SEBRAE',
          date: '2022'
        }
      ],
      languages: [
        { id: 'lang_1', language: 'Português', proficiency: 'Nativo' },
        { id: 'lang_2', language: 'Inglês', proficiency: 'Básico' }
      ],
      coverLetter: `Prezado(a) Recrutador(a),

Venho por meio desta apresentar meu currículo para a vaga de Auxiliar Administrativo. Possuo sólida experiência prática em rotinas de escritório, controle rigoroso de documentos fiscais e excelência no atendimento ao cliente.

Tenho pleno domínio das ferramentas do Pacote Office (Excel, Word e PowerPoint), boa comunicação interpessoal e foco permanente na organização, pontualidade e otimização dos processos operacionais do setor. 

Acredito que meu perfil proativo, facilidade de adaptação e comprometimento agregarão grande valor ao dia a dia da sua equipe.

Agradeço antecipadamente pela atenção e coloco-me à inteira disposição para uma entrevista.

Atenciosamente,
Gabriel Silva
(11) 98888-7777 | gabriel.silva.exemplo@email.com`,
      templateStyle: 'ats_classic',
      fontFamily: 'plus_jakarta'
    }
  },
  {
    id: 'pleno',
    title: 'Modelo Pleno / Especialista',
    levelBadge: 'Nível Pleno',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    role: 'Especialista em Marketing Digital & Growth',
    description: 'Indicado para analistas e especialistas com sólida trajetória. Ênfase em métricas quantitativas, gestão de campanhas e resultados comprovados.',
    data: {
      id: 'demo-pleno',
      isDemo: true,
      personalInfo: {
        fullName: 'Mariana Vasconcelos',
        targetTitle: 'Especialista em Marketing Digital & Growth',
        email: 'mariana.vasconcelos@email.com',
        phone: '(21) 99765-4321',
        location: 'Rio de Janeiro, RJ',
        linkedin: 'linkedin.com/in/marianavasconcelos-mkt',
        portfolio: 'marianagrowth.com.br'
      },
      summary: 'Especialista em Marketing de Performance e Growth com mais de 5 anos de experiência comprovada no planejamento e execução de campanhas digitais de alta conversão. Expertise em tráfego pago (Meta Ads, Google Ads), inbound marketing, SEO e automação de marketing (HubSpot, RD Station). Histórico comprovado de escalabilidade de receita e redução de CAC de até 35%.',
      experiences: [
        {
          id: 'exp_m1',
          role: 'Analista de Growth Marketing Pleno',
          company: 'ScaleUp Tecnologia & Soluções',
          location: 'Rio de Janeiro, RJ',
          startDate: 'Mar 2022',
          endDate: 'Atual',
          current: true,
          highlights: [
            'Gerenciou orçamento mensal de R$ 85.000 em mídia de performance (Meta Ads e Google Search), atingindo ROI médio de 4.8x.',
            'Implementou estratégia de testes A/B em landing pages que elevou a taxa de conversão de leads de 3,2% para 7,9%.',
            'Coordenou a migração de automação de marketing para o HubSpot, estruturando réguas de nutrição com mais de 60 mil contatos qualificados.',
            'Reduziu o Custo de Aquisição de Clientes (CAC) em 32% ao longo de 12 meses por meio de otimização de palavras-chave de cauda longa.'
          ]
        },
        {
          id: 'exp_m2',
          role: 'Analista de Mídia e Conteúdo',
          company: 'Agência Impulso Digital',
          location: 'Rio de Janeiro, RJ',
          startDate: 'Jan 2020',
          endDate: 'Fev 2022',
          current: false,
          highlights: [
            'Criação e execução de campanhas de anúncios para mais de 12 clientes simultâneos nos segmentos de e-commerce e B2B SaaS.',
            'Otimização de SEO on-page e criação de conteúdo estratégico, gerando aumento de 120% no tráfego orgânico em 8 meses.',
            'Elaboração de relatórios executivos de métricas de marketing (ROAS, LTV, Churn, Conversão) apresentados mensalmente à diretoria.'
          ]
        }
      ],
      educations: [
        {
          id: 'edu_m1',
          degree: 'Bacharelado em Publicidade e Propaganda',
          field: 'Comunicação Social',
          institution: 'Universidade Federal do Rio de Janeiro (UFRJ)',
          location: 'Rio de Janeiro, RJ',
          startDate: '2016',
          endDate: '2020',
          current: false
        }
      ],
      skills: [
        'Google Ads & Google Analytics 4 (GA4)',
        'Meta Ads Manager',
        'SEO & Pesquisa de Palavras-Chave',
        'HubSpot & RD Station',
        'Otimização de Conversão (CRO) e Testes A/B',
        'Copywriting Persuasivo',
        'Análise de Dados & Looker Studio',
        'Gestão de Orçamento de Mídia'
      ],
      certifications: [
        {
          id: 'cert_m1',
          name: 'Certificação Oficial Google Ads Search & Display',
          issuer: 'Google Skillshop',
          date: '2023'
        },
        {
          id: 'cert_m2',
          name: 'Inbound Marketing Certified',
          issuer: 'HubSpot Academy',
          date: '2022'
        }
      ],
      languages: [
        { id: 'lang_m1', language: 'Português', proficiency: 'Nativo' },
        { id: 'lang_m2', language: 'Inglês', proficiency: 'Avançado' }
      ],
      coverLetter: `Prezado(a) Gestor(a) de Contratações,

Escrevo para expressar meu grande entusiasmo pela oportunidade de integrar sua equipe como Especialista em Marketing Digital & Growth. Com mais de 5 anos de experiência gerando crescimento exponencial para marcas digitais, tenho certeza de que posso gerar resultados imediatos para seus objetivos de aquisição e retenção.

Em minha trajetória recente na ScaleUp Tecnologia, gerenciei mais de R$ 85 mil em investimentos mensais em mídia com retorno (ROAS) de 4.8x, reduzindo o CAC em mais de 30%. Combino visão analítica profunda de métricas (GA4, CRO, LTV/CAC) com criatividade para desenhar jornadas envolventes para o consumidor.

Gostaria muito de conversar sobre como posso aplicar essa metodologia orientada a dados na estratégia da sua empresa.

Cordialmente,
Mariana Vasconcelos
(21) 99765-4321 | mariana.vasconcelos@email.com`,
      templateStyle: 'modern_executive',
      fontFamily: 'plus_jakarta'
    }
  },
  {
    id: 'senior',
    title: 'Modelo Sênior / Liderança Tech',
    levelBadge: 'Nível Sênior & Lead',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    role: 'Desenvolvedor Full Stack Sênior & Tech Lead',
    description: 'Perfeito para cargos estratégicos, coordenação e tech lead. Destaque para liderança de equipes, arquitetura e resultados.',
    data: {
      id: 'demo-senior',
      isDemo: true,
      personalInfo: {
        fullName: 'Carlos Eduardo Silva',
        targetTitle: 'Desenvolvedor Full Stack Sênior & Tech Lead',
        email: 'carlos.silva.dev@gmail.com',
        phone: '(11) 98765-4321',
        location: 'São Paulo, SP',
        linkedin: 'linkedin.com/in/carlossilvadev',
        portfolio: 'github.com/carlossilvadev'
      },
      summary: 'Desenvolvedor Full Stack com mais de 7 anos de experiência sólida liderando a criação de plataformas web escaláveis e sistemas de alta disponibilidade. Especialista em TypeScript, React, Node.js, arquitetura de microserviços e computação em nuvem (AWS/GCP). Comprovada capacidade de reduzir tempo de resposta de sistemas em até 40% e liderar equipes multidisciplinares sob metodologias ágeis.',
      experiences: [
        {
          id: 'exp_s1',
          role: 'Tech Lead / Arquiteto de Software',
          company: 'TechNexus Soluções Digitais',
          location: 'São Paulo, SP',
          startDate: 'Jan 2022',
          endDate: 'Atual',
          current: true,
          highlights: [
            'Liderou time de 9 engenheiros de software na migração de monólito legado para microserviços em Node.js e Kubernetes, elevando o uptime da aplicação para 99.98%.',
            'Refatorou a arquitetura do frontend utilizando React, Next.js e Tailwind CSS, reduzindo o Core Web Vitals (LCP) de 4.2s para 1.1s.',
            'Implementou pipelines de CI/CD automatizadas via GitHub Actions com cobertura de testes unitários superior a 85%, acelerando o ciclo de deploys de semanal para diário.',
            'Mentoria técnica de 5 desenvolvedores júniores e plenos, acelerando o onboarding em 50% e reduzindo a taxa de turnover técnico.'
          ]
        },
        {
          id: 'exp_s2',
          role: 'Desenvolvedor Full Stack Sênior',
          company: 'Inovação Cloud Tech',
          location: 'São Paulo, SP',
          startDate: 'Fev 2019',
          endDate: 'Dez 2021',
          current: false,
          highlights: [
            'Desenvolvimento de APIs RESTful e GraphQL de alta performance em Node.js e PostgreSQL, processando mais de 4 milhões de requisições diárias.',
            'Integração com gateways de pagamentos (Stripe, Pagar.me) e mensageria assíncrona com RabbitMQ e Redis.',
            'Otimização de consultas SQL complexas e indexação em banco de dados relacional, reduzindo o consumo de CPU do banco em 45%.'
          ]
        }
      ],
      educations: [
        {
          id: 'edu_s1',
          degree: 'Pós-Graduação em Engenharia de Software Distribuído',
          field: 'Tecnologia da Informação',
          institution: 'USP - Universidade de São Paulo',
          location: 'São Paulo, SP',
          startDate: '2020',
          endDate: '2021',
          current: false
        },
        {
          id: 'edu_s2',
          degree: 'Bacharelado em Ciência da Computação',
          field: 'Ciência da Computação',
          institution: 'UNESP',
          location: 'São Paulo, SP',
          startDate: '2015',
          endDate: '2019',
          current: false
        }
      ],
      skills: [
        'TypeScript / JavaScript (ESNext)',
        'React, Next.js, Tailwind CSS',
        'Node.js, Express, NestJS',
        'PostgreSQL, MongoDB, Redis',
        'Docker, Kubernetes, AWS, GCP',
        'Arquitetura de Microserviços & Event-Driven',
        'CI/CD & DevOps Practices',
        'Liderança Técnica & Metodologias Ágeis (Scrum/Kanban)'
      ],
      certifications: [
        {
          id: 'cert_s1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023'
        },
        {
          id: 'cert_s2',
          name: 'Certified Kubernetes Administrator (CKA)',
          issuer: 'The Linux Foundation',
          date: '2022'
        }
      ],
      languages: [
        { id: 'lang_s1', language: 'Português', proficiency: 'Nativo' },
        { id: 'lang_s2', language: 'Inglês', proficiency: 'Fluente' }
      ],
      coverLetter: `Prezada Equipe de Recrutamento e Seleção,

Gostaria de manifestar meu grande interesse na posição de Desenvolvedor Full Stack Sênior / Tech Lead. Com mais de 7 anos de experiência na concepção e sustentação de sistemas distribuídos de alta escala e na liderança de squads técnicas multidisciplinares, estou entusiasmado com a oportunidade de somar à engenharia da empresa.

Em minhas atuações recentes, conduzi com sucesso a modernização de arquiteturas críticas, garantindo disponibilidade de 99.98% e melhorias substanciais no tempo de carregamento de ponta a ponta. Acredito que a excelência técnica deve caminhar lado a lado com a clareza de negócios, a mentoria contínua e a cultura de entrega com qualidade.

Fico à disposição para aprofundarmos detalhes técnicos em uma entrevista.

Atenciosamente,
Carlos Eduardo Silva
(11) 98765-4321 | carlos.silva.dev@gmail.com`,
      templateStyle: 'senior_strategic',
      fontFamily: 'plus_jakarta'
    }
  }
];
