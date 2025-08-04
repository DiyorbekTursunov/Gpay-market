import type React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./SecondProfileLeft.scss";
import type { GameSessionInfo } from "../../service/api/api";
import { format } from "date-fns";

interface SecondProfileLeftProps {
  imgSrc: string;
  gameSession: GameSessionInfo;
}

const SecondProfileLeft: React.FC<SecondProfileLeftProps> = ({
  imgSrc,
  gameSession,
}) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<string>("");

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy, h:mm a");
    } catch {
      return "N/A";
    }
  };

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

  return (
    <div className="second-profile__left">
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={gameSession.itemName || ""}
        className="second-profile__left__img"
      />

      <h2 className="second-profile__left__title">{gameSession.itemName}</h2>

      {/* Order label (mobile/desktop) */}
      <p className="second-profile__left__row__text only_mobile">
        {t("profileLeft.orderLabel", { id: gameSession.id })}
      </p>

      <div className="second-profile__left__row">
        <p className="second-profile__left__row__text mobile_hidden">
          {t("profileLeft.orderLabel", { id: gameSession.id })}
        </p>

        {/* DLC badge */}
        {gameSession.isDlc && (
          <div className="second-profile__left__row__info">
            <span className="second-profile__left__row__info__text">DLC</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8.77778V8.78333M1 6C1 6.65661 1.12933 7.30679 1.3806 7.91342C1.63188 8.52005 2.00017 9.07124 2.46447 9.53553C2.92876 9.99983 3.47996 10.3681 4.08658 10.6194C4.69321 10.8707 5.34339 11 6 11C6.65661 11 7.30679 10.8707 7.91342 10.6194C8.52005 10.3681 9.07124 9.99983 9.53553 9.53553C9.99983 9.07124 10.3681 8.52005 10.6194 7.91342C10.8707 7.30679 11 6.65661 11 6C11 5.34339 10.8707 4.69321 10.6194 4.08658C10.3681 3.47996 9.99983 2.92876 9.53553 2.46447C9.07124 2.00017 8.52005 1.63188 7.91342 1.3806C7.30679 1.12933 6.65661 1 6 1C5.34339 1 4.69321 1.12933 4.08658 1.3806C3.47996 1.63188 2.92876 2.00017 2.46447 2.46447C2.00017 2.92876 1.63188 3.47996 1.3806 4.08658C1.12933 4.69321 1 5.34339 1 6Z"
                stroke="white"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.99978 6.83324C5.98955 6.65289 6.0382 6.4741 6.1384 6.3238C6.2386 6.1735 6.38493 6.05983 6.55534 5.9999C6.76416 5.92005 6.95159 5.79281 7.10288 5.62821C7.25417 5.46361 7.36518 5.26614 7.42718 5.05134C7.48919 4.83654 7.50049 4.61029 7.46019 4.39038C7.41989 4.17048 7.3291 3.96293 7.19496 3.78408C7.06082 3.60522 6.88699 3.45995 6.68717 3.35969C6.48734 3.25943 6.26697 3.20692 6.04341 3.2063C5.81984 3.20568 5.59919 3.25697 5.39881 3.35612C5.19843 3.45527 5.0238 3.59957 4.88867 3.77768"
                stroke="white"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Activation time badge with elapsed time */}
        <div className="second-profile__left__row__info">
          <span className="second-profile__left__row__info__text">
            {t("profileLeft.activationTimeLabel", {
              time: timeLeft,
            })}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8.77778V8.78333M1 6C1 6.65661 1.12933 7.30679 1.3806 7.91342C1.63188 8.52005 2.00017 9.07124 2.46447 9.53553C2.92876 9.99983 3.47996 10.3681 4.08658 10.6194C4.69321 10.8707 5.34339 11 6 11C6.65661 11 7.30679 10.8707 7.91342 10.6194C8.52005 10.3681 9.07124 9.99983 9.53553 9.53553C9.99983 9.07124 10.3681 8.52005 10.6194 7.91342C10.8707 7.30679 11 6.65661 11 6C11 5.34339 10.8707 4.69321 10.6194 4.08658C10.3681 3.47996 9.99983 2.92876 9.53553 2.46447C9.07124 2.00017 8.52005 1.63188 7.91342 1.3806C7.30679 1.12933 6.65661 1 6 1C5.34339 1 4.69321 1.12933 4.08658 1.3806C3.47996 1.63188 2.92876 2.00017 2.46447 2.46447C2.00017 2.92876 1.63188 3.47996 1.3806 4.08658C1.12933 4.69321 1 5.34339 1 6Z"
              stroke="white"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.99978 6.83324C5.98955 6.65289 6.0382 6.4741 6.1384 6.3238C6.2386 6.1735 6.38493 6.05983 6.55534 5.9999C6.76416 5.92005 6.95159 5.79281 7.10288 5.62821C7.25417 5.46361 7.36518 5.26614 7.42718 5.05134C7.48919 4.83654 7.50049 4.61029 7.46019 4.39038C7.41989 4.17048 7.3291 3.96293 7.19496 3.78408C7.06082 3.60522 6.88699 3.45995 6.68717 3.35969C6.48734 3.25943 6.26697 3.20692 6.04341 3.2063C5.81984 3.20568 5.59919 3.25697 5.39881 3.35612C5.19843 3.45527 5.0238 3.59957 4.88867 3.77768"
              stroke="white"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        {/* Time left badge (if you still need endDateTime countdown) */}
        {gameSession?.addedDateTime && (
          <div className="second-profile__left__row__info">
            <span className="second-profile__left__row__info__text">
              {t("profileLeft.timeLeftLabel")}: {timeLeft}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.13881 11.8889V11.8967M1 8C1 8.91925..."
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.84517 9C7.82909 8.75138..."
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom text (desktop only) */}
      <p className="second-profile__left__bottom__text mobile_hidden">
        {t("profilePage.headerText")}
      </p>
    </div>
  );
};

export default SecondProfileLeft;
