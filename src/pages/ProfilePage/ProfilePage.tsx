import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileRight from "../../components/ProfileRight/ProfileRight";
import AtomicPng from "../../assets/background/atomic.png";
import logo from "../../assets/logo/logos.svg"
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => (
    <div className="profile">
        {/* Mobile header - hidden on desktop */}
        <div className="profile__header only_mobile">
            <img className="profile__logo" src={logo} alt="game logo" />
            <p className="profile__header__text">
                Для активации DLC нужна основная игра на аккаунте
            </p>
        </div>

        {/* Desktop logo - hidden on mobile */}
        <img className="profile__logo mobile_hidden" src={logo} alt="game logo" />

        <div className="profile__container">
            <ProfileLeft
                imgSrc={AtomicPng}
                title="Command & Conquer™ Red Alert™ 3- Uprising"
                orderId="99999999"
                dlcLabel="DLC"
                activationTime="00:00:00"
            />

            <ProfileRight/>
        </div>
    </div>
);

export default ProfilePage;
