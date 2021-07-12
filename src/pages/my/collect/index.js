import Api from '@/api/api';
import IconFont from '@/components/IconFont';
import SearchBar from '@/components/searchBar';
import TopNav from '@/components/topNav';
import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import request from '@/services/request';
import {NavigationContext} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {Select} from 'teaset';
@observer
@inject('AccountStore')
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    collect: '',
    selectType: 1,
    collectDetails: '',
    search: '',
    list: '',
  };
  async componentDidMount() {
    await this.getCollectList();

    await this.getCollectListDetail();
  }
  getCollectList = async () => {
    const {ACTION_GET_COLLECT_LIST} = Api;
    const url = ACTION_GET_COLLECT_LIST.replace(
      ':userId',
      this.props.AccountStore.userId,
    );
    const res = await request.get(url);
    this.setState({collect: res.data.collect});
  };
  getCollectListDetail = async () => {
    const {VIDEO_DETAIL, MUSIC_URI} = Api;
    let tmp = [];
    const {collect} = this.state;

    collect.length != 0 &&
      collect?.map(async (v, i) => {
        if (v.type == 1) {
          const urlm = `${MUSIC_URI}/song/detail?ids=${v.mvid}`;
          const resm = await request.get(urlm);
          this.setState({
            collectDetails: [...this.state.collectDetails, resm.data.songs[0]],
          });
        } else if (v.type == 1014) {
          const urlv = VIDEO_DETAIL.replace(':id', v.mvid);
          const resv = await request.get(urlv);
          this.setState({
            collectDetails: [...this.state.collectDetails, resv.data.data],
          });
        }
      });
  };
  topSelects = () => {
    const {selectType} = this.state;
    const typeItem = [
      {text: '音乐', value: 1},
      {text: '视频', value: 1014},
    ];
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: pxToDpH(30),
        }}>
        <Select
          style={{
            width: pxToDpW(300),
            borderRadius: 0,
            borderRadius: 5,
            borderWidth: 0,
            elevation: 10,
            shadowColor: '#888888',
          }}
          valueStyle={{color: '#7fbad9', textAlign: 'center'}}
          icon={<IconFont name="down" style={{color: '#7fbad9'}} />}
          iconTintColor={{color: '#7fbad9'}}
          items={typeItem}
          value={selectType}
          pickerType="popover"
          getItemValue={(item, index) => item.value}
          getItemText={(item, index) => item.text}
          onSelected={(item, index) => {
            this.setState({selectType: item.value}, () => this.collectList());
          }}
        />
      </View>
    );
  };
  collectList = () => {
    const {collectDetails, selectType} = this.state;
    if (collectDetails.length == 0) {
      return <></>;
    }
    return collectDetails.map((v, i) => {
      const uri = selectType == 1 ? v.al?.picUrl : v.coverUrl;
      const title = selectType == 1 ? v?.name : v.title;
      const desc = selectType == 1 ? v.al?.name : '';
      const id = selectType == 1 ? v?.id : v?.vid;
      const Type = selectType == 1 ? 'Music' : 'Video';
      if (uri) {
        return (
          <TouchableOpacity
            onPress={() => this.context.navigate(Type, id)}
            key={i}
            style={{
              // padding: size.globalPadding,
              paddingBottom: pxToDpH(10),
              paddingTop: pxToDpH(10),
              padding: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: uri}}
                style={{width: pxToDpW(400), height: pxToDpH(300)}}
              />
              <View
                style={{
                  paddingLeft: pxToDpW(60),
                  width: pxToDpW(600),
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
      }
    });
  };
  onEndEditing = () => {
    const {collectDetails, search} = this.state;
    const list = collectDetails.filter(
      v => v.name?.includes(search) || v.title?.includes(search),
    );
    this.setState({collectDetails: list});
    console.log(list);
  };
  onClear = () => {
    this.getCollectListDetail();
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
        <TopNav title="我的收藏" />
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            paddingTop: pxToDpH(30),
          }}>
          <SearchBar
            onChangeText={text => this.setState({search: text})}
            onEndEditing={this.onEndEditing}
            placeholder="搜索收藏"
            onClear={this.onClear}
          />
        </View>
        {/* 筛选栏 */}
        {this.topSelects()}
        {/* 收藏列表 */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            padding: size.globalPadding,
          }}>
          {this.collectList()}
        </View>
      </View>
    );
  }
}
export default Index;
