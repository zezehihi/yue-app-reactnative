import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import Swiper from '@/pages/index/components/swiper';
import Api from '@/api/api';
import request from '@/services/request';
import {observer} from 'mobx-react';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';

class Index extends Component {
  state = {
    musicId: '22654572',
    music: '',
    musicPic: 'http://yun.1dtfc.com/images/other/white.jpg',
    musicUrl: '',
  };
  componentDidMount() {
    const {musicId} = this.state;
    this.getTrueMusicUrl(musicId);
    this.getMusicInformation(musicId);
  }
  getTrueMusicUrl = async id => {
    const url = `https://cloudmusic.1dtfc.com/song/url?id=${id}&realIP=116.25.146.177`;
    const res = await request.get(url);
    console.log(res.data.data[0].url);
    this.setState({musicUrl: res.data.data[0].url});
    SoundPlayer.playUrl(res.data.data[0].url);
  };
  getMusicInformation = async id => {
    const url = `https://cloudmusic.1dtfc.com/song/detail?ids=${id}`;
    const res = await request.get(url);
    this.setState({
      music: res.data.songs[0],
      musicPic: res.data.songs[0].al.picUrl,
    });
  };
  render() {
    const {music, musicPic} = this.state;
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
          <Image></Image>
          <TopNav title={music.name} color="white" />
        </View>
      </ImageBackground>
    );
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
});
