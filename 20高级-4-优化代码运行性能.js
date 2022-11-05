// 优化代码运行性能
// code split

// 是js文件不再同一打包 而是分割打包
// 实现按需加载

// 下载
// html-webpack-plugin

// 配置 注意是多入口打包 多输出
const HtmlWebpackPlugin = require('html-webpack-plugin')
entry: {
    app: "./src/app.js",
        main: "./src/main.js"
}

plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html")
    })
]


// 多入口多输出 文件并行运行打包等

// 。。。。。。。。。。。。。。。。。。。。。。。。。。
// 如果有复用应该单独把复用打包成一个文件
// 需要配置optimization splitChunk (代码分割配置)



// 按需加载 动态引入
// import()动态导入 拆分单独模块 按需使用
import("./count")
    .then()
    .catch()
