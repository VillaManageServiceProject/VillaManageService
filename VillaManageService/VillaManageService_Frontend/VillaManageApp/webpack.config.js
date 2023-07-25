const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    static: path.join(__dirname, 'public/'),
  	open: true,
    historyApiFallback: true,
    hot: true,
  },
}

// const path = require('path')
// const HTMLWebpackPlugin = require('html-webpack-plugin')

// const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
//   template: path.resolve(__dirname, './public/index.html'),
//   filename: 'index.html',
//   inject: 'body',
// })

// module.exports = {
//   entry: path.join(__dirname, 'index.web.js'),
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, '/build'),
//     environment: {
//       arrowFunction: false,
//       bigIntLiteral: false,
//       const: false,
//       destructuring: false,
//       dynamicImport: false,
//       forOf: false,
//       module: false,
//    },
//  },
//   resolve: {
//     alias: {
//       'react-native$': 'react-native-web',
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules\/(?!()\/).*/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-react'],
//           },
//         },
//       },
//     ],
//   },
//   plugins: [HTMLWebpackPluginConfig],
//   devServer: {
//     open: true,
//     historyApiFallback: true,
//     // contentBase: './',
//     hot: true,
//     static: {
//         // directory: path.resolve(__dirname, 'public/index.html'),
//         directory: path.resolve(__dirname, './'),
//       },
//   },
// }