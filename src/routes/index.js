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
import News from '@/pages/news';
import SearchResult from '@/pages/searchResult';
import MusicDetail from '@/pages/music/musicDetail';
import VideoDetail from '@/pages/video/videoDetail';
import SetMyInfo from '@/pages/my/setMyInfo';
import NewsDetail from '@/pages/news/newsDetail';
import Collect from '@/pages/my/collect';
import Video from '@/pages/video';
import Music from '@/pages/music';
import MyComments from '@/pages/my/myComments';
import Share from '@/pages/share';
import Newest from '@/pages/share/newest';
import Publish from '@/pages/share/publish';
import Recommend from '@/pages/share/recommend';

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
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="TabBar" component={TabBar} />
          <Stack.Screen name="MusicDetail" component={MusicDetail} />
          <Stack.Screen name="VideoDetail" component={VideoDetail} />
          <Stack.Screen name="SetMyInfo" component={SetMyInfo} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} />
          <Stack.Screen name="Collect" component={Collect} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Music" component={Music} />
          <Stack.Screen name="MyComments" component={MyComments} />
          <Stack.Screen name="Share" component={Share} />
          <Stack.Screen name="Newest" component={Newest} />
          <Stack.Screen name="Publish" component={Publish} />
          <Stack.Screen name="Recommend" component={Recommend} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
