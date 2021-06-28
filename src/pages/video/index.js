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
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Divider} from 'react-native-elements';
import {Carousel, Toast} from 'teaset';
import SearchBar from '@/components/searchBar';
import Swiper from '@/pages/index/components/swiper';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import Slider from '@react-native-community/slider';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
@inject('AccountStore')
class Index extends Component {
  state = {
    loading: true,
    videoId: '',
    video: '',
    videoUrl: '',
    isPaused: false,
    isFullScreen:
      Orientation.getInitialOrientation() == 'PORTRAIT' ? false : true,
    isShowMenu: true,
    slideValue: 0.0,
    isCollect: false,
  };
  async componentDidMount() {
    const videoId = this.props.route.params.toString();

    this.setState({videoId: videoId});
    Orientation.lockToPortrait();
    this.setState({isFullScreen: true});
    this.getVideoInformation(videoId);
    this.getVideoUrl(videoId);
    this.getCollectState(videoId);
  }

  getVideoInformation = async videoId => {
    const {VIDEO_DETAIL} = Api;
    const url = VIDEO_DETAIL.replace(':id', videoId);
    const res = await request.get(url);
    this.setState({video: res.data.data});
  };

  getVideoUrl = async videoId => {
    const {VIDEO_URL} = Api;
    const url = VIDEO_URL.replace(':id', videoId);
    const res = await request.get(url);
    this.setState({videoUrl: res.data.urls[0]});
    console.log(this.state.videoUrl);
  };
  getCollectState = async videoId => {
    const {ACTION_GET_COLLECT_STATE} = Api;
    const url = ACTION_GET_COLLECT_STATE.replace(
      ':userId',
      this.props.AccountStore.userId,
    ).replace(':mvId', videoId);
    const res = await request.get(url);
    this.setState({isCollect: res.data.success});
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
  onCollectPress = async () => {
    const {videoId, isCollect} = this.state;
    const uerId = this.props.AccountStore.userId;
    const {ACTION_COLLECT} = Api;
    const params = {
      add: !isCollect,
      mvId: videoId,
      type: 1014,
      userId: uerId,
    };
    const res = await request.post(ACTION_COLLECT, params);
    this.setState({isCollect: res.data.success});
    if (isCollect) {
      Toast.success('收藏成功', 2000);
    } else {
      Toast.success('取消收藏成功', 2000);
    }
  };
  yView = () => {
    const {video, isCollect} = this.state;
    return (
      <View style={{marginTop: pxToDpH(30), marginBottom: pxToDpH(30)}}>
        <View>
          <Text
            style={{
              fontSize: size.font1,
              color: '#0085b5',
              textAlign: 'center',
            }}>
            {video.title}
          </Text>
          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(50), marginTop: pxToDpH(25)}}
          />
          <Text style={{fontSize: size.font2, color: '#5b6c79'}}>
            &emsp;&emsp;概要：
          </Text>
          <Text style={{fontSize: size.font2, color: '#5b6c79'}}>
            &emsp;&emsp;{video.description}
          </Text>
        </View>
        {/* 图标 */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: pxToDpW(50),
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: pxToDpW(200),
            }}>
            <IconFont
              name="like"
              style={{color: '#a0acb4', fontSize: pxToDpW(110)}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onCollectPress}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: pxToDpW(200),
              justifyContent: 'space-around',
            }}>
            <IconFont
              name={isCollect != false ? 'starFill' : 'star'}
              style={{color: '#a0acb4', fontSize: pxToDpW(110)}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  bottomMenu = () => {
    if (this.state.isFullScreen) {
      // TODO全屏
      console.log('是底部屏');
      return this.portraitBottomMenu();
    } else {
      console.log('不是全屏');
    }
  };
  portraitBottomMenu = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          zIndex: 3,
        }}>
        <TouchableOpacity
          onPress={() => this.setState({isPaused: !this.state.isPaused})}>
          {this.state.isPaused ? (
            <IconFont
              name="playCircle"
              style={{color: '#fff', fontSize: size.font1}}
            />
          ) : (
            <IconFont
              name="pause"
              style={{color: '#fff', fontSize: size.font1}}
            />
          )}
        </TouchableOpacity>
        <Slider
          // disabled={true}
          thumbTintColor="#38b1ff"
          style={{flex: 1, height: 40}}
          value={this.state.slideValue}
          minimumValue={0}
          minimumTrackTintColor="#38b1ff"
          maximumTrackTintColor="#a6aaae"
          maximumValue={this.state.duration}
          onValueChange={value => this.setState({slideValue: value})}
        />
        {/* 全屏按钮 */}
        {/* <TouchableOpacity
          onPress={() => this.setState({isPaused: !this.state.isPaused})}>
          <IconFont
            name="playCircle"
            style={{color: '#fff', fontSize: size.font1}}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  setTime = data => {
    //更新进度条
    this.setState({
      slideValue: data.currentTime,
    });
  };

  render() {
    const {video, videoUrl, loading, isPaused} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {console.log(this.state.isFullScreen)}
        <TopNav
          color="black"
          title=""
          style={{
            marginLeft: size.globalPadding,
            marginRight: size.globalPadding,
          }}
        />
        {videoUrl.url != null ? (
          <View style={{flex: this.state.isFullScreen ? null : 1}}>
            <View>
              <Video
                ref={ref => (this.Video = ref)}
                // source={{uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
                source={{
                  uri: videoUrl.url,
                }} //视频uri
                style={
                  this.state.isFullScreen ? styles.videoMin : styles.videoMax
                } //全屏和半屏幕状态切换
                poster={video.coverUrl} //视频加载中显示的图片
                paused={isPaused} //暂停或播放
                onProgress={data => this.setTime(data)} //进度条
                onLoad={data => {
                  //获取视频长度毫秒
                  this.setState({duration: data.duration});
                  this.setState({isLoading: false});
                }} //加载媒体并准备播放时调用的回调函数。
                onEnd={() => {}} //视频播放结束
                resizeMode="cover" //确定当前帧尺寸与原始尺寸不匹配时如何跳转大小
                posterResizeMode="center"
              />
              {/* 底部菜单 */}
              {this.bottomMenu()}
            </View>

            <View style={styles.contentStyle}>
              {/* 竖屏情况下下半部 */}
              {this.state.isFullScreen ? this.yView() : null}
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
}
export default Index;

var styles = StyleSheet.create({
  contentStyle: {
    paddingLeft: size.globalPadding,
    paddingRight: size.globalPadding,
  },
  videoMin: {
    //小窗口
    width: w,
    height: h * 0.3,
    backgroundColor: 'black',
  },
  videoMax: {
    //大窗口
    flex: 1,
    backgroundColor: 'black',
  },
});
