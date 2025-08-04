import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkOrderCode } from "../../../store/slices/gameSessionSlice"; // Adjust import path
import LanguageSelector from "../../LanguageSelector/LanguageSelector"; // Adjust import path
import TelegramLink from "../../TelegramLink/TelegramLink"; // Adjust import path
import { GameSessionInfo } from "../../../types"; // Adjust import path
import type { RootState } from "../../../store"; // Adjust import path
import "./ThirdProfileRight.scss"; // Adjust import path
import { Link } from "react-router-dom";
import ThirdProfileForm from "../../ProfileForms/ThirdProfileForm/ThirdProfileForm"; // Adjust import path
import questionImg from "../../../assets/background/question.png"; // Adjust import path
import { setStep } from "../../../store/slices/profileFlowSlice";
import { AppDispatch } from "../../../store/store";

// Define component props
interface ProfileRightProps {
  gameSession: GameSessionInfo;
  isLoading?: boolean;
}

const ThirdProfileRight: React.FC<ProfileRightProps> = ({
  gameSession,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.gameSession.error);
  const sellerId = useSelector(
    (state: RootState) => state.gameSession.sellerId
  );

  const [timeLeft, setTimeLeft] = useState<string>("");

  // Countdown timer logic - counts elapsed time from addedDateTime
  useEffect(() => {
    // Check if addedDateTime exists
    if (!gameSession.addedDateTime) {
      setTimeLeft("N/A");
      return;
    }

    const startTime = new Date(gameSession.addedDateTime).getTime();
    // Check if addedDateTime is valid
    if (isNaN(startTime)) {
      setTimeLeft("N/A");
      return;
    }

    // Set up the timer to update every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTime; // Calculate elapsed time instead of remaining time

      if (elapsed < 0) {
        // If somehow the added time is in the future, show 00:00:00
        setTimeLeft("00:00:00");
      } else {
        // Calculate hours, minutes, seconds from elapsed time
        const totalSeconds = Math.floor(elapsed / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Format as "00:00:00"
        const formattedTime = [
          String(hours).padStart(2, "0"),
          String(minutes).padStart(2, "0"),
          String(seconds).padStart(2, "0"),
        ].join(":");

        setTimeLeft(formattedTime);
      }
    }, 1000); // Updates every 1000ms (1 second)

    // Cleanup the interval when component unmounts or addedDateTime changes
    return () => clearInterval(timer);
  }, [gameSession.addedDateTime]);

  //   Polling effect: Check status every 3 seconds until statusId is 6 or an error occurs
  useEffect(() => {
    if (gameSession && gameSession.statusId !== 18 && !error) {
      const intervalId = setInterval(() => {
        if (gameSession.uniqueCode) {
          dispatch(
            checkOrderCode({ uniqueCode: gameSession.uniqueCode, sellerId })
          );
        }
      }, 3000); // Poll every 3 seconds

      // Cleanup interval on unmount or when conditions change
      return () => clearInterval(intervalId);
    }
  }, [gameSession, dispatch, sellerId, error]);

  //   Step-setting effect: Set step when statusId reaches 6
  useEffect(() => {
    if (gameSession?.statusId === 18) {
      if (gameSession?.queuePosition > 0) {
        dispatch(setStep(4));
      } else if (gameSession?.queuePosition <= 0) {
        dispatch(setStep(5));
      }
    }
  }, [gameSession, dispatch]);

  // Navigation effect: Redirect to error page if an error is detected
  useEffect(() => {
    if (error) {
      navigate(`/error/${encodeURIComponent(error)}`);
    }
  }, [error, navigate]);

  return (
    <>
      {/* Mobile view */}
      <div className="mobile-second-profile__left only_mobile">
        <img
          width={93}
          height={93}
          src={gameSession?.steamProfileAvatarUrl || questionImg}
          alt="Profile Avatar"
        />

        <div className="second-profile__left__row">
          {/* DLC Badge */}
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

          {/* Activation Time Badge */}
          <div className="profile__left__row__info">
            <span className="profile__left__row__info__text">
              {t("profileLeft.activationTimeLabel", {
                time: timeLeft,
              })}
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

        <p className="second-profile__left__row__text__2">
          <Link
            className="second-profile__left__row__text__link default-hover-active"
            target="_blank"
            to={gameSession?.steamProfileUrl || "#"}
          >
            {gameSession?.steamProfileUrl}
          </Link>
          Вам отправлен запрос на добавление друзья в Steam. Вам необходимо
          принять нашего бота с никнеймом “{gameSession?.botName}” в друзья.
          Далее вам отправят купленный товар.
        </p>
      </div>

      {/* Desktop view */}
      <div className="secound-profile__right">
        <h1 className="secound-profile__right__title mobile_hidden">
          {t("Проверка профиля")}
        </h1>

        <div className="desctop-second-profile__left">
          <img
            width={150}
            height={150}
            src={gameSession?.steamProfileAvatarUrl || questionImg}
            alt="Profile Avatar"
          />

          <p className="desctop-second-profile__left__row__text only_mobile">
            {t("profileLeft.orderLabel", { id: gameSession?.id })}
          </p>

          <p className="desctop-second-profile__left__row__text__2">
            Steam никнейм покупателя. Проверьте перед покупкой!
          </p>

          <p className="desctop-second-profile__left__row__text__2">
            <Link
              className="desctop-second-profile__left__row__text__link default-hover-active"
              to={gameSession?.steamProfileUrl || "#"}
            >
              {gameSession?.steamProfileUrl || ""}
            </Link>
            . <br />
            Вам отправлен запрос на добавление друзья в Steam. Вам необходимо
            принять нашего бота с никнеймом “{gameSession?.botName}” в друзья.
            Далее вам отправят купленный товар.
          </p>
        </div>

        <ThirdProfileForm isLoading={isLoading} error={error} />

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

export default ThirdProfileRight;
