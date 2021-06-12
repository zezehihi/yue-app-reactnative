import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Toast, Theme} from 'teaset';

let customKey = null;
let customKey1 = null;

Toast.showLoading = text => {
  if (customKey) return;
  customKey = Toast.show({
    text,
    icon: <ActivityIndicator size="large" color={Theme.toastIconTintColor} />,
    position: 'center',
    duration: 100000,
  });
};

Toast.hideLoading = () => {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
};

Toast.showText = text => {
  if (customKey1) return;
  customKey1 = Toast.show({
    text,
    position: 'center',
    duration: 1000,
  });
};

Toast.hideText = () => {
  if (!customKey1) return;
  Toast.hide(customKey1);
  customKey1 = null;
};

export default Toast;
