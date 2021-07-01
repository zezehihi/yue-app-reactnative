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
import SearchBar from '@/components/searchBar';
import {Divider, Image} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {observer} from 'mobx-react';
import Newest from '@/pages/share/newest';
import Publish from '@/pages/share/publish';
import CustomerBar from '@/pages/share/components/CustomerBar';

import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {NavigationContext} from '@react-navigation/native';
@observer
class Index extends Component {
  static contextType = NavigationContext;
  state = {};
  componentDidMount() {}

  render() {
    return (
      <ScrollableTabView
        style={{}}
        initialPage={0}
        renderTabBar={() => <CustomerBar />}>
        <Newest tabLabel="最新" />
        <Newest tabLabel="推荐" />
      </ScrollableTabView>
    );
  }
}
export default Index;
