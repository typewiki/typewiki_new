import i18n from 'i18next';
import { app, remote } from 'electron';
import { initReactI18next } from 'react-i18next';

const detectedLang = (app || remote.app).getLocale();

const config: LocalConfig = {
  fallbackLng: 'en',
  languages: {
    en: 'English',
    ru: 'Español',
  },
};

const resources = Object.keys(config.languages).reduce(
  (acc: { [key: string]: any }, lang) => {
    acc[lang] = {
      translation: require(`../../mediawiki/languages/i18n/${lang}.json`),
    };
    return acc;
  },
  Object,
);

const whitelist = Object.keys(config.languages).reduce((acc: string[], lang) => {
  acc.push(lang);

  if (lang.includes('-')) {
    acc.push(lang.substring(0, lang.indexOf('-')));
  }

  return acc;
}, []);

i18n.use(initReactI18next).init({
  lng: detectedLang || 'ru',
  resources,
  whitelist,
  fallbackLng: config.fallbackLng,
  debug: process.env.NODE_ENV !== 'production',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
