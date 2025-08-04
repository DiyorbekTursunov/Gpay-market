import type { GameSessionInfo } from "../../service/api/api";
import logo from "../../assets/logo/logos.svg";
import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import SecondProfileLeft from "../../components/SecoundProfileLeft/SecondProfileLeft";
import SecoundProfileRight from "../../components/ProfileRightPages/SecoundProfileRight/SecoundProfileRight";
import ThirdProfileRight from "../../components/ProfileRightPages/ThirdProfileRight/ThirdProfileRight";
import FourthProfileRight from "../../components/ProfileRightPages/FourthProfileRight/FourthProfileRight";
import FifthProfileRight from "../../components/ProfileRightPages/FifthProfileRight/FifthProfileRight";
import "./ProfilePage.scss";
import { apiService } from "../../service/api/api";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondProfilePage from "../SecoundProfilePage/SecondProfilePage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentStep,
  nextStep,
} from "../../store/slices/profileFlowSlice";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameSession, setGameSession] = useState<GameSessionInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get currentStep from Redux store
//   const currentStep = useSelector(selectCurrentStep);
    const currentStep = 3

  console.log(currentStep);

  const dispatch = useDispatch();

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch order details only once when component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const result = await apiService.checkCode(id, "12345", "12345");

        if (result && result.isCorrectCode && result.gameSession) {
          setGameSession(result.gameSession);
        } else {
          setError("Invalid order code or session not found");
        }

        if (result.gameSession.steamProfileUrl) {
          dispatch(nextStep());
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleNextStep = useCallback(() => {
    if (currentStep < 5) {
      dispatch(nextStep()); // Dispatch action to increment step in store
    } else {
      navigate(`/uniquecode-last/${id}`); // Navigate when step is 5
    }
  }, [currentStep, dispatch, navigate, id]);

  const handleConfirmSending = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.confirmSending(id);
      if (result) {
        setGameSession(result);
        handleNextStep();
      }
    } catch (err: any) {
      setError(err.message || "Failed to confirm sending");
    } finally {
      setLoading(false);
    }
  }, [id, handleNextStep]);

  const handleResetSteamAccount = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.resetSteamAccount(id);
      if (result) {
        setGameSession(result);
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset Steam account");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleResetBot = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.resetBot(id);
      if (result) {
        setGameSession(result);
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset bot");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleCheckFriend = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      await apiService.checkFriend(id);
    } catch (err: any) {
      setError(err.message || "Failed to check friend status");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const renderProfileRight = () => {
    if (!gameSession) return null;

    const commonProps = {
      title: gameSession.itemName || "",
      orderId: gameSession.uniqueCode || "",
      dlcLabel: gameSession.isDlc ? "DLC" : "",
      activationTime: gameSession.addedDateTime || "00:00:00",
      onNext: handleNextStep,
    };

    switch (currentStep) {
      case 2:
        return (
          <SecoundProfileRight
            gameSession={gameSession}
            onConfirmSending={handleConfirmSending}
            onResetSteamAccount={handleResetSteamAccount}
            isLoading={loading}
          />
        );
      case 3:
        return (
          <ThirdProfileRight
            gameSession={gameSession}
            isLoading={loading}
          />
        );
      case 4:
        return (
          <FourthProfileRight
            gameSession={gameSession}
            isLoading={loading}
          />
        );
      case 5:
        return <FifthProfileRight {...commonProps} />;
      default:
        return null;
    }
  };

  if (currentStep === 1) {
    return <SecondProfilePage gameSession={gameSession} />;
  }

  return (
    <div className="second-profile-bg">
      <div className="second-profile">
        <div className="second-profile__header">
          <img
            className="second-profile__logo"
            src={logo || "/placeholder.svg"}
            alt="game logo"
          />
          <p className="second-profile__header__text">
            {t("profilePage.headerText")}
          </p>
        </div>

        <img
          className="second-profile__logo mobile_hidden"
          src={logo || "/placeholder.svg"}
          alt="game logo"
        />

        <div className="second-profile__container">
          {gameSession && (
            <SecondProfileLeft
              imgSrc={images[currentImageIndex]}
              gameSession={gameSession}
            />
          )}

          {loading && <div className="loading-message">Loading...</div>}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && renderProfileRight()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
