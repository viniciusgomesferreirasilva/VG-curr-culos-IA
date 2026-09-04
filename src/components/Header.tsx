import React, { useState } from 'react';
import { Sparkles, FileText, History, HelpCircle, Info, CheckCircle, Menu, X, Bot, PlayCircle, Eye } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
  onOpenDemoModal: () => void;
  onOpenAccessibility: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenDemoModal,
  onOpenAccessibility,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/75 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo with Frosted Glass & Gradient styling */}
        <button
          onClick={() => handleNav('generator')}
          className="flex items-center gap-3 text-left group transition-all"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            VG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                Currículos IA
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-medium">
              CURRÍCULOS PROFISSIONAIS ATS
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-400">
          <button
            onClick={() => handleNav('generator')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeView === 'generator' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Criar Currículo
          </button>
          <button
            onClick={() => handleNav('meu-historico')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeView === 'meu-historico' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Histórico</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('treinador-entrevistas')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeView === 'treinador-entrevistas' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Treinador de Entrevistas</span>
          </button>
          <button
            onClick={() => handleNav('assistente-ia')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeView === 'assistente-ia' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>Assistente VG IA</span>
          </button>
          <button
            onClick={() => handleNav('sobre')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeView === 'sobre' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Sobre
          </button>
          <button
            onClick={() => handleNav('faq')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeView === 'faq' 
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm' 
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Dúvidas
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenAccessibility}
            title="Menu de Acessibilidade (Atalho Alt + A)"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Acessibilidade</span>
          </button>

          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md shadow-sm transition-all active:scale-95"
          >
            <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Exemplos Prontos</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>VG IA Conectada</span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('generator')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Criar Currículo com IA</span>
          </button>
          <button
            onClick={() => handleNav('meu-historico')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" />
              <span>Meu Histórico</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('treinador-entrevistas')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Treinador de Entrevistas</span>
          </button>
          <button
            onClick={() => handleNav('assistente-ia')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Assistente VG IA</span>
          </button>
          <button
            onClick={() => handleNav('sobre')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span>Sobre o VG Currículos AI</span>
          </button>
          <button
            onClick={() => handleNav('faq')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Perguntas Frequentes (FAQ)</span>
          </button>
          <button
            onClick={() => {
              onOpenAccessibility();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>Menu de Acessibilidade & Voz</span>
          </button>
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                onOpenDemoModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-bold flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-blue-400" />
              <span>Explorar Modelos de Exemplo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
