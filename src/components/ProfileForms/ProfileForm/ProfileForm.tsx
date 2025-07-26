import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input } from "../../UI";
import type { OrderFormProps, OrderFormData } from "../../../types";
import type { GameSessionInfo } from "../../../types";
import { apiService } from "../../../service/api/api";
import { nextStep } from "../../../store/slices/profileFlowSlice";
import { setError, clearError } from "../../../store/slices/errorSlice";
import "./ProfileForm.scss";

interface ProfileFormProps extends OrderFormProps {
  uniqueCode?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<OrderFormData>({
    code: "",
    isNotRobot: true,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setIsSubmitting(true);

    if (!id) {
      dispatch(
        setError({
          message:
            t("profileForm.missingUniqueCodeError") ||
            "Unique code is missing.",
          code: "MISSING_ID",
        })
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response: GameSessionInfo = await apiService.changeSteamContact(
        id,
        formData.code
      );
      console.log("API response:", response);

      if (response.steamProfileUrl) {
        dispatch(nextStep());
      } else {
        dispatch(
          setError({
            message: t("profileForm.apiError"),
            code: "API_ERROR",
          })
        );
        setIsError(true);
      }
    } catch (err) {
      dispatch(
        setError({
          message: t("profileForm.apiError"),
          code: "API_ERROR",
        })
      );
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      code: e.target.value,
    }));
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <Input
        value={formData.code}
        onChange={handleCodeChange}
        placeholder={t("profileForm.placeholder")}
        fullWidth
        size="medium"
        required
        name="code"
        id="order-code"
        autoComplete="off"
        error={isError}
      />
      <Button
        text={t("profileForm.submitButton")}
        type="submit"
        isLoading={isLoading || isSubmitting}
        disabled={isLoading || isSubmitting}
        fullWidth
        variant="primary"
        size="medium"
      />
    </form>
  );
};

export default ProfileForm;
