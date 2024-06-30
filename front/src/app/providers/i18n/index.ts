import { createI18n } from 'vue-i18n';

import { ru } from '@/shared';

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  useScope: 'global',
  messages: {
    ru,
  },
});
