// 学会去webpack官网找

// 1 安装 npm install --save-dev css-loader  可能会少一些安装包自己下载上就行

// 2 然后把loader引用到webpack配置中  {
    // files.js import css from "files.css"
    // webpack.config.js
// 加载器
module: {
    rules: [
        //loader配置
        {
            test: /\.css$/,    //只检测.css文件 
            use: [           //执行顺序从下到上，从右到左
                "style-loader",    //将js中css通过创建style标签添加html文件中生效
                "css-loader"    //将css资源编译成common.js的模块到js中
            ]
        }

    ]
}
// }