import type React from "react"
import { useTranslation } from "react-i18next"
import "./ProfileLeft.scss"
import type { GameSessionInfo } from "../../service/api/api"
import { format } from "date-fns"
import Explanation from "../Explanation/Explanation"

interface ProfileLeftProps {
  imgSrc: string
  gameSession: GameSessionInfo
}

const ProfileLeft: React.FC<ProfileLeftProps> = ({ imgSrc, gameSession }) => {
  const { t } = useTranslation()

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy, h:mm a")
    } catch {
      return "N/A"
    }
  }

  return (
    <div className="profile__left">
      <img src={imgSrc || "/placeholder.svg"} alt="" className="profile__left__img" />
      <h2 className="profile__left__title">{gameSession?.itemName}</h2>

      {/* Order label (mobile/desktop) */}
      <p className="profile__left__row__text only_mobile">{t("profileLeft.orderLabel", { id: gameSession?.id })}</p>

      <div className="profile__left__row">
        <p className="profile__left__row__text mobile_hidden">{t("profileLeft.orderLabel", { id: gameSession?.id })}</p>

        {/* DLC badge */}
        {gameSession?.isDlc || (
          <div className="profile__left__row__info">
            <span className="profile__left__row__info__text">DLC</span>
            <Explanation text="Дополнение к основной игре" className="profile__left__row__info__explanation" />
          </div>
        )}

        {/* Activation time badge */}
        <div className="profile__left__row__info">
          <span className="profile__left__row__info__text">
            {t("profileLeft.activationTimeLabel", {
              time: gameSession?.addedDateTime ? formatDate(gameSession.addedDateTime) : "N/A",
            })}
          </span>
          <Explanation text="По истечению времени — заказ будет получить невозможно. Либо потребуется доплата, либо изменятся условия заказа, возможно сейчас товар находится на распродаже" className="profile__left__row__info__explanation_activation" />
        </div>
      </div>

      {/* Bottom text (desktop only) */}
      {gameSession?.isDlc && <p className="profile__left__bottom__text mobile_hidden">{t("profilePage.headerText")}</p>}
    </div>
  )
}

export default ProfileLeft
