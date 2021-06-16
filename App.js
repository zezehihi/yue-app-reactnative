import React, {Component} from 'react';
import {View} from 'react-native';
import RootStore from '@/stores';
import {Provider} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import AccountStore from '@/stores/account';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import Nav from '@/routes';
import {Theme} from 'teaset';
export default class App extends Component {
  state = {
    showNav: false,
  };
  async componentDidMount() {
    // 修改teasetTheme
    Theme.set({
      apItemTitleColor: 'black',
      apBorderRadius: 20,
    });
    // 获取缓存中的用户数据 手机本地
    const strUserInfo = await AsyncStorage.getItem('userinfo');
    const userinfo = strUserInfo ? JSON.parse(strUserInfo) : {};
    // 判断有没有token
    if (userinfo.token) {
      //TODO 把缓存中的数据存一份到mobx中
      AccountStore.setUserInfo(
        userinfo.tel,
        userinfo.token,
        userinfo.userId,
        userinfo.username,
        userinfo.photo,
      );
    }
    // 检查完成后再显示nav
    this.setState({showNav: true});
  }
  render() {
    let store = RootStore;
    return (
      <View style={{flex: 1, backgroundColor: color.globalBackgroundColor}}>
        <Provider {...store}>
          {this.state.showNav ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
}
