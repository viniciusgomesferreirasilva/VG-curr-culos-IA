import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, HelpCircle, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { CareerChatMessage } from '../types';

const QUICK_PROMPTS = [
  'Como você foi criado e como você funciona?',
  'Como passar na triagem da Gupy e robôs ATS?',
  'Como formatar meu LinkedIn para atrair recrutadores?',
  'Qual a melhor forma de responder sobre pontos a desenvolver?',
  'Como destacar uma transição de carreira no currículo?'
];

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<CareerChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Olá! Sou a VG IA, sua inteligência artificial assistente e consultora oficial de carreira da plataforma VG Currículos AI, alimentada pela tecnologia dos modelos Gemini do Google. Você pode me fazer qualquer pergunta sobre currículos, entrevistas, LinkedIn, mercado de trabalho ou qualquer outro assunto que desejar. Em que posso te apoiar hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: CareerChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          history: updated
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.reply) {
        throw new Error(data.error || 'Não foi possível processar a resposta da IA no momento.');
      }

      const botMsg: CareerChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updated, botMsg]);
    } catch (e: any) {
      console.error(e);
      const errorMsg: CareerChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: e.message || 'Desculpe, ocorreu uma instabilidade ao conectar com o serviço de inteligência artificial. Por favor, tente enviar sua pergunta novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updated, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Intro */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Consultoria de Carreira com Inteligência Artificial</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Assistente Especialista VG IA
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Tire dúvidas estratégicas sobre mercado de trabalho, processos seletivos e como destacar suas competências.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
        
        {/* Chat Stream */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1 backdrop-blur-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 backdrop-blur-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-white/10 border border-white/10 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                  {msg.sender === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      title={speakingId === msg.id ? 'Pausar narração' : 'Ouvir resposta'}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                          <span className="text-[10px] text-indigo-400">Pausar</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Ouvir</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0 mt-1 backdrop-blur-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 backdrop-blur-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <span>VG IA analisando as melhores práticas do mercado...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            Perguntas sugeridas:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs transition-all text-left backdrop-blur-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua dúvida sobre currículo, vagas ou processos seletivos..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 placeholder-slate-500 transition-all backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <span>Perguntar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
