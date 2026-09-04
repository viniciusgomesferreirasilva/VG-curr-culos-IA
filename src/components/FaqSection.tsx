import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'O que significa ATS e por que meu currículo precisa ser compatível?',
    a: 'ATS significa "Applicant Tracking System" (Sistema de Rastreamento de Candidatos). Grandes e médias empresas utilizam softwares como Gupy, Kenoby, Workday e Taleo para filtrar currículos antes de qualquer humano vê-los. Um currículo com formatação confusa, gráficos ou sem as palavras-chave adequadas da vaga é sumariamente descartado pelo robô. O VG Currículos AI garante que seu documento passe ileso por essa filtragem técnica.'
  },
  {
    q: 'O VG Currículos AI é totalmente gratuito?',
    a: 'Sim! Você pode preencher seus dados, utilizar os exemplos profissionais gratuitos, testar a IA, gerar cartas de apresentação, simular entrevistas e baixar seu currículo em PDF de alta qualidade sem taxas surpresas.'
  },
  {
    q: 'Como funciona o recurso de Carta de Apresentação?',
    a: 'Ao preencher seu currículo e indicar o cargo alvo ou colar a descrição da vaga, nossa IA formula automaticamente uma carta de apresentação formal e persuasiva, alinhando suas competências ao perfil da oportunidade.'
  },
  {
    q: 'Devo incluir foto no meu currículo?',
    a: 'Para 95% das vagas de trabalho modernas no Brasil (administrativo, tecnologia, finanças, vendas, etc.), a inclusão de foto não é recomendada e muitos robôs ATS simplesmente desconsideram imagens. Fotos só devem ser incluídas se explicitamente solicitadas pelo anúncio da vaga (como cargos de recepção específica, modelos ou atuação artística).'
  },
  {
    q: 'Como faço para baixar o currículo em PDF?',
    a: 'Na tela de prévia do currículo, basta clicar no botão "Baixar PDF / Imprimir". Na janela de impressão do seu navegador, selecione "Salvar como PDF", configure o tamanho do papel para A4 e desmarque a opção "Cabeçalhos e rodapés" para um resultado gráfico perfeito.'
  },
  {
    q: 'Como funciona o Treinador de Entrevistas com a VG IA?',
    a: 'O treinador simula uma entrevista real de RH para a vaga que você escolher. Você pode responder digitando ou usando o microfone com reconhecimento de voz. Ao final, a recrutadora virtual gera uma nota geral (0 a 100) e analisa seus pontos fortes, melhorias e a aplicação da técnica STAR.'
  },
  {
    q: 'Meus dados ficam salvos em servidores públicos?',
    a: 'Não. Os dados do seu currículo são armazenados estritamente na memória local (localStorage) do seu navegador. Você tem total soberania para editar, duplicar, exportar ou apagar suas informações a qualquer momento.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-300 backdrop-blur-sm">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Tire Suas Dúvidas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Perguntas Frequentes (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tudo o que você precisa saber sobre o funcionamento do VG Currículos AI, padrões ATS e exportação.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-white pr-4">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-4.5 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
