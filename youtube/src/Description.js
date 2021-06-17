import React from 'react';
import { format } from 'date-format-parse';

const Description = ({video, formatNumber}) => {
  if (video){
    let videoDesc = video.snippet.description;
    let videoTitle = video.snippet.title;
    let views = formatNumber(video.statistics.viewCount) + " views";
    let likes = formatNumber(video.statistics.likeCount);
    let dislikes = formatNumber(video.statistics.dislikeCount);
    let date = format(new Date(video.snippet.publishTime), 'MMM DD, YYYY');

    return (
      <div>
        <div className="video-info">
          <p className="title">{videoTitle}</p>
          <div className="video-toolbar">
            <p className="video-views">
              {views} • {date}
            </p>
            <span className="right-menu">
              <div className="thumb-wrapper">
                <a className="thumb-up-btn">
                  <i className="material-icons">thumb_up</i>
                  <span className="thumbs-count">{likes}</span>
                </a>
                <a className="thumb-down-btn">
                  <i className="material-icons">thumb_down</i>
                  <span className="thumbs-count">{dislikes}</span>
                </a>
              </div>
            </span>
          </div>
        </div>
        <div className="description">
          <p>{videoDesc}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Description;