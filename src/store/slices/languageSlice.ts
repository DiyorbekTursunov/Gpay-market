import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LanguageCode = 'RU' | 'EN';

interface LanguageState {
  currentLanguage: LanguageCode;
  translations: Record<LanguageCode, Record<string, string>>;
}

const initialState: LanguageState = {
  currentLanguage: 'RU',
  translations: {
    RU: {
      'order.title': 'Введите уникальный код заказа',
      'order.placeholder': 'Введите уникальный код',
      'order.submit': 'Подтвердить',
      'order.loading': 'Загрузка...',
      'order.notRobot': 'Я не робот',
      'order.error': 'Произошла ошибка при отправке формы',
      'contact.title': 'Связаться с продавцом',
      'telegram.text': 'У нас раздачи игр! Подпишись',
      'validation.required': 'Поле обязательно для заполнения',
      'validation.minLength': 'Минимальная длина кода 6 символов',
      'validation.notRobot': 'Подтвердите, что вы не робот',
    },
    EN: {
      'order.title': 'Enter unique order code',
      'order.placeholder': 'Enter unique code',
      'order.submit': 'Confirm',
      'order.loading': 'Loading...',
      'order.notRobot': 'I am not a robot',
      'order.error': 'An error occurred while submitting the form',
      'contact.title': 'Contact seller',
      'telegram.text': 'We have game giveaways! Subscribe',
      'validation.required': 'Field is required',
      'validation.minLength': 'Minimum code length is 6 characters',
      'validation.notRobot': 'Please confirm you are not a robot',
    },
  },
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', action.payload);
      }
    },
    initializeLanguage: (state) => {
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageCode;
        if (savedLanguage && (savedLanguage === 'RU' || savedLanguage === 'EN')) {
          state.currentLanguage = savedLanguage;
        }
      }
    },
  },
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
