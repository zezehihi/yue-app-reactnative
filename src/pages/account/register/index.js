import Api from '@/api/api';
import {Primary} from '@/components/button';
import Toast from '@/components/Toast';
import {color, pxToDpH, pxToDpW, size} from '@/MyStyle';
import request from '@/services/request';
import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, StatusBar, View} from 'react-native';
import {Isao} from 'react-native-textinput-effects';
// TODO 键盘遮挡
class Register extends Component {
  state = {
    phone: '',
    username: '',
    nickname: '',
    password1: '',
    password2: '',
  };
  async componentDidMount() {
    const params = this.props.route.params;
    this.setState({phone: this.props.route.params});
  }
  register = async () => {
    const {phone, username, nickname, password1, password2} = this.state;
    const {REGISTER_USER} = Api;
    let params = {
      username,
      nickname,
      password: password1,
      tel: phone,
    };
    const res = await request.post(REGISTER_USER, params);
    const {success} = res.data;
    if (success == true) {
      Toast.showText('注册成功');
      this.props.navigation.navigate('TabBar');
    } else {
      Toast.showText('注册失败');
    }
  };
  render() {
    const {phone, username, nickname, password1, password2} = this.state;
    return (
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
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
            {/* 用户名 */}
            <View>
              <Isao
                label={'用户名'}
                activeColor={color.topColorBlue}
                borderHeight={4}
                inputPadding={16}
                labelHeight={24}
                passiveColor={color.mutedGray}
                value={username}
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
                  marginBottom: pxToDpH(50),
                }}
                onChangeText={text => {
                  this.setState({username: text});
                }}
              />
            </View>
            {/* 昵称Input */}
            <View>
              <Isao
                label={'昵称'}
                activeColor={color.topColorBlue}
                borderHeight={4}
                inputPadding={16}
                labelHeight={24}
                passiveColor={color.mutedGray}
                value={nickname}
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
                  marginBottom: pxToDpH(50),
                }}
                onChangeText={text => {
                  this.setState({nickname: text});
                }}
              />
            </View>
            {/* 密码Input2 */}
            <View>
              <Isao
                label={'密码'}
                activeColor={color.topColorBlue}
                borderHeight={4}
                inputPadding={16}
                labelHeight={24}
                passiveColor={color.mutedGray}
                value={password1}
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
                  marginBottom: pxToDpH(50),
                }}
                onChangeText={text => {
                  this.setState({password1: text});
                }}
              />
            </View>
            {/* 密码Input2 */}
            <View>
              <Isao
                label={'再次输入密码'}
                activeColor={color.topColorBlue}
                borderHeight={4}
                inputPadding={16}
                labelHeight={24}
                passiveColor={color.mutedGray}
                value={password2}
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
                  marginBottom: pxToDpH(50),
                }}
                onChangeText={text => {
                  this.setState({password2: text});
                }}
              />
            </View>
          </View>
          {/* 按钮 */}
          <View
            style={{
              paddingLeft: pxToDpW(40),
              paddingRight: pxToDpW(40),
            }}>
            <Primary
              style={{marginTop: pxToDpH(100)}}
              width={pxToDpW(900)}
              height={pxToDpH(180)}
              onPress={this.register}>
              登录
            </Primary>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default Register;
