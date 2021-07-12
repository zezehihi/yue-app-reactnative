import Api from '@/api/api';
import TopNav from '@/components/topNav';
import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import request from '@/services/request';
import {NavigationContext} from '@react-navigation/native';
import {inject} from 'mobx-react';
import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Badge, Divider, Image} from 'react-native-elements';
import {Carousel} from 'teaset';

@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    musicList: '',
    activeIndex: '',
    collect: '',
    selectType: 1,
    collectDetails: '',
    newMusicList: '',
  };
  async componentDidMount() {
    await this.getMusicList();
    await this.getCollectList();
  }
  getMusicList = async () => {
    const {SEARCH} = Api;
    // SEARCH: `${MUSIC_URI}/?keywords=:&type=:type&offset=:offset&limit=:limit`,
    const url = SEARCH.replace(':keywords', '越剧')
      .replace(':type', 1)
      .replace(':offset', '')
      .replace(':limit', '');

    let res = await request.get(url);

    this.setState({
      musicList: res.data.result.songs,
      newMusicList: res.data.result.songs.slice(0, 5),
    });
    console.log(res);
  };
  getCollectList = async () => {
    const {ACTION_GET_COLLECT_LIST, GET_MUSIC_INFORMATION} = Api;
    const url = ACTION_GET_COLLECT_LIST.replace(
      ':userId',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    const collect = res.data.collect.filter(v => v.type === 1).pop();
    const urlm = GET_MUSIC_INFORMATION.replace(':musicId', collect.mvid);
    const resm = await request.get(urlm);

    this.setState({recentCollect: resm.data.songs[0]});
  };
  musicList = () => {
    const {musicList, newMusicList} = this.state;
    if (newMusicList.length == 0) return <></>;
    return newMusicList.map((v, i) => {
      console.log(v);
      const uri = v.al.picUrl;
      const title = v.name;
      const desc = v?.alia[0];
      const id = v?.id;
      const Type = 'Music';
      return (
        <TouchableOpacity
          onPress={() => this.context.navigate('VideoDetail', v.vid)}
          key={i}
          style={{
            padding: size.globalPadding,
            paddingBottom: pxToDpH(10),
            paddingTop: pxToDpH(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: uri}}
              style={{width: pxToDpW(400), height: pxToDpH(300)}}
            />
            <View
              style={{
                paddingLeft: pxToDpW(60),
                flexDirection: 'column',
                flex: 1,
              }}>
              <Text style={{color: '#6b7a85', fontSize: pxToDpW(44)}}>
                {title}
              </Text>
              <Text style={{color: '#6b7a85', fontSize: size.font2}}>
                {desc}
              </Text>
            </View>
          </View>
          <Divider
            orientation="vertical"
            width={5}
            style={{marginBottom: pxToDpH(20), marginTop: pxToDpH(20)}}
          />
        </TouchableOpacity>
      );
    });
  };
  render() {
    const {musicList, newMusicList, recentCollect} = this.state;
    return (
      <ScrollView
        style={{
          padding: size.globalPadding,
          paddingTop: 0,
        }}>
        <TopNav title="越曲" />
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 视频轮播图 */}
        <View
          style={{
            marginTop: pxToDpH(30),
          }}>
          {musicList.slice(4).length != 0 && (
            <View
              style={{
                marginBottom: pxToDpH(80),
              }}>
              <Carousel
                onChange={(index, total) => this.setState({activeIndex: index})}
                interval={6000}
                style={{height: pxToDpH(660)}}
                control={true}>
                {musicList.slice(0, 5).map((v, i) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.context.navigate('MusicDetail', v.id)}>
                    <Image
                      key={i}
                      style={{height: pxToDpH(660)}}
                      source={{uri: v?.al.picUrl}}
                    />
                  </TouchableOpacity>
                ))}
              </Carousel>
            </View>
          )}
        </View>
        {/* 最近收藏详情 */}
        <View
          style={{
            paddingBottom: pxToDpH(30),
            elevation: 10,
            shadowColor: '#cccccc',
            backgroundColor: '#fefefe',
            borderRadius: pxToDpH(20),
            padding: pxToDpW(30),
            marginBottom: pxToDpH(50),
          }}>
          <View style={{padding: pxToDpW(20)}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: size.font3,
                color: '#2282b4',
                marginBottom: pxToDpH(20),
              }}>
              最近收藏
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.context.navigate('MusicDetail', recentCollect.id)
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: recentCollect?.al.picUrl}}
                containerStyle={{borderRadius: 20}}
                style={{width: pxToDpW(360), height: pxToDpW(200)}}
              />
              <View
                style={{
                  paddingLeft: pxToDpW(20),
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: size.font2,
                    color: '#5b6c79',
                  }}>
                  {recentCollect?.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: pxToDpH(20),
                    flexWrap: 'wrap',
                  }}>
                  {recentCollect?.ar.map((v, i) => (
                    <Badge
                      badgeStyle={{
                        backgroundColor: '#909090',
                        marginBottom: pxToDpH(10),
                      }}
                      value={v.name}
                      status="success"
                    />
                  ))}
                  {recentCollect?.al && (
                    <Badge value={recentCollect?.al.name} status="success" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* 视频列表 */}
        <View>
          <Text
            style={{
              fontSize: size.font1,
              textAlign: 'center',
              color: '#3d7dae',
            }}>
            越曲列表
          </Text>
          <View
            style={{
              paddingBottom: pxToDpH(30),
              elevation: 10,
              shadowColor: '#cccccc',
              backgroundColor: '#fefefe',
              borderRadius: pxToDpH(20),
              marginTop: pxToDpW(30),
              justifyContent: 'center',
              flexDirection: 'column',
              paddingTop: pxToDpH(60),
            }}>
            {this.musicList()}
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Index;
