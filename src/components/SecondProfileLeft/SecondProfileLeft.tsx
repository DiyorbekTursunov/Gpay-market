import { useTranslation } from "react-i18next";
import "./SecondProfileLeft.scss";
import mobileBg from "../../assets/background/pubgImg.png";

interface SecondProfileLeftProps {
  imgSrc: string;
  title: string;
  orderId: string;
  activationTime: string;
  dlcLabel: string;
  className?: string;
}

const SecondProfileLeft: React.FC<SecondProfileLeftProps> = ({
  imgSrc,
  title,
  orderId,
  activationTime,
  dlcLabel,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`secondProfile__left ${className || ''}`}>
      <img src={imgSrc} alt={title} className="secondProfile__left__img" />
      <img src={mobileBg} alt="pubg" className="secondProfile__left__img1" />
      <h2 className="secondProfile__left__title">{title}</h2>
      <p className="secondProfile__left__row__text only_mobile">
        {t("secondProfileLeft.orderLabel", { id: orderId })}
      </p>
      <div className="secondProfile__left__row">
        <p className="secondProfile__left__row__text mobile_hidden">
          {t("secondProfileLeft.orderLabel", { id: orderId })}
        </p>
        <div className="secondProfile__left__row__info">
          <span className="secondProfile__left__row__info__text">{dlcLabel}</span>
          {/* SVG icon remains the same */}
        </div>
        <div className="secondProfile__left__row__info">
          <span className="secondProfile__left__row__info__text">
            {t("secondProfileLeft.activationTimeLabel", { time: activationTime })}
          </span>
          {/* SVG icon remains the same */}
        </div>
      </div>
      <p className="secondProfile__left__bottom__text mobile_hidden">
        {t("secondProfilePage.headerText")}
      </p>
    </div>
  );
};

export default SecondProfileLeft;
