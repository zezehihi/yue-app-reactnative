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
    // news: '',
    news: {
      id: 1,
      title: '越剧《核桃树之恋》即将亮相北京、杭州，献礼建党百年',
      deploytime: '2021-06-25T19:34:34.000+00:00',
      authorid: 1,
      summary:
        '近日，原创越剧现代戏《核桃树之恋》在杭州蝴蝶剧场完成了内部彩排汇报，全体演职人员以饱满充沛的精神全面展示了最新创排成果，为7月赴北京参加由中共中央宣传部、文化和旅游部、中国文学艺术界联合会联合举办的“庆祝中国共产党成立100周年优秀舞台艺术作品展演”及浙江省庆祝建党百年百场舞台艺术作品展演做好积极筹备工作。',
      content:
        '近日，原创越剧现代戏《核桃树之恋》在杭州蝴蝶剧场完成了内部彩排汇报，全体演职人员以饱满充沛的精神全面展示了最新创排成果，为7月赴北京参加由中共中央宣传部、文化和旅游部、中国文学艺术界联合会联合举办的“庆祝中国共产党成立100周年优秀舞台艺术作品展演”及浙江省庆祝建党百年百场舞台艺术作品展演做好积极筹备工作。<skn>越剧《核桃树之恋》（合作版）由中共嵊州市委宣传部、嵊州市文化广电旅游局、浙江小百花越剧院出品，浙江小百花越剧院（浙江越剧团）、嵊州市越剧艺术保护传承中心（嵊州越剧团）联合演出。该剧根据嵊州市仙人坑村的真人真事进行创作，讲述了新中国“两弹一星”时代，一位核弹技术员与妻子之间平凡而又动人的爱情故事。全剧以小见大，将个人情爱与国家大爱紧密相连，艺术再现了共和国历史上忘一己之名、舍一己之利，为人民谋幸福、为民族谋复兴的“无名之辈”，描绘出一代科研工作者为新中国国防科技事业奉献一生的担当和责任，从小处窥见祖国的繁荣富强之梦。<skn>越剧《核桃树之恋》讲述的是一位核弹技术员与妻子之间平凡而又动人的爱情故事。<skn>根据嵊州仙人坑村的真人真事为素材进行创作，以核弹技术员妻子的视角和心路历程，展示出一群可歌可泣、可敬可爱的核弹技术员及他们的家人们的牺牲与奉献精神；以温馨浪漫的笔触，书写出一代无名英雄们的强国之梦。<skn>此剧可称之为“小故事、大情怀”，个人情爱与国家大爱紧密相连。她如泛着黄色的老照片，帮我们打开一段尘封的历史；以怀旧的文艺片风格为底色，再现一段逝去的峥嵘岁月。',
      numpictures: 3,
      newsimages: [
        {
          id: 1,
          newsid: 1,
          photonum: 1,
          photolink:
            'https://yun.1dtfc.com/yue/newsImages/aa18972bd40735faa50b870b7072babb0e2408b1.jpg',
          phototitle: null,
          photodesc: null,
        },
        {
          id: 1,
          newsid: 1,
          photonum: 2,
          photolink:
            'https://yun.1dtfc.com/yue/newsImages/b58f8c5494eef01f5f4aa7ed11dd2c2dbc317d6c.jpg',
          phototitle: null,
          photodesc: null,
        },
        {
          id: 1,
          newsid: 1,
          photonum: 3,
          photolink:
            'https://yun.1dtfc.com/yue/newsImages/ca1349540923dd544cce77553f2a06d69c82487e.jpg',
          phototitle: null,
          photodesc: null,
        },
      ],
      author: {
        id: 1,
        authorname: '浙里有艺事',
        authoravatar:
          'https://yun.1dtfc.com/yue/authorAvatars/uc.101.b0b728e8.jpg',
      },
    },
    inputComment: '',
    showModal: true,
    comments: '',
  };
  constructor() {
    super();
    this.overlayViewRef = null;
  }
  componentDidMount() {
    //this.getNews();
    // this.setState({news: this.props.route.params}, () =>
    //   console.log(this.state.news),
    // );
    this.getCommentList();
  }
  getCommentList = async () => {
    const {ACTION_GET_COMMENT_LIST} = Api;
    const {news} = this.state;
    const url = ACTION_GET_COMMENT_LIST.replace(':commentId', news.id);
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
          width={5}
          style={{
            marginBottom: pxToDpH(20),
            marginTop: pxToDpH(20),
            width: pxToDpW(560),
          }}
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
