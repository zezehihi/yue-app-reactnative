import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Index extends Component {
  componentDidMount() {}
  render() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text> 首页 </Text>
      </View>
    );
  }
}
export default Index;
