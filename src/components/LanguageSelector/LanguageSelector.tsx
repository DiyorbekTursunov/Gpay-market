import { useLanguage } from '../../contexts/LanguageContext';
import "./LanguageSelector.scss";

const LanguageSelector: React.FC = () => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    console.log('Switching to language:', languageCode);
    changeLanguage(languageCode);
  };

  return (
    <div className="language-selector">
      {languages.map((language) => (
        <div
          key={language.code}
          className={`language-selector__item ${
            currentLanguage === language.code ? 'active' : ''
          }`}
          onClick={() => handleLanguageChange(language.code)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLanguageChange(language.code);
            }
          }}
        >
          {language.code}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
