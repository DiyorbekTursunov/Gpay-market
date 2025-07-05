import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setLanguage, LanguageCode } from '../store/slices/languageSlice.ts';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const languageState = useSelector((state: RootState) => state.language);
  const { currentLanguage, translations } = languageState;

  const changeLanguage = (language: LanguageCode) => {
    dispatch(setLanguage(language));
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
};
