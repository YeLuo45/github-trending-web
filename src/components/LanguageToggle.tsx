import { useI18n } from '../utils/i18n';

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-github-card border border-github-border rounded hover:border-github-purple/50 transition-colors"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span>{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
      <span className="text-github-muted text-xs">{language === 'zh' ? '中文' : 'EN'}</span>
    </button>
  );
}
