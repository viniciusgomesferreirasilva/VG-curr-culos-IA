import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, Volume2, VolumeX, Pause, Play, Square, 
  ZoomIn, ZoomOut, Type, Sun, Moon, Contrast, 
  Sparkles, Check, X, RotateCcw, HelpCircle, Compass
} from 'lucide-react';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  activeView: string;
  activeResumeName?: string;
  activeResumeTitle?: string;
}

export type TextSizeMode = 'sm' | 'base' | 'lg' | 'xl';

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  isOpen,
  onClose,
  onToggle,
  activeView,
  activeResumeName,
  activeResumeTitle
}) => {
  // Persistence states
  const [textSize, setTextSize] = useState<TextSizeMode>(() => {
    return (localStorage.getItem('vg_accessibility_text_size') as TextSizeMode) || 'base';
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('vg_accessibility_high_contrast') === 'true';
  });
  const [grayscale, setGrayscale] = useState<boolean>(() => {
    return localStorage.getItem('vg_accessibility_grayscale') === 'true';
  });
  const [enhancedFocus, setEnhancedFocus] = useState<boolean>(() => {
    return localStorage.getItem('vg_accessibility_enhanced_focus') === 'true';
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem('vg_accessibility_reduced_motion') === 'true';
  });

  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [speakingSection, setSpeakingSection] = useState<string>('');
  const [announcement, setAnnouncement] = useState<string>('');

  // Apply classes to document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    
    // Text size
    root.classList.remove('text-size-sm', 'text-size-base', 'text-size-lg', 'text-size-xl');
    root.classList.add(`text-size-${textSize}`);
    localStorage.setItem('vg_accessibility_text_size', textSize);

    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('vg_accessibility_high_contrast', String(highContrast));

    // Grayscale
    if (grayscale) {
      root.classList.add('grayscale-mode');
    } else {
      root.classList.remove('grayscale-mode');
    }
    localStorage.setItem('vg_accessibility_grayscale', String(grayscale));

    // Enhanced Focus
    if (enhancedFocus) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    localStorage.setItem('vg_accessibility_enhanced_focus', String(enhancedFocus));

    // Reduced Motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    localStorage.setItem('vg_accessibility_reduced_motion', String(reducedMotion));
  }, [textSize, highContrast, grayscale, enhancedFocus, reducedMotion]);

  // Keyboard shortcut Alt + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        onToggle();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle, onClose]);

  // Handle Text-to-Speech
  const speakText = (text: string, sectionTitle: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não possui suporte para síntese de voz.');
      return;
    }

    window.speechSynthesis.cancel();

    if (!text.trim()) {
      announce('Nenhum texto encontrado para leitura.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = speechSpeed;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingSection(sectionTitle);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingSection('');
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingSection('');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStopSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingSection('');
    announce('Leitura de tela cancelada.');
  };

  // Generate natural screen description depending on the active view
  const handleReadCurrentScreen = () => {
    let screenDescription = '';
    let sectionName = '';

    if (activeView === 'generator') {
      sectionName = 'Criação de Currículo';
      screenDescription = `Você está na tela de Criação e Edição de Currículo. ` +
        (activeResumeName ? `Candidato atual: ${activeResumeName}, para a posição de ${activeResumeTitle || 'não especificada'}. ` : '') +
        `Esta tela contém o formulário de preenchimento à esquerda com dados pessoais, experiências, formação, competências e idiomas, e a folha A4 com visualização em tempo real à direita. Você pode utilizar o botão Otimizar com IA para aprimorar o conteúdo, ou baixar o currículo em formato PDF pronto para sistemas de triagem.`;
    } else if (activeView === 'meu-historico') {
      sectionName = 'Histórico de Currículos';
      screenDescription = `Você está na tela de Meu Histórico. Aqui você pode visualizar todos os currículos criados e salvos, carregar um currículo existente para edição, exportar em arquivo ou remover versões antigas.`;
    } else if (activeView === 'treinador-entrevistas') {
      sectionName = 'Treinador de Entrevistas';
      screenDescription = `Você está na tela de Treinador de Entrevistas da VG IA. Aqui você pode simular entrevistas de emprego em tempo real para o cargo desejado. A IA atuará como recrutadora sênior e avaliará suas respostas de acordo com a metodologia STAR.`;
    } else if (activeView === 'assistente-ia') {
      sectionName = 'Assistente Especialista VG IA';
      screenDescription = `Você está no canal direto com a Assistente Especialista VG IA. Aqui você pode conversar livremente e fazer qualquer pergunta sobre carreiras, tirar dúvidas, receber saudações educadas, pedir dicas de currículo, LinkedIn, salários ou qualquer outro assunto.`;
    } else if (activeView === 'sobre') {
      sectionName = 'Sobre Nós';
      screenDescription = `Você está na seção Sobre o VG Currículos AI. Aqui apresentamos nossa missão de democratizar currículos de alta performance aprovados por sistemas robôs ATS com tecnologia do Google Gemini.`;
    } else if (activeView === 'faq') {
      sectionName = 'Dúvidas Frequentes';
      screenDescription = `Você está na seção de Dúvidas Frequentes. Aqui você encontra respostas detalhadas sobre o padrão ATS, exportação em PDF, privacidade de dados e funcionamento da inteligência artificial.`;
    } else {
      sectionName = 'VG Currículos AI';
      screenDescription = `Você está no VG Currículos AI, plataforma profissional para criação de currículos e cartas de apresentação.`;
    }

    speakText(screenDescription, sectionName);
  };

  // Read currently highlighted / selected text
  const handleReadSelectedText = () => {
    const selected = window.getSelection()?.toString();
    if (selected && selected.trim().length > 0) {
      speakText(selected.trim(), 'Texto Selecionado');
    } else {
      announce('Nenhum texto selecionado com o cursor. Selecione um trecho na tela ou clique em Narrar Tela Atual.');
    }
  };

  const announce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => setAnnouncement(''), 4000);
  };

  const handleReset = () => {
    setTextSize('base');
    setHighContrast(false);
    setGrayscale(false);
    setEnhancedFocus(false);
    setReducedMotion(false);
    handleStopSpeech();
    announce('Configurações de acessibilidade restauradas para o padrão.');
  };

  return (
    <>
      {/* Floating Accessibility Launcher Button (Always reachable) */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden flex items-center gap-2">
        {isSpeaking && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Narrando: {speakingSection}</span>
            <button
              type="button"
              onClick={handleStopSpeech}
              className="ml-1 p-0.5 hover:bg-blue-700 rounded"
              title="Parar áudio"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-label="Abrir Menu de Acessibilidade (Atalho Alt + A)"
          title="Menu de Acessibilidade (Alt + A)"
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/25 border border-white/20 active:scale-95 transition-all cursor-pointer focus:ring-4 focus:ring-blue-400 focus:outline-none"
        >
          <Eye className="w-6 h-6" />
        </button>
      </div>

      {/* Accessibility Drawer / Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/60 backdrop-blur-sm transition-all"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div 
            className="w-full sm:max-w-md bg-slate-900 border border-white/20 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="accessibility-title" className="text-base font-bold text-white tracking-tight">
                    Acessibilidade & Voz
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Atalho rápido: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Alt + A</kbd>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu de acessibilidade"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Announcement banner */}
            {announcement && (
              <div 
                aria-live="polite"
                className="bg-blue-600/30 border-b border-blue-500/40 px-4 py-2 text-xs font-medium text-blue-200 text-center"
              >
                {announcement}
              </div>
            )}

            {/* Body Options */}
            <div className="p-5 space-y-6 overflow-y-auto">

              {/* SECTION 1: NARRADOR / LEITOR DE TELA (Speech) */}
              <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Leitor de Tela por Voz
                    </span>
                  </div>
                  {isSpeaking && (
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Falando
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Ouça a descrição do que está aparecendo na tela agora ou qualquer texto selecionado.
                </p>

                {/* Primary Voice Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleReadCurrentScreen}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Narrar Tela Atual</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReadSelectedText}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold active:scale-95 transition-all"
                  >
                    <Compass className="w-4 h-4 text-blue-400" />
                    <span>Ler Seleção</span>
                  </button>
                </div>

                {/* Pause / Stop Playback Controls */}
                {isSpeaking && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handlePauseResume}
                      className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStopSpeech}
                      className="flex-1 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Parar Leitura</span>
                    </button>
                  </div>
                )}

                {/* Speech Speed controls */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Velocidade da voz:</span>
                  <div className="flex items-center gap-1">
                    {[
                      { label: '0.8x', val: 0.8 },
                      { label: '1.0x', val: 1.0 },
                      { label: '1.25x', val: 1.25 }
                    ].map(s => (
                      <button
                        key={s.val}
                        type="button"
                        onClick={() => {
                          setSpeechSpeed(s.val);
                          announce(`Velocidade da fala ajustada para ${s.label}`);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          speechSpeed === s.val
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: TAMANHO DO TEXTO (Font Sizing) */}
              <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Tamanho do Texto
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Aumente ou diminua os textos de toda a aplicação para uma leitura confortável.
                </p>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    { id: 'sm', label: 'A-', desc: 'Pequeno (88%)' },
                    { id: 'base', label: 'A', desc: 'Padrão (100%)' },
                    { id: 'lg', label: 'A+', desc: 'Grande (115%)' },
                    { id: 'xl', label: 'A++', desc: 'Extra (130%)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTextSize(item.id as TextSizeMode);
                        announce(`Tamanho do texto alterado para ${item.desc}`);
                      }}
                      className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 font-bold transition-all ${
                        textSize === item.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      <span className="text-base font-extrabold">{item.label}</span>
                      <span className="text-[10px] font-medium opacity-80">{item.desc.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: CONTRASTE VISUAL (Contrast & Modes) */}
              <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Contraste & Cores
                  </span>
                </div>

                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-white">Alto Contraste (WCAG AAA)</p>
                    <p className="text-[11px] text-slate-400">
                      Fundo escuro profundo com bordas amarelas de máximo contraste.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={highContrast}
                    onClick={() => {
                      const next = !highContrast;
                      setHighContrast(next);
                      announce(next ? 'Modo Alto Contraste ativado.' : 'Modo Alto Contraste desativado.');
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                      highContrast ? 'bg-amber-400' : 'bg-slate-700'
                    }`}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                        highContrast ? 'translate-x-6' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>

                {/* Grayscale Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-white">Modo Preto e Branco</p>
                    <p className="text-[11px] text-slate-400">
                      Remove todas as cores para evitar fadiga ou distrações visuais.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={grayscale}
                    onClick={() => {
                      const next = !grayscale;
                      setGrayscale(next);
                      announce(next ? 'Modo Preto e Branco ativado.' : 'Modo Preto e Branco desativado.');
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                      grayscale ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        grayscale ? 'translate-x-6' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>

                {/* Enhanced Focus Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-white">Realce de Foco (Teclado)</p>
                    <p className="text-[11px] text-slate-400">
                      Borda destacada ao navegar pelos botões com a tecla Tab.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enhancedFocus}
                    onClick={() => {
                      const next = !enhancedFocus;
                      setEnhancedFocus(next);
                      announce(next ? 'Realce de foco ativado.' : 'Realce de foco desativado.');
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                      enhancedFocus ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        enhancedFocus ? 'translate-x-6' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>

              </div>

            </div>

            {/* Footer Reset Action */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrões</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
              >
                Concluir
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
