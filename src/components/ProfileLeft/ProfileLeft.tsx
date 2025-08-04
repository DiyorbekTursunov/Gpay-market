import type React from "react";
import { useTranslation } from "react-i18next";
import "./ProfileLeft.scss";
import type { GameSessionInfo } from "../../service/api/api";
import Explanation from "../Explanation/Explanation";
import { useEffect, useState } from "react";

interface ProfileLeftProps {
  imgSrc: string;
  gameSession: GameSessionInfo;
}

const ProfileLeft: React.FC<ProfileLeftProps> = ({ imgSrc, gameSession }) => {
  const { t } = useTranslation();
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

  return (
    <div className="profile__left">
      <img
        src={imgSrc || "/placeholder.svg"}
        alt=""
        className="profile__left__img"
      />
      <h2 className="profile__left__title">{gameSession?.itemName}</h2>

      {/* Order label (mobile/desktop) */}
      <p className="profile__left__row__text only_mobile">
        {t("profileLeft.orderLabel", { id: gameSession?.id })}
      </p>

      <div className="profile__left__row">
        <p className="profile__left__row__text mobile_hidden">
          {t("profileLeft.orderLabel", { id: gameSession?.id })}
        </p>

        {/* DLC badge */}
        {gameSession?.isDlc || (
          <div className="profile__left__row__info">
            <span className="profile__left__row__info__text">DLC</span>
            <Explanation
              text="Дополнение к основной игре"
              className="profile__left__row__info__explanation"
            />
          </div>
        )}

        {/* Activation time badge */}
        <div className="profile__left__row__info">
          <span className="profile__left__row__info__text">
            {t("profileLeft.activationTimeLabel", {
              time: timeLeft,
            })}
          </span>
          <Explanation
            text="По истечению времени — заказ будет получить невозможно. Либо потребуется доплата, либо изменятся условия заказа, возможно сейчас товар находится на распродаже"
            className="profile__left__row__info__explanation_activation"
          />
        </div>
      </div>

      {/* Bottom text (desktop only) */}
      {gameSession?.isDlc && (
        <p className="profile__left__bottom__text mobile_hidden">
          {t("profilePage.headerText")}
        </p>
      )}
    </div>
  );
};

export default ProfileLeft;
