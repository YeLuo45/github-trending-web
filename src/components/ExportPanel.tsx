import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { exportToCSV, exportToMarkdown } from '../utils/dataExport';
import type { TrendingProject } from '../types';

interface ExportPanelProps {
  projects: TrendingProject[];
  onClose: () => void;
}

export function ExportPanel({ projects, onClose }: ExportPanelProps) {
  const { t } = useI18n();
  const [exported, setExported] = useState(false);

  const handleExportCSV = () => {
    exportToCSV(projects);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleExportMD = () => {
    exportToMarkdown(projects);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-github-card border border-github-border rounded-lg p-6 w-[400px] max-w-[90vw]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-github-text">{t('export.title')}</h2>
          <button onClick={onClose} className="text-github-muted hover:text-github-text text-2xl leading-none">×</button>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExportCSV}
            className="w-full flex items-center gap-3 px-4 py-3 bg-github-dark border border-github-border rounded-lg hover:border-github-purple/50 transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div className="text-left">
              <p className="text-github-text font-medium">{t('export.csv')}</p>
              <p className="text-github-muted text-xs">CSV format for spreadsheets</p>
            </div>
          </button>

          <button
            onClick={handleExportMD}
            className="w-full flex items-center gap-3 px-4 py-3 bg-github-dark border border-github-border rounded-lg hover:border-github-purple/50 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <div className="text-left">
              <p className="text-github-text font-medium">{t('export.md')}</p>
              <p className="text-github-muted text-xs">Markdown format for documentation</p>
            </div>
          </button>
        </div>

        {exported && (
          <p className="mt-4 text-center text-green-400 text-sm">
            ✓ {t('export.exported')}
          </p>
        )}

        <p className="mt-4 text-github-muted text-xs text-center">
          {projects.length} projects will be exported
        </p>
      </div>
    </div>
  );
}
