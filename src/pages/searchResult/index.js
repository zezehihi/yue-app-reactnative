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
import {Select} from 'teaset';
import SearchBar from '@/components/searchBar';
import Api from '@/api/api';
import request from '@/services/request';
import IconFont from '@/components/IconFont';
import TopNav from '@/components/topNav';
import {Divider} from 'react-native-elements';
import {NavigationContext} from '@react-navigation/native';
class Index extends Component {
  static contextType = NavigationContext;
  state = {
    search: '',
    selectDuration: 0,
    selectPublish: 0,
    selectType: 1,
    resultList: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  async componentDidMount() {
    const params = this.props.route.params;
    if (params != null)
      this.setState({search: params}, () => this.getSearchResultsList());
  }
  getSearchResultsList = async () => {
    const {SEARCH} = Api;
    const {search, selectType, selectPublish} = this.state;
    const url = SEARCH.replace(':keywords', `越剧 ${search}`)
      .replace(':type', selectType)
      .replace(':offset', '')
      .replace(':limit', '');

    let res = await request.get(url);
    if (selectType == 1) {
      this.setState({resultList: res.data.result.songs});
    } else {
      this.setState({resultList: res.data.result.videos});
    }
    //TODO 最早发布
    console.log('getSearchResultsList', selectType);
  };

  topSelects = () => {
    const {selectDuration, selectPublish, selectType} = this.state;
    // const durationItem = [
    //   {text: '十分钟内', value: 10*60},
    //   {text: '半小时内', value: 1},
    //   {text: '两小时内', value: 2},
    // ];
    const publishItem = [
      {text: '最新发布', value: 0},
      {text: '最早发布', value: 1},
    ];
    const typeItem = [
      {text: '音乐', value: 1},
      {text: '视频', value: 1014},
    ];
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {/* <Select
          style={{
            width: pxToDpW(300),
            borderRadius: 0,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderWidth: 0,
            elevation: 10,
            shadowColor: '#888888',
          }}
          valueStyle={{color: '#7fbad9', textAlign: 'center'}}
          icon={<IconFont name="down" style={{color: '#7fbad9'}} />}
          iconTintColor={{color: '#7fbad9'}}
          items={durationItem}
          value={selectDuration}
          pickerType="popover"
          getItemValue={(item, index) => item.value}
          getItemText={(item, index) => item.text}
          onSelected={(item, index) =>
            this.setState({selectDuration: item.value})
          }
        /> */}
        {/* <Select
          style={{
            width: pxToDpW(300),
            borderWidth: 0,
            elevation: 10,
            shadowColor: '#888888',
            borderRadius: 0,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          valueStyle={{color: '#7fbad9', textAlign: 'center'}}
          icon={<IconFont name="down" style={{color: '#7fbad9'}} />}
          iconTintColor={{color: '#7fbad9'}}
          items={publishItem}
          value={selectPublish}
          pickerType="popover"
          getItemValue={(item, index) => item.value}
          getItemText={(item, index) => item.text}
          onSelected={(item, index) => {
            this.setState({selectPublish: item.value}, () =>
              this.getSearchResultsList(),
            );
          }}
        /> */}
        <Select
          style={{
            width: pxToDpW(300),
            borderRadius: 0,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
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
            this.setState({selectType: item.value}, () =>
              this.getSearchResultsList(),
            );
          }}
        />
      </View>
    );
  };
  resultList = () => {
    const {search, resultList, selectType} = this.state;
    if (resultList.length == 0) return <></>;
    return resultList.map((v, i) => {
      console.log(v);
      const uri = selectType == 1 ? v.al?.picUrl : v.coverUrl;
      const title = selectType == 1 ? v?.name : v.title;
      const desc = selectType == 1 ? v.al?.name : '';
      const id = selectType == 1 ? v?.id : v?.vid;
      const Type = selectType == 1 ? 'MusicDetail' : 'VideoDetail';
      return (
        <TouchableOpacity
          onPress={() => this.context.navigate(Type, id)}
          key={i}
          style={{
            padding: size.globalPadding,
            paddingBottom: pxToDpH(10),
            paddingTop: pxToDpH(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {console.log(selectType)}
            <Image
              source={{uri: uri}}
              style={{width: pxToDpW(400), height: pxToDpH(300)}}
            />
            <View
              style={{
                paddingLeft: pxToDpW(60),
                paddingRight: pxToDpW(60),
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
    });
  };
  render() {
    const {search, resultList, selectType} = this.state;
    return (
      <View>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <TopNav
          color="black"
          title=""
          style={{
            marginLeft: size.globalPadding,
            marginRight: size.globalPadding,
          }}
        />
        {/* 搜索栏 */}
        <View
          style={{
            padding: size.globalPadding,
            alignItems: 'center',
            paddingBottom: pxToDpH(30),
            paddingTop: 0,
          }}>
          <SearchBar
            onEndEditing={() => getSearchResultsList()}
            value={search}
            onChangeText={this.updateSearch}
          />
        </View>
        {/* 筛选栏 */}
        {this.topSelects()}
        <ScrollView>{this.resultList()}</ScrollView>
      </View>
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
