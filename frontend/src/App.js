import _ from 'lodash';
import React, {Component} from 'react';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import streamController from './components/streamController'

const API_KEY = 'AIzaSyB5X9G5TCpeG8Hh3Jv6Fb4PCeviqgpEzhk';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('')
  }

  videoSearch(term) {
    YTSearch({key : API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo : videos[0]
       });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 400)
    const myVideo = this.state.selectedVideo;

    if(myVideo) console.log(myVideo.id.videoId);//render keeps on rendering untill all data is fetched

    return (
      <div>
        <SearchBar onSearchTermChange = { videoSearch } />
        <VideoDetail video = { this.state.selectedVideo } />
        <VideoList
          onVideoSelect = {selectedVideo => {this.setState({selectedVideo});
        
        }}
          videos = { this.state.videos } />
        <streamController/>
      </div>
    );
  }
}
