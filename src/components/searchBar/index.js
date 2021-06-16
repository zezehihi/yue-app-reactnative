import {SearchBar} from 'react-native-elements';
import React, {Component} from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
export default class extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };
  render() {
    const {search} = this.state;
    return (
      <SearchBar
        platform="android"
        lightTheme={true}
        placeholder="戏剧搜索"
        color={'#667580'}
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIconContainerStyle={styles.leftIconContainer}
        rightIconContainerStyle={styles.leftIconContainer}
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
