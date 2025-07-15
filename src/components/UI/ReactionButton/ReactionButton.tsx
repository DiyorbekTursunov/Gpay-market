import React from 'react';
import './ReactionButton.scss';
import like from "../../../assets/icons/like.png";
import dislike from "../../../assets/icons/dislike.png";

interface ReactionButtonProps {
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  likeImageSrc?: string;
  dislikeImageSrc?: string;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  likeImageSrc = like,
  dislikeImageSrc = dislike,
}) => {
  return (
    <div className="profile__likes">
      <button
        type="button"
        className={`profile__btns like-button ${isLiked ? 'like-button--liked' : ''}`}
        onClick={onLike}
        aria-label="Like"
      >
        <img src={likeImageSrc} alt="" />
      </button>
      <button
        type="button"
        className={`profile__btns dislike-button ${isDisliked ? 'dislike-button--disliked' : ''}`}
        onClick={onDislike}
        aria-label="Dislike"
      >
        <img src={dislikeImageSrc} alt="" />
      </button>
    </div>
  );
};

export default ReactionButton;
