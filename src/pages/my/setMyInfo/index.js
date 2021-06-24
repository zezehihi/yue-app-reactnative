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
import {ActionSheet} from 'teaset';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import SoundPlayer from 'react-native-sound-player';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import {ListItem, Avatar} from 'react-native-elements';
import TopNav from '@/components/topNav';
import {NavigationContext} from '@react-navigation/native';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {user: ''};
  componentDidMount() {
    this.getUserInfo();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
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
  selectUpdateAvatar = () => {
    let items = [{title: '上传头像', onPress: () => alert('Hello')}];
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
  };

  render() {
    const {user} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
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
        <ListItem bottomDivider>
          <IconFont name="user" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.nickname}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <IconFont name="infoCircle" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.username}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <IconFont name="phone" style={{color: '#cccccc'}} />
          <ListItem.Content>
            <ListItem.Title>{user.tel}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }
}
export default Index;
