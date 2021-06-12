import {Dimensions} from 'react-native';
/**
 *设计稿宽度/元素的宽度 = 手机宽度 / 手机中元素的宽度
 *手机中元素的宽度 = 手机屏幕 * 元素的宽度 / 设计稿的宽度
 */
//获取手机屏幕宽度、高度
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
//设计稿宽度
const designDraftWidth = 1125;
const designDraftHeight = 2436;
//像素转DP 设定设计稿宽度1125
export const pxToDpW = elePx => (screenWidth * elePx) / designDraftWidth;
export const pxToDpH = elePx => (screenHeight * elePx) / designDraftHeight;
