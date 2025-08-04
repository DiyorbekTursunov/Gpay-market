import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import type { OrderFormProps } from "../../../types";
import "./SecoundProfileForm.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { prevStep, nextStep } from "../../../store/slices/profileFlowSlice";
import { useParams } from "react-router-dom";
import { resetSteamAccount } from "../../../store/slices/gameSessionSlice";

interface SecoundProfileFormProps extends OrderFormProps {
  onConfirmAccount?: () => Promise<void>;
  onChangeAccount?: () => Promise<void>;
}

const SecoundProfileForm: React.FC<SecoundProfileFormProps> = ({
  isLoading,
  error,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [timeLeft, setTimeLeft] = useState<number>(119);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleConfirmAccount = async () => {
    console.log("Confirming account...");
    dispatch(nextStep());
  };

  const handleChangeAccount = async () => {
    dispatch(prevStep());
    dispatch(resetSteamAccount(id || ""));
    console.log("Changing account...");
  };

  return (
    <form className="secound-order-form">
      <Button
        text={
          t("Это мой аккаунт") +
          ` ${Math.floor(timeLeft / 60)} мин ${timeLeft % 60} с`
        }
        type="button"
        onClick={handleConfirmAccount}
        isLoading={isLoading}
        disabled={isLoading || timeLeft === 0}
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
