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
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Carousel, Overlay, Toast, ActionSheet} from 'teaset';
import {Divider, Avatar, Image, Button, Input} from 'react-native-elements';
import Api from '@/api/api';
import request from '@/services/request';
import TopNav from '@/components/topNav';
import IconFont from '@/components/IconFont';
import {Isao} from 'react-native-textinput-effects';
import {observer, inject} from 'mobx-react';
@inject('AccountStore')
class Index extends Component {
  state = {
    news: '',
    newsId: '',
    inputComment: '',
    showModal: true,
    comments: '',
  };
  constructor() {
    super();
    this.overlayViewRef = null;
  }
  async componentDidMount() {
    const id = this.props.route.params;
    await this.getNews(id);
    await this.getCommentList(id);
  }
  getNews = async id => {
    const {GET_NEWS} = Api;
    const url = GET_NEWS.replace(':id', id);
    const res = await request.get(url);
    this.setState({news: res.data.news});
  };
  getCommentList = async id => {
    const {ACTION_GET_COMMENT_LIST} = Api;
    const {news} = this.state;
    const url = ACTION_GET_COMMENT_LIST.replace(':commentId', id).replace(
      ':type',
      0,
    );
    const res = await request.get(url);
    console.log(res);
    this.setState({comments: res.data.comments});
  };
  comment = async () => {
    const {ACTION_COMMENT} = Api;
    const {inputComment, news} = this.state;
    if (inputComment.length != 0) {
      const params = {
        userId: this.props.AccountStore.userId,
        type: 0,
        content: inputComment,
        commentId: news.id,
      };
      const res = await request.post(ACTION_COMMENT, params);
      const {success} = res.data;
      if (success == true) {
        await this.getCommentList();
        this.overlayViewRef.close();
      } else {
        Toast.sad('评论未成功！', 4000);
      }
    } else {
      Toast.sad('尚未输入！', 4000);
    }
  };
  newsContent = () => {
    const {news} = this.state;
    const content = news.content?.split('<skn>');
    return (
      <View>
        {content?.map((v, i) => (
          <Text
            style={{
              color: '#627681',
              paddingBottom: pxToDpH(30),
            }}>
            &emsp;&emsp;{v}
          </Text>
        ))}
      </View>
    );
  };
  showOverlay = () => {
    const {inputComment} = this.state;
    let overlayView = (
      <Overlay.PullView
        ref={ref => (this.overlayViewRef = ref)}
        side="bottom"
        modal={false}>
        <View
          style={{
            backgroundColor: '#fff',
            minWidth: 300,
            minHeight: 260,
            padding: size.globalPadding,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              title="取消"
              type="clear"
              onPress={() => {
                this.overlayViewRef.close();
                this.setState({inputComment: ''});
              }}
            />
            <Button title="提交" type="clear" onPress={this.comment} />
          </View>
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
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color: '#627681', fontSize: size.font2}}>
              {inputComment.length}
            </Text>
          </View>
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  };
  deleteComment = id => {
    const tmpdelete = async () => {
      const {ACTION_DELETE_COMMENT} = Api;
      const url = ACTION_DELETE_COMMENT.replace(':id', id);
      const res = await request.get(url);
      await this.getCommentList();
    };

    const opts = [{title: '删除评论', onPress: tmpdelete}];
    ActionSheet.show(opts, {title: '取消'});
  };
  commentList = () => {
    const {comments} = this.state;
    if (comments.length == 0) {
      return <></>;
    }
    return comments.map((v, i) => (
      <View
        style={{
          flexDirection: 'column',
          paddingTop: pxToDpH(20),
          paddingBottom: pxToDpH(20),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar source={{uri: v.user.photo}} size="medium" rounded />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              paddingLeft: pxToDpW(30),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#0088ba', fontSize: size.font2}}>
                {v.user.nickname}
              </Text>
              <Text style={{color: '#cccccc', fontSize: pxToDpW(30)}}>
                {v.createTime.slice(0, 10)}&emsp;{v.createTime.slice(11, 19)}
              </Text>
              {v.userid == this.props.AccountStore.userId && (
                <TouchableOpacity onPress={() => this.deleteComment(v.id)}>
                  <Text style={{color: '#bbbbbb', fontSize: pxToDpW(30)}}>
                    删除
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={{
                color: '#627681',
                fontSize: size.font2,
                flexWrap: 'wrap',
              }}>
              {v.content}
            </Text>
          </View>
        </View>

        <Divider
          orientation="vertical"
          width={5}
          style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
        />
      </View>
    ));
  };
  render() {
    const {news, showModal} = this.state;
    return (
      <View style={{paddingTop: 0, flex: 1}}>
        <ScrollView
          style={{padding: size.globalPadding, paddingTop: 0, flex: 1}}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          <TopNav />
          <Text
            style={{
              textAlign: 'center',
              fontSize: size.font1,
              color: '#1692c0',
            }}>
            {news.title}
          </Text>
          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: pxToDpH(20),
            }}>
            <Avatar
              rounded
              source={{uri: news.author?.authoravatar}}
              size="medium"
            />
            <View style={{flexDirection: 'column', paddingLeft: pxToDpW(50)}}>
              <Text style={{color: '#627681', fontSize: size.font2}}>
                {news.author?.authorname}
              </Text>
              <Text style={{color: '#627681', fontSize: pxToDpW(30)}}>
                {news.deploytime?.slice(0, 10)}&emsp;
                {news.deploytime?.slice(11, 19)}
              </Text>
            </View>
          </View>
          <View style={{marginTop: pxToDpH(40)}}>
            <Carousel
              interval={4000}
              style={{height: pxToDpH(660)}}
              control={true}>
              {news.newsimages?.map((v, i) => (
                <Image
                  style={{height: pxToDpH(660)}}
                  source={{uri: v?.photolink}}
                />
              ))}
            </Carousel>
          </View>
          <View style={{marginTop: pxToDpH(40)}}>{this.newsContent()}</View>
          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
          />
          <View style={{marginTop: pxToDpH(40)}}>
            <Text style={{color: '#627681', fontSize: size.font3}}>
              评论列表
            </Text>
            <View style={{flexDirection: 'column'}}>{this.commentList()}</View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#eeeeee',
            paddingLeft: size.globalPadding,
            paddingRight: size.globalPadding,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={this.showOverlay}
            activeOpacity={1}
            style={{
              backgroundColor: '#f9f9f9',
              width: pxToDpW(600),
              borderRadius: pxToDpW(30),
              height: pxToDpH(100),
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: pxToDpW(30),
            }}>
            <IconFont
              name="editFill"
              style={{
                color: '#888888',
                fontSize: size.font2,
                paddingRight: pxToDpW(30),
              }}
            />
            <Text
              style={{
                color: '#888888',
                fontSize: size.font2,
              }}>
              发布评论
            </Text>
          </TouchableOpacity>
          <Button
            title="确定"
            type="clear"
            buttonStyle={{marginTop: 0}}
            onPress={() => {
              this.updateUserInfo(select, this.state.inputData);
              overlayViewRef.close();
            }}
          />
        </View>
      </View>
    );
  }
}
export default Index;
