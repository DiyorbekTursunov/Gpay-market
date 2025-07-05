import React from "react";
import { TelegramLinkProps } from "../../types";
import "./TelegramLink.scss";
import telegramIcon from "../../assets/icons/telegram.svg";

const TelegramLink: React.FC<TelegramLinkProps> = ({ url, text, title }) => (
  <div className="telegram-link">
    <div className="telegram-link__back-ground">
      <div className="telegram-link__text">{text}</div>
    </div>
    <a href={url} title={title} className="telegram-link__icon">
      <img src={telegramIcon} alt="telegram logo" />
    </a>
  </div>
);

export default TelegramLink;
