import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import SecoundProfileForm from "../../ProfileForms/SecoundProfileForm/SecoundProfileForm";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";
import TelegramLink from "../../TelegramLink/TelegramLink";
import type { OrderFormData } from "../../../types";
import { Link } from "react-router-dom";
import questionImg from "../../../assets/background/question.png";
import type { GameSessionInfo } from "../../../service/api/api";
import type { RootState } from "../../../store";
import { setError, clearError } from "../../../store/slices/errorSlice";
import "./SecoundProfileRight.scss";

interface SecoundProfileRightProps {
  gameSession: GameSessionInfo;
  onConfirmSending?: () => Promise<void>;
  onResetSteamAccount?: () => Promise<void>;
  isLoading?: boolean;
}

const SecoundProfileRight: React.FC<SecoundProfileRightProps> = ({
  gameSession,
  onConfirmSending,
  onResetSteamAccount,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error.message);

  const handleConfirmAccount = async () => {
    dispatch(clearError());
    try {
      if (onConfirmSending) {
        await onConfirmSending();
      }
    } catch (err: any) {
      dispatch(
        setError({
          message: err.message || t("orderForm.robotError"),
          code: "CONFIRM_ACCOUNT_ERROR",
        })
      );
    }
  };

  const handleChangeAccount = async () => {
    dispatch(clearError());
    try {
      if (onResetSteamAccount) {
        await onResetSteamAccount();
      }
    } catch (err: any) {
      dispatch(
        setError({
          message: err.message || t("orderForm.robotError"),
          code: "CHANGE_ACCOUNT_ERROR",
        })
      );
    }
  };

  const handleFormSubmit = async (data: OrderFormData) => {
    console.log("Form submitted:", data);
    dispatch(clearError()); // Optionally clear error on form submit
  };

  return (
    <>
      <div className="mobile-second-profile__left only_mobile">
        <img
          width={93}
          height={93}
          src={gameSession.steamProfileAvatarUrl || questionImg}
          alt="Steam Profile Avatar"
        />

        <div className="second-profile__left__row">
          {gameSession?.isDlc && (
            <div className="profile__left__row__info">
              <span className="profile__left__row__info__text">DLC</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.13881 11.8889V11.8967M1 8C1 8.91925 1.18465 9.82951 1.54341 10.6788C1.90217 11.5281 2.42801 12.2997 3.09091 12.9497C3.75381 13.5998 4.54079 14.1154 5.40691 14.4672C6.27303 14.8189 7.20133 15 8.13881 15C9.07629 15 10.0046 14.8189 10.8707 14.4672C11.7368 14.1154 12.5238 13.5998 13.1867 12.9497C13.8496 12.2997 14.3755 11.5281 14.7342 10.6788C15.093 9.82951 15.2776 8.91925 15.2776 8C15.2776 7.08075 15.093 6.1705 14.7342 5.32122C14.3755 4.47194 13.8496 3.70026 13.1867 3.05025C12.5238 2.40024 11.7368 1.88463 10.8707 1.53284C10.0046 1.18106 9.07629 1 8.13881 1C7.20133 1 6.27303 1.18106 5.40691 1.53284C4.54079 1.88463 3.75381 2.40024 3.09091 3.05025C2.42801 3.70026 1.90217 4.47194 1.54341 5.32122C1.18465 6.1705 1 7.08075 1 8Z"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.84517 9C7.82909 8.75138 7.90557 8.5049 8.06307 8.2977C8.22057 8.0905 8.45058 7.9338 8.71844 7.85119C9.04668 7.7411 9.3413 7.5657 9.57911 7.33878C9.81692 7.11187 9.99143 6.83964 10.0889 6.54353C10.1863 6.24741 10.2041 5.9355 10.1408 5.63235C10.0774 5.32919 9.9347 5.04307 9.72385 4.79651C9.513 4.54995 9.23977 4.34968 8.92566 4.21146C8.61156 4.07325 8.26517 4.00086 7.91375 4.00001C7.56233 3.99915 7.21548 4.06985 6.90051 4.20653C6.58554 4.34322 6.31104 4.54216 6.09863 4.78769"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div className="profile__left__row__info">
            <span className="profile__left__row__info__text">
              {gameSession.cantSwitchAccountTimer
                ? `${gameSession.cantSwitchAccountTimer}s`
                : "Ready"}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.13881 11.8889V11.8967M1 8C1 8.91925 1.18465 9.82951 1.54341 10.6788C1.90217 11.5281 2.42801 12.2997 3.09091 12.9497C3.75381 13.5998 4.54079 14.1154 5.40691 14.4672C6.27303 14.8189 7.20133 15 8.13881 15C9.07629 15 10.0046 14.8189 10.8707 14.4672C11.7368 14.1154 12.5238 13.5998 13.1867 12.9497C13.8496 12.2997 14.3755 11.5281 14.7342 10.6788C15.093 9.82951 15.2776 8.91925 15.2776 8C15.2776 7.08075 15.093 6.1705 14.7342 5.32122C14.3755 4.47194 13.8496 3.70026 13.1867 3.05025C12.5238 2.40024 11.7368 1.88463 10.8707 1.53284C10.0046 1.18106 9.07629 1 8.13881 1C7.20133 1 6.27303 1.18106 5.40691 1.53284C4.54079 1.88463 3.75381 2.40024 3.09091 3.05025C2.42801 3.70026 1.90217 4.47194 1.54341 5.32122C1.18465 6.1705 1 7.08075 1 8Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.84517 9C7.82909 8.75138 7.90557 8.5049 8.06307 8.2977C8.22057 8.0905 8.45058 7.9338 8.71844 7.85119C9.04668 7.7411 9.3413 7.5657 9.57911 7.33878C9.81692 7.11187 9.99143 6.83964 10.0889 6.54353C10.1863 6.24741 10.2041 5.9355 10.1408 5.63235C10.0774 5.32919 9.9347 5.04307 9.72385 4.79651C9.513 4.54995 9.23977 4.34968 8.92566 4.21146C8.61156 4.07325 8.26517 4.00086 7.91375 4.00001C7.56233 3.99915 7.21548 4.06985 6.90051 4.20653C6.58554 4.34322 6.31104 4.54216 6.09863 4.78769"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="second-profile__left__title">{gameSession?.itemName}</h2>

        <p className="second-profile__left__row__text">
          {t("profileLeft.orderLabel", { id: gameSession?.id })}
        </p>

        <p className="second-profile__left__row__text__2">
          Steam никнейм покупателя. Проверьте перед покупкой!
        </p>

        <Link
          className="second-profile__left__row__text__link"
          to={gameSession.steamProfileUrl || "#"}
        >
          {gameSession.steamProfileUrl || "No profile URL"}
        </Link>
      </div>

      <div className="secound-profile__right">
        {error && <div className="secound-profile__error">{error}</div>}
        <h1 className="secound-profile__right__title mobile_hidden">
          {t("Проверка профеля")}
        </h1>

        <div className="desctop-second-profile__left mobile_hidden">
          <div className="flex-center">
            <img
              width={150}
              height={150}
              src={gameSession.steamProfileAvatarUrl || questionImg}
              alt="Steam Profile Avatar"
            />

            <p className="desctop-second-profile__left__row__text__2">
              Steam никнейм покупателя. Проверьте перед покупкой!
            </p>

            <Link
              className="desctop-second-profile__left__row__text__link"
              to={gameSession.steamProfileUrl || "#"}
            >
              {gameSession.steamProfileUrl || "No profile URL"}
            </Link>
          </div>
        </div>

        <SecoundProfileForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
          onConfirmAccount={handleConfirmAccount}
          onChangeAccount={handleChangeAccount}
        />

        <div className="order-page__bottom">
          <LanguageSelector />
          <TelegramLink
            url="/"
            text={t("telegramText")}
            title={t("telegramText")}
          />
        </div>
      </div>
    </>
  );
};

export default SecoundProfileRight;
