import React from 'react';
import { Target, ShieldCheck, Sparkles, Cpu, Award, Users, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Hero Intro */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Tecnologia de Ponta em Inteligência Artificial para Carreiras</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sobre o VG Currículos AI
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nascido para transformar a busca por emprego no Brasil, o <strong className="text-white">VG Currículos AI</strong> combina a tecnologia do Google Gemini com a ciência de recrutamento para colocar candidatos à frente de 95% dos concorrentes.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 backdrop-blur-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Algoritmo ATS Calibrado</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mais de 75% dos currículos são rejeitados antes de chegarem aos olhos de um recrutador humano. Nossos modelos são rigorosamente testados para aprovação imediata em Gupy, Kenoby, Workday e LinkedIn Recruiter.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 backdrop-blur-sm">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Redação Orientada a Conquistas</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            A VG IA substitui listas genéricas de tarefas operacionais por sentenças estratégicas de alto impacto, aplicando verbos de ação e destacando resultados mensuráveis.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Privacidade & Acesso Livre</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Não vendemos seus dados nem exigimos assinaturas abusivas. Todo o seu histórico fica salvo localmente no seu próprio navegador, com opção de exportação instantânea em PDF e JSON.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white">
          Por que currículos comuns são ignorados?
        </h3>
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            O mercado de recrutamento mudou radicalmente nos últimos anos. Hoje, uma única vaga de emprego no Brasil recebe centenas ou até milhares de candidaturas em poucas horas. Para filtrar esse volume colossal, as empresas utilizam robôs conhecidos como <strong className="text-white">Applicant Tracking Systems (ATS)</strong>.
          </p>
          <p>
            Formatos com colunas duplas mal renderizadas, gráficos de barras com porcentagens fictícias de habilidades, tabelas invisíveis e ausência de palavras-chave canônicas fazem com que perfis extremamente qualificados sejam descartados na primeira etapa sem que ninguém leia sua história.
          </p>
          <p>
            No <strong className="text-blue-400">VG Currículos AI</strong>, desenvolvemos templates que atendem à regra de ouro dos recrutadores: escaneabilidade perfeita por humanos em menos de 6 segundos e leitura 100% livre de falhas pelos robôs de triagem.
          </p>
        </div>

        <div className="pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">98%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Compatibilidade ATS</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">5x</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Mais Entrevistas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">5</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Modelos Aprovados</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Privado e Seguro</div>
          </div>
        </div>
      </div>

    </div>
  );
};
