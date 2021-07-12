import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
class Primary extends Component {
  static defaultProps = {
    style: {},
    textStyle: {},
    disabled: false,
    progress: false,
    fontSize: 16,
    textFamily: '等距更纱黑体 Slab SC Extralight',
    height: 100,
    width: 200,
  };
  render() {
    return (
      <AwesomeButton
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        style={{
          ...this.props.style,
        }}
        backgroundColor={'#a6cff6'}
        activityColor={'#ffffff'}
        backgroundActive={'#61b0f4'}
        backgroundDarker={'#99bdd9'}
        borderRadius={10}
        borderWidth={0}
        height={this.props.height}
        width={this.props.width}
        raiseLevel={2}
        progress={this.props.progress}
        textSize={this.props.fontSize}
        textFamily={this.props.textFamily}>
        {this.props.children}
      </AwesomeButton>
    );
  }
}

export {Primary};
const styles = StyleSheet.create({
  awsbtn: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
