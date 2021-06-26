import React, {Component} from 'react';
import {View, fromView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {
  color,
  pxToDpH,
  pxToDpW,
  layout,
  size,
  TouchableOpacity,
} from '@/MyStyle';
import {screenHeight, screenWidth} from '@/utils/stylesKits';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Index from '@/pages/index';
import My from '@/pages/my';
import Store from '@/pages/store';
import News from '@/pages/news';
import YueJu from '@/pages/yueju';
import Collect from '@/pages/collect';
import IconFont from '@/components/IconFont';
import {ActionPopover} from 'teaset';
import {black} from 'chalk';

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
      <TabNavigator
        tabBarUnderlineStyle={{borderWidth: 0}}
        tabBarStyle={{
          width: pxToDpW(700),
          position: 'absolute',
          left: '50%',
          transform: [{translateX: -pxToDpW(700 / 2)}],
          bottom: pxToDpH(110),
          borderRadius: pxToDpH(70),
          borderWidth: 0,
          borderColor: '#00000000',
          elevation: 10,
          shadowColor: '#888888',
        }}
        tabBarShadowStyle={{backgroundColor: 'transparent'}}>
        <TabNavigator.Item
          selected={selectedTab === 'message'}
          titleStyle={{fontSize: size.font3}}
          selectedTitleStyle={{color: '#3075ab'}}
          onPress={() => this.setState({selectedTab: 'message'})}
          title="资讯">
          <News />
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
    );
  }
}
export default TabBar;
