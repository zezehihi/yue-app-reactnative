import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import Swiper from '@/pages/index/components/swiper';
class Index extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  componentDidMount() {}
  render() {
    const {search} = this.state;
    return (
      <ScrollView>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 搜索栏 */}
        <View
          style={{
            padding: size.globalPadding,
            alignItems: 'center',
          }}>
          <SearchBar />
        </View>
        {/* 筛选栏 */}
      </ScrollView>
    );
  }
}
export default Index;
const styles = StyleSheet.create({
  iconContainer: {
    width: pxToDpW(210),
    height: pxToDpW(210),
    backgroundColor: '#e6eff6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDpW(50),
  },
  iconImage: {
    width: pxToDpW(170),
    height: pxToDpW(170),
    margin: 'auto',
  },
  iconText: {
    textAlign: 'center',
    color: '#256ec0',
  },
  iconTouchableOpacity: {
    width: pxToDpW(210),
    height: pxToDpW(210),
  },
  columnTitle: {
    fontSize: size.font1,
    textAlign: 'center',
    color: '#3d7dae',
  },
  columnItemsContainer: {
    width: pxToDpW(420),
    height: pxToDpH(340),
    marginBottom: pxToDpH(20),
    marginTop: pxToDpH(20),
  },
});
