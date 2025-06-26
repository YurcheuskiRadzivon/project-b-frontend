import { createI18n } from 'vue-i18n'; // Импортируем createI18n вместо VueI18n
import en from '../locales/en.yml?raw'
import sw from '../locales/sw.yml?raw'
import yaml from 'js-yaml'
// Проверяем сохраненный язык в localStorage
const savedLocale = localStorage.getItem('locale');
const defaultLocale = savedLocale || 'en';

const parseYaml = (content) => yaml.load(content)
// Создаем экземпляр i18n с помощью createI18n
export const i18n = createI18n({
  legacy: false, // Важно для Vue 3!
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en: parseYaml(en),
    sw: parseYaml(sw)
  },
  silentTranslationWarn: true
});

// Глобальная функция для смены языка
export const changeLanguage = (locale) => {
  i18n.global.locale.value = locale; // Обратите внимание на .global и .value
  localStorage.setItem('locale', locale);
};