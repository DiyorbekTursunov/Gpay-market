import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import "./ThirdProfileForm.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { prevStep } from "../../../store/slices/profileFlowSlice";
import { resetSteamAccount } from "../../../store/slices/gameSessionSlice";

export interface OrderFormProps {
  isLoading: boolean;
  error: string | boolean;
}

const ThirdProfileForm: React.FC<OrderFormProps> = ({ isLoading, error }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeAccount = async () => {
    dispatch(prevStep());
    dispatch(resetSteamAccount(id || ""));
    console.log("Changing account...");
  };

  return (
    <form className="third-order-form">
      <Button
        text={t("Сменить аккаунт")}
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="secondary"
        size="medium"
        onClick={handleChangeAccount}
      />

      {error && (
        <div className="third-order-form__error">
          {t("profileForm.robotError")}
        </div>
      )}

      <Link className="third-order-form__link default-hover-active" to={"#"}>
        Связаться c продавцом
      </Link>
    </form>
  );
};

export default ThirdProfileForm;
