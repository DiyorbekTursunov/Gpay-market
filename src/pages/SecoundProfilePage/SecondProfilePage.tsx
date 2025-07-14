import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import "./SecondProfilePage.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import SecondProfileLeft from "../../components/SecoundProfileLeft/SecondProfileLeft"; // Corrected typo
import FifthProfileRight from "../../components/ProfileRightPages/FifthProfileRight/FifthProfileRight";

const SecondProfilePage: React.FC = () => {
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
    <div className="second-profile-bg">
      <div className="second-profile">
        {/* Mobile header - hidden on desktop */}
        <div className="second-profile__header">
          <img className="second-profile__logo" src={logo} alt="game logo" />
          <p className="second-profile__header__text">
            {t("profilePage.headerText")}
          </p>
        </div>

        {/* Desktop logo - hidden on mobile */}
        <img
          className="second-profile__logo mobile_hidden"
          src={logo}
          alt="game logo"
        />

        <div className="second-profile__container">
          <SecondProfileLeft // Corrected component name
            imgSrc={images[currentImageIndex]}
            title="Command & Conquer™ Red Alert™ 3- Uprising"
            orderId="99999999"
            dlcLabel="DLC"
            activationTime="00:00:00"
          />

          {/* <SecoundProfileRight
                title="Command & Conquer™ Red Alert™ 3- Up  rising"
                orderId="99999999"
                dlcLabel="DLC"
                activationTime="00:00:00"
            /> */}

          {/* <ThirdProfileRight
            title="Command & Conquer™ Red Alert™ 3- Uprising"
            orderId="99999999"
            dlcLabel="DLC"
            activationTime="00:00:00"
          /> */}

          {/* <FourthProfileRight
            title="Command & Conquer™ Red Alert™ 3- Uprising"
            orderId="99999999"
            dlcLabel="DLC"
            activationTime="00:00:00"
          /> */}

          <FifthProfileRight
            title="Command & Conquer™ Red Alert™ 3- Uprising"
            orderId="99999999"
            dlcLabel="DLC"
            activationTime="00:00:00"
          />

        </div>
      </div>
    </div>
  );
};

export default SecondProfilePage;
