import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI";
import { OrderFormProps, OrderFormData } from "../../../types";
import "./SendReviewProfileForm.scss";
import { Link } from "react-router-dom";
import Textarea from "../../UI/Textarea/Textarea";
import ReactionButton from "../../UI/ReactionButton/ReactionButton";

const SendReviewProfileRight: React.FC<OrderFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<OrderFormData>({
    code: "",
    isNotRobot: false,
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      code: e.target.value,
    }));
  };

  const handleLike = () => {
    console.log("Liked");
  };

  const handleDislike = () => {
    console.log("Disliked");
  };

  return (
    <form className="secound-order-form" onSubmit={handleSubmit}>
      <Textarea
        value={formData.code}
        onChange={handleCodeChange}
        placeholder={t("Напишите ваш комментарий. Будем рад вам снова. 😉")}
        fullWidth
        size="medium"
        required
        name="code"
        id="order-code"
        autoComplete="off"
      />

      <ReactionButton
        isLiked={isLiked}
        isDisliked={isDisliked}
        onLike={handleLike}
        onDislike={handleDislike}
      />

      <Button
        text={t("Оставить отзыв")}
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
        variant="primary"
        size="medium"
      />

      {error && (
        <div className="secound-order-form__error">
          {t("profileForm.robotError")}
        </div>
      )}

      <Link className="secound-order-form__link" to={"#"}>
        Посмотреть игру
      </Link>
    </form>
  );
};

export default SendReviewProfileRight;
