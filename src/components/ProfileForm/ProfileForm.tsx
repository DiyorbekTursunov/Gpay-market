import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../UI';
import { OrderFormProps, OrderFormData } from '../../types';
import './ProfileForm.scss';

const ProfileForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading, error }) => {
  const { t } = useTranslation();
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


  return (
    <form className="order-form" onSubmit={handleSubmit}>


      <Input
        value={formData.code}
        onChange={handleCodeChange}
        placeholder={t('profileForm.placeholder')}
        fullWidth
        size="medium"
        required
        name="code"
        id="order-code"
        autoComplete="off"
      />

      <Button
        text={t('profileForm.submitButton')}
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="primary"
        size="medium"
      />

      {error && <div className="order-form__error">{t('profileForm.robotError')}</div>}
    </form>
  );
};

export default ProfileForm;
