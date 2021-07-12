import Index from '@/pages/index';
import My from '@/pages/my';
import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

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
      </ScrollableTabView>
    );
  }
}
export default BottomBar;
