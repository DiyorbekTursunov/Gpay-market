import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageOption } from '../types';

interface LanguageContextType {
  currentLanguage: string;
  languages: LanguageOption[];
  changeLanguage: (languageCode: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();

  const languages: LanguageOption[] = [
    { code: 'RU', label: 'Русский' },
    { code: 'EN', label: 'English' }
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>('EN');

  useEffect(() => {
    // Set initial language from i18next
    const initialLang = i18n.language?.toUpperCase() || 'RU';
    setCurrentLanguage(initialLang);
  }, [i18n.language]);

  const changeLanguage = async (languageCode: string) => {
    try {
      setCurrentLanguage(languageCode);
      // Change i18next language - map to lowercase
      const i18nLangCode = languageCode.toLowerCase();
      await i18n.changeLanguage(i18nLangCode);
      console.log('Language changed to:', languageCode, 'i18n language:', i18n.language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      changeLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
