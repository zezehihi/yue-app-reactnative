import IconFont from '@/components/IconFont';
import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import {NavigationContext} from '@react-navigation/native';
import React, {Component} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
class Index extends Component {
  static contextType = NavigationContext;
  defaultValue = {
    hasRight: false,
  };
  render() {
    // goBack
    return (
      <View style={{...this.props.style}}>
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
            onPress={this.props.onRightPress || function () {}}
            style={{
              width: pxToDpW(80),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {this.props.hasRight && (
              <IconFont
                style={{color: this.props.color, fontSize: size.font1}}
                name={this.props.rightIcon || 'ellipsis'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Index;
