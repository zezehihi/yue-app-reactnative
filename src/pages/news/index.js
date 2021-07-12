import Api from '@/api/api';
import TopNav from '@/components/topNav';
import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import request from '@/services/request';
import {NavigationContext} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {Carousel} from 'teaset';
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
        <TopNav
          title="资讯"
          style={{
            paddingLeft: size.globalPadding,
            paddingRight: size.globalPadding,
          }}
        />
        {news.length != 0 && (
          <View
            style={{
              marginTop: pxToDpH(100),
              marginBottom: pxToDpH(80),
              paddingLeft: size.globalPadding,
              paddingRight: size.globalPadding,
            }}>
            <Carousel
              interval={6000}
              style={{height: pxToDpH(660)}}
              control={true}>
              {news.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  onPress={() => this.context.navigate('NewsDetail', v.id)}>
                  <Image
                    key={i}
                    style={{height: pxToDpH(660)}}
                    source={{uri: v?.newsimages[0].photolink}}
                  />
                </TouchableOpacity>
              ))}
            </Carousel>
          </View>
        )}
        <View style={{paddingBottom: pxToDpH(100)}}>
          {news.length != 0 ? (
            news.map((v, i) => (
              <TouchableOpacity
                onPress={() => this.context.navigate('NewsDetail', v.id)}
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
                        v.newsimages[0].photolink != null
                          ? pxToDpW(730)
                          : '100%',
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
        </View>
      </ScrollView>
    );
  }
}
export default Index;
