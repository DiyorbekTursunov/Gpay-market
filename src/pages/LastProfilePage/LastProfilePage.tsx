import profilePageBackground1 from "../../assets/background/profile_page_background_1.png";
import profilePageBackground2 from "../../assets/background/profile_page_background_2.png";
import logo from "../../assets/logo/logos.svg";
import "./LastProfilePage.scss";
import { useState, useEffect } from "react";
import SecondProfileLeft from "../../components/SecoundProfileLeft/SecondProfileLeft";
import SixthProfileRight from "../../components/ProfileRightPages/SixthProfileRight/SixthProfileRight";
import { Link, useParams } from "react-router-dom";
import SendReviewProfileRight from "../../components/ProfileRightPages/SendReviewProfileRight/SendReviewProfileRight";
import { GameSessionInfo } from "../../types";
import { useTranslation } from "react-i18next";
import { apiService } from "../../service/api/api";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/slices/gameSessionSlice";

const LastProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const images = [profilePageBackground1, profilePageBackground2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameSession, setGameSession] = useState<GameSessionInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [showReviewForm, setShowReviewForm] = useState(false); // New state

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
          {gameSession && (
            <SecondProfileLeft
              gameSession={gameSession}
              imgSrc={images[currentImageIndex]}
            />
          )}

          {showReviewForm ? (
            <SendReviewProfileRight
              title="Command & Conquer™ Red Alert™ 3- Uprising"
              orderId="99999999"
              dlcLabel="DLC"
              activationTime="00:00:00"
            />
          ) : (
            <SixthProfileRight
              title="Command & Conquer™ Red Alert™ 3- Uprising"
              orderId="99999999"
              dlcLabel="DLC"
              activationTime="00:00:00"
              onReviewButtonClick={() => setShowReviewForm(true)} // Pass callback
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LastProfilePage;
