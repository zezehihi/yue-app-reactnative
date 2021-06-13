import {observable, action, makeAutoObservable} from 'mobx';

class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable tel = '';
  @observable token = '';
  @observable userId = '';
  @observable username = '';
  @observable nickname = '';
  @observable photo = '';

  @action setUserInfo(tel, token, userId, username, nickname, photo) {
    this.userId = userId;
    this.tel = tel;
    this.token = token;
    this.username = username;
    this.nickname = nickname;
    this.photo = photo;
  }
  // 清除信息
  @action clearUserInfo() {
    this.tel = '';
    this.token = '';
    this.userId = '';
    this.username = '';
    this.nickname = '';
    this.photo = '';
  }
}
export {AccountStore};
export default new AccountStore();
