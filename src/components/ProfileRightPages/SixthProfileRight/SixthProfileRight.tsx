import { useTranslation } from "react-i18next";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";
import TelegramLink from "../../TelegramLink/TelegramLink";
import "./SixthProfileRight.scss";
import giftImg from "../../../assets/background/gift.png";
import giftMobileImg from "../../../assets/background/gift_mobile.png";
import SixthProfileForm from "../../ProfileForms/SixthProfileForm/SixthProfileForm";
import { Link } from "react-router-dom";

interface ProfileLeftProps {
  title: string;
  orderId: string;
  activationTime: string;
  dlcLabel: string;
  onReviewButtonClick: () => void; // New prop
}

const SixthProfileRight: React.FC<ProfileLeftProps> = ({
  onReviewButtonClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="secound-profile__right">
      <h1 className="secound-profile__right__title mobile_hidden">
        {t("Удачная покупка")}
      </h1>

      <div className="desctop-second-profile__left_2 desctop-second-profile__left">
        <img src={giftImg} alt="Gift Img" className="mobile_hidden" />
        <img src={giftMobileImg} alt="Gift Img" className="only_mobile" />

        <h1 className="secound-profile__right__title only_mobile">
          {t("Удачная покупка")}
        </h1>

        <p className="desctop-second-profile__left__row__text__2">
          Спасибо за покупку товара в нашем магазине! <br /> Будем рады Вашему
          отзыву, обращайтесь ещё!
        </p>
      </div>

      <SixthProfileForm onReviewButtonClick={onReviewButtonClick} />

      <div className="order-page__bottom">
        <LanguageSelector />
        <TelegramLink url="/" text={t("telegramText")} title={t("telegramText")} />
      </div>

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
        Закрыть
      </Link>
    </div>
  );
};

export default SixthProfileRight;
