import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';
import Login from '@/pages/account/login';
import Register from '@/pages/account/register';
import Index from '@/pages/index';
import BottomBar from '@/pages/bottomBar';
import TabBar from '@/pages/tabBar';

const Stack = createStackNavigator();

@inject('AccountStore')
@observer
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: this.props.AccountStore.token ? 'TabBar' : 'Login',
    };
  }
  render() {
    const {initialRouteName} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="TabBar" component={TabBar} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
