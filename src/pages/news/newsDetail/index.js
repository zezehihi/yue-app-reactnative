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
import {Divider, Avatar, Image} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer} from 'mobx-react';
class Index extends Component {
  state = {
    news: '',
  };
  componentDidMount() {
    //this.getNews();
    this.setState({news: this.props.route.params}, () =>
      console.log(this.state.news),
    );
  }
  newsContent = () => {
    const {news} = this.state;
    const content = news.content?.split('<skn>');
    console.log(content);
    return (
      <View>
        {content?.map((v, i) => (
          <Text
            style={{
              color: '#627681',
              paddingBottom: pxToDpH(30),
              fontsize: size.font3,
            }}>
            &emsp;&emsp;{v}
          </Text>
        ))}
      </View>
    );
  };

  render() {
    const {news} = this.state;
    return (
      <ScrollView style={{padding: size.globalPadding, paddingTop: 0}}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <TopNav />
        <Text
          style={{textAlign: 'center', fontSize: size.font1, color: '#1692c0'}}>
          {news.title}
        </Text>
        <Divider
          orientation="vertical"
          width={5}
          style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: pxToDpH(20),
          }}>
          <Avatar
            rounded
            source={{uri: news.author?.authoravatar}}
            size="medium"
          />
          <View style={{flexDirection: 'column', paddingLeft: pxToDpW(50)}}>
            <Text style={{color: '#627681', fontSize: size.font2}}>
              {news.author?.authorname}
            </Text>
            <Text style={{color: '#627681', fontSize: pxToDpW(30)}}>
              {news.deploytime?.slice(0, 10)}&emsp;
              {news.deploytime?.slice(11, 19)}
            </Text>
          </View>
        </View>
        <View style={{marginTop: pxToDpH(40)}}>
          <Carousel
            interval={4000}
            style={{height: pxToDpH(660)}}
            control={true}>
            {news.newsimages?.map((v, i) => (
              <Image
                style={{height: pxToDpH(660)}}
                source={{uri: v?.photolink}}
              />
            ))}
          </Carousel>
        </View>
        <View style={{marginTop: pxToDpH(40)}}>{this.newsContent()}</View>
      </ScrollView>
    );
  }
}
export default Index;
