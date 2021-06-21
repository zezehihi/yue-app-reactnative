const mockApi = '/mockApi';
//const BASE_URI = 'http://172.20.10.9:8803';
const BASE_URI = 'http://localhost:8803';
const MUSIC_URI = 'http://yun.1dtfc.com';
const FILE_URI = 'http://yun.1dtfc.com';
const api = BASE_URI + '/yue';
const Api = {
  /**
   * 接口基地址
   */
  BASE_URI,
  MUSIC_URI,
  FILE_URI,
  /**
   *  校验验证码
   */
  MESSAGE_VERIFICATION_CODE: `${api}/message/verificationCode/:code`,
  /**
   * 获取验证码
   */
  MESSAGE_SEND_MESSAGE: `${api}/message/sendMessage/:tel`,
  /**
   * 检查当前用户是否存在
   */
  CHECK_USER_STATE: `${api}/user/checkUserState/:tel`,
  /**
   * 注册用户
   */
  REGISTER_USER: `${api}/user/registerUser`,

  /**
   * 获取新闻
   */
  GET_NEWS_LIST: `${api}/news/getNewsList/:size`,

  /**
   * 网易云音乐API
   */
  /**
   * 获取歌单 就这里吧（。
   */
  GET_MUSIC_LIST: `https://cloudmusic.1dtfc.com/playlist/detail?id=142026624`,
};

export default Api;
