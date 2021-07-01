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
import {Divider, Button} from 'react-native-elements';
import {Select} from 'teaset';
import TopNav from '@/components/topNav';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import {ActionSheet, Toast} from 'teaset';
import IconFont from '@/components/IconFont';
import {observer, inject} from 'mobx-react';
import {NavigationContext} from '@react-navigation/native';
@observer
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    myComments: '',
  };
  async componentDidMount() {
    await this.getMyCommentList();
  }
  getMyCommentList = async () => {
    const {ACTION_GET_USER_COMMENT_LIST} = Api;
    const url = ACTION_GET_USER_COMMENT_LIST.replace(
      ':userId',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    this.setState({myComments: res.data.comments});
  };
  comments = () => {
    const {myComments} = this.state;
    if (myComments.length == 0) return <></>;

    return myComments.map((v, i) => {
      let Type = '';
      switch (v.type) {
        case 0:
          Type = 'NewsDetail';
          break;
        case 1:
          Type = 'MusicDetail';
          break;
        case 1014:
          Type = 'VideoDetail';
          break;
      }
      return (
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: pxToDpW(20),
            padding: size.globalPadding,
            elevation: 10,
            shadowColor: '#888888',
            marginBottom: pxToDpW(30),
          }}>
          <Text
            style={{
              color: '#627681',
              fontSize: size.font2,
            }}>
            {v.createTime.slice(0, 10)}&emsp;{v.createTime.slice(11, 19)}
          </Text>

          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
          />
          <Text style={{}}>&emsp;&emsp;{v.content}</Text>
          <Button
            title="查看详情"
            type="clear"
            buttonStyle={{marginTop: pxToDpH(20)}}
            titleStyle={{fontSize: size.font2}}
            onPress={() => this.context.navigate(Type, v.commentid)}
          />
        </View>
      );
    });
  };
  render() {
    const {myComments} = this.state;
    return (
      <ScrollView
        style={{
          padding: size.globalPadding,
          paddingTop: 0,
        }}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <TopNav title="我的点评" />
        <View
          style={{
            flexDirection: 'column',
            paddingTop: pxToDpH(30),
          }}>
          {this.comments()}
        </View>
      </ScrollView>
    );
  }
}
export default Index;
