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
import {Divider} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer} from 'mobx-react';
import {NavigationContext} from '@react-navigation/native';
@observer
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    news: '',
  };
  componentDidMount() {
    this.getNews();
  }
  getNews = async () => {
    const {GET_NEWS_LIST} = Api;
    const url = GET_NEWS_LIST.replace(':size', 0);
    let res = await request.get(url);
    this.setState({news: res.data.newsList});
  };
  render() {
    const {news} = this.state;
    return (
      <ScrollView>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {news.length != 0 ? (
          news.map((v, i) => (
            <TouchableOpacity
              onPress={() => this.context.navigate('NewsDetail', v)}
              key={i}
              style={{
                padding: size.globalPadding,
                paddingBottom: pxToDpH(10),
                paddingTop: pxToDpH(10),
              }}>
              <Text
                style={{
                  color: '#256ec0',
                  fontSize: pxToDpW(44),
                  paddingBottom: pxToDpH(30),
                }}>
                {v.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {v.newsimages[0].photolink != null && (
                  <Image
                    source={{uri: v.newsimages[0].photolink}}
                    style={{width: pxToDpW(300), height: pxToDpH(250)}}
                  />
                )}
                <View
                  style={{
                    paddingLeft: pxToDpW(60),
                    paddingRight: pxToDpW(60),
                    width:
                      v.newsimages[0].photolink != null ? pxToDpW(730) : '100%',
                  }}>
                  <Text style={{color: '#6b7a85', fontSize: size.font2}}>
                    {v.summary.length > 40
                      ? v.summary.slice(0, 40) + '...'
                      : v.summary}
                  </Text>
                </View>
              </View>
              <Divider
                orientation="vertical"
                width={5}
                style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
              />
            </TouchableOpacity>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
    );
  }
}
export default Index;
