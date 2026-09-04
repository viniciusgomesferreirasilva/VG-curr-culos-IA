import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, Languages, Award, 
  Target, Sparkles, Plus, Trash2, ChevronDown, ChevronUp, 
  RefreshCw, CheckCircle2, Lightbulb, FileText, ArrowRight
} from 'lucide-react';
import { ResumeData, Experience, Education, Certification, LanguageItem, TemplateStyle, FontFamily } from '../types';

interface ResumeFormProps {
  resumeData: ResumeData;
  onChange: (updated: ResumeData) => void;
  onSubmitGenerate: () => void;
  isGenerating: boolean;
  onLoadSample: () => void;
}

const COMMON_SKILL_SUGGESTIONS: Record<string, string[]> = {
  'Geral': ['Comunicação Assertiva', 'Trabalho em Equipe', 'Resolução de Problemas', 'Gestão do Tempo', 'Proatividade', 'Pacote Office'],
  'Administrativo / Financeiro': ['Excel Avançado', 'Contas a Pagar e Receber', 'Fluxo de Caixa', 'Sistemas ERP (SAP/Totvs)', 'Controle de Estoque', 'Rotinas Fiscais'],
  'Tecnologia / TI': ['JavaScript / TypeScript', 'React.js', 'Node.js', 'SQL / PostgreSQL', 'Git & GitHub', 'APIs REST', 'Metodologias Ágeis (Scrum/Kanban)'],
  'Vendas / Comercial': ['Negociação Estratégica', 'Prospecção B2B/B2C', 'CRM (HubSpot/Salesforce)', 'Fechamento de Vendas', 'Funil de Vendas', 'Fidelização de Clientes'],
  'Marketing': ['SEO & Tráfego Orgânico', 'Google Ads & Meta Ads', 'Copywriting', 'Google Analytics 4 (GA4)', 'RD Station', 'Inbound Marketing']
};

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  onChange,
  onSubmitGenerate,
  isGenerating,
  onLoadSample
}) => {
  const [activeAccordion, setActiveAccordion] = useState<string>('personal');
  const [skillInput, setSkillInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Geral');

  const toggleAccordion = (key: string) => {
    setActiveAccordion(prev => prev === key ? '' : key);
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    };
    onChange({
      ...resumeData,
      experiences: [newExp, ...resumeData.experiences]
    });
    setActiveAccordion('experience');
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.filter(exp => exp.id !== id)
    });
  };

  const addHighlight = (expId: string) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, highlights: [...exp.highlights, ''] };
        }
        return exp;
      })
    });
  };

  const updateHighlight = (expId: string, index: number, value: string) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.map(exp => {
        if (exp.id === expId) {
          const newHighlights = [...exp.highlights];
          newHighlights[index] = value;
          return { ...exp, highlights: newHighlights };
        }
        return exp;
      })
    });
  };

  const removeHighlight = (expId: string, index: number) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, highlights: exp.highlights.filter((_, i) => i !== index) };
        }
        return exp;
      })
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false
    };
    onChange({
      ...resumeData,
      educations: [newEdu, ...resumeData.educations]
    });
    setActiveAccordion('education');
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...resumeData,
      educations: resumeData.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resumeData,
      educations: resumeData.educations.filter(edu => edu.id !== id)
    });
  };

  // Skills handlers
  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !resumeData.skills.includes(trimmed)) {
      onChange({
        ...resumeData,
        skills: [...resumeData.skills, trimmed]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter(s => s !== skillToRemove)
    });
  };

  // Language handlers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang_${Date.now()}`,
      language: '',
      proficiency: 'Intermediário'
    };
    onChange({
      ...resumeData,
      languages: [...(resumeData.languages || []), newLang]
    });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: any) => {
    onChange({
      ...resumeData,
      languages: (resumeData.languages || []).map(l => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...resumeData,
      languages: (resumeData.languages || []).filter(l => l.id !== id)
    });
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert_${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    onChange({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), newCert]
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange({
      ...resumeData,
      certifications: (resumeData.certifications || []).map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...resumeData,
      certifications: (resumeData.certifications || []).filter(c => c.id !== id)
    });
  };

  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
      
      {/* Form Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Preencha seus Dados para a VG IA
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Preencha os blocos abaixo. A IA fará a formatação formal e otimização para sistemas ATS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md transition-all active:scale-95 shadow-sm"
          >
            Carregar Exemplo
          </button>
        </div>
      </div>

      {/* Accordion 1: Dados Pessoais */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('personal')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-blue-400 shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">1. Dados Pessoais & Contato</h3>
              <p className="text-[11px] text-slate-400">Nome, cargo alvo, e-mail, telefone e redes</p>
            </div>
          </div>
          {activeAccordion === 'personal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'personal' && (
          <div className="p-5 pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Nome Completo *
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.fullName}
                onChange={e => updatePersonalInfo('fullName', e.target.value)}
                placeholder="Ex: Carlos Eduardo Silva"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Cargo Alvo / Título Profissional *
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.targetTitle}
                onChange={e => updatePersonalInfo('targetTitle', e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack Sênior / Analista Financeiro Pleno"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                E-mail Profissional *
              </label>
              <input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={e => updatePersonalInfo('email', e.target.value)}
                placeholder="seu.nome@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={e => updatePersonalInfo('phone', e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Cidade e Estado (UF) *
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.location}
                onChange={e => updatePersonalInfo('location', e.target.value)}
                placeholder="São Paulo, SP"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                LinkedIn (opcional)
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/seuperfil"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Accordion 2: Resumo Profissional */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('summary')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">2. Resumo / Perfil Profissional</h3>
              <p className="text-[11px] text-slate-400">Apresentação concisa com palavras-chave de impacto</p>
            </div>
          </div>
          {activeAccordion === 'summary' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'summary' && (
          <div className="p-5 pt-2 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-300">
                Breve síntese de sua trajetória e especialidades
              </label>
              <span className="text-[11px] text-slate-400">
                A VG IA refinará este texto automaticamente
              </span>
            </div>
            <textarea
              rows={4}
              value={resumeData.summary}
              onChange={e => onChange({ ...resumeData, summary: e.target.value })}
              placeholder="Descreva em poucas linhas sua experiência, principais ferramentas que domina e resultados alcançados. (Se deixar em branco ou resumido, a VG IA elaborará um texto completo)."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Accordion 3: Experiências Profissionais */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('experience')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">3. Experiência Profissional</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold border border-white/10">
                  {resumeData.experiences.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Cargos, empresas e conquistas mensuráveis</p>
            </div>
          </div>
          {activeAccordion === 'experience' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'experience' && (
          <div className="p-5 pt-2 border-t border-white/10 space-y-5">
            {resumeData.experiences.map((exp, index) => (
              <div key={exp.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 relative shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">
                    Experiência #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                    title="Remover experiência"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Cargo / Função *</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={e => updateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Ex: Analista de Operações"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Empresa *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Ex: Nome da Empresa LTDA"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Início *</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Ex: Jan 2022"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Término</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Atual' : exp.endDate}
                      onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Ex: Fev 2024"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`current_${exp.id}`}
                    checked={exp.current}
                    onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`current_${exp.id}`} className="text-xs text-slate-300 cursor-pointer">
                    Trabalho atualmente nesta empresa
                  </label>
                </div>

                {/* Highlights / Bullet points */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-300">
                      Principais Conquistas & Responsabilidades:
                    </label>
                    <button
                      type="button"
                      onClick={() => addHighlight(exp.id)}
                      className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar item
                    </button>
                  </div>

                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={e => updateHighlight(exp.id, hIdx, e.target.value)}
                        placeholder="Ex: Liderou a implantação de novo processo que reduziu custos em 15%..."
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                      />
                      {exp.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(exp.id, hIdx)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-white/20 hover:border-blue-500 text-slate-300 hover:text-blue-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/[0.02]"
            >
              <Plus className="w-4 h-4" />
              Adicionar Outra Experiência
            </button>
          </div>
        )}
      </div>

      {/* Accordion 4: Formação Acadêmica */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('education')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">4. Formação Acadêmica</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold border border-white/10">
                  {resumeData.educations.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Graduação, pós-graduação ou cursos técnicos</p>
            </div>
          </div>
          {activeAccordion === 'education' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'education' && (
          <div className="p-5 pt-2 border-t border-white/10 space-y-4">
            {resumeData.educations.map((edu, index) => (
              <div key={edu.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 relative shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">
                    Formação #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Grau / Tipo de Curso *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Ex: Bacharelado / Tecnólogo / MBA"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Curso / Área de Estudo *</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={e => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Ex: Administração de Empresas"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Instituição de Ensino *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Ex: Universidade de São Paulo (USP)"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Ano de Conclusão ou Previsão</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={e => updateEducation(edu.id, 'endDate', e.target.value)}
                      placeholder="Ex: 2024"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-white/20 hover:border-amber-500 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/[0.02]"
            >
              <Plus className="w-4 h-4" />
              Adicionar Outra Formação
            </button>
          </div>
        )}
      </div>

      {/* Accordion 5: Competências & Habilidades */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('skills')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">5. Habilidades & Palavras-Chave ATS</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold border border-white/10">
                  {resumeData.skills.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Hard skills, softwares e soft skills essenciais</p>
            </div>
          </div>
          {activeAccordion === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'skills' && (
          <div className="p-5 pt-2 border-t border-white/10 space-y-4">
            
            {/* Input field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(skillInput);
                  }
                }}
                placeholder="Digite uma competência e tecle Enter (Ex: Excel Avançado, Liderança, SQL)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(skillInput)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold transition-all active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Adicionar
              </button>
            </div>

            {/* Current Active Skills Chips */}
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-blue-300 text-xs font-medium group backdrop-blur-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Suggestions Pills by Category */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Sugestões rápidas por área profissional:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(COMMON_SKILL_SUGGESTIONS).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMMON_SKILL_SUGGESTIONS[selectedCategory]?.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAddSkill(sug)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 border border-white/10 hover:border-blue-500/30 text-[11px] transition-all flex items-center gap-1"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Accordion 6: Idiomas & Certificações */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('languages')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">6. Idiomas & Cursos / Certificações</h3>
              <p className="text-[11px] text-slate-400">Fluência linguística e credenciais relevantes</p>
            </div>
          </div>
          {activeAccordion === 'languages' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'languages' && (
          <div className="p-5 pt-2 border-t border-white/10 space-y-5">
            
            {/* Languages Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300">Idiomas:</h4>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar Idioma
                </button>
              </div>

              {(resumeData.languages || []).map(lang => (
                <div key={lang.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={e => updateLanguage(lang.id, 'language', e.target.value)}
                    placeholder="Ex: Inglês / Espanhol"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={e => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Fluente">Fluente</option>
                    <option value="Nativo">Nativo</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Certifications Section */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300">Cursos & Certificados:</h4>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar Certificado
                </button>
              </div>

              {(resumeData.certifications || []).map(cert => (
                <div key={cert.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={e => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="Nome do Curso/Certificado"
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={e => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Instituição (Ex: Google, SEBRAE)"
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={e => updateCertification(cert.id, 'date', e.target.value)}
                      placeholder="Ano (Ex: 2023)"
                      className="w-24 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* Accordion 7: Calibração de Vaga ATS */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-md overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleAccordion('job')}
          className="w-full p-4.5 flex items-center justify-between text-left hover:bg-blue-500/15 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-sm">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">7. Calibração Direta para a Vaga de Interesse</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-extrabold uppercase border border-blue-500/30">
                  Recomendado
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Cole os requisitos da vaga para a IA calibrar as palavras-chave</p>
            </div>
          </div>
          {activeAccordion === 'job' ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
        </button>

        {activeAccordion === 'job' && (
          <div className="p-5 pt-2 border-t border-blue-500/20 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Cole abaixo a descrição do anúncio de emprego (requisitos, atribuições ou texto da vaga da Gupy/LinkedIn). A VG IA usará essas diretrizes para enriquecer as palavras-chave do seu currículo e gerar a carta de apresentação sob medida.
            </p>
            <textarea
              rows={4}
              value={resumeData.targetJobDescription || ''}
              onChange={e => onChange({ ...resumeData, targetJobDescription: e.target.value })}
              placeholder="Cole aqui os requisitos ou a descrição da vaga..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500/50 leading-relaxed backdrop-blur-sm"
            />
          </div>
        )}
      </div>

      {/* Main Bottom Generation CTA */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isGenerating}
          onClick={onSubmitGenerate}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-blue-500/25 active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Otimizando e Gerando com VG IA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Gerar & Otimizar Currículo Profissional</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2.5">
          Formatação automatizada para normas de recrutamento e sistemas ATS.
        </p>
      </div>

    </div>
  );
};
