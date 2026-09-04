import React from 'react';
import { X, PlayCircle, CheckCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEMO_PROFILES } from '../data/mockProfiles';
import { ResumeData } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (data: ResumeData, title: string) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 backdrop-blur-sm">
                <PlayCircle className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Demonstração Gratuita (Currículo + Carta)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                100% Grátis
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Escolha um perfil profissional pré-preenchido para explorar a qualidade dos layouts A4, simulação de nota ATS e carta de apresentação instantaneamente.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative notice */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-emerald-300">Modo de Testes Seguro:</strong> Estes modelos utilizam dados de exemplo realistas desenvolvidos por especialistas em RH. Você pode testar todas as funções, trocar temas e fontes ou editá-los livremente.
          </p>
        </div>

        {/* 3 Demo Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_PROFILES.map((profile) => (
            <div
              key={profile.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all shadow-md hover:shadow-xl backdrop-blur-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${profile.badgeColor} backdrop-blur-sm`}>
                    {profile.levelBadge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ATS 96%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {profile.role}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Currículo ATS completo</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Carta de Apresentação</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Experiências quantificadas</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectProfile(profile.data, profile.title);
                  onClose();
                }}
                className="mt-5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Carregar {profile.levelBadge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-slate-400">
          <span>Prefere começar do zero com seus dados?</span>{' '}
          <button
            onClick={onClose}
            className="text-blue-400 hover:underline font-semibold"
          >
            Preencher formulário em branco
          </button>
        </div>

      </div>
    </div>
  );
};
