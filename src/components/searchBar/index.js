import {pxToDpH, pxToDpW, size} from '@/MyStyle';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
export default class extends Component {
  render() {
    return (
      <SearchBar
        platform="android"
        lightTheme={true}
        placeholder={this.props.placeholder || '戏剧搜索'}
        color={'#667580'}
        onEndEditing={this.props.onEndEditing}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIconContainerStyle={styles.leftIconContainer}
        rightIconContainerStyle={styles.leftIconContainer}
        onClear={this.props.onClear || function () {}}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: pxToDpW(900),
    height: pxToDpH(125),
    paddingTop: 0,
    elevation: 10,
    shadowColor: '#888888',
  },
  inputContainer: {
    borderRadius: 50,
    marginTop: 0,
  },
  input: {
    paddingTop: 0,
    fontSize: size.font3,
  },
  leftIconContainer: {
    marginTop: 0,
  },
});
