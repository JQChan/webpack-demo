const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: { //文件入口
    app: './src/index.js',
    print: './src/print.js'
  },
  output: { //输出文件文件夹以及文件名
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map', 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new HtmlWebpackPlugin({
      title: 'Code Splitting'
    }),
    new webpack.optimize.CommonsChunkPlugin({ //输出公共模块
      name: 'common', //如果设置了name，则filename中的name为此属性,必须要有，要不会报错
      filename: '[name].js', //如果设置了filename，则以filename命名，否则以output 中的filename命名
      minChunks: 2, //(模块必须被2个 入口chunk 共享)公共模块的数量的最小值，传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
      // chunks: ["pageA", "pageB"],//只在pageA和pageB中选取公共模块，不会在其他js中选取,或者忽略该项设置以选择全部 chunks
      // children: true, // (选择所有被选 chunks 的子 chunks)
      // async: true, // (创建一个异步 公共chunk)
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks: function(module){
    //     return module.context && module.context.indexOf("node_modules") !== -1;
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({ //输出webpack
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
  ],
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}