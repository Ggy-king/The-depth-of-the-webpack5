// 1 主要是用于es6语法编写的代码转换为向后兼容的js语法

const { rules } = require("./11-Eslint")

// 配置文件
// babel.config.js
// babel.config.json
//.babelrc.js
//.babelrc.json

// package.json中babel 不需要创建文件 在原有的基础上写即可

// 具体配置
module.exports = {
    //预设
    presets: [],
    // 预设简单理解就是一组babel组件 扩展babel功能
    // @babel/preset-env 一个智能预设 允许使用最新的js语法
    // @babel/preset-react 编译react jsx语法的预设
    // @babel/preset-typescript 编译typescript语法的预设
}



// 1 安装
// npm i -D babel-loader @babel/core @babel/preset-env webpack

// 2 用法
// 配置加配置文件
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,  //排除node_modules中的文件(即不对该文件进行处理 因为这些成熟的依赖包已经处理好了)
            loader: "babel-loader",
            // options: {
            //     presets: ["@babel/preset-env"],
            // },     //配置文件可以选择在外面写
        }

    ]
}
