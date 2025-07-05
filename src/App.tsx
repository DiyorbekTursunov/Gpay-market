// src/App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './hooks/redux';
import { initializeLanguage } from './store/slices/languageSlice.ts';
import OrderPage from './pages/OrderPage/OrderPage';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeLanguage());
  }, [dispatch]);

  return (
    <div className="app">
      <OrderPage />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
