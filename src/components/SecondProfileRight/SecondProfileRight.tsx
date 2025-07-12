import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SecondProfileRight.scss";
import question from "../../assets/background/question.png";
import SecondProfileForm from "../SecondProfileForm/SecondProfileForm";
import { OrderFormData } from "../../types";

const SecondProfileRight: React.FC = () => {
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
    <div className="secondProfile__right">
      <h1 className="secondProfile__right__title mobile_hidden">
        {t("secondProfileRight.title")}
      </h1>
      <div className="secondProfile__right">
        <h1 className="secondProfile__right__title mobile_hidden">
          {t("secondProfileRight.title")}
        </h1>
        <img
          src={question}
          alt="question"
          className="secondProfile__right__img"
        />
        <div className="secondProfile__card">
          <p className="secondProfile__right__text">
            {t("secondProfileRight.text")}
          </p>
          <a className="secondProfile__right__link" href="#">
            https://steamcommunity.com/profiles/steamid64
          </a>
        </div>
      </div>

      <SecondProfileForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default SecondProfileRight;
