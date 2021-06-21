import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import Swiper from '@/pages/index/components/swiper';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer} from 'mobx-react';
import Video from 'react-native-video';
@observer
class Index extends Component {
  state = {
    loading: true,
    videoId: 'A4D48D4D35B904C6C922B7F0082C5EB1',
    video: '',
    videoUrl: '',
    paused: false,
  };
  async componentDidMount() {
    //const videoId = this.props.route.params.toString();

    console.log('id', this.state.videoId);
    this.getVideoInformation();
    this.getVideoUrl();
  }

  getVideoInformation = async () => {
    const {VIDEO_DETAIL} = Api;
    const url = VIDEO_DETAIL.replace(':id', this.state.videoId);
    const res = await request.get(url);
    this.setState({video: res.data.data});
    console.log(this.state.video);
  };

  getVideoUrl = async () => {
    const {VIDEO_URL} = Api;
    const url = VIDEO_URL.replace(':id', this.state.videoId);
    const res = await request.get(url);
    this.setState({videoUrl: res.data.urls[0]});
    console.log(this.state.videoUrl);
  };
  formatTime = second => {
    let h = 0,
      i = 0,
      s = parseInt(second);
    if (s > 60) {
      i = parseInt(s / 60);
      s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
      return v >> 0 < 10 ? '0' + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(':');
  };
  render() {
    const {video, videoUrl, loading, paused} = this.state;
    return (
      <ScrollView>
        {console.log(videoUrl.url)}

        {videoUrl.url != null ? (
          <View>
            <Video
              ref={ref => (this.Video = ref)}
              // source={{uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
              source={{
                uri: videoUrl.url,
              }}
              poster={video.coverUrl}
              paused={paused}
              onProgress={({currentTime}) => {}}
              onLoad={({duration}) => {}}
              onEnd={() => {}}
              resizeMode="cover"
              posterResizeMode="cover"
              style={styles.backgroundVideo}
            />
            <View style={styles.contentStyle}></View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    );
  }
}
export default Index;

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    height: pxToDpW(500),
  },
  contentStyle: {
    paddingLeft: size.globalPadding,
    paddingRight: size.globalPadding,
  },
});
