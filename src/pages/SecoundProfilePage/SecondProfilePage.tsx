"use client";

import type React from "react";

import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileRight from "../../components/ProfileRightPages/ProfileRight/ProfileRight";
import type { GameSessionInfo } from "../../service/api/api";
import "./SecondProfilePage.scss";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

interface SecondProfilePageProps {
  gameSession: GameSessionInfo | null;
}

const SecondProfilePage: React.FC<SecondProfilePageProps> = ({
  gameSession,
}) => {
  const { t } = useTranslation();
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const error = useSelector((state: RootState) => state.error.message);

  const currentImage = useMemo(
    () => images[currentImageIndex],
    [images, currentImageIndex]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!gameSession) {
    return (
      <div className="profile">
        <div className="profile__header">
          <img
            className="profile__logo"
            src={logo || "/placeholder.svg"}
            alt="game logo"
          />
          <p className="profile__header__text">{t("profilePage.headerText")}</p>
        </div>
        <div className="loading-message">Loading game session...</div>
      </div>
    );
  }

  return (
    <div className="profile">
      {/* Mobile header - hidden on desktop */}
      <div className="profile__header">
        <img
          className="profile__logo"
          src={logo || "/placeholder.svg"}
          alt="game logo"
        />
        {gameSession?.isDlc && !error  && (
          <p className="profile__header__text">{t("profilePage.headerText")}</p>
        )}

        {error && (
          <div className="secound-profile__error only_mobile">{error}</div>
        )}
      </div>

      {/* Desktop logo - hidden on mobile */}
      <img
        className="profile__logo mobile_hidden"
        src={logo || "/placeholder.svg"}
        alt="game logo"
      />

      <div className="profile__container">
        <ProfileLeft imgSrc={currentImage} gameSession={gameSession} />
        <ProfileRight />
      </div>
    </div>
  );
};

export default SecondProfilePage;
