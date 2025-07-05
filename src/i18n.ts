// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ...existing code...
const resources = {
  en: {
    translation: {
      orderForm: {
        title: 'Enter unique order <br /> code',
        placeholder: 'Enter unique code',
        submitButton: 'Confirm',
        notRobotLabel: 'I am not a robot',
        robotError: 'Robot verification failed'
      },
      contactTitle: 'Contact the seller',
      telegramText: 'We have giveaways! Subscribe'
    }
  },
  ru: {
    translation: {
      orderForm: {
        title: 'Введите уникальный <br /> код заказа',
        placeholder: 'Введите уникальный код',
        submitButton: 'Подтвердить',
        notRobotLabel: 'Я не робот',
        robotError: 'Ошибка проверки робота'
      },
      contactTitle: 'Связаться с продавцом',
      telegramText: 'У нас раздачи игр! Подпишись'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
// ...existing code...

export default i18n;
