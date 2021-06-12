import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import request from '@/services/request';
import Api from '@/api/api';
import {inject, observer} from 'mobx-react';
import {color, pxToDpH, pxToDpW, layout, size} from '@/MyStyle';
import {Isao} from 'react-native-textinput-effects';
import {Primary} from '@/components/button';
class Login extends Component {
  state = {
    phone: '',
    verificationCode: '',
    verificationCodeBtn: '获取验证码',
  };
  async componentDidMount() {}
  getVerificationCode = async () => {
    // const {MESSAGE_VERIFICATION_CODE} = Api;
    // const res1 = await request.get('MESSAGE_VERIFICATION_CODE');
    // console.log(res1);
  };
  login = () => {
    console.log('login');
  };
  render() {
    const {phone, verificationCode, verificationCodeBtn} = this.state;
    return (
      <View
        style={{
          padding: size.globalPadding,
          background: color.globalBackgroundColor,
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
              value={phone}
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
              value={verificationCode}
              onChangeText={text => {
                this.setState({verificationCode: text});
              }}
            />
            <TouchableOpacity
              onPress={this.getVerificationCode()}
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
            width={'100%'}
            height={pxToDpH(180)}
            onPress={this.login()}>
            登录
          </Primary>
        </View>
      </View>
    );
  }
}

export default Login;
