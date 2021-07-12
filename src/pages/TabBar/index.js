import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import Index from '@/pages/index';
import My from '@/pages/my';
import Share from '@/pages/share';
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {ActionPopover} from 'teaset';

class TabBar extends Component {
  constructor(props) {
    super(props);
    // selectedTab: "group",
    let selectedTab = 'index';
    if (this.props.route.params && this.props.route.params.pagename) {
      selectedTab = this.props.route.params.pagename;
    }
    this.state.selectedTab = selectedTab;
  }
  state = {
    selectedTab: '',
    curAction: '',
  };

  showActionPopover = curTab => {
    //  if (this.state.selectedTab == curTab) {
    console.log(this.state.curAction);
    ActionPopover.hide(this.state.curAction);
    const key = this.show(curTab);
    this.setState({curAction: key});
    //}
    this.setState({selectedTab: curTab});
  };

  componentDidMount() {}
  render() {
    const {tab1, tab2, selectedTab} = this.state;
    return (
      <View style={{flex: 1}}>
        <TabNavigator
          tabBarUnderlineStyle={{borderWidth: 0}}
          tabBarShadowStyle={{backgroundColor: 'transparent'}}
          tabBarStyle={{
            width: pxToDpW(700),
            height: pxToDpW(100),
            position: 'absolute',
            left: '50%',
            transform: [{translateX: -pxToDpW(700 / 2)}],
            bottom: pxToDpH(110),
            borderRadius: pxToDpH(70),
            borderWidth: 0,
            borderColor: '#00000000',
            elevation: 10,
            shadowColor: '#888888',
            paddingBottom: pxToDpH(10),
          }}
          tabBarShadowStyle={{backgroundColor: 'transparent'}}
          renderSelectedIcon={
            <Image
              source={{
                uri: 'https://yun.1dtfc.com/yue/userAvatars/f47f2491-d39d-47f3-81e6-5855c558dc0e.jpg425a8b7e-1f95-46fa-b6a4-1791a90d985e.jpg',
              }}
              style={{width: '100%', height: '100%'}}
            />
          }
          renderIcon={
            <Image
              source={{
                uri: 'https://yun.1dtfc.com/yue/userAvatars/f47f2491-d39d-47f3-81e6-5855c558dc0e.jpg425a8b7e-1f95-46fa-b6a4-1791a90d985e.jpg',
              }}
              style={{width: '100%', height: '100%'}}
            />
          }>
          <TabNavigator.Item
            selected={selectedTab === 'message'}
            titleStyle={{fontSize: size.font3}}
            selectedTitleStyle={{color: '#3075ab'}}
            onPress={() => this.setState({selectedTab: 'message'})}
            title="动态">
            <Share />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'index'}
            titleStyle={{fontSize: size.font3}}
            selectedTitleStyle={{color: '#3075ab'}}
            onPress={() => this.setState({selectedTab: 'index'})}
            title="戏剧">
            <Index />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'my'}
            onPress={() => this.setState({selectedTab: 'my'})}
            titleStyle={{fontSize: size.font3}}
            selectedTitleStyle={{color: '#3075ab'}}
            title="我的">
            <My />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
export default TabBar;
