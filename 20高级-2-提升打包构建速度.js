// 提升打包构建速度

// import { HotModuleReplacementPlugin } from "webpack";

// HotModuleReplacementPlugin

// 提升点 如果只修改某个代码块 其余不变 则速度会提升
// HotModuleReplacementPlugin (HMR/热模块替换) ：在程序运行中 替换 添加 或删除模块 而无需重新加载新的页面

// 1 在webpack中配置
module.exports = {
    devServe: {
        hot: true,  //开启热模块替换功能 默认是true
    }
}


// 2 在main.js中配置
if (module.hot) {  //判断是否支持热模板替换功能
    module.hot.accept("./js/count")   // 对某一路径使用热模块替换功能

    // 实际开发项目中 vue或react会自动实现 无需你自己去写 比如vue-loader或react-hot-loader
}