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

        {/* Activation time badge with elapsed time */}
        <div className="second-profile__left__row__info">
          <span className="second-profile__left__row__info__text">
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

        {/* Time left badge (if you still need endDateTime countdown) */}
        {gameSession.endDateTime && (
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
