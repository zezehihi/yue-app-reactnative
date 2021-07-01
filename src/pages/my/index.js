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
import {Primary} from '@/components/button';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import {ActionSheet, Toast} from 'teaset';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
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
  loginOut = async () => {
    const tmplogout = async () => {
      console.log('执行退出');
      // 清除缓存
      await AsyncStorage.removeItem('userinfo');
      // 清除用户数据
      this.props.AccountStore.clearUserInfo();
      // 清除token数据

      Toast.smile('退出成功', 2000);

      setTimeout(() => {
        this.context.navigate('Login');
      }, 2000);
    };

    const opts = [{title: '退出', onPress: tmplogout}];
    ActionSheet.show(opts, {title: '取消'});
  };
  render() {
    const {user} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
          paddingTop: 0,
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
        {/* 各种按钮 */}
        <View
          style={{
            backgroundColor: '#fefefe',
            marginTop: pxToDpH(80),
            padding: pxToDpH(30),
            borderRadius: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            elevation: 10,
            shadowColor: '#eeeeee',
          }}>
          <TouchableOpacity
            onPress={() => this.context.navigate('Collect')}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconFont
              name="starFill"
              style={{color: '#4997c1', fontSize: pxToDpW(100)}}
            />
            <Text
              style={{
                color: '#404a50',
                fontSize: size.font2,
                textAlign: 'center',
                alignItems: 'center',
              }}>
              我的收藏
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.context.navigate('MyComments')}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconFont
              name="comments"
              style={{color: '#4997c1', fontSize: pxToDpW(100)}}
            />
            <Text
              style={{
                color: '#404a50',
                fontSize: size.font2,
                textAlign: 'center',
              }}>
              我的评论
            </Text>
          </TouchableOpacity>
        </View>
        {/* 其他按钮 */}
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Primary
            style={{marginTop: pxToDpH(200)}}
            width={pxToDpW(900)}
            height={pxToDpH(180)}
            onPress={this.loginOut}>
            退出
          </Primary>
        </View>
      </View>
    );
  }
}
export default Index;
