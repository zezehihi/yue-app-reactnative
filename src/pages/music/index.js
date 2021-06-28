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
import {inject} from 'mobx-react';
@inject('AccountStore')
class Index extends Component {
  state = {
    musicId: '',
    music: '',
    musicPic: 'http://yun.1dtfc.com/images/other/white.jpg',
    musicUrl: '',
    loading: true,
    musicState: 'pause',
    bounceValue: new Animated.Value(2), //你可以改变这个值看
    //看效果是什么
    rotateValue: new Animated.Value(0), //旋转角度的初始值
    showAni: false,
    isCollect: false,
  };
  async componentDidMount() {
    const musicId = this.props.route.params.toString();
    console.log('id', musicId);
    this.setState({musicId: musicId});
    this.setState({showAni: true});
    this.getTrueMusicUrl(musicId);
    this.getMusicInformation(musicId);
    this.getCollectState(musicId);
  }
  componentWillUnmount() {
    this.setState({showAni: false});
    this.stopAnimation();
    SoundPlayer.stop();
  }
  getCollectState = async musicId => {
    const {ACTION_GET_COLLECT_STATE} = Api;
    const url = ACTION_GET_COLLECT_STATE.replace(
      ':userId',
      this.props.AccountStore.userId,
    ).replace(':mvId', musicId);
    const res = await request.get(url);
    this.setState({isCollect: res.data.success});
  };
  onCollectPress = async () => {
    const {musicId, isCollect} = this.state;
    const uerId = this.props.AccountStore.userId;
    const {ACTION_COLLECT} = Api;
    const params = {
      add: !isCollect,
      mvId: musicId,
      type: 1,
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
  stopAnimation = () => {
    this.state.rotateValue.stopAnimation();
    this.state.bounceValue.stopAnimation();
  };
  startAnimation = () => {
    console.log('still animation');
    console.log('?????', this.state.showAni);
    this.state.bounceValue.setValue(1); //和上面初始值一样，所以
    //弹动没有变化
    this.state.rotateValue.setValue(0);
    Animated.parallel([
      //通过Animated.spring等函数设定动画参数
      //可选的基本动画类型: spring, decay, timing
      Animated.spring(this.state.bounceValue, {
        toValue: 1, //变化目标值，也没有变化
        friction: 20, //friction 摩擦系数，默认40,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 1, //角度从0变1
        duration: 15000, //从0到1的时间
        easing: Easing.out(Easing.linear), //线性变化，匀速旋转,
        useNativeDriver: true,
      }),
      //调用start启动动画,start可以回调一个函数,从而实现动画循环
    ]).start(o => {
      if (o.finished) {
        this.startAnimation();
      }
    });
  };

  getTrueMusicUrl = async id => {
    const musicId = id;
    const url = `https://cloudmusic.1dtfc.com/song/url?id=${musicId}&realIP=116.25.146.177`;
    const res = await request.get(url);
    this.setState({musicUrl: res.data.data[0].url, loading: false});

    //const url = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
    console.log(url);
    //this.setState({musicUrl: url, loading: false});

    this.playMusic();
  };
  getMusicInformation = async id => {
    const musicId = id;
    this.setState({loading: true});
    const url = `https://cloudmusic.1dtfc.com/song/detail?ids=${musicId}`;
    const res = await request.get(url);
    this.setState({
      music: res.data.songs[0],
      musicPic: res.data.songs[0].al.picUrl,
    });
  };
  getInfo = async () => {
    // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', info); // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e);
    }
  };

  playMusic = () => {
    const {musicUrl} = this.state;
    console.log(musicUrl);
    try {
      SoundPlayer.playUrl(musicUrl);
      this.startAnimation();
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };
  changeMusicState = () => {
    const {musicState} = this.state;
    let state = musicState == 'pause' ? 'playCircle' : 'pause';
    if (musicState == 'playCircle') {
      this.setState({musicState: 'pause', showAni: true});
      this.startAnimation();
      SoundPlayer.resume();
    } else {
      this.stopAnimation();
      SoundPlayer.pause();
      this.setState({musicState: 'playCircle', showAni: !true});
    }
  };
  renderMusic() {
    const {music, musicPic, loading, isCollect, musicState} = this.state;

    return (
      <ImageBackground source={{uri: musicPic}} style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={styles.contentStyle}>
          {/* 顶部导航组件 */}
          <TopNav title={music.name} color="white" />
          <View
            style={{
              alignItems: 'center',
              marginTop: pxToDpH(300),
              marginBottom: pxToDpH(200),
            }}>
            <View
              style={{
                borderRadius: pxToDpW(450),
                overflow: 'hidden',
                width: pxToDpW(900),
                height: pxToDpW(900),
                borderWidth: pxToDpW(80),
                borderColor: 'black',
              }}>
              <Animated.Image
                source={{uri: musicPic}}
                style={{
                  ...styles.centerImage,
                  transform: [
                    //将初始化值绑定到动画目标的style属性上
                    {scale: this.state.bounceValue},
                    //使用interpolate插值函数,实现了从数值单位的映
                    //射转换,上面角度从0到1，这里把它变成0-360的变化
                    {
                      rotateZ: this.state.rotateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }}
              />
            </View>
          </View>
          {/* 播放按钮 */}
          <View style={styles.playBtnContainer}>
            {/* <TouchableOpacity>
              <IconFont name="stepBackward" style={styles.playBtn} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.changeMusicState()}>
              <IconFont
                name={musicState}
                color="white"
                style={{...styles.playBtn, fontSize: pxToDpW(120)}}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <IconFont
                name="stepForward"
                color="white"
                style={styles.playBtn}
              />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: pxToDpH(100),
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: pxToDpW(200),
              }}>
              <IconFont
                name="like"
                style={{color: '#a0acb4', fontSize: pxToDpW(80)}}
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
                style={{color: '#a0acb4', fontSize: pxToDpW(80)}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  render() {
    const {music, musicPic, loading} = this.state;
    return <View>{loading == false ? this.renderMusic() : <></>}</View>;
  }
}
export default Index;

// Later on in your styles..
var styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  absolute: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
  },
  contentStyle: {
    paddingLeft: size.globalPadding,
    paddingRight: size.globalPadding,
  },
  centerImage: {width: pxToDpW(900), height: pxToDpW(900)},
  playBtnContainer: {
    height: pxToDpH(200),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playBtn: {
    fontSize: pxToDpW(80),
    color: '#fff',
  },
});
