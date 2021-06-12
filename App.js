import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RootStore from '@/stores';
import Nav from '@/routes';
import {Provider} from 'mobx-react';
import {color, size} from '@/MyStyle';

export default class App extends Component {
  state = {};
  async componentDidMount() {
    // 获取缓存中的用户数据 手机本地
    const strUserInfo = await AsyncStorage.getItem('userinfo');
    const userinfo = strUserInfo ? JSON.parse(strUserInfo) : {};
    // 判断有没有token
    if (userinfo.token) {
      // TODO 把缓存中的数据存一份到mobx中
      //RootStore.setUserInfo(userinfo.mobile, userinfo.token, userinfo.usrId);
    }
  }
  render() {
    let store = RootStore;
    return (
      <View style={{flex: 1}}>
        <Provider {...store}>
          <Nav></Nav>
        </Provider>
      </View>
    );
  }
}
