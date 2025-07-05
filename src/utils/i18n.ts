import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EngTranslation } from "../translation/ru";
import { RuTranslation } from "../translation/eng";

const resources = {
    en: EngTranslation,
    ru: RuTranslation,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
