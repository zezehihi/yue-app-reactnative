import CustomerBar from '@/pages/share/components/CustomerBar';
import Newest from '@/pages/share/newest';
import Recommend from '@/pages/share/recommend';
import {NavigationContext} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

@observer
class Index extends Component {
  static contextType = NavigationContext;
  state = {};
  componentDidMount() {}

  render() {
    return (
      <ScrollableTabView
        style={{}}
        initialPage={0}
        renderTabBar={() => <CustomerBar />}>
        <Newest tabLabel="最新" />
        <Recommend tabLabel="推荐" />
      </ScrollableTabView>
    );
  }
}
export default Index;
