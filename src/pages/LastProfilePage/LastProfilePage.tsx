import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import "./LastProfilePage.scss";
import { useState, useEffect } from "react";
import SecondProfileLeft from "../../components/SecoundProfileLeft/SecondProfileLeft"; // Corrected typo
import SixthProfileRight from "../../components/ProfileRightPages/SixthProfileRight/SixthProfileRight";
import { Link } from "react-router-dom";

const LastProfilePage: React.FC = () => {
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="last-profile-bg">
      <div className="last-profile">
        {/* Mobile header - hidden on desktop */}
        <div className="last-profile__header">
          <img className="last-profile__logo" src={logo} alt="game logo" />

          <Link to={"/"} className="last-profile__header__close_button">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L1 13M1 1L13 13"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Desktop logo - hidden on mobile */}
        <img
          className="last-profile__logo mobile_hidden"
          src={logo}
          alt="game logo"
        />

        <div className="last-profile__container">
          <SecondProfileLeft // Corrected component name
            imgSrc={images[currentImageIndex]}
            title="Command & Conquer™ Red Alert™ 3- Uprising"
            orderId="99999999"
            dlcLabel="DLC"
            activationTime="00:00:00"
          />

          <SixthProfileRight
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

export default LastProfilePage;
