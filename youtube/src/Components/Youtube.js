import React, {Component} from 'react';
import Player from './Player';
import RelatedBar from './RelatedBar';
import SearchBar from './SearchBar';
import youtubeAPI from '../youtubeAPI';
import Description from './Description';
import he from 'he';


class Youtube extends Component {

  state = {
    videos: [],
    playerVideo: null
  };

  formatNumber = (number) => {
    let res;
    if (number > 1000000)
      res = (Math.trunc(number / 100000)) / 10 + "M";
    else if (number > 1000)
      res = Math.trunc(number / 1000) + "K";
    else res = number;
    return res;
  }

  getVideos = (response) => {
    let videos = [];
    if (response.data.items){
      response.data.items.forEach((video) => {
        video.snippet.title = he.decode(video.snippet.title);   //fixes youtube api's decoding bug in video titles
        if (video.id.kind === "youtube#video")
          videos.push(video);
      })
    }
    return videos;
  }

  getDetails = (videos) => {
    let idsString = "";
    videos.forEach(video => {
      if (idsString.length === 0)
        idsString = idsString + video.id.videoId;
      else 
        idsString = idsString + "," + video.id.videoId; 
    });
    
    let promiseContentDetails = youtubeAPI.get('/videos', {
      params: {
        id: idsString,
        part: 'contentDetails,statistics'
      }
    });
    return promiseContentDetails.then(response => {
      let details = response.data.items;
      details.forEach((item, i) => {
        // videos and response are in the same order
        videos[i].contentDetails = item.contentDetails;
        videos[i].statistics = item.statistics;
      });
      return videos;
    }).catch(error => {
      console.log(error);
    })
  }

  getIdsFromVideos = (videos) => {
    let idsString = "";
    videos.forEach(video => {
      if (idsString.length === 0)
        idsString = idsString + video.id.videoId;
      else 
        idsString = idsString + "," + video.id.videoId; 
    });
    return idsString;
  }

  handleSearch = async (searchString) => {
    if (searchString){
      youtubeAPI.get('/search', {
        params: {
          q: searchString,
          part: 'snippet',
        }
      })
      .then(response => {
        let videos = this.getVideos(response);
        this.setState({
          tempVideos: videos
        })
        console.log(this.state);
        let idsString = this.getIdsFromVideos(videos);
        return youtubeAPI.get('/videos', {
          params: {
            id: idsString,
            part: 'contentDetails,statistics'
          }
        });
      })
      .then(response => {
        let details = response.data.items;
        let videos = this.state.tempVideos.slice();
        details.forEach((item, i) => {
          // videos and response are in the same order
          videos[i].contentDetails = item.contentDetails;
          videos[i].statistics = item.statistics;
        })
        this.setState({
          videos: videos,
          playerVideo: videos[0]
        });
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  handleVideoSelect = (video) => {
    let currentVideo = this.state.playerVideo;
    //move currentVideo to videos' last position and new video to first position to keep positions consistent
    let videos = this.state.videos.filter(v => {
      return (v.id.videoId !== currentVideo.id.videoId);
    }).filter(v => {
      return (v.id.videoId !== video.id.videoId);
    });
    videos.unshift(video);
    videos.push(currentVideo);
    this.setState({
      videos: videos,
      playerVideo: video
    })
  }

  render() {
    const relatedVideos = this.state.videos.slice(1,4);
    return (
      <div>
        <header>
          <div className="header-logo">
            <img src="images/yt-logo.png" alt="YouTube logo" className="header__yt-logo"/>
          </div>
          <SearchBar handleSearch={this.handleSearch} />
          <div className="right"></div>
        </header>
        <div className="main-wrapper">
          <div></div>
          <main>
            <div className="grid1">
              <Player video={this.state.playerVideo} />
              <Description video={this.state.playerVideo} formatNumber={this.formatNumber} />
            </div>
            <div className="grid2">
              <RelatedBar videos={relatedVideos} handleVideoSelect={this.handleVideoSelect} formatNumber={this.formatNumber} />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default Youtube









