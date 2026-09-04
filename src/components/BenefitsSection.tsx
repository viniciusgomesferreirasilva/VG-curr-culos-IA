import React from 'react';
import { CheckCircle2, Sparkles, FileText, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  onStartGenerator: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onStartGenerator }) => {
  const benefits = [
    {
      title: 'Aprovação Comprovada em Sistemas ATS',
      desc: 'Formatação projetada especificamente para algoritmos de triagem da Gupy, Kenoby, LinkedIn, Greenhouse e Workday.',
      badge: 'Score 98%'
    },
    {
      title: 'Otimização com Inteligência Artificial',
      desc: 'A VG IA reescreve suas experiências com verbos de ação assertivos e palavras-chave de alto valor para o seu setor.',
      badge: 'Google Gemini'
    },
    {
      title: 'Gerador de Carta de Apresentação',
      desc: 'Criação automática de cartas profissionais sob medida para a vaga em segundos, destacando fit cultural.',
      badge: 'Exclusivo'
    },
    {
      title: 'Treinador de Entrevistas Integrado',
      desc: 'Simule entrevistas reais com recrutadora virtual por voz ou texto e receba diagnósticos sobre a técnica STAR.',
      badge: 'Interativo'
    },
    {
      title: 'Exportação Direta em PDF A4 e Texto Puro',
      desc: 'Impressão em padrão gráfico de alta resolução A4 e atalho de cópia para colar direto em formulários de candidatura.',
      badge: 'Pronto p/ Envio'
    },
    {
      title: 'Sem Assinaturas Ocultas',
      desc: 'Interface fluida, sem pegadinhas de cobrança na hora de baixar o PDF e total privacidade para os seus dados.',
      badge: '100% Livre'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300 backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>Vantagens Competitivas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Por que usar o VG Currículos AI?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Descubra os diferenciais que tornam seu perfil irresistível para recrutadores e aprovado pelos robôs de seleção.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all space-y-3 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-blue-300 backdrop-blur-sm">
                  {b.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">
                {b.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-indigo-900/40 backdrop-blur-2xl border border-white/10 text-center space-y-4 shadow-2xl">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Pronto para conquistar sua próxima vaga?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Crie seu currículo otimizado com a VG IA em menos de 3 minutos e aumente suas chances em até 5 vezes.
        </p>
        <div>
          <button
            type="button"
            onClick={onStartGenerator}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/20 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Criar Meu Currículo Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
