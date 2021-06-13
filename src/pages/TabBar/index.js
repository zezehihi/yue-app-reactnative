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
import Message from '@/pages/message';
import YueJu from '@/pages/yueju';
import Collect from '@/pages/collect';

import {ActionPopover} from 'teaset';
import {black} from 'chalk';

class TabBar extends Component {
  constructor(props) {
    super(props);
    // selectedTab: "group",
    let selectedTab = 'tab1';
    if (this.props.route.params && this.props.route.params.pagename) {
      selectedTab = this.props.route.params.pagename;
    }
    this.state.selectedTab = selectedTab;
  }
  state = {
    selectedTab: '',
    tab1: <Message />,
    tab2: <YueJu />,
    tab3: <My />,
  };

  showActionPopover = curTab => {
    if (this.state.selectedTab == curTab) {
      this.show(curTab);
    }
    this.setState({selectedTab: curTab});
  };

  show(curTab) {
    let items = [];
    let options = {
      direction: 'down',
      popoverStyle: {
        backgroundColor: '#faf7fa',
        elevation: 10,
        shadowColor: '#888888',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
      },
      style: {
        elevation: 10,
        shadowColor: '#888888',
      },
    };
    switch (curTab) {
      case 'tab1': {
        items = [
          {
            title: '消息',
            onPress: () => {
              this.setState({tab1: <Message />});
            },
          },
          {
            title: '收藏',
            onPress: () => {
              this.setState({tab1: <Collect />});
            },
          },
          {
            title: '动态',
            onPress: () => {
              this.setState({tab1: <Message />});
            },
          },
        ];

        ActionPopover.show(
          {x: 10, y: screenHeight - 80, width: 200, height: 200},
          items,
          options,
        );
        break;
      }
      case 'tab2': {
        items = [
          {
            title: '首页',
            onPress: () => {
              this.setState({tab2: <Index />});
            },
          },
          {
            title: '戏曲',
            onPress: () => {
              this.setState({tab2: <YueJu />});
            },
          },
          {
            title: '商城',
            onPress: () => {
              this.setState({tab2: <Message />});
            },
          },
          {title: '设置', onPress: () => alert('设置')},
        ];
        ActionPopover.show(
          {x: 80, y: screenHeight - 80, width: 200, height: 200},
          items,
          options,
        );
        break;
      }
      case 'tab3': {
        items = [
          {
            title: '我的',
            onPress: () => {
              this.setState({tab3: <My />});
            },
          },
          {
            title: '退出',
            onPress: () => {
              this.setState({tab3: <Message />});
            },
          },
        ];
        ActionPopover.show(
          {x: 160, y: screenHeight - 80, width: 200, height: 200},
          items,
          options,
        );
        break;
      }
    }
  }
  componentDidMount() {}
  render() {
    const {tab1, tab2, tab3} = this.state;
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
          titleStyle={{fontSize: size.font3}}
          selectedTitleStyle={{color: '#3075ab'}}
          selected={this.state.selectedTab === 'tab1'}
          title="消息"
          onPress={() => this.showActionPopover('tab1')}>
          {tab1}
        </TabNavigator.Item>
        <TabNavigator.Item
          titleStyle={{fontSize: size.font3}}
          selectedTitleStyle={{color: '#3075ab'}}
          selected={this.state.selectedTab === 'tab2'}
          title="戏剧"
          onPress={() => this.showActionPopover('tab2')}>
          {tab2}
        </TabNavigator.Item>
        <TabNavigator.Item
          titleStyle={{fontSize: size.font3}}
          selectedTitleStyle={{color: '#3075ab'}}
          selected={this.state.selectedTab === 'tab3'}
          title="我的"
          onPress={() => this.showActionPopover('tab3')}>
          {tab3}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
export default TabBar;
