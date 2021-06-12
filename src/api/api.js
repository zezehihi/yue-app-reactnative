const mockApi = '/mockApi';
const api = '/yue';
const Api = {
  /**
   * 接口基地址
   */
  //BASE_URI: 'http://172.20.10.9:8803',
  //懒得开热点用
  BASE_URI: 'http://localhost:8803',
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
};

export default Api;
