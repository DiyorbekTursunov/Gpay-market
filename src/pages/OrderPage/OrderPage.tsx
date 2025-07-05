// pages/OrderPage/OrderPage.tsx
import React, { useState } from 'react';
import OrderForm from '../../components/OrderForm/OrderForm';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import TelegramLink from '../../components/TelegramLink/TelegramLink';
import { OrderFormData, LanguageOption } from '../../types';
import './OrderPage.scss';

const OrderPage: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState<'RU' | 'EN'>('RU');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const languages: LanguageOption[] = [
    { code: 'RU', label: 'Русский' },
    { code: 'EN', label: 'English' },
  ];

  const handleFormSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      // Here you would make actual API call
    } catch (err) {
      setError('Произошла ошибка при отправке формы');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (language: 'RU' | 'EN') => {
    setActiveLanguage(language);
  };

  return (
    <section className="order-page">
      <div className="order-page__container">
        <div className="order-page__background"></div>

        <div className="order-page__logo">
          <img src="/img/logo/logos.svg" alt="game logo" />
        </div>

        <div className="order-page__content">
          <OrderForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            error={error}
          />

          <h3 className="order-page__contact-title">Связаться с продавцом</h3>

          <div className="order-page__bottom">
            <LanguageSelector
              languages={languages}
              activeLanguage={activeLanguage}
              onLanguageChange={handleLanguageChange}
            />

            <TelegramLink
              url="/"
              text="У нас раздачи игр! Подпишись"
              title="У нас раздачи игр! Подпишись"
            />
          </div>
        </div>
      </div>

      <div className="order-page__mobile-content">
        <OrderForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
        />

        <a className="order-page__contact-link" href="#">
          <h3>Связаться с продавцом</h3>
        </a>

        <div className="order-page__bottom">
          <LanguageSelector
            languages={languages}
            activeLanguage={activeLanguage}
            onLanguageChange={handleLanguageChange}
          />

          <TelegramLink
            url="/"
            text="У нас раздачи игр! Подпишись"
            title="У нас раздачи игр! Подпишись"
          />
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
