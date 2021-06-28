import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
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
import {Divider, Image, Badge} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import {NavigationContext} from '@react-navigation/native';

@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    news: '',
    videoList: '',
    activeIndex: '',
    collect: '',
    selectType: 1,
    collectDetails: '',
    newVideoList: '',
  };
  async componentDidMount() {
    await this.getVideoList();
    await this.getCollectList();
  }
  getVideoList = async () => {
    const {SEARCH} = Api;
    // SEARCH: `${MUSIC_URI}/?keywords=:&type=:type&offset=:offset&limit=:limit`,
    const url = SEARCH.replace(':keywords', '越剧')
      .replace(':type', 1014)
      .replace(':offset', '')
      .replace(':limit', '');

    let res = await request.get(url);

    this.setState({
      videoList: res.data.result.videos,
      newVideoList: res.data.result.videos.slice(0, 5),
    });
    console.log(this.state.videoList);
  };
  onPress = () => {
    this.carousel.scrollToNextPage();
  };
  getCollectList = async () => {
    const {ACTION_GET_COLLECT_LIST, VIDEO_DETAIL} = Api;
    const url = ACTION_GET_COLLECT_LIST.replace(
      ':userId',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    const collect = res.data.collect.filter(v => v.type === 1014).pop();
    const urlv = VIDEO_DETAIL.replace(':id', collect.mvid);
    const resv = await request.get(urlv);

    this.setState({recentCollect: resv.data.data});
  };
  videoList = () => {
    const {videoList, newVideoList} = this.state;
    if (newVideoList.length == 0) return <></>;
    return newVideoList.map((v, i) => {
      console.log(v);
      const uri = v.coverUrl;
      const title = v.title;
      const desc = '';
      const id = v?.vid;
      const Type = 'Video';
      return (
        <TouchableOpacity
          onPress={() => this.context.navigate('VideoDetail', v.vid)}
          key={i}
          style={{
            padding: size.globalPadding,
            paddingBottom: pxToDpH(10),
            paddingTop: pxToDpH(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: uri}}
              style={{width: pxToDpW(400), height: pxToDpH(300)}}
            />
            <View
              style={{
                paddingLeft: pxToDpW(60),
                flexDirection: 'column',
                flex: 1,
              }}>
              <Text style={{color: '#6b7a85', fontSize: pxToDpW(44)}}>
                {title}
              </Text>
              <Text style={{color: '#6b7a85', fontSize: size.font2}}>
                {desc}
              </Text>
            </View>
          </View>
          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
          />
        </TouchableOpacity>
      );
    });
  };
  render() {
    const {videoList, recentCollect} = this.state;
    return (
      <ScrollView
        style={{
          padding: size.globalPadding,
          paddingTop: 0,
        }}>
        <TopNav title="视频" />
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 视频轮播图 */}
        <View
          style={{
            marginTop: pxToDpH(30),
          }}>
          {videoList.slice(4).length != 0 && (
            <View
              style={{
                marginBottom: pxToDpH(80),
              }}>
              <Carousel
                onChange={(index, total) => this.setState({activeIndex: index})}
                interval={6000}
                style={{height: pxToDpH(660)}}
                control={true}>
                {videoList.slice(0, 5).map((v, i) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.context.navigate('VideoDetail', v.vid)}>
                    <Image
                      key={i}
                      style={{height: pxToDpH(660)}}
                      source={{uri: v?.coverUrl}}
                    />
                  </TouchableOpacity>
                ))}
              </Carousel>
            </View>
          )}
        </View>
        {/* 视频详情 */}
        <View
          style={{
            paddingBottom: pxToDpH(30),
            elevation: 10,
            shadowColor: '#cccccc',
            backgroundColor: '#fefefe',
            borderRadius: pxToDpH(20),
            padding: pxToDpW(30),
            marginBottom: pxToDpH(50),
          }}>
          <View style={{padding: pxToDpW(20)}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: size.font3,
                color: '#2282b4',
                marginBottom: pxToDpH(20),
              }}>
              最近收藏
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.context.navigate('VideoDetail', recentCollect.vid)
              }
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: recentCollect?.coverUrl}}
                containerStyle={{borderRadius: 20}}
                style={{width: pxToDpW(360), height: pxToDpW(200)}}
              />
              <View
                style={{
                  paddingLeft: pxToDpW(20),
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: size.font2,
                    color: '#5b6c79',
                  }}>
                  {recentCollect?.title}
                </Text>
                <View style={{flexDirection: 'row', paddingTop: pxToDpH(20)}}>
                  {recentCollect?.videoGroup.map((v, i) => (
                    <Badge
                      badgeStyle={{backgroundColor: '#909090'}}
                      value={v.name}
                      status="success"
                    />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* 视频列表 */}
        <View>
          <Text
            style={{
              fontSize: size.font1,
              textAlign: 'center',
              color: '#3d7dae',
            }}>
            视频列表
          </Text>
          <View
            style={{
              paddingBottom: pxToDpH(30),
              elevation: 10,
              shadowColor: '#cccccc',
              backgroundColor: '#fefefe',
              borderRadius: pxToDpH(20),
              marginTop: pxToDpW(30),
              justifyContent: 'center',
              flexDirection: 'column',
              paddingTop: pxToDpH(60),
            }}>
            {this.videoList()}
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Index;
