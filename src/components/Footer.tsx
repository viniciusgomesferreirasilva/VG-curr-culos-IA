import React from 'react';
import { FileText, Sparkles, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (viewId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-950/70 backdrop-blur-xl border-t border-white/10 py-12 text-slate-400 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md shadow-blue-500/20">
                VG
              </div>
              <span className="text-base font-bold text-white">
                Currículos IA
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Plataforma de criação e otimização de currículos profissionais e cartas de apresentação com inteligência artificial para sistemas ATS.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
            <button
              onClick={() => onNavigate('generator')}
              className="hover:text-white transition-colors"
            >
              Criar Currículo
            </button>
            <button
              onClick={() => onNavigate('meu-historico')}
              className="hover:text-white transition-colors"
            >
              Histórico
            </button>
            <button
              onClick={() => onNavigate('treinador-entrevistas')}
              className="hover:text-white transition-colors"
            >
              Treinador de Entrevistas
            </button>
            <button
              onClick={() => onNavigate('assistente-ia')}
              className="hover:text-white transition-colors"
            >
              Assistente VG IA
            </button>
            <button
              onClick={() => onNavigate('sobre')}
              className="hover:text-white transition-colors"
            >
              Sobre Nós
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VG Currículos AI. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Desenvolvido com foco em alta aprovação profissional e respeito aos seus dados.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
