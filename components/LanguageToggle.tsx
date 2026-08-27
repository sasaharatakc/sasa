'use client';

import { Languages } from 'lucide-react';
import { useI18n, type Lang } from '@/lib/i18n';

/**
 * Segmented 日本語 / EN language switch. Japanese is the default; the choice
 * is persisted to localStorage by the i18n provider.
 */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n();

  const options: { value: Lang; label: string; full: string }[] = [
    { value: 'ja', label: '日本語', full: 'Japanese' },
    { value: 'en', label: 'EN', full: 'English' },
  ];

  return (
    <div
      role="group"
      aria-label="言語を切り替え / Switch language"
      className={`inline-flex items-center gap-1 rounded-full border border-teal/20 bg-white/70 p-0.5 backdrop-blur ${className}`}
    >
      <Languages
        size={15}
        className="ml-1.5 mr-0.5 text-teal-deep"
        aria-hidden="true"
      />
      {options.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            aria-label={opt.full}
            onClick={() => setLang(opt.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              active
                ? 'bg-teal text-white shadow-sm'
                : 'text-navy/60 hover:text-teal-deep'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
