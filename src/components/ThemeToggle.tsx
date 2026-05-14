import { useTheme } from '../utils/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const getIcon = () => {
    if (theme === 'system') return '🖥️';
    return resolvedTheme === 'dark' ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-2 bg-github-card border border-github-border rounded hover:border-github-purple/50 transition-colors"
      title={`Current: ${getLabel()} (click to cycle)`}
    >
      <span>{getIcon()}</span>
      <span className="text-github-muted text-xs">{getLabel()}</span>
    </button>
  );
}
