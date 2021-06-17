import React from 'react';

const Player = ({video}) => {
  let videoId;
  if (video){
    videoId = video.id.videoId;
  } 
  
  return (
    <div className="player">
      <iframe
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        title="EmbeddedVideo"
      />
    </div>
  );
}

export default Player;