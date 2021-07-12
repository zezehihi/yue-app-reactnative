import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
class Index extends Component {
  render() {
    const {goToPage, tabs, activeTab} = this.props;
    //  goToPage 跳转页面切换显示
    // tabs标题数组
    // activeTab激活的tab
    return (
      <View
        style={{
          paddingTop: pxToDpH(100),
          height: pxToDpH(220),
          flexDirection: 'row',
          paddingLeft: pxToDpW(20),
          paddingRight: pxToDpW(20),
          justifyContent: 'space-evenly',
          backgroundColor: '#b8dfef',
        }}>
        {tabs.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => goToPage(i)}
            style={{
              justifyContent: 'center',
              borderBottomColor: '#2097c2',
              borderBottomWidth: activeTab === i ? pxToDpW(3) : 0,
            }}>
            <Text
              style={{
                color: activeTab === i ? '#fff' : '#eeeeee',
                fontSize: activeTab === i ? size.font1 : size.font2,
              }}>
              {v}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
export default Index;
