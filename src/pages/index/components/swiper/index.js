import React, {Component} from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {observer} from 'mobx-react';
@observer
export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={10}
          autoplayLoop
          index={0}
          showPagination
          data={this.props.data}
          renderItem={({item}) => (
            <View style={[styles.child]}>
              <Image
                source={{uri: item.newsimages[0].photolink}}
                style={{width: '100%', height: '100%'}}></Image>
              {/* <View style={[styles.textContainer]}>
                <Text style={[styles.text]}>{item.title.slice(0, 5)}</Text>
              </View> */}
            </View>
          )}
          onMomentumScrollEnd={item => console.log(item.index)}
          paginationStyleItem={{width: pxToDpW(30), height: pxToDpW(30)}}
        />
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: pxToDpH(570),
  },
  child: {width: width, justifyContent: 'center'},
  text: {
    height: pxToDpH(80),
    fontSize: size.font3,
    position: 'absolute',
    bottom: pxToDpH(120),
    elevation: 10,
    shadowColor: '#888888',
    color: 'white',
    left: '50%',
    transform: [{translateX: -pxToDpW(300)}],
  },
});
