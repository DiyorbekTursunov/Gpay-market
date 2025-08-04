import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import OrderForm from "../../components/OrderForm/OrderForm";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import TelegramLink from "../../components/TelegramLink/TelegramLink";
import logo from "../../assets/logo/logos.svg";

import type { OrderFormData } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  checkOrderCode,
  setUniqueCode,
  setSellerId,
  resetError,
} from "../../store/slices/gameSessionSlice";
import { getLastOrders, showTelegram } from "../../store/slices/orderSlice";
import { getErrorMessage } from "../../utils/errorMessages";
import "./OrderPage.scss";
import { Link } from "react-router-dom";

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, seterror] = useState(false);

  const {
    checkCodeResponse,
    loading,
    needsCaptcha,
    sellerId: currentSellerId,
  } = useAppSelector((state) => state.gameSession);

  const { showTelegramLink } = useAppSelector((state) => state.order);

  // Get seller ID from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sellerIdParam = urlParams.get("seller_id");
    if (sellerIdParam) {
      dispatch(setSellerId(sellerIdParam));
      dispatch(showTelegram(sellerIdParam));
    }

    // Load last orders for ticker
    dispatch(getLastOrders());
  }, [dispatch]);

  const handleFormSubmit = async (data: OrderFormData) => {
    if (!data.code.trim()) {
      return;
    }

    dispatch(resetError());
    dispatch(setUniqueCode(data.code));

    try {
      const result = await dispatch(
        checkOrderCode({
          uniqueCode: data.code,
          sellerId: currentSellerId,
          captcha: data.captcha,
        })
      ).unwrap();

      if (result.isCorrectCode && result.gameSession) {
        seterror(false);
        // Navigate to profile page with unique code
        navigate(`/uniquecode/${data.code}`);
      } else {
        seterror(true);
      }
    } catch (error) {
      seterror(true);
      console.error("Error submitting form:", error);
    }
  };

  // Get error message based on API response
  const getDisplayError = (): string => {
    if (checkCodeResponse && !checkCodeResponse.isCorrectCode) {
      return getErrorMessage(checkCodeResponse.errorCode, t);
    }
    return "";
  };

  const displayError = getDisplayError();

  return (
    <section className="order-page">
      <div className="order-page__container">
        <div className="order-page__background" />

        <div className="order-page__logo">
          <img src={logo || "/placeholder.svg"} alt="game logo" />
        </div>

        {error && (
          <div className="secound-profile__error mobile_hidden">
            Некорректный код заказа. <br /> Проверьте код ещё раз.
          </div>
        )}
        <div className="order-page__content">
          <OrderForm
            onSubmit={handleFormSubmit}
            isLoading={loading}
            error={error}
            needsCaptcha={needsCaptcha}
          />

          <Link
            to={"#"}
            className="order-page__contact-title default-hover-active"
          >
            {t("contactTitle")}
          </Link>

          <div className="order-page__bottom">
            <LanguageSelector />

            {showTelegramLink && (
              <TelegramLink
                url="/"
                text={t("telegramText")}
                title={t("telegramText")}
              />
            )}
          </div>
        </div>
      </div>

      <div className="order-page__mobile-content">
        <OrderForm
          onSubmit={handleFormSubmit}
          isLoading={loading}
          error={displayError}
          needsCaptcha={needsCaptcha}
        />

        <Link to={"#"} className="order-page__contact-link">
          <h3>{t("contactTitle")}</h3>
        </Link>

        <div className="order-page__bottom">
          <LanguageSelector />

          {showTelegramLink && (
            <TelegramLink
              url="/"
              text={t("telegramText")}
              title={t("telegramText")}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
