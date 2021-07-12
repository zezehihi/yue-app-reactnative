import {pxToDpH, pxToDpW} from '@/utils/stylesKits';
import {StyleSheet} from 'react-native';
/**
 * color
 */
const color = {
  globalBackgroundColor: '#f9f9f9',
  topColorBlue: '#a0cff5',
  secondColorBlue: '#275ca6',
  colorBlue3: '#758ba9',
  inputColor: '#fdffff',
  mutedGray: '#adadaf',
};
/**
 * size
 */
const size = {
  globalPadding: pxToDpW(75),
  font1: pxToDpH(60),
  font2: pxToDpH(42),
  font3: pxToDpH(54),
};
/**
 * layout
 */
const layout = {};
/**
 * other
 */
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export {color, size, layout, pxToDpW, pxToDpH};
