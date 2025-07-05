import React from 'react';
import { useLanguage } from '../../hooks/useLanguage.ts';
import { LanguageCode } from '../../store/slices/languageSlice.ts';
import './LanguageSelector.scss';

interface LanguageOption {
  code: LanguageCode;
  label: string;
}

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages: LanguageOption[] = [
    { code: 'RU', label: 'Русский' },
    { code: 'EN', label: 'English' },
  ];

  return (
    <div className="language-selector">
      {languages.map((language) => (
        <div
          key={language.code}
          className={`language-selector__item ${
            currentLanguage === language.code ? 'active' : ''
          }`}
          onClick={() => changeLanguage(language.code)}
        >
          {language.code}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
