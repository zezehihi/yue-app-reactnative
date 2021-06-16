import React, {Component} from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

export default class extends Component {
  state = {
    data: [
      {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
      },
      {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      },
      {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      },
      {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
      },
      {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
      },
    ],
  };
  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={10}
          autoplayLoop
          index={2}
          showPagination
          data={data}
          renderItem={({item}) => (
            <View style={[styles.child]}>
              <Image
                source={require('@/assets/images/1.jpg')}
                style={{width: '100%', height: '100%'}}></Image>
              <View style={[styles.textContainer]}>
                <Text style={[styles.text]}>{item.title}</Text>
              </View>
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: pxToDpH(570),
  },
  child: {width, justifyContent: 'center'},
  text: {
    height: pxToDpH(80),
    fontSize: size.font3,
    position: 'absolute',
    bottom: pxToDpH(80),
    color: 'white',
    left: '50%',
    transform: [{translateX: -pxToDpW(300)}],
  },
});
