import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  Easing,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel} from 'teaset';
import SearchBar from '@/components/searchBar';
import {Divider, Image, Avatar} from 'react-native-elements';
import Api from '@/api/api';
import ImageViewer from 'react-native-image-zoom-viewer';
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
  state = {
    shares: '',
    showAlbum: false,
    imgUrls: [],
    currentIndex: 0,
  };
  componentDidMount() {
    this.getNewestList();
  }
  getNewestList = async () => {
    const {SHARE_GET_ALL_SHARE_LIST} = Api;
    const url = SHARE_GET_ALL_SHARE_LIST.replace(':sort', 0).replace(
      ':order',
      1,
    );
    const res = await request.get(url);
    console.log(res.data.share);
    this.setState({shares: res.data.share});
  };
  renderShares = () => {
    const {shares} = this.state;
    if (shares.length == 0) return <></>;
    return shares.map((v, i) => {
      return (
        <View
          key={i}
          style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            elevation: 10,
            shadowColor: '#888888',
            minHeight: pxToDpH(260),
            marginTop: pxToDpH(20),
            marginBottom: pxToDpH(20),
            padding: pxToDpH(30),
            paddingBottom: pxToDpH(60),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: pxToDpH(40),
            }}>
            <Avatar source={{uri: v.user?.photo}} size="medium" rounded />
            <View style={{flexDirection: 'column', paddingLeft: pxToDpW(30)}}>
              <Text style={{fontSize: pxToDpH(52), color: '#5b6c79'}}>
                {v.user.nickname}
              </Text>
              <Text style={{fontSize: size.font2, color: '#ccc'}}>
                {v.createTime.slice(0, 10)}&emsp;{v.createTime.slice(11, 19)}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: size.globalPadding,
              paddingRight: size.globalPadding,
              paddingBottom: pxToDpH(30),
            }}>
            <Text style={{fontSize: pxToDpH(40)}}>{v.content}</Text>
          </View>
          {/* 图片 */}
          {v.images != 0 && (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {v.shareimages.map((vv, ii) => (
                <TouchableOpacity
                  key={ii}
                  onPress={() => this.handleShowAlbum(i, ii)}>
                  <Image
                    source={{uri: vv.photolink}}
                    style={{
                      width: pxToDpW(220),
                      height: pxToDpW(220),
                      margin: pxToDpW(30),
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconFont
                name="comments"
                style={{color: '#ccc', fontSize: size.font2}}
              />
              <Text style={{color: '#ccc', fontSize: size.font2}}>
                {v.comments}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconFont
                name="heart"
                style={{color: '#ccc', fontSize: size.font2}}
              />
              <Text style={{color: '#ccc', fontSize: size.font2}}>
                {v.likes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };
  // 点击相册图片放大
  handleShowAlbum = (index, ii) => {
    const imgUrls = this.state.shares[index].shareimages.map(v => ({
      url: v.photolink,
    }));
    this.setState({imgUrls, currentIndex: ii, showAlbum: true});
  };
  updateFun = () => {
    console.log('updateFun');
    this.getNewestList();
  };
  render() {
    const {showAlbum, imgUrls, currentIndex} = this.state;
    const tmp = function () {
      console.log('update');
    };
    return (
      <View style={{position: 'relative', flex: 1}}>
        <ScrollView style={{position: 'relative'}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          <View
            style={{
              paddingLeft: size.globalPadding,
              paddingRight: size.globalPadding,
            }}>
            {this.renderShares()}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.context.navigate('Publish', {update: () => this.updateFun()})
          }
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
        <Modal visible={showAlbum} transparent={true}>
          <ImageViewer
            onClick={() => this.setState({showAlbum: false})}
            imageUrls={imgUrls}
            index={currentIndex}
            renderArrowLeft={() => <IconFont name="left" />}
          />
        </Modal>
      </View>
    );
  }
}
export default Index;
