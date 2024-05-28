
import { createContext, useContext, useState, ReactNode } from "react";
import enTranslations from './translation/en.json';
import uaTranslations from './translation/ua.json';

type Language = 'en' | 'ua';

interface LanguageContextProps {
  language: Language;
  translations: any;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ua' : 'en'));
  };

  const translations = language === 'en' ? enTranslations : uaTranslations;


  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
