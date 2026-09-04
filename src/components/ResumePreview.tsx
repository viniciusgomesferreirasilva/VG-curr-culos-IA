import React, { useState, useRef } from 'react';
import { 
  Download, Copy, Check, Volume2, VolumeX, Eye, 
  Sparkles, FileText, Mail, ShieldCheck, Printer, 
  Share2, Save, ArrowLeft, RefreshCw, Layers, Type, ExternalLink
} from 'lucide-react';
import { ResumeData, TemplateStyle, FontFamily, AtsAudit } from '../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
  onUpdateResumeData: (data: ResumeData) => void;
  onSaveToHistory: (data: ResumeData) => void;
  auditData: AtsAudit | null;
  isAuditing: boolean;
  onReaudit: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  onUpdateResumeData,
  onSaveToHistory,
  auditData,
  isAuditing,
  onReaudit
}) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'coverLetter' | 'audit'>('resume');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { personalInfo, summary, experiences, educations, skills, languages, certifications, coverLetter, templateStyle, fontFamily } = resumeData;

  // Font family mapping
  const getFontFamilyStyle = (font: FontFamily): string => {
    switch (font) {
      case 'carlito': return "'Carlito', sans-serif";
      case 'roboto': return "'Roboto', sans-serif";
      case 'open_sans': return "'Open Sans', sans-serif";
      case 'lato': return "'Lato', sans-serif";
      case 'montserrat': return "'Montserrat', sans-serif";
      case 'plus_jakarta':
      default: return "'Plus Jakarta Sans', sans-serif";
    }
  };

  // Text-to-speech handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura em voz alta.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    let textToRead = '';
    if (activeTab === 'resume') {
      textToRead = `Currículo de ${personalInfo.fullName}. Cargo: ${personalInfo.targetTitle}. Resumo profissional: ${summary}.`;
    } else if (activeTab === 'coverLetter') {
      textToRead = coverLetter || 'Nenhuma carta de apresentação cadastrada.';
    } else if (activeTab === 'audit' && auditData) {
      textToRead = `Diagnóstico ATS: Nota geral ${auditData.overallScore} de 100. ${auditData.summaryFeedback}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Plain text copy for ATS forms (Gupy, LinkedIn, Kenoby)
  const handleCopyPlainText = () => {
    const lines: string[] = [];
    lines.push(personalInfo.fullName.toUpperCase());
    lines.push(`${personalInfo.targetTitle}`);
    lines.push(`E-mail: ${personalInfo.email} | Telefone: ${personalInfo.phone} | Local: ${personalInfo.location}`);
    if (personalInfo.linkedin) lines.push(`LinkedIn: ${personalInfo.linkedin}`);
    lines.push('\n----------------------------------------');
    lines.push('RESUMO PROFISSIONAL');
    lines.push('----------------------------------------');
    lines.push(summary);

    if (experiences?.length) {
      lines.push('\n----------------------------------------');
      lines.push('EXPERIÊNCIA PROFISSIONAL');
      lines.push('----------------------------------------');
      experiences.forEach(exp => {
        lines.push(`${exp.role} - ${exp.company} (${exp.startDate} a ${exp.current ? 'Atual' : exp.endDate})`);
        exp.highlights.forEach(h => {
          if (h.trim()) lines.push(`• ${h}`);
        });
        lines.push('');
      });
    }

    if (educations?.length) {
      lines.push('----------------------------------------');
      lines.push('FORMAÇÃO ACADÊMICA');
      lines.push('----------------------------------------');
      educations.forEach(edu => {
        lines.push(`${edu.degree} em ${edu.field} - ${edu.institution} (${edu.endDate})`);
      });
      lines.push('');
    }

    if (skills?.length) {
      lines.push('----------------------------------------');
      lines.push('COMPETÊNCIAS & HABILIDADES');
      lines.push('----------------------------------------');
      lines.push(skills.join(', '));
      lines.push('');
    }

    if (languages?.length) {
      lines.push('----------------------------------------');
      lines.push('IDIOMAS');
      lines.push('----------------------------------------');
      lines.push(languages.map(l => `${l.language} (${l.proficiency})`).join(', '));
      lines.push('');
    }

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyCoverLetter = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleSave = () => {
    onSaveToHistory(resumeData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Toolbar */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        
        {/* Row 1: Primary View Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'resume' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Currículo A4</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('coverLetter')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'coverLetter' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Carta de Apresentação</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'audit' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Diagnóstico ATS</span>
              {auditData && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                  {auditData.overallScore}%
                </span>
              )}
            </button>
          </div>

          {/* Quick Actions (Audio, Save, Copy, Print) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSpeech}
              title={isPlayingAudio ? 'Parar leitura' : 'Ouvir conteúdo em voz alta'}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                isPlayingAudio 
                  ? 'bg-rose-600/20 text-rose-300 border-rose-500/40 animate-pulse' 
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Pausar' : 'Ouvir'}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`p-2.5 sm:px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                savedSuccess
                  ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10 hover:text-white'
              }`}
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-slate-400" />}
              <span className="hidden md:inline">{savedSuccess ? 'Salvo!' : 'Salvar no Histórico'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPlainText}
              className="p-2.5 sm:px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md"
              title="Copiar texto puro para colar em formulários ATS como Gupy e LinkedIn"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span className="hidden md:inline">{copiedText ? 'Copiado!' : 'Copiar Texto ATS'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPdf}
              className="py-2 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Baixar PDF / Imprimir</span>
            </button>
          </div>
        </div>

        {/* Row 2: Customization Bar (Templates & Fonts) */}
        {activeTab === 'resume' && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
            
            {/* 5 Templates Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Modelo:
              </span>
              
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'modern_executive', name: 'Moderno' },
                  { id: 'clean_minimal', name: 'Minimalista' },
                  { id: 'ats_classic', name: 'ATS Clássico' },
                  { id: 'senior_strategic', name: 'Elegante' },
                  { id: 'tech_creative', name: 'Criativo' }
                ].map(tmpl => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => onUpdateResumeData({ ...resumeData, templateStyle: tmpl.id as TemplateStyle })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap backdrop-blur-sm ${
                      templateStyle === tmpl.id
                        ? 'bg-blue-600 text-white shadow-sm border border-blue-500'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                Fonte:
              </span>
              <select
                value={fontFamily}
                onChange={e => onUpdateResumeData({ ...resumeData, fontFamily: e.target.value as FontFamily })}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/15 text-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 backdrop-blur-md"
              >
                <option value="plus_jakarta">Plus Jakarta Sans (Padrão)</option>
                <option value="carlito">Carlito (Compatível Calibri)</option>
                <option value="roboto">Roboto (Corporativa)</option>
                <option value="open_sans">Open Sans</option>
                <option value="lato">Lato</option>
                <option value="montserrat">Montserrat (Moderna)</option>
              </select>
            </div>

          </div>
        )}

      </div>

      {/* VIEW TAB 1: CURRÍCULO A4 CANVAS */}
      {activeTab === 'resume' && (
        <div className="relative overflow-x-auto pb-6">
          <div
            ref={canvasRef}
            id="resume-a4-canvas"
            style={{ fontFamily: getFontFamilyStyle(fontFamily) }}
            className={`relative mx-auto bg-white text-zinc-900 shadow-2xl rounded-sm p-8 sm:p-12 min-h-[1050px] max-w-[820px] text-left border border-zinc-200 transition-all print:shadow-none print:m-0 print:w-full print:max-w-none print:border-none ${
              templateStyle === 'modern_executive' ? 'border-t-8 border-t-blue-800' :
              templateStyle === 'senior_strategic' ? 'border-t-8 border-t-slate-800' :
              templateStyle === 'tech_creative' ? 'border-t-8 border-t-indigo-600' : ''
            }`}
          >

            {/* DEMO WATERMARK (Only if isDemo) */}
            {resumeData.isDemo && (
              <div className="absolute top-4 right-4 print:hidden pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold tracking-wider uppercase">
                  Exemplo de Demonstração
                </span>
              </div>
            )}

            {/* TEMPLATE HEADER */}
            {templateStyle === 'modern_executive' && (
              <div className="border-b-2 border-zinc-200 pb-5 mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
                  {personalInfo.fullName || 'Seu Nome Completo'}
                </h1>
                <p className="text-base sm:text-lg font-bold text-zinc-700 mt-1">
                  {personalInfo.targetTitle || 'Cargo Alvo'}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 mt-3">
                  <span>{personalInfo.email}</span>
                  <span>•</span>
                  <span>{personalInfo.phone}</span>
                  <span>•</span>
                  <span>{personalInfo.location}</span>
                  {personalInfo.linkedin && (
                    <>
                      <span>•</span>
                      <span className="text-blue-700 font-medium">{personalInfo.linkedin}</span>
                    </>
                  )}
                  {personalInfo.portfolio && (
                    <>
                      <span>•</span>
                      <span className="text-blue-700 font-medium">{personalInfo.portfolio}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {templateStyle === 'clean_minimal' && (
              <div className="pb-6 mb-6 border-b border-zinc-200">
                <h1 className="text-3xl font-light text-zinc-900 tracking-tight uppercase">
                  {personalInfo.fullName || 'Seu Nome Completo'}
                </h1>
                <p className="text-sm font-semibold text-zinc-500 tracking-wider uppercase mt-1">
                  {personalInfo.targetTitle || 'Cargo Alvo'}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 mt-3 pt-3 border-t border-zinc-100">
                  <span>{personalInfo.email}</span>
                  <span>|</span>
                  <span>{personalInfo.phone}</span>
                  <span>|</span>
                  <span>{personalInfo.location}</span>
                  {personalInfo.linkedin && (
                    <>
                      <span>|</span>
                      <span>{personalInfo.linkedin}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {templateStyle === 'ats_classic' && (
              <div className="text-center pb-4 mb-6 border-b-2 border-zinc-900">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-wide">
                  {personalInfo.fullName || 'Seu Nome Completo'}
                </h1>
                <p className="text-sm font-bold text-zinc-700 mt-1">
                  {personalInfo.targetTitle || 'Cargo Alvo'}
                </p>
                <p className="text-xs text-zinc-700 mt-2">
                  {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
                  {personalInfo.linkedin ? ` | ${personalInfo.linkedin}` : ''}
                </p>
              </div>
            )}

            {templateStyle === 'senior_strategic' && (
              <div className="bg-slate-900 text-white -m-8 sm:-m-12 p-8 sm:p-12 mb-8 print:-m-0 print:bg-slate-900 print:text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                      {personalInfo.fullName || 'Seu Nome Completo'}
                    </h1>
                    <p className="text-base font-semibold text-slate-300 mt-1">
                      {personalInfo.targetTitle || 'Cargo Alvo'}
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1 sm:text-right">
                    <p>{personalInfo.phone}</p>
                    <p>{personalInfo.email}</p>
                    <p>{personalInfo.location}</p>
                    {personalInfo.linkedin && <p className="text-blue-300">{personalInfo.linkedin}</p>}
                  </div>
                </div>
              </div>
            )}

            {templateStyle === 'tech_creative' && (
              <div className="pb-5 mb-6 border-b-2 border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                    {personalInfo.fullName || 'Seu Nome Completo'}
                  </h1>
                  <p className="text-sm font-extrabold text-indigo-600 mt-1 tracking-wide uppercase">
                    {personalInfo.targetTitle || 'Cargo Alvo'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {personalInfo.email}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {personalInfo.phone}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            )}

            {/* SECTION: RESUMO PROFISSIONAL */}
            {summary && (
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Resumo Profissional
                </h2>
                <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed text-justify">
                  {summary}
                </p>
              </div>
            )}

            {/* SECTION: EXPERIÊNCIA PROFISSIONAL */}
            {experiences?.length > 0 && (
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Experiência Profissional
                </h2>

                <div className="space-y-4">
                  {experiences.map(exp => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <span className="text-xs sm:text-[13px] font-bold text-zinc-900">
                            {exp.role}
                          </span>
                          <span className="text-xs text-zinc-700 font-medium ml-1">
                            — {exp.company}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 whitespace-nowrap">
                          {exp.startDate} - {exp.current ? 'Atual' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                        </span>
                      </div>

                      {exp.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12px] text-zinc-700 leading-relaxed">
                          {exp.highlights.filter(h => h.trim().length > 0).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: FORMAÇÃO ACADÊMICA */}
            {educations?.length > 0 && (
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Formação Acadêmica
                </h2>

                <div className="space-y-2.5">
                  {educations.map(edu => (
                    <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                      <div>
                        <span className="font-bold text-zinc-900">{edu.degree} em {edu.field}</span>
                        <span className="text-zinc-700 ml-1">| {edu.institution}</span>
                      </div>
                      <span className="text-[11px] font-medium text-zinc-500">
                        {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: COMPETÊNCIAS & HABILIDADES */}
            {skills?.length > 0 && (
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Competências & Tecnologias
                </h2>

                {templateStyle === 'tech_creative' ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-[12.5px] text-zinc-800 leading-relaxed">
                    {skills.join(' • ')}
                  </p>
                )}
              </div>
            )}

            {/* SECTION: CURSOS / CERTIFICAÇÕES */}
            {certifications?.length > 0 && (
              <div className="mb-6">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Certificações & Cursos Complementares
                </h2>

                <div className="space-y-1.5">
                  {certifications.map(cert => (
                    <div key={cert.id} className="flex items-center justify-between text-xs text-zinc-800">
                      <div>
                        <span className="font-semibold">{cert.name}</span>
                        <span className="text-zinc-600 ml-1">({cert.issuer})</span>
                      </div>
                      {cert.date && <span className="text-[11px] text-zinc-500">{cert.date}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: IDIOMAS */}
            {languages?.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  templateStyle === 'modern_executive' ? 'text-blue-900 border-b border-blue-200 pb-1' :
                  templateStyle === 'ats_classic' ? 'text-zinc-900 border-b border-zinc-900 pb-0.5' :
                  templateStyle === 'senior_strategic' ? 'text-slate-800 border-b border-slate-300 pb-1' :
                  templateStyle === 'tech_creative' ? 'text-indigo-700 border-b border-indigo-200 pb-1' :
                  'text-zinc-800 border-b border-zinc-200 pb-1'
                }`}>
                  Idiomas
                </h2>
                <p className="text-xs text-zinc-800">
                  {languages.map(l => `${l.language}: ${l.proficiency}`).join(' | ')}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* VIEW TAB 2: CARTA DE APRESENTAÇÃO */}
      {activeTab === 'coverLetter' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  Carta de Apresentação Profissional
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Carta personalizada pronta para ser anexada em e-mails de candidatura ou formulários de vagas.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCoverLetter}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-300 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all backdrop-blur-md"
              >
                {copiedLetter ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLetter ? 'Copiada!' : 'Copiar Carta'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white text-zinc-900 font-sans shadow-2xl max-w-3xl mx-auto border border-zinc-200">
            <div className="text-xs text-zinc-500 text-right mb-6">
              {personalInfo.location || 'Brasil'}, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>

            <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-800 font-normal">
              {coverLetter || `Prezado(a) Recrutador(a),\n\nGostaria de manifestar meu interesse na oportunidade para atuar como ${personalInfo.targetTitle || 'profissional'}.\n\nAcompanho as realizações de sua empresa e acredito que minha dedicação e competências técnicas podem contribuir diretamente para o alcance das metas da equipe.\n\nFico à disposição para uma entrevista.\n\nAtenciosamente,\n${personalInfo.fullName}`}
            </div>
          </div>
        </div>
      )}

      {/* VIEW TAB 3: DIAGNÓSTICO ATS DA IA */}
      {activeTab === 'audit' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Diagnóstico & Score de Compatibilidade ATS da VG IA
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulação em tempo real dos critérios utilizados por Gupy, LinkedIn Recruiter e Kenoby.
              </p>
            </div>
            <button
              type="button"
              disabled={isAuditing}
              onClick={onReaudit}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50 backdrop-blur-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Analisando...' : 'Reanalisar com VG IA'}</span>
            </button>
          </div>

          {auditData ? (
            <div className="space-y-6">
              {/* Score highlight cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-md text-center space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Score Geral ATS</span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {auditData.overallScore}%
                  </div>
                  <span className="text-[10px] text-emerald-400/90 font-semibold">Excelente Classificação</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Leitura por Robôs</span>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                    {auditData.atsCompatibility}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Estrutura Aprovada</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Impacto do Conteúdo</span>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                    {auditData.contentImpact}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Conquistas & Resultados</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-1 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Clareza & Escaneamento</span>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {auditData.clarityAndReadability}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Tipografia & Espaço</span>
                </div>
              </div>

              {/* Executive feedback paragraph */}
              <div className="p-4.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Veredito Executivo da VG IA
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {auditData.summaryFeedback}
                </p>
              </div>

              {/* Strengths and Improvements grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Pontos Fortes Identificados
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {auditData.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Oportunidades de Refinamento
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {auditData.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">→</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Missing keywords recommendations */}
              {auditData.missingKeywords?.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Palavras-Chave Estratégicas Sugeridas para a Triagem
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Robôs ATS procuram especificamente por estas competências nos filtros de busca dos recrutadores:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {auditData.missingKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium backdrop-blur-sm"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">
                Avaliando correspondência de palavras-chave e formatação do currículo...
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
