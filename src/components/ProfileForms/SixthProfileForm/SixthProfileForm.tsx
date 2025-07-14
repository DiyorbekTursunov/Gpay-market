import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import { OrderFormProps, OrderFormData } from "../../../types";
import "./SixthProfileForm.scss";
import { Link } from "react-router-dom";

const SixthProfileForm: React.FC<OrderFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const { t } = useTranslation();
  const [formData] = useState<OrderFormData>({
    code: "",
    isNotRobot: false,
  });
  const [localError, setLocalError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // ✔️ Ensure at least 6 numeric digits
    if (!/^\d{6,}$/.test(formData.code)) {
      setLocalError(t("profileForm.codeLengthError"));
      return;
    }

    onSubmit(formData);
  };

  //   const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // clear local error as soon as user changes input
  //     if (localError) setLocalError("");
  //     setFormData((prev) => ({
  //       ...prev,
  //       code: e.target.value,
  //     }));
  //   };

  return (
    <form className="secound-order-form" onSubmit={handleSubmit}>
      {localError && (
        <div className="secound-order-form__error">{localError}</div>
      )}

      <Button
        text={t("Оставить отзыв")}
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="primary"
        size="medium"
      />

      <Button
        text={t("Главная")}
        type="submit"
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

      <Link className="secound-order-form__link" to={"#"}>
        Проверить версию издания
      </Link>

      <Link className="secound-order-form__link" to={"#"}>
        Посмотреть игру
      </Link>
    </form>
  );
};

export default SixthProfileForm;
