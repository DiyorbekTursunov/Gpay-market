import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import "./FourthProfileForm.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { prevStep } from "../../../store/slices/profileFlowSlice";
import { resetSteamAccount } from "../../../store/slices/gameSessionSlice";

export interface OrderFormProps {
  isLoading: boolean;
  error: string | boolean;
}

const FourthProfileForm: React.FC<OrderFormProps> = ({ isLoading, error }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeAccount = async () => {
    dispatch(prevStep());
    dispatch(resetSteamAccount(id || ""));
    console.log("Changing account...");
  };

  return (
    <form className="secound-order-form">
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
        <div className="secound-order-form__error">
          {t("profileForm.robotError")}
        </div>
      )}

      <Link className="secound-order-form__link" to={"#"}>
        Связаться c продавцом
      </Link>
    </form>
  );
};

export default FourthProfileForm;
