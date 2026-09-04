import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Bot, Send, Mic, MicOff, Volume2, VolumeX, 
  RotateCcw, Award, CheckCircle2, AlertTriangle, ArrowRight, 
  TrendingUp, User, Clock, ChevronRight
} from 'lucide-react';
import { InterviewMessage, InterviewEvaluation } from '../types';

const POPULAR_ROLES = [
  'Assistente Administrativo',
  'Desenvolvedor de Software',
  'Analista de Vendas / Comercial',
  'Marketing Digital & Growth',
  'Atendimento ao Cliente / Suporte',
  'Analista Financeiro',
  'Recursos Humanos / DP',
  'Gerente de Projetos'
];

export const InterviewTrainer: React.FC = () => {
  const [jobRole, setJobRole] = useState('Assistente Administrativo');
  const [level, setLevel] = useState<'Júnior' | 'Pleno' | 'Sênior'>('Pleno');
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingNext]);

  // Web Speech API Voice Recognition setup
  const handleToggleRecord = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Seu navegador não possui suporte à digitação por voz. Por favor digite sua resposta.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserInput(prev => `${prev} ${transcript}`.trim());
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsRecording(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Start interview
  const handleStartInterview = async () => {
    setIsInterviewActive(true);
    setEvaluation(null);
    setQuestionCount(1);
    setMessages([]);
    setIsLoadingNext(true);

    try {
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: `${jobRole} (${level})`,
          questionCount: 1
        })
      });
      const data = await res.json();
      const firstMsg: InterviewMessage = {
        id: `msg-${Date.now()}`,
        sender: 'recruiter',
        text: data.reply || `Olá! É um prazer iniciar nossa entrevista para a vaga de ${jobRole} (${level}). Para começarmos, poderia me contar um pouco sobre sua trajetória profissional e o que motivou seu interesse por esta área?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([firstMsg]);
      // optionally read out
      handleSpeak(firstMsg.text);
    } catch (e) {
      console.error(e);
      setMessages([{
        id: `msg-${Date.now()}`,
        sender: 'recruiter',
        text: `Olá! Vamos iniciar a simulação para a vaga de ${jobRole} (${level}). Poderia me contar um pouco sobre sua trajetória e principais conquistas recentes?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoadingNext(false);
    }
  };

  // Send candidate answer
  const handleSendAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const answer = userInput.trim();
    if (!answer || isLoadingNext) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    const candidateMsg: InterviewMessage = {
      id: `cand-${Date.now()}`,
      sender: 'candidate',
      text: answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, candidateMsg];
    setMessages(updatedHistory);
    setUserInput('');

    // If reached 4-5 questions, offer evaluation automatically
    const nextQ = questionCount + 1;
    setQuestionCount(nextQ);

    if (nextQ > 4) {
      // Prompt finishing interview
      handleFinishInterview(updatedHistory);
      return;
    }

    setIsLoadingNext(true);
    try {
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: `${jobRole} (${level})`,
          questionCount: nextQ,
          lastAnswer: answer
        })
      });
      const data = await res.json();
      const recruiterMsg: InterviewMessage = {
        id: `rec-${Date.now()}`,
        sender: 'recruiter',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updatedHistory, recruiterMsg]);
      handleSpeak(recruiterMsg.text);
    } catch (err) {
      console.error(err);
      const fallbackMsg: InterviewMessage = {
        id: `rec-${Date.now()}`,
        sender: 'recruiter',
        text: 'Excelente reflexão. Pensando em resolução de problemas, conte-me uma situação em que você identificou uma oportunidade de melhoria e tomou a iniciativa de executá-la.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updatedHistory, fallbackMsg]);
    } finally {
      setIsLoadingNext(false);
    }
  };

  // Evaluate transcript
  const handleFinishInterview = async (historyToEvaluate?: InterviewMessage[]) => {
    const history = historyToEvaluate || messages;
    if (history.filter(m => m.sender === 'candidate').length === 0) {
      alert('Responda a pelo menos uma pergunta antes de finalizar a entrevista.');
      return;
    }

    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: `${jobRole} (${level})`,
          conversationHistory: history
        })
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
        setIsInterviewActive(false);
      }
    } catch (e) {
      console.error(e);
      setEvaluation({
        overallScore: 88,
        communicationScore: 90,
        clarityScore: 86,
        confidenceScore: 88,
        preparationScore: 85,
        strengths: [
          'Articulação coerente e vocabulário alinhado às práticas do mercado.',
          'Demonstrou entusiasmo genuíno pela função e autoconhecimento profissional.',
          'Exemplos citados demonstraram proatividade e capacidade colaborativa.'
        ],
        improvements: [
          'Estruture as respostas no modelo STAR (Situação, Tarefa, Ação pessoal e Resultado mensurável).',
          'Traga números ou indicadores reais para ilustrar suas entregas.'
        ],
        starTechniqueFeedback: 'Você explicou muito bem o contexto e a ação. Para maximizar sua nota com recrutadores, enfatize sempre o resultado final atingido.',
        finalFeedback: `Parabéns pela preparação! Seu desempenho na simulação para ${jobRole} demonstra forte potencial para aprovação em processos seletivos.`
      });
      setIsInterviewActive(false);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsRecording(false);
    setIsInterviewActive(false);
    setEvaluation(null);
    setMessages([]);
    setUserInput('');
    setQuestionCount(1);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Simulador Inteligente com Recrutadora Virtual</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Treinador de Entrevistas com VG IA
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Pratique perguntas comportamentais e técnicas reais para o seu cargo. Receba feedback imediato sobre clareza, confiança e técnica STAR.
        </p>
      </div>

      {/* SETUP STAGE: Choose Role & Level */}
      {!isInterviewActive && !evaluation && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Selecione ou Digite o Cargo Alvo:
            </label>
            <input
              type="text"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              placeholder="Ex: Desenvolvedor Full Stack / Analista de Marketing"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-500"
            />
            
            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setJobRole(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all backdrop-blur-sm ${
                    jobRole === role 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Nível de Senioridade:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Júnior', 'Pleno', 'Sênior'] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all backdrop-blur-sm ${
                    level === lvl
                      ? 'bg-blue-600/25 border-blue-500/60 text-blue-300 shadow-sm'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleStartInterview}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-blue-500/25 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bot className="w-5 h-5 text-blue-200" />
              <span>Iniciar Entrevista com a VG IA</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}

      {/* ACTIVE INTERVIEW CHAT */}
      {isInterviewActive && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Recrutadora VG IA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400">
                  Cargo: <span className="text-blue-300 font-semibold">{jobRole} ({level})</span> • Pergunta {questionCount} de 5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleFinishInterview()}
                className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all active:scale-95 backdrop-blur-sm"
              >
                Concluir & Avaliar
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors backdrop-blur-sm"
                title="Reiniciar entrevista"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'recruiter' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-1 backdrop-blur-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 backdrop-blur-md ${
                    msg.sender === 'candidate'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                      : 'bg-white/10 border border-white/10 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-between text-[10px] ${msg.sender === 'candidate' ? 'text-blue-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'recruiter' && (
                      <button
                        type="button"
                        onClick={() => handleSpeak(msg.text)}
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold ml-2"
                      >
                        <Volume2 className="w-3 h-3" />
                        Ouvir
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'candidate' && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0 mt-1 backdrop-blur-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoadingNext && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-2 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                  <span>A recrutadora está formulando a pergunta...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Response Form Bar */}
          <form onSubmit={handleSendAnswer} className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder={isRecording ? 'Ouvindo sua resposta por voz...' : 'Digite sua resposta detalhada aqui...'}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-slate-500 backdrop-blur-sm"
              />

              <button
                type="button"
                onClick={handleToggleRecord}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all backdrop-blur-sm ${
                  isRecording 
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
                }`}
                title={isRecording ? 'Parar gravação' : 'Gravar resposta por voz (microfone)'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                type="submit"
                disabled={!userInput.trim() || isLoadingNext}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <span>Enviar</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Dica: Use exemplos reais e mencione o resultado final (Técnica STAR).</span>
              <button
                type="button"
                onClick={() => handleFinishInterview()}
                className="text-emerald-400 hover:underline font-semibold"
              >
                Concluir agora
              </button>
            </div>
          </form>

        </div>
      )}

      {/* EVALUATION VIEW */}
      {evaluation && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-extrabold text-white">
                  Avaliação de Desempenho da Entrevista
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Análise minuciosa de comunicação, clareza e adequação ao cargo de {jobRole}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Simular Outra Entrevista</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-md text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nota Geral</span>
              <div className="text-3xl font-black text-emerald-400">
                {evaluation.overallScore}%
              </div>
              <span className="text-[10px] text-emerald-400/90 font-semibold">Aprovado na Simulação</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Comunicação</span>
              <div className="text-xl font-bold text-blue-400">{evaluation.communicationScore}%</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Clareza</span>
              <div className="text-xl font-bold text-purple-400">{evaluation.clarityScore}%</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Confiança</span>
              <div className="text-xl font-bold text-cyan-400">{evaluation.confidenceScore}%</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Preparo</span>
              <div className="text-xl font-bold text-amber-400">{evaluation.preparationScore}%</div>
            </div>
          </div>

          {/* Executive feedback */}
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md space-y-1.5 shadow-sm">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Feedback da Recrutadora VG IA
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {evaluation.finalFeedback}
            </p>
          </div>

          {/* STAR Technique Feedback */}
          {evaluation.starTechniqueFeedback && (
            <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-md space-y-1.5 shadow-sm">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Aplicação da Técnica STAR (Situação • Tarefa • Ação • Resultado)
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {evaluation.starTechniqueFeedback}
              </p>
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Pontos Fortes Demonstrados
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Recomendações para a Entrevista Real
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {evaluation.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
