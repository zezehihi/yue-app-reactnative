import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';
import Login from '@/pages/account/login';
import Register from '@/pages/account/register';
import Index from '@/pages/index';
import BottomBar from '@/pages/bottomBar';
import TabBar from '@/pages/tabBar';
import My from '@/pages/my';
import Store from '@/pages/store';
import Message from '@/pages/message';
import YueJu from '@/pages/yueju';
import Collect from '@/pages/collect';
import SearchResult from '@/pages/searchResult';
import Music from '@/pages/music';
import Video from '@/pages/video';
import SetMyInfo from '@/pages/my/setMyInfo';

const Stack = createStackNavigator();

@inject('AccountStore')
@observer
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: this.props.AccountStore.token ? 'TabBar' : 'Login',
    };
  }
  render() {
    const {initialRouteName} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="My" component={My} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="YueJu" component={YueJu} />
          <Stack.Screen name="Collect" component={Collect} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="Music" component={Music} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="SetMyInfo" component={SetMyInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
