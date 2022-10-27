// 1 主要是用于es6语法编写的代码转换为向后兼容的js语法

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