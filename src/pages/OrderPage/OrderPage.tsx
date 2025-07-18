import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import OrderForm from '../../components/OrderForm/OrderForm';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import TelegramLink from '../../components/TelegramLink/TelegramLink';
import logo from "../../assets/logo/logos.svg"

import { OrderFormData } from '../../types';
import './OrderPage.scss';
import { Link } from 'react-router-dom';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 2000));
      console.log('Form submitted:', data);
    } catch {
      setError(t('orderForm.robotError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="order-page">
      <div className="order-page__container">
        <div className="order-page__background" />

        <div className="order-page__logo">
          <img src={logo} alt="game logo" />
        </div>

        <div className="order-page__content">
          <OrderForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            error={error}
          />

          <Link to={"#"} className="order-page__contact-title default-hover-active">
            {t('contactTitle')}
          </Link>

          <div className="order-page__bottom">
            <LanguageSelector />

            <TelegramLink
              url="/"
              text={t('telegramText')}
              title={t('telegramText')}
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

        <Link to={"#"} className="order-page__contact-link">
          <h3>{t('contactTitle')}</h3>
        </Link>

        <div className="order-page__bottom">
          <LanguageSelector />

          <TelegramLink
            url="/"
            text={t('telegramText')}
            title={t('telegramText')}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
