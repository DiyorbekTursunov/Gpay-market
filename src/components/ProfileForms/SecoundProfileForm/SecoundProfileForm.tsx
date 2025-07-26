import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import type { GameSessionInfo, OrderFormProps } from "../../../types";
import "./SecoundProfileForm.scss";
import { useDispatch } from "react-redux";
import { prevStep, nextStep } from "../../../store/slices/profileFlowSlice";
import { clearError, setError } from "../../../store/slices/errorSlice";
import { useParams } from "react-router-dom";
import { apiService, checkFriendResponse } from "../../../hooks/useApi";

interface SecoundProfileFormProps extends OrderFormProps {
  onConfirmAccount?: () => Promise<void>;
  onChangeAccount?: () => Promise<void>;
}

const SecoundProfileForm: React.FC<SecoundProfileFormProps> = ({
  isLoading,
  error,
  onConfirmAccount,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [localError, setLocalError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleConfirmAccount = async () => {
    dispatch(nextStep());
  };

  const handleChangeAccount = async () => {
    dispatch(prevStep());
    console.log("Changing account...");
  };

  return (
    <form className="secound-order-form">
      {localError && (
        <div className="secound-order-form__error">{localError}</div>
      )}

      <Button
        text={t("Это мой аккаунт 1 мин 59 с")}
        type="button"
        onClick={handleConfirmAccount}
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="primary"
        size="medium"
      />

      <Button
        text={t("Сменить аккаунт")}
        type="button"
        onClick={handleChangeAccount}
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="secondary"
        size="medium"
      />

      {error && (
        <div className="secound-order-form__error">
          {t("profileForm.robotError")}
        </div>
      )}
    </form>
  );
};

export default SecoundProfileForm;
