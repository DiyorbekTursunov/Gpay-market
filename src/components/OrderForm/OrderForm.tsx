import { useState } from 'react';
import { OrderFormProps, OrderFormData } from '../../types';
import './OrderForm.scss';

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    code: '',
    isNotRobot: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      code: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isNotRobot: e.target.checked,
    }));
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2 className="order-form__title">Введите уникальный код заказа</h2>

      <input
        className="order-form__input"
        type="text"
        placeholder="Введите уникальный код"
        value={formData.code}
        onChange={handleCodeChange}
      />

      <button
        type="submit"
        className="order-form__button"
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Подтвердить'}
      </button>

      <div className="order-formcheckbox">
        <input
          className="order-formcheckbox-input"
          id="not-robot"
          type="checkbox"
          checked={formData.isNotRobot}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
        <label className="order-form__checkbox-label" htmlFor="not-robot">
          Я не робот
        </label>
      </div>

      {error && <div className="order-form__error">{error}</div>}
    </form>
  );
};

export default OrderForm;
