/**
 * 1 webpack加载webpack.config.js中所有配置 此时就会new TestPlugin() 执行插件的constructor
 * 2 webpack创建compiler对象
 * 3 遍历所有plugin插件 调用插件中的apply方法
 * 4 执行剩下的编译流程(触发各个hooks事件)
 */

class TestPlugin {
    constructor() {

    }

    apply(compiler) {
        debugger   //使用node调试


        // environment是同步钩子
        // 由文档可知 environment是同步钩子 所以使用tap来注册
        compiler.hooks.environment.tap("TestPlugin", () => {
            
        })

        // emit是异步串行钩子
        compiler.hooks.emit.tap("TestPlugin", (compilation) => {

        })

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation,callback) => {
            setTimeout(() => {
                callback()
            },1000)
        })

        compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })
        })


        // make是异步并行钩子  其钩子全部同时干
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            // 需要在compilation hooks触发前注册才能使用
            compilation.hooks.seal.tap("TestPlugin",() => {})
            setTimeout(() => {
                callback()
            }, 1000)
        })
    }
}

module.exports = TestPlugin