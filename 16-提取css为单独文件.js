// 如果不把css提取成单独文件 会有闪屏现象 
//把所有css成一个单独文件

// 1 安装
// npm i --save-dev mini-css-extract-plugin

// 2 引入
// component.js   import "./style.css"
webpack.config.js 
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  //引入单独打包css的依赖包

// 将所有 "style-loader" 改成 MiniCssExtractPlugin.loader

// 3 调用
plugins: [
    //plugins的配置
    // css打包配置
    new MiniCssExtractPlugin({
        filename: 'static/css/main.css',
    }),  //css成单独文件的插件调用
]