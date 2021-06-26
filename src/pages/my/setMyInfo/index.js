import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Divider} from 'react-native-elements';
import {ActionSheet, Toast, Overlay} from 'teaset';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import {Isao} from 'react-native-textinput-effects';
import {ListItem, Avatar, Button} from 'react-native-elements';
import TopNav from '@/components/topNav';
import {NavigationContext} from '@react-navigation/native';
import {Primary} from '@/components/button';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    user: '',
    inputData: '',
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    const {GET_USER_INFORMATION} = Api;
    const url = GET_USER_INFORMATION.replace(
      ':id',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    this.setState({user: res.data.user}, () => console.log(this.state.user));
  };
  updateUserInfo = async (select, data) => {
    const {user} = this.state;
    const {UPDATE_USER_INFORMATION} = Api;
    const params = {
      select,
      data,
      id: user.id,
    };
    const res = await request.post(UPDATE_USER_INFORMATION, params);
    const {success} = res.data;
    if (success == true) {
      Toast.success('更新成功');
      this.getUserInfo();
    } else {
      Toast.sad('更新失败');
    }
  };
  selectUpdateAvatar = () => {
    let items = [{title: '上传头像', onPress: this.uploadAvatar}];
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
  };

  uploadAvatar = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    let formData = new FormData();
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    });
    const {FILE_UPLOAD_AVATARS} = Api;
    const res = await request.post(FILE_UPLOAD_AVATARS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const ImageUri = res.data.url;
    this.updateUserInfo(0, ImageUri);
  };
  showOverlay = (data, select) => {
    const {inputData} = this.state;
    let overlayViewRef = null;
    let overlayView = (
      <Overlay.PopView
        ref={v => (overlayViewRef = v)}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: '#fff',
            minWidth: pxToDpW(900),
            minHeight: pxToDpH(550),
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Isao
            activeColor={color.topColorBlue}
            borderHeight={4}
            inputPadding={16}
            labelHeight={24}
            passiveColor={color.mutedGray}
            labelStyle={{
              fontWeight: 'normal',
            }}
            inputStyle={{
              backgroundColor: color.inputColor,
              elevation: 10,
              shadowColor: '#888888',
              color: color.mutedGray,
              fontWeight: 'normal',
            }}
            style={{
              marginTop: pxToDpH(100),
              marginBottom: pxToDpH(110),
              width: pxToDpW(700),
            }}
            defaultValue={data}
            onChangeText={text => this.setState({inputData: text})}
          />
          <Button
            title="确定"
            type="Outline"
            buttonStyle={{marginTop: 0}}
            onPress={() => {
              this.updateUserInfo(select, this.state.inputData);
              overlayViewRef.close();
            }}
          />
        </View>
      </Overlay.PopView>
    );
    Overlay.show(overlayView);
  };
  render() {
    const {user} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
          paddingTop: 0,
        }}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <TopNav />
        {/* 用户信息 */}
        <ListItem bottomDivider onPress={() => this.selectUpdateAvatar()}>
          <ListItem.Content>
            <Avatar source={{uri: user.photo}} rounded size="large" />
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          bottomDivider
          onPress={() => this.showOverlay(user.nickname, 2)}>
          <IconFont name="user" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.nickname}</ListItem.Title>
            <ListItem.Subtitle>昵称</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          bottomDivider
          onPress={() => this.showOverlay(user.username, 1)}>
          <IconFont name="infoCircle" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.username}</ListItem.Title>
            <ListItem.Subtitle>用户名</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={() => this.showOverlay(user.tel, 4)}>
          <IconFont name="phone" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.tel}</ListItem.Title>
            <ListItem.Subtitle>手机号</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }
}
export default Index;
