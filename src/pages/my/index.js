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
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import Slider from '@react-native-community/slider';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import Video from 'react-native-video';
import {NavigationContext} from '@react-navigation/native';
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    user: '',
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    const {GET_USER_INFORMATION} = Api;
    const url = GET_USER_INFORMATION.replace(
      ':id',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    this.setState({user: res.data.user}, () => console.log(this.state.user));
  };
  render() {
    const {user} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
        }}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 用户信息 */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: pxToDpH(100),
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: pxToDpW(125),
                overflow: 'hidden',
                marginRight: pxToDpW(60),
              }}>
              <Image
                source={{uri: user.photo}}
                style={{
                  width: pxToDpW(250),
                  height: pxToDpW(250),
                }}
              />
            </View>
            <Text style={{color: '#1b7eb2', fontSize: size.font1}}>
              {user.username}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.context.navigate('SetMyInfo')}>
            <IconFont
              name="right"
              style={{color: '#1b7eb2', fontSize: size.font1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Index;
