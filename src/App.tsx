import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import OrderPage from './pages/OrderPage/OrderPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <OrderPage />
    </LanguageProvider>
  );
};

export default App;

