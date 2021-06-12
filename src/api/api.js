const mockApi = '/mockApi';
const api = '/yue';
const BASE_URI = "http://localhost:8803";
const Api = {
  /**
   * 接口基地址
   */
  BASE_URI : "http://localhost:8803",

  /**
   *  校验验证码  
   */
  MESSAGE_VERIFICATION_CODE : `${api}/message/verificationCode`,
  /**
   * 发送验证码
   */
  MESSAGE_SEND_MESSAGE:`${api}/message/sendMessage`
};

export default Api;