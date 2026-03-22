import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import frCommon from '../locales/fr/common.json'
import enCommon from '../locales/en/common.json'
import ruCommon from '../locales/ru/common.json'
import frDashboard from '../locales/fr/dashboard.json'
import enDashboard from '../locales/en/dashboard.json'
import ruDashboard from '../locales/ru/dashboard.json'

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "fr",
        supportedLngs: ["fr", "en", "ru"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false
        },
        resources: {
            fr: {
                common: frCommon,
                dashboard: frDashboard
            },
            en: {
                common: enCommon,
                dashboard: enDashboard
            },
            ru: {
                common: ruCommon,
                dashboard: ruDashboard
            },
        }
    })

export default i18n