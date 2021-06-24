import React, {Component} from 'react';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import request from '@/services/request';
import Api from '@/api/api';
import {inject, observer} from 'mobx-react';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Isao} from 'react-native-textinput-effects';
import {Primary} from '@/components/button';
import Toast from '@/components/Toast';
import AsyncStorage from '@react-native-community/async-storage';

@inject('AccountStore')
@observer
class Login extends Component {
  state = {
    phone: '',
    code: '',
    verificationCode: '',
    verificationCodeBtn: '获取验证码',
  };
  async componentDidMount() {}
  getVerificationCode = async () => {
    const {phone} = this.state;
    const {MESSAGE_SEND_MESSAGE} = Api;
    const url = MESSAGE_SEND_MESSAGE.replace(':tel', phone);
    const res = await request.get(url);
    this.setState({verificationCode: res.data.verificationCode});
  };
  login = async () => {
    const {verificationCode, phone} = this.state;
    const {MESSAGE_VERIFICATION_CODE, CHECK_USER_STATE} = Api;
    const url = MESSAGE_VERIFICATION_CODE.replace(':code', verificationCode);
    const res = await request.get(url);
    const {success} = res.data;
    // 验证码正确
    if (success == true) {
      // 检测当前手机号 用户状态
      const url1 = CHECK_USER_STATE.replace(':tel', phone);
      const res1 = await request.get(url1);
      const {success} = res1.data;
      if (success == true) {
        Toast.showText('登录成功');
        //  存储用户数据到 mobx中
        console.log(res1.data);
        this.props.AccountStore.setUserInfo(
          phone,
          res1.data.token,
          res1.data.user.id,
          res1.data.user.username,
          res1.data.user.nickname,
          res1.data.user.photo,
        );
        //  存储用户数据到 本地缓存中  永久
        AsyncStorage.setItem(
          'userinfo',
          JSON.stringify({
            tel: phone,
            token: res1.data.token,
            userId: res1.data.user.id,
            username: res1.data.user.username,
            nickname: res1.data.user.nickname,
            photo: res1.data.user.photo,
          }),
        );

        this.props.navigation.navigate('Index');
      } else {
        this.props.navigation.navigate('Register', phone);
      }

      // 跳转到登录
    } else {
      Toast.message('验证码错误');
    }
  };
  render() {
    const {phone, code, verificationCodeBtn} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
        }}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        {/* 整体框框 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {/* 图标logo */}
          <Image
            style={{
              width: pxToDpW(300),
              height: pxToDpH(300),
              marginTop: pxToDpH(340),
              marginBottom: pxToDpH(130),
            }}
            source={require('@/assets/logo/logo.png')}
          />
        </View>
        {/* 中间输入表单 */}
        <View
          style={{
            paddingLeft: pxToDpW(40),
            paddingRight: pxToDpW(40),
          }}>
          {/* 手机号Input */}
          <View>
            <Isao
              label={'手机号'}
              activeColor={color.topColorBlue}
              borderHeight={4}
              inputPadding={16}
              labelHeight={24}
              passiveColor={color.mutedGray}
              maxLength={11}
              keyboardType="phone-pad"
              value={phone}
              labelStyle={{
                fontWeight: 'normal',
              }}
              inputStyle={{
                backgroundColor: color.inputColor,
                elevation: 10,
                shadowColor: '#888888',
                color: color.mutedGray,
                fontWeight: 'normal',
              }}
              style={{
                marginBottom: pxToDpH(110),
              }}
              onChangeText={text => {
                this.setState({phone: text});
              }}
            />
          </View>
          {/* 验证码Input */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Isao
              label={'验证码'}
              activeColor={color.topColorBlue}
              borderHeight={4}
              inputPadding={16}
              labelHeight={24}
              passiveColor={color.mutedGray}
              maxLength={6}
              labelStyle={{
                fontWeight: 'normal',
              }}
              inputStyle={{
                backgroundColor: color.inputColor,
                elevation: 10,
                shadowColor: '#888888',
                color: color.mutedGray,
                fontWeight: 'normal',
              }}
              style={{
                marginBottom: pxToDpH(110),
                width: pxToDpW(560),
              }}
              value={code}
              onChangeText={text => {
                this.setState({code: text});
              }}
            />
            <TouchableOpacity
              onPress={this.getVerificationCode}
              style={{height: 'auto', alignItems: 'center'}}>
              <Text
                style={{
                  position: 'relative',
                  top: '10%',
                  fontSize: size.font1,
                  color: color.secondColorBlue,
                }}>
                {verificationCodeBtn}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 说明文本 */}
        <View
          style={{
            paddingLeft: pxToDpW(40),
            paddingRight: pxToDpW(40),
          }}>
          <Text
            style={{
              fontSize: size.font2,
              color: color.mutedGray,
            }}>
            未注册爱戏剧的手机号，登陆时将自动跳转注册，且代表您已经同意
            <Text style={{color: color.colorBlue3}}>《用户协议》</Text>
          </Text>
        </View>
        {/* 按钮 */}
        <View
          style={{
            paddingLeft: pxToDpW(40),
            paddingRight: pxToDpW(40),
          }}>
          <Primary
            style={{marginTop: pxToDpH(200)}}
            width={pxToDpW(900)}
            height={pxToDpH(180)}
            onPress={this.login}>
            登录
          </Primary>
        </View>
      </View>
    );
  }
}

export default Login;
