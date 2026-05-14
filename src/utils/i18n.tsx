import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'trending_dashboard_lang';

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Header
    'app.title': 'GitHub Trending',
    'app.subtitle': '热点项目分析报告',
    'app.lastUpdated': '最后更新',

    // Tabs
    'tab.weekly': '📈 本周增长',
    'tab.monthly': '🔥 本月最热',
    'tab.daily': '⚡ 今日趋势',

    // View modes
    'view.list': '📋 列表',
    'view.topic': '🏷 话题趋势',

    // Filter bar
    'filter.advanced': '高级筛选',
    'filter.keyword': '监控关键词...',
    'filter.clearAll': '清除全部',
    'filter.language': '语言',
    'filter.allLanguages': '全部语言',
    'filter.minStars': '最低 Stars',
    'filter.minGrowth': '最低增长',
    'filter.timeRange': '时间范围',
    'filter.allTime': '全部时间',
    'filter.today': '今日',
    'filter.thisWeek': '本周',
    'filter.thisMonth': '本月',
    'filter.unlimited': '不限',

    // Batch actions
    'batch.selectAll': '全选',
    'batch.deselectAll': '取消全选',
    'batch.selected': '已选择',
    'batch.items': '个项目',
    'batch.fork': '⎈ 批量 Fork',
    'batch.forking': '批量 Forking...',
    'batch.share': '🔗 生成分享',
    'batch.poster': '🖼️ 生成海报',

    // Project card
    'card.stars': '★',
    'card.forks': '⑂',
    'card.growth': '⬆',
    'card.fork': '⎈ Fork',
    'card.forking': 'Forking...',
    'card.favorite': '收藏',
    'card.unfavorite': '取消收藏',
    'card.follow': '关注',
    'card.following': '已关注',
    'card.comments': '💬 评论',
    'card.forkSuccess': 'Fork 成功！',
    'card.forkError': '❌',
    'card.openRepo': '打开仓库',

    // Settings
    'settings.title': '⚙️ 设置',
    'settings.token': 'GitHub Personal Access Token',
    'settings.tokenPlaceholder': '***',
    'settings.tokenHelp': '用于 Fork 功能，',
    'settings.createToken': '创建 Token',
    'settings.verified': '✓ 已验证',
    'settings.save': '保存',
    'settings.clear': '清除',
    'settings.validating': '验证中...',
    'settings.invalid': 'Token 无效',

    // Share modal
    'share.title': '🔗 分享链接已生成',
    'share.copyHelp': '复制以下链接分享给其他人：',
    'share.copy': '复制',
    'share.copied': '链接已复制到剪贴板',
    'share.storageNote': '分享数据存储在本地，接收方打开链接即可查看',

    // Fork history
    'history.title': '📋 Fork 历史',
    'history.empty': '暂无 Fork 记录',

    // Panel titles
    'panel.favorites': '⭐ 收藏夹',
    'panel.followed': '👁 关注的作者',
    'panel.recommendations': '🎯 智能推荐',
    'panel.topics': '🏷 话题追踪',
    'panel.reports': '📊 报告中心',
    'panel.notifications': '🔔 通知中心',
    'panel.comments': '💬 项目评论',

    // General
    'general.close': '×',
    'general.loading': '翻译中...',
    'general.noData': '暂无数据',
    'general.login': '未登录',
    'general.notLoggedIn': '请先在设置中配置 GitHub Token',

    // Export
    'export.title': '📥 导出数据',
    'export.csv': '导出 CSV',
    'export.md': '导出 Markdown',
    'export.exported': '导出成功',
  },
  en: {
    // Header
    'app.title': 'GitHub Trending',
    'app.subtitle': 'Trending Project Analysis',
    'app.lastUpdated': 'Last updated',

    // Tabs
    'tab.weekly': '📈 Weekly Growth',
    'tab.monthly': '🔥 Monthly Hot',
    'tab.daily': '⚡ Daily Trend',

    // View modes
    'view.list': '📋 List',
    'view.topic': '🏷 Topic Trend',

    // Filter bar
    'filter.advanced': 'Advanced Filter',
    'filter.keyword': 'Monitor keyword...',
    'filter.clearAll': 'Clear all',
    'filter.language': 'Language',
    'filter.allLanguages': 'All languages',
    'filter.minStars': 'Min Stars',
    'filter.minGrowth': 'Min Growth',
    'filter.timeRange': 'Time Range',
    'filter.allTime': 'All time',
    'filter.today': 'Today',
    'filter.thisWeek': 'This week',
    'filter.thisMonth': 'This month',
    'filter.unlimited': 'Unlimited',

    // Batch actions
    'batch.selectAll': 'Select All',
    'batch.deselectAll': 'Deselect All',
    'batch.selected': 'Selected',
    'batch.items': 'items',
    'batch.fork': '⎈ Batch Fork',
    'batch.forking': 'Batch Forking...',
    'batch.share': '🔗 Generate Share',
    'batch.poster': '🖼️ Generate Poster',

    // Project card
    'card.stars': '★',
    'card.forks': '⑂',
    'card.growth': '⬆',
    'card.fork': '⎈ Fork',
    'card.forking': 'Forking...',
    'card.favorite': 'Favorite',
    'card.unfavorite': 'Unfavorite',
    'card.follow': 'Follow',
    'card.following': 'Following',
    'card.comments': '💬 Comments',
    'card.forkSuccess': 'Fork successful!',
    'card.forkError': '❌',
    'card.openRepo': 'Open repo',

    // Settings
    'settings.title': '⚙️ Settings',
    'settings.token': 'GitHub Personal Access Token',
    'settings.tokenPlaceholder': '***',
    'settings.tokenHelp': 'Used for Fork feature,',
    'settings.createToken': 'Create Token',
    'settings.verified': '✓ Verified',
    'settings.save': 'Save',
    'settings.clear': 'Clear',
    'settings.validating': 'Validating...',
    'settings.invalid': 'Invalid Token',

    // Share modal
    'share.title': '🔗 Share Link Generated',
    'share.copyHelp': 'Copy the link below to share:',
    'share.copy': 'Copy',
    'share.copied': 'Link copied to clipboard',
    'share.storageNote': 'Share data stored locally, recipient can view by opening link',

    // Fork history
    'history.title': '📋 Fork History',
    'history.empty': 'No fork records',

    // Panel titles
    'panel.favorites': '⭐ Favorites',
    'panel.followed': '👁 Followed Authors',
    'panel.recommendations': '🎯 Recommendations',
    'panel.topics': '🏷 Topic Tracking',
    'panel.reports': '📊 Reports',
    'panel.notifications': '🔔 Notifications',
    'panel.comments': '💬 Project Comments',

    // General
    'general.close': '×',
    'general.loading': 'Translating...',
    'general.noData': 'No data available',
    'general.login': 'Not logged in',
    'general.notLoggedIn': 'Please configure GitHub Token in Settings',

    // Export
    'export.title': '📥 Export Data',
    'export.csv': 'Export CSV',
    'export.md': 'Export Markdown',
    'export.exported': 'Export successful',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') return stored;
    return window.matchMedia('(prefers-language: zh)').matches ? 'zh' : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
