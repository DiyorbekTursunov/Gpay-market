import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import { Link } from "react-router-dom";
import "./SixthProfileForm.scss";

interface SixthProfileFormProps {
  onReviewButtonClick: () => void; // New prop
}

const SixthProfileForm: React.FC<SixthProfileFormProps> = ({
  onReviewButtonClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="secound-order-form">
      <Button
        text={t("Оставить отзыв")}
        onClick={onReviewButtonClick} // Trigger the switch
        fullWidth
        variant="primary"
        size="medium"
      />

      <Button
        text={t("Главная")}
        onClick={() => console.log("Navigate to main page")} // Placeholder
        fullWidth
        variant="secondary"
        size="medium"
      />

      <Link
        className="secound-order-form__link"
        target="_blank"
        to={"https://store.steampowered.com/account/licenses/"}
      >
        Проверить версию издания
      </Link>

      <Link
        className="secound-order-form__link"
        target="_blank"
        to={"https://store.steampowered.com/gifts/"}
      >
        Посмотреть игру
      </Link>
    </div>
  );
};

export default SixthProfileForm;
