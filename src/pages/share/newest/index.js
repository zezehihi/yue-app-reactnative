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
import {Divider, Image, FAB} from 'react-native-elements';
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
  state = {};
  componentDidMount() {}

  render() {
    return (
      <View style={{position: 'relative', flex: 1}}>
        <ScrollView style={{position: 'relative'}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          <Text>newesthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</Text>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: '#b8dfef',
            position: 'absolute',
            width: pxToDpW(250),
            height: pxToDpW(250),
            borderRadius: pxToDpW(125),
            right: '10%',
            bottom: '10%',
            elevation: 10,
            shadowColor: '#888888',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: size.font1, color: '#ffffff'}}>发布</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Index;
