import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProfileForm from "../ProfileForm/ProfileForm";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import TelegramLink from "../TelegramLink/TelegramLink";
import { SteamButton } from "../UI/SteamButton/SteamButton";
import { OrderFormData } from "../../types";
import "./ProfileRight.scss";


const ProfileRight: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
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
    <div className="profile__right">
      <h1 className="profile__right__title mobile_hidden">
        {t("profileRight.title")}
      </h1>

      <ProfileForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
      />

      <div className={`dropdown ${open ? "dropdown_active" : ""}`}>
        <button className="dropdown__header" onClick={() => setOpen((o) => !o)}>
          <p className="dropdown__header__text">
            {t("profileRight.dropdownHeader")}
          </p>
          <div className="dropdown__icon__bg">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        <div className="dropdown__content">
          <p className="dropdown__content__text">
            {t("profileRight.dropdownStep1")}
          </p>
          <p className="dropdown__content__text" style={{ marginTop: "1em" }}>
            {t("profileRight.dropdownStep2")}
          </p>
        </div>
      </div>

      <span className="profile__right__or_text">
        {t("profileRight.orText")}
      </span>

      <SteamButton onClick={() => console.log("Steam auth")} t={t} />

      <div className="order-page__bottom">
        <LanguageSelector />
        <TelegramLink
          url="/"
          text={t("telegramText")}
          title={t("telegramText")}
        />
      </div>
    </div>
  );
};

export default ProfileRight;
