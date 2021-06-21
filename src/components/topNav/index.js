import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import IconFont from '@/components/IconFont';
class Index extends Component {
  static contextType = NavigationContext;
  render() {
    // goBack
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View
          style={{
            height: pxToDpH(120),
            marginTop: pxToDpH(100),
            flexDirection: 'row',
            //    paddingLeft: size.globalPadding,
            //     paddingRight: size.globalPadding,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this.context.goBack}
            style={{
              width: pxToDpW(80),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconFont
              style={{color: this.props.color, fontSize: size.font1}}
              name="arrowleft"
            />
          </TouchableOpacity>
          {/* 中间标题 */}
          <Text style={{fontSize: size.font1, color: this.props.color}}>
            {this.props.title}
          </Text>
          <TouchableOpacity
            onPress={this.context.goBack}
            style={{
              width: pxToDpW(80),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconFont
              style={{color: this.props.color, fontSize: size.font1}}
              name="ellipsis"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Index;
