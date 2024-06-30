import { createI18n } from 'vue-i18n';

import { ru } from './ru';
import { en } from './en';

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
