import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { DemoModal } from './components/DemoModal';
import { InterviewTrainer } from './components/InterviewTrainer';
import { AiAssistant } from './components/AiAssistant';
import { HistorySection } from './components/HistorySection';
import { AboutSection } from './components/AboutSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { DEMO_PROFILES } from './data/mockProfiles';
import { ResumeData, AtsAudit } from './types';
import { Sparkles, ArrowRight, ShieldCheck, FileCheck, CheckCircle2, PlayCircle } from 'lucide-react';

const STORAGE_KEY = 'vg_curriculos_saved_resumes';
const ACTIVE_RESUME_KEY = 'vg_curriculos_active_resume';

export default function App() {
  const [activeView, setActiveView] = useState<string>('generator');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditData, setAuditData] = useState<AtsAudit | null>(null);

  // Resume state - initialized with first demo profile or local storage
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const savedActive = localStorage.getItem(ACTIVE_RESUME_KEY);
      if (savedActive) {
        return JSON.parse(savedActive);
      }
    } catch (e) {
      console.error(e);
    }
    // Default to the first demo profile (Auxiliar Administrativo Júnior)
    return DEMO_PROFILES[0].data;
  });

  // Saved resumes history
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, idx) => ({
            ...item,
            id: item.id || `saved_resume_${Date.now()}_${idx}`
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [DEMO_PROFILES[0].data];
  });

  // Auto-save active resume
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_RESUME_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error(e);
    }
  }, [resumeData]);

  // Auto-save history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResumes));
    } catch (e) {
      console.error(e);
    }
  }, [savedResumes]);

  // Initial ATS Audit on first load
  useEffect(() => {
    runAudit(resumeData);
  }, []);

  const runAudit = async (currentResume: ResumeData) => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/ai-assistant/audit-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: currentResume })
      });
      const data = await res.json();
      if (data.success && data.audit) {
        setAuditData(data.audit);
      }
    } catch (e) {
      console.error('Failed to run ATS audit:', e);
    } finally {
      setIsAuditing(false);
    }
  };

  // Generate & Enhance with AI
  const handleGenerateResume = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });
      const result = await res.json();
      if (result.success && result.data) {
        const updated = {
          ...result.data,
          updatedAt: new Date().toISOString()
        };
        setResumeData(updated);
        // Trigger fresh ATS audit for the new enhanced resume
        await runAudit(updated);
        // Scroll smoothly to preview
        document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.error('Error generating resume:', e);
      alert('Houve uma falha ao conectar com o serviço de IA. Verifique sua conexão e tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save to history
  const handleSaveToHistory = (dataToSave: ResumeData) => {
    const resumeId = dataToSave.id || `resume_${Date.now()}`;
    const updated: ResumeData = {
      ...dataToSave,
      id: resumeId,
      updatedAt: new Date().toISOString()
    };
    const existingIndex = savedResumes.findIndex(r => r.id === resumeId);
    if (existingIndex >= 0) {
      const copy = [...savedResumes];
      copy[existingIndex] = updated;
      setSavedResumes(copy);
    } else {
      setSavedResumes([updated, ...savedResumes]);
    }
  };

  // Load from history
  const handleLoadResume = (data: ResumeData) => {
    const sanitized: ResumeData = {
      ...data,
      skills: Array.isArray(data.skills) ? data.skills : [],
      experiences: Array.isArray(data.experiences) ? data.experiences : [],
      educations: Array.isArray(data.educations) ? data.educations : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      personalInfo: {
        fullName: '',
        targetTitle: '',
        email: '',
        phone: '',
        location: '',
        ...(data.personalInfo || {})
      }
    };
    setResumeData(sanitized);
    setActiveView('generator');
    runAudit(sanitized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete from history
  const handleDeleteResume = (id: string) => {
    if (confirm('Tem certeza de que deseja remover este currículo do histórico?')) {
      setSavedResumes(savedResumes.filter(r => r.id !== id));
    }
  };

  // Import JSON
  const handleImportResume = (importedData: ResumeData) => {
    const sanitized: ResumeData = {
      ...importedData,
      id: `imported_${Date.now()}`,
      updatedAt: new Date().toISOString(),
      skills: Array.isArray(importedData.skills) ? importedData.skills : [],
      experiences: Array.isArray(importedData.experiences) ? importedData.experiences : [],
      educations: Array.isArray(importedData.educations) ? importedData.educations : [],
      languages: Array.isArray(importedData.languages) ? importedData.languages : [],
      certifications: Array.isArray(importedData.certifications) ? importedData.certifications : [],
      personalInfo: {
        fullName: '',
        targetTitle: '',
        email: '',
        phone: '',
        location: '',
        ...(importedData.personalInfo || {})
      }
    };
    setResumeData(sanitized);
    handleSaveToHistory(sanitized);
    setActiveView('generator');
    runAudit(sanitized);
  };

  // Reset to clean blank state
  const handleStartNew = () => {
    const blankResume: ResumeData = {
      id: `resume_${Date.now()}`,
      personalInfo: {
        fullName: '',
        targetTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: ''
      },
      summary: '',
      experiences: [],
      educations: [],
      skills: [],
      languages: [],
      certifications: [],
      templateStyle: 'modern_executive',
      fontFamily: 'plus_jakarta',
      updatedAt: new Date().toISOString()
    };
    setResumeData(blankResume);
    setActiveView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Frosted Glass Background Ambient Glowing Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none z-0 ambient-orb" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none z-0 ambient-orb" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0 ambient-orb" />
      
      {/* Top Header */}
      <Header
        activeView={activeView}
        onNavigate={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenAccessibility={() => setAccessibilityOpen(true)}
        savedCount={savedResumes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12 relative z-10">
        
        {/* VIEW 1: GENERATOR (FORM + LIVE A4 PREVIEW) */}
        {activeView === 'generator' && (
          <div className="space-y-10">
            
            {/* Banner Top Notice - Frosted Glass with Gradient Accent */}
            <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-500/10">
                  <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                      Criador de Currículos & Cartas de Apresentação com Inteligência Artificial
                    </h1>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase">
                      Padrão ATS 2026
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Preencha ou selecione um modelo pronto para gerar currículo A4, carta formal e diagnóstico de pontuação.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Modelos Prontos</span>
                </button>
              </div>
            </div>

            {/* Two Column Layout: Editor Form (Left) & Real-time Canvas (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Editor (5 cols on lg) */}
              <div id="form-container" className="lg:col-span-5 space-y-6">
                <ResumeForm
                  resumeData={resumeData}
                  onChange={(updated) => setResumeData(updated)}
                  onSubmitGenerate={handleGenerateResume}
                  isGenerating={isGenerating}
                  onLoadSample={() => setDemoModalOpen(true)}
                />
              </div>

              {/* Right Column: Live A4 Preview & Tools (7 cols on lg) */}
              <div id="preview-section" className="lg:col-span-7 space-y-6">
                <ResumePreview
                  resumeData={resumeData}
                  onUpdateResumeData={(updated) => setResumeData(updated)}
                  onSaveToHistory={handleSaveToHistory}
                  auditData={auditData}
                  isAuditing={isAuditing}
                  onReaudit={() => runAudit(resumeData)}
                />
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: MEU HISTÓRICO */}
        {activeView === 'meu-historico' && (
          <HistorySection
            savedResumes={savedResumes}
            onLoadResume={handleLoadResume}
            onDeleteResume={handleDeleteResume}
            onImportResume={handleImportResume}
            onStartNew={handleStartNew}
          />
        )}

        {/* VIEW 3: TREINADOR DE ENTREVISTAS */}
        {activeView === 'treinador-entrevistas' && (
          <InterviewTrainer />
        )}

        {/* VIEW 4: ASSISTENTE VG IA */}
        {activeView === 'assistente-ia' && (
          <AiAssistant />
        )}

        {/* VIEW 5: SOBRE NÓS */}
        {activeView === 'sobre' && (
          <AboutSection />
        )}

        {/* VIEW 6: VANTAGENS */}
        {activeView === 'vantagens' && (
          <BenefitsSection onStartGenerator={() => setActiveView('generator')} />
        )}

        {/* VIEW 7: DÚVIDAS / FAQ */}
        {activeView === 'faq' && (
          <FaqSection />
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={(viewId) => {
          setActiveView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Free Demo Picker Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSelectProfile={(profileData, title) => {
          setResumeData(profileData);
          handleSaveToHistory(profileData);
          runAudit(profileData);
          setActiveView('generator');
        }}
      />

      {/* Accessibility & Voice Screen Reader Menu */}
      <AccessibilityMenu
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
        onToggle={() => setAccessibilityOpen(prev => !prev)}
        activeView={activeView}
        activeResumeName={resumeData?.personalInfo?.fullName}
        activeResumeTitle={resumeData?.personalInfo?.targetTitle}
      />

    </div>
  );
}
