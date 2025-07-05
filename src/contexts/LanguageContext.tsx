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

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const { i18n } = useTranslation();

    const languages: LanguageOption[] = [
        { code: 'RU', label: 'Русский' },
        { code: 'EN', label: 'English' }
    ];

    const getInitialLanguage = () => {
        const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return savedLang ? savedLang : 'RU';
    };

    const [currentLanguage, setCurrentLanguage] = useState<string>(getInitialLanguage());

    useEffect(() => {
        // Update i18n language if currentLanguage changes
        const i18nLangCode = currentLanguage.toLowerCase();
        if (i18n.language !== i18nLangCode) {
            i18n.changeLanguage(i18nLangCode);
        }
        localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    }, [currentLanguage, i18n]);

    const changeLanguage = async (languageCode: string) => {
        try {
            setCurrentLanguage(languageCode);
            // i18n will be updated by useEffect
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
