import React from 'react';
import {parse} from 'iso8601-duration';

const RelatedVideo = ({video, handleVideoSelect, formatNumber}) => {
    let views = formatNumber(video.statistics.viewCount) + " views";
    let duration = parse(video.contentDetails.duration);
    let minutes = (duration.minutes >= 10)?duration.minutes:"0" + duration.minutes;
    let seconds = (duration.seconds >= 10)?duration.seconds:"0" + duration.seconds;
    let hours = "";
    if (duration.hours > 0){
        hours = (duration.hours >= 10)?duration.hours:"0" + duration.hours;
        hours = hours + ":";
    }
    let durationStr = hours + minutes + ":" + seconds;
    return (
        <div className="related-video" onClick={ () => handleVideoSelect(video)} >
            <div className="thumbnail">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <span>{durationStr}</span>
            </div>
            <div className="thumbnail-info">
                <h2>{video.snippet.title}</h2>
                <div className="channel">{video.snippet.channelTitle}</div>
                <div className="views">{views}</div>
            </div>
        </div>
    )
};
export default RelatedVideo;



