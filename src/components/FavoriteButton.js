import React from 'react';

const FavoriteButton = ({ video, isFavorited, onToggleFavorite }) => {
  const handleClick = () => {
    onToggleFavorite(video._id);
  };

  return (
    <button onClick={handleClick}>
      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
