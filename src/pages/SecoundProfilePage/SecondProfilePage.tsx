import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import "./SecondProfilePage.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SecondProfileLeft from "../../components/SecoundProfileLeft/SecondProfileLeft";
import SecoundProfileRight from "../../components/ProfileRightPages/SecoundProfileRight/SecoundProfileRight";
import ThirdProfileRight from "../../components/ProfileRightPages/ThirdProfileRight/ThirdProfileRight";
import FourthProfileRight from "../../components/ProfileRightPages/FourthProfileRight/FourthProfileRight";
import FifthProfileRight from "../../components/ProfileRightPages/FifthProfileRight/FifthProfileRight";
import { GameSessionInfo, CheckCodeResponse } from "../../types";

const SecondProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [gameSession, setGameSession] = useState<GameSessionInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post<CheckCodeResponse>(
          "https://gpay.market/home/checkCode",
          {},
          {
            params: {
              Uniquecode: id,
              Seller_id: "12345", // Replace with actual seller ID
              Captcha: "",
            },
          }
        );
        if (response.data.isCorrectCode && response.data.gameSession) {
          setGameSession(response.data.gameSession);
        } else {
          setError(t("Invalid order code"));
        }
      } catch (err: any) {
        setError(
          err.response?.status === 301
            ? t("API endpoint has moved. Please contact support.")
            : t("Failed to fetch order details")
        );
      }
    };

    fetchOrderDetails();
  }, [id, t]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate(`/uniquecode-last/${id}`);
    }
  };

  const renderProfileRight = () => {
    if (!gameSession) return null;

    switch (currentStep) {
      case 1:
        return (
          <SecoundProfileRight
            title={gameSession.itemName || ""}
            orderId={gameSession.uniqueCode || ""}
            dlcLabel={gameSession.isDlc ? "DLC" : ""}
            activationTime={gameSession.addedDateTime || "00:00:00"}
            onNext={handleNextStep}
            steamProfileUrl={gameSession.steamProfileUrl || ""}
          />
        );
      case 2:
        return (
          <ThirdProfileRight
            title={gameSession.itemName || ""}
            orderId={gameSession.uniqueCode || ""}
            dlcLabel={gameSession.isDlc ? "DLC" : ""}
            activationTime={gameSession.addedDateTime || "00:00:00"}
            onNext={handleNextStep}
            botProfileUrl={gameSession.botProfileUrl || ""}
          />
        );
      case 3:
        return (
          <FourthProfileRight
            title={gameSession.itemName || ""}
            orderId={gameSession.uniqueCode || ""}
            dlcLabel={gameSession.isDlc ? "DLC" : ""}
            activationTime={gameSession.addedDateTime || "00:00:00"}
            onNext={handleNextStep}
            queuePosition={gameSession.queuePosition}
            queueWaitingMinutes={gameSession.queueWaitingMinutes}
          />
        );
      case 4:
        return (
          <FifthProfileRight
            title={gameSession.itemName || ""}
            orderId={gameSession.uniqueCode || ""}
            dlcLabel={gameSession.isDlc ? "DLC" : ""}
            activationTime={gameSession.addedDateTime || "00:00:00"}
            onNext={handleNextStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="second-profile-bg">
      <div className="second-profile">
        <div className="second-profile__header">
          <img className="second-profile__logo" src={logo} alt="game logo" />
          <p className="second-profile__header__text">
            {t("profilePage.headerText")}
          </p>
        </div>

        <img
          className="second-profile__logo mobile_hidden"
          src={logo}
          alt="game logo"
        />

        <div className="second-profile__container">
          {gameSession && (
            <SecondProfileLeft
              imgSrc={images[currentImageIndex]}
              title={gameSession.itemName || ""}
              orderId={gameSession.uniqueCode || ""}
              dlcLabel={gameSession.isDlc ? "DLC" : ""}
              activationTime={gameSession.addedDateTime || "00:00:00"}
            />
          )}

          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            renderProfileRight()
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondProfilePage;
