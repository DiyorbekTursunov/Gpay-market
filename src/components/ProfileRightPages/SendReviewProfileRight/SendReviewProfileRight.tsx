import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";
import TelegramLink from "../../TelegramLink/TelegramLink";
import { OrderFormData } from "../../../types";
import "./SendReviewProfileRight.scss";

import giftImg from "../../../assets/background/gift.png";
import giftMobileImg from "../../../assets/background/gift_mobile.png";

import SixthProfileForm from "../../ProfileForms/SixthProfileForm/SixthProfileForm";
import { Link } from "react-router-dom";
import SendReviewProfileForm from "../../ProfileForms/SendReviewProfileForm/SendReviewProfileForm";

interface ProfileLeftProps {
  title: string;
  orderId: string;
  activationTime: string;
  dlcLabel: string;
}

const SendReviewProfileRight: React.FC<ProfileLeftProps> = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    setError("");
    try {
      await new Promise((r) => setTimeout(r, 2000));
      console.log("Form submitted:", data);
    } catch {
      setError(t("orderForm.robotError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="send-review-profile__right">
        <h1 className="send-review-profile__right__title mobile_hidden">
          {t("Отзыв")}
        </h1>

        <div className="desctop-send-review-profile__left">
          <img src={giftMobileImg} alt="Gift Img" className="only_mobile" />

          <h1 className="send-review-profile__right__title only_mobile">
            {t("Удачная покупка")}
          </h1>

          <p className="desctop-send-review-profile__left__row__text__2">
            Обратите внимание, что данный отзыв сохранится только внутри
            магазина GPay. Если Вы хотите оставить отзыв на площадке Digiseller
            - это нужно будет сделать отдельно именно там
          </p>
        </div>


        <SendReviewProfileForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
        />

        <div className="order-page__bottom">
          <LanguageSelector />
          <TelegramLink
            url="/"
            text={t("telegramText")}
            title={t("telegramText")}
          />
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
    </>
  );
};

export default SendReviewProfileRight;
