import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteButton from './FavoriteButton';

const VideoDetail = ({ match }) => {
  const [video, setVideo] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await axios.get(`/api/videos/${match.params.id}`);
      setVideo(data);
    };

    const fetchIsFavorited = async () => {
      const { data } = await axios.get(`/api/favorites/${match.params.id}`);
      setIsFavorited(data.isFavorited);
    };

    fetchVideo();
    fetchIsFavorited();
  }, [match.params.id]);

  const handleToggleFavorite = async (id) => {
    try {
      if (isFavorited) {
        await axios.delete(`/api/favorites/${id}`);
        setIsFavorited(false);
      } else {
        await axios.post(`/api/favorites/${id}`);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <video controls src={video.url} />
      <FavoriteButton
        video={video}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default VideoDetail;

