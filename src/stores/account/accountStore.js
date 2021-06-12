import { observable, action, makeAutoObservable } from "mobx";

class AccountStore {
  constructor() {
    makeAutoObservable(this)
    }
  @observable mobile = "";
  @observable token = "";
  @observable userId = "";

  @action setUserInfo(mobile, token, userId) {
    this.mobile = mobile;
    this.token = token;
    this.userId = userId;
  }
  // 清除信息
  @action clearUserInfo() {
    this.mobile = "";
    this.token = "";
    this.userId = "";
  }
}
export {AccountStore}
export default new AccountStore();