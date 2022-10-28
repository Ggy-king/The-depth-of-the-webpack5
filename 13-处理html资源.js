// 1 安装
// npm i --save-dev html-webpack-plugin

// 2 引入
// 3 plugins配置
const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入处理html资源包

plugins: [
    //Html
    new HtmlWebpackPlugin({
        // 特点 1 结构和原来一致 2自动引入打包输出的资源
        template: path.resolve(__dirname, "public/index.html")   //需要配置模板
    })
]