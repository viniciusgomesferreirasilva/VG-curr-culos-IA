import React, { useState } from 'react';
import { 
  History, FileText, Trash2, ArrowRight, Download, 
  Upload, Copy, CheckCircle2, Clock, Plus, Sparkles 
} from 'lucide-react';
import { ResumeData } from '../types';

interface HistorySectionProps {
  savedResumes: ResumeData[];
  onLoadResume: (data: ResumeData) => void;
  onDeleteResume: (id: string) => void;
  onImportResume: (data: ResumeData) => void;
  onStartNew: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  savedResumes,
  onLoadResume,
  onDeleteResume,
  onImportResume,
  onStartNew
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleExportJson = (resume: ResumeData) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `curriculo_${resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo) {
          onImportResume(parsed);
          alert('Currículo importado com sucesso!');
        } else {
          alert('O arquivo JSON não possui o formato de currículo esperado.');
        }
      } catch (err) {
        alert('Erro ao ler o arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Meu Histórico de Currículos Salvos
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Todos os currículos criados neste navegador ficam salvos localmente com segurança.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Importar JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={onStartNew}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo</span>
          </button>
        </div>
      </div>

      {/* Resumes List */}
      {savedResumes.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mx-auto backdrop-blur-sm">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Nenhum currículo salvo ainda</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Ao criar ou otimizar seu currículo na aba Gerador, clique em &ldquo;Salvar no Histórico&rdquo; para acessá-lo rapidamente a qualquer momento.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            Começar Meu Primeiro Currículo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedResumes.map((item, index) => {
            const itemKey = item.id ? `${item.id}-${index}` : `saved-resume-${index}-${item.personalInfo?.fullName || 'item'}`;
            return (
              <div
                key={itemKey}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 rounded-2xl p-5 space-y-4 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {item.personalInfo?.fullName || 'Sem Nome'}
                      </h3>
                      <p className="text-xs font-semibold text-blue-400 mt-0.5">
                        {item.personalInfo?.targetTitle || 'Cargo Não Especificado'}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-bold backdrop-blur-sm">
                      {(item.templateStyle || 'ats_classic').replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="line-clamp-2 text-slate-300">
                      {item.summary || 'Sem resumo cadastrado.'}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span>{(item.experiences || []).length} Experiências</span>
                      <span>•</span>
                      <span>{(item.skills || []).length} Competências</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('pt-BR') : 'Hoje'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleExportJson(item)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors backdrop-blur-sm"
                      title="Exportar JSON para backup"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteResume(item.id || itemKey)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors backdrop-blur-sm"
                      title="Excluir currículo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onLoadResume(item)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                  >
                    <span>Abrir no Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
