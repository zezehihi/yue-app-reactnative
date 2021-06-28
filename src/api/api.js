const mockApi = '/mockApi';
// const BASE_URI = 'http://172.20.10.9:8809';
//const BASE_URI = 'http://localhost:8809';
const BASE_URI = 'http://192.168.0.107:8809';
const MUSIC_URI = 'https://cloudmusic.1dtfc.com';
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
   * 账户接口
   */

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
   * 获取用户信息
   */
  GET_USER_INFORMATION: `${api}/user/getUserInfo/:id`,
  /**
   * 更新用户信息
   */
  UPDATE_USER_INFORMATION: `${api}/user/updateUserInformation`,

  /**
   * 文件处理接口
   */

  /**
   * 上传用户头像
   */
  FILE_UPLOAD_AVATARS: `${api}/file/uploadAvatars `,

  /**
   * 用户行为接口
   */
  /**
   * 收藏音乐或视频
   */
  ACTION_COLLECT: `${api}/action/collect `,
  /**
   * 获取收藏音乐或视频列表
   */
  ACTION_GET_COLLECT_LIST: `${api}/action/getCollectList/:userId `,
  /**
   * 获取是否收藏音乐或视频状态
   */
  ACTION_GET_COLLECT_STATE: `${api}/action/getCollectState/:userId/:mvId `,

  /**
   * 新闻模块接口
   */

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
  GET_MUSIC_LIST: `${MUSIC_URI}/playlist/detail?id=84155700`,
  /**
   * 搜索
   */
  SEARCH: `${MUSIC_URI}/cloudsearch?keywords=:keywords&type=:type&offset=:offset&limit=:limit`,
  /**
   * 视频详情
   */
  VIDEO_DETAIL: `${MUSIC_URI}/video/detail?id=:id`,
  /**
   * 视频播放ID
   */
  VIDEO_URL: `${MUSIC_URI}/video/url?id=:id`,
};

export default Api;
