const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/'
  }
};
