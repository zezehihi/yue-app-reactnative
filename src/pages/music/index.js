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

class Index extends Component {
  state = {
    musicId: '22654572',
    music: '',
    musicPic: 'http://yun.1dtfc.com/images/other/white.jpg',
  };
  componentDidMount() {
    this.getTrueMusicUrl();
    this.getMusicInformation();
  }
  getTrueMusicUrl = async id => {
    const url =
      'https://cloudmusic.1dtfc.com/song/url?id=22654572&realIP=116.25.146.177';
    const res = await request.get(url);
    console.log(res);
    SoundPlayer.playUrl(
      'https://music.163.com/song/media/outer/url?id=22654572',
    );
  };
  getMusicInformation = async id => {
    id = '22654572';
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
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={styles.contentStyle}>
          <Image></Image>
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
    backgroundColor: 'red',
    paddingLeft: size.globalPadding,
    paddingRight: size.globalPadding,
  },
});
