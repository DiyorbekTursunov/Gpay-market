import { useState, useEffect } from "react";
import { TelegramLinkProps } from "../../types/index";
import "./TelegramLink.scss";
import telegramIcon from "../../assets/icons/telegram.svg";

const TelegramLink: React.FC<TelegramLinkProps> = ({ url, text, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Таймер для показа промо через 5 секунд
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 5000 мс = 5 секунд

    // Таймер для скрытия промо через 17 секунд (5 + 12)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 17000); // 17000 мс = 17 секунд

    // Очистка таймеров при размонтировании компонента
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Пустой массив зависимостей — эффект срабатывает только при монтировании

  console.log(isVisible);

  return (
    <div className={"telegram-link"}>
      {isVisible && (
        <div className="telegram-link__back-ground">
          <div className="telegram-link__text">{text}</div>
        </div>
      )}
      <a href={url} title={title} className="telegram-link__icon">
        <img src={telegramIcon} alt="telegram logo" />
      </a>
    </div>
  );
};

export default TelegramLink;
