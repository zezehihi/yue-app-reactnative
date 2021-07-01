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
import {Carousel, ActionSheet, Toast} from 'teaset';
import SearchBar from '@/components/searchBar';
import {Divider, Avatar, Image, Button, Input} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {NavigationContext} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    inputComment: '',
    images: '',
    imagesUrl: [],
  };
  componentDidMount() {
    console.log(this.props.route.params);
  }
  uploadImages = async () => {
    const images = await ImagePicker.openPicker({
      multiple: true,
    });
    let formData = new FormData();
    let data = [];
    for (let i = 0; i < images.length; i++) {
      // data.push({
      //   uri: images[i].path,
      //   type: images[i].mime,
      //   name: images[i].path.split('/').pop(),
      // });
      // formData.append('file', data);
      formData.append('file', {
        uri: images[i].path,
        type: images[i].mime,
        name: images[i].path.split('/').pop(),
      });
    }
    const {FILE_UPLOAD_SHAREIMAGES} = Api;
    const res = await request.post(FILE_UPLOAD_SHAREIMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    this.setState({imagesUrl: res.data.list});
  };
  showActionSheet = () => {
    let items = [{title: '上传图片', onPress: this.uploadImages}];
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
  };
  postShare = async () => {
    const {SHARE_SHARE} = Api;
    const {inputComment, imagesUrl} = this.state;
    const params = {
      content: inputComment,
      images: imagesUrl.length,
      urls: imagesUrl,
      userId: this.props.AccountStore.userId,
    };
    const res = await request.post(SHARE_SHARE, params);
    const {success} = res.data;
    if (success) {
      Toast.smile('发表成功！', 1000);
      // this.props.navigation.navigate("Tabbar");
      // this.props.navigation.reset({
      //   routes: [{name: 'TabBar'}],
      // });
      this.props.navigation.goBack();
      this.props.route.params.refresh();
    }
  };
  render() {
    const {inputComment, imagesUrl} = this.state;
    return (
      <ScrollView>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View>
          <TopNav
            title="发布动态"
            style={{
              paddingLeft: size.globalPadding,
              paddingRight: size.globalPadding,
            }}
            hasRight={true}
            rightIcon="send"
            onRightPress={this.postShare}
          />
          <View
            style={{
              backgroundColor: '#fff',
              minWidth: 300,
              minHeight: 240,
              padding: size.globalPadding,
              flexDirection: 'column',
            }}>
            <View style={{}}>
              <Input
                placeholder="写评论..."
                multiline={true}
                style={{
                  height: pxToDpH(500),
                  alignItems: 'flex-start',
                }}
                inputStyle={{
                  fontSize: size.font2,
                  color: '#888888',
                  lineHeight: size.font2,
                  textAlignVertical: 'top',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'rgba(255, 255, 255, 0)',
                }}
                onChangeText={text => this.setState({inputComment: text})}
              />
            </View>
            {/* 图片 */}
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {console.log(imagesUrl.length)}
              {imagesUrl.length != 0 &&
                imagesUrl.map((v, i) => (
                  <Image
                    key={i}
                    style={{
                      width: 80,
                      height: 80,
                      margin: pxToDpW(20),
                    }}
                    source={{
                      uri: v,
                    }}
                  />
                ))}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: size.globalPadding,
            paddingTop: pxToDpH(20),
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#627681',
              fontSize: pxToDpH(60),
              marginRight: pxToDpW(30),
            }}>
            {inputComment.length}
          </Text>
          <TouchableOpacity onPress={this.showActionSheet}>
            <IconFont
              name="images"
              style={{
                color: '#627681',
                fontSize: pxToDpH(60),
                marginRight: pxToDpW(30),
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
export default Index;
