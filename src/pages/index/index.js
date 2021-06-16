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
        {/* 导航栏区域  */}
        <View
          style={{
            paddingLeft: size.globalPadding,
            paddingRight: size.globalPadding,
          }}>
          <Swiper />
          {/* 导航栏图标 */}
          <View
            style={{
              marginTop: pxToDpH(70),
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/store.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>商城</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/newSong.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>新曲</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/news.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>资讯</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchableOpacity}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/images/icons/accompaniment.png')}
                  resizeMode={'stretch'}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.iconText}>伴奏</Text>
            </TouchableOpacity>
          </View>
          {/*  */}
        </View>
        {/* 专栏:热度推荐 */}
        <View
          style={{
            marginTop: pxToDpH(150),
          }}>
          <Text style={styles.columnTitle}>热度推荐</Text>
          <View
            style={{
              elevation: 5,
              shadowColor: '#d5d5d5',
              height: pxToDpH(850),
              marginLeft: size.globalPadding,
              marginRight: size.globalPadding,
              borderRadius: pxToDpW(60),
              display: 'flex',
              paddingTop: pxToDpH(80),
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
          </View>
        </View>
        {/* 专栏:热度推荐 */}
        <View
          style={{
            marginTop: pxToDpH(150),
          }}>
          <Text style={styles.columnTitle}>名家唱段</Text>
          <View
            style={{
              elevation: 5,
              shadowColor: '#d5d5d5',
              height: pxToDpH(850),
              marginLeft: size.globalPadding,
              marginRight: size.globalPadding,
              borderRadius: pxToDpW(60),
              display: 'flex',
              paddingTop: pxToDpH(80),
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
            <View style={styles.columnItemsContainer}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  width: '100%',
                  height: '70%',
                  marginBottom: pxToDpH(20),
                }}>
                <Image
                  source={require('@/assets/images/1.jpg')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={{textAlign: 'center', fontSize: size.font2}}>
                《刘毅传书》 上
              </Text>
            </View>
          </View>
        </View>
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
