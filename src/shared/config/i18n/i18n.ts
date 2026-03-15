import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import frCommon from '../locales/fr/common.json'
import enCommon from '../locales/en/common.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "fr",
        supportedLngs: ["fr", "en", "ru"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false
        },
        resources: {
            fr: { common: frCommon },
            en: { common: enCommon },
        }
    })

export default i18n