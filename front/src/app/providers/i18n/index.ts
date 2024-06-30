import { createI18n } from 'vue-i18n';

import { en, ru } from '@/shared';

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  useScope: 'global',
  messages: {
    ru,
    en,
  },
});
