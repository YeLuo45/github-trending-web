import { useEffect, useRef, type ReactNode } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function MobileDrawer({ isOpen, onClose, title, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 md:hidden"
      onClick={handleBackdropClick}
    >
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-github-card border-t border-github-border rounded-t-2xl overflow-auto animate-slide-up"
      >
        {/* Handle bar */}
        <div className="sticky top-0 bg-github-card px-4 py-3 border-b border-github-border flex items-center justify-between">
          <div className="w-12 h-1 bg-github-border rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <h3 className="text-lg font-semibold text-github-text">{title}</h3>
          <button
            onClick={onClose}
            className="text-github-muted hover:text-github-text text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// Header nav items for mobile drawer
interface MobileNavItem {
  icon: string;
  label: string;
  badge?: number;
  onClick: () => void;
}

export function MobileDrawerNav({ items, isOpen, onClose, title }: {
  items: MobileNavItem[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) {
  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose} title={title || 'Menu'}>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 bg-github-dark border border-github-border rounded-lg hover:border-github-purple/50 transition-colors text-left"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-github-text flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-github-purple text-white">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </MobileDrawer>
  );
}
