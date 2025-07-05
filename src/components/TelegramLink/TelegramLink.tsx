import React from 'react';
import { useLanguage } from '../../hooks/useLanguage.ts';
import './TelegramLink.scss';

interface TelegramLinkProps {
  url: string;
}

const TelegramLink: React.FC<TelegramLinkProps> = ({ url }) => {
  const { t } = useLanguage();

  return (
    <a
      className="telegram-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={t('telegram.text')}
    >
      {t('telegram.text')}
    </a>
  );
};

export default TelegramLink;
