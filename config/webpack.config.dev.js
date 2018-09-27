const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    contentBase: './public',
    historyApiFallback: {
      disableDotRule: true
    }
  },
  output: {
    filename: 'static/js/bundle.js',
    pathinfo: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|browser_components|build)/,
        use: ['url-loader?limit=10000']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: path.resolve(__dirname, 'src'),
        use: ['url-loader?limit=10000']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '/public'
    })
  ]
}
