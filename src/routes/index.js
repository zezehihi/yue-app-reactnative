import React ,{Component} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {inject,observer} from 'mobx-react';
import Login from "@/pages/account/login";


const Stack = createStackNavigator();

@inject("AccountStore")
@observer
class Nav extends Component{
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName:this.props.AccountStore.token?"Login":"Login"
    }
  }
  render () {
    const { initialRouteName } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;