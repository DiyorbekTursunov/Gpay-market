import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileRight from "../../components/ProfileRightPages/ProfileRight/ProfileRight";
import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import "./ProfilePage.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const ProfilePage: React.FC = () => {

  const { t } = useTranslation();
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="profile">
      {/* Mobile header - hidden on desktop */}
      <div className="profile__header ">
        <img className="profile__logo" src={logo} alt="game logo" />
        <p className="profile__header__text">{t("profilePage.headerText")}</p>
      </div>

      {/* Desktop logo - hidden on mobile */}
      <img className="profile__logo mobile_hidden" src={logo} alt="game logo" />

      <div className="profile__container">
        <ProfileLeft
          imgSrc={images[currentImageIndex]}
          title="Command & Conquer™ Red Alert™ 3- Uprising"
          orderId="99999999"
          dlcLabel="DLC"
          activationTime="00:00:00"
        />

        <ProfileRight />
      </div>
    </div>
  );
};

export default ProfilePage;
