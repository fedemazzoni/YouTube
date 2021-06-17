import React from 'react';
import RelatedVideo from './RelatedVideo';

const RelatedBar = ({videos, handleVideoSelect, formatNumber}) => {

  if (videos.length > 0) {
    let videoItems = videos.map((video) => {
      return (
        <RelatedVideo key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} formatNumber={formatNumber} />
      );
    })
    return (
      <div className="related">
        <div className="related-title">
          <p>Related videos</p>
        </div>
        {videoItems}
      </div>
    );
  } else return null;
}

export default RelatedBar;