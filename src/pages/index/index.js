import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import Swiper from '@/pages/index/components/swiper';
import Api from '@/api/api';
import request from '@/services/request';
import {observer} from 'mobx-react';
import {NavigationContext} from '@react-navigation/native';
@observer
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    search: '',
    newsList: '',
    musicList: '',
    videoList: '',
  };

  updateSearch = search => {
    this.setState({search});
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this.getCarouselNews();
    this.getMusicList();
    this.getVideoList();
  }

  getCarouselNews = async () => {
    const {GET_NEWS_LIST} = Api;
    const url = GET_NEWS_LIST.replace(':size', 4);
    let res = await request.get(url);
    this.setState({newsList: res.data.newsList});
  };

  getMusicList = async () => {
    const {GET_MUSIC_LIST} = Api;
    let res = await request.get(GET_MUSIC_LIST);
    this.setState({musicList: res.data.playlist.tracks.slice(0, 4)});
    console.log(this.state.musicList);
  };
  getVideoList = async () => {
    const {SEARCH} = Api;
    // SEARCH: `${MUSIC_URI}/?keywords=:&type=:type&offset=:offset&limit=:limit`,
    const url = SEARCH.replace(':keywords', '越剧')
      .replace(':type', 1014)
      .replace(':offset', '')
      .replace(':limit', '');

    let res = await request.get(url);

    this.setState({videoList: res.data.result.videos.slice(11, 15)});
    console.log(this.state.videoList);
  };

  render() {
    const {musicList, newsList, videoList, search} = this.state;
    return (
      <ScrollView>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 搜索栏 */}
        <View
          style={{
            padding: size.globalPadding,
            alignItems: 'center',
          }}>
          <SearchBar
            onEndEditing={() =>
              this.context.navigate('SearchResult', this.state.search)
            }
            value={search}
            onChangeText={this.updateSearch}
          />
        </View>
        {/* 导航栏+轮播区域  */}
        <View
          style={{
            paddingLeft: size.globalPadding,
            paddingRight: size.globalPadding,
          }}>
          {/* 轮播图 */}
          {newsList.length != 0 ? <Swiper data={newsList} /> : <></>}

          {/* 导航栏图标 */}
          <View
            style={{
              marginTop: pxToDpH(70),
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/store.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>商城</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/newSong.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>视频</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/news.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>资讯</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/accompaniment.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>戏曲</Text>
            </TouchableOpacity>
          </View>
          {/*  */}
        </View>
        {/* 专栏:名家唱段 */}
        <View
          style={{
            marginTop: pxToDpH(150),
          }}>
          <Text style={styles.columnTitle}>名家唱段</Text>
          <View
            style={{
              elevation: 5,
              shadowColor: '#d5d5d5',
              height: pxToDpH(850),
              marginLeft: size.globalPadding,
              marginRight: size.globalPadding,
              borderRadius: pxToDpW(60),
              display: 'flex',
              paddingTop: pxToDpH(80),
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {musicList.length != 0 ? (
              musicList.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.columnItemsContainer}
                  onPress={() => this.context.navigate('MusicDetail', v.id)}>
                  <View style={styles.columnImageContainer}>
                    <Image
                      source={{uri: v.al.picUrl}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <Text style={{textAlign: 'center', fontSize: size.font2}}>
                    {v.name.length > 8 ? v.name.slice(0, 8) + '...' : v.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
        {/* 专栏:热度推荐 */}
        <View
          style={{
            marginTop: pxToDpH(150),
          }}>
          <Text style={styles.columnTitle}>视频推荐</Text>
          <View
            style={{
              elevation: 5,
              shadowColor: '#d5d5d5',
              height: pxToDpH(850),
              marginLeft: size.globalPadding,
              marginRight: size.globalPadding,
              borderRadius: pxToDpW(60),
              display: 'flex',
              paddingTop: pxToDpH(80),
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {videoList.length != 0 ? (
              videoList.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.columnItemsContainer}
                  onPress={() => this.context.navigate('VideoDetail', v.vid)}>
                  <View
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      width: '100%',
                      height: '70%',
                      marginBottom: pxToDpH(20),
                    }}>
                    <Image
                      source={{uri: v.coverUrl}}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>

                  <Text style={{textAlign: 'center', fontSize: size.font2}}>
                    {v.title.length > 8 ? v.title.slice(0, 8) + '...' : v.title}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Index;
const styles = StyleSheet.create({
  iconContainer: {
    width: pxToDpW(210),
    height: pxToDpW(210),
    backgroundColor: '#e6eff6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDpW(50),
  },
  iconImage: {
    width: pxToDpW(170),
    height: pxToDpW(170),
    margin: 'auto',
  },
  iconText: {
    textAlign: 'center',
    color: '#256ec0',
  },
  iconTouchableOpacity: {
    width: pxToDpW(210),
    height: pxToDpW(210),
  },
  columnTitle: {
    fontSize: size.font1,
    textAlign: 'center',
    color: '#3d7dae',
  },
  columnItemsContainer: {
    width: pxToDpW(420),
    height: pxToDpH(340),
    marginBottom: pxToDpH(20),
    marginTop: pxToDpH(20),
  },
  columnImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: '70%',
    marginBottom: pxToDpH(20),
  },
});
