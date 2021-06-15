import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Index from '@/pages/index';
import My from '@/pages/my';
import Store from '@/pages/store';

class BottomBar extends Component {
  componentDidMount() {}
  render() {
    return (
      <ScrollableTabView
        style={{
          marginBottom: 40,
        }}
        tabBarPosition={'overlayBottom'}>
        <Index tabLabel="index" style={{width: 500}} />
        <My tabLabel="My" />
        <Store tabLabel="Store" />
      </ScrollableTabView>
    );
  }
}
export default BottomBar;
