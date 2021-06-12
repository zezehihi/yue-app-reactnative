const path = require('path')
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
     [
      'module-resolver',
      {
        //root: ['./'], //表示哪个目录开始设置绝对路径
        alias: {
          //别名的配置
          "@": path.resolve(__dirname, 'src')
        },
      },
    ],
  ]
};
