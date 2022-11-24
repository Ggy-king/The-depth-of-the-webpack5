class BannerWebpackPlugin { 
    constructor(options) {
        this.options = options
    }


    apply(compiler) {
        // 资源输出之前触发
        compiler.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation,callback) => {
            const extensions = ['css','js']
            // 1 获取即将输出的资源文件:compiler.assets
            // 2 过滤只保留js和css资源
            const assets = Object.keys(compilation.assets).filter((assetPath) => {
                // 将文件名切割成['xxxx','js'] ['xxxx','js']
                const splitted = assetPath.split('.')
                // 获取最后一个文件扩展名
                const extension = splitted[splitted.length - 1]
                // 判断是否包括
                return extensions.includes(extension)
            })


            const prefix = `
            /*
            *Author: ${this.options.author}
            */
            `
            // 3 遍历剩下的资源并加上注释
            assets.forEach((asset) => {
                // 获取原来内容
                const source = compilation.assets[asset].source()
                // 拼接上注释
                const content = prefix + source

                // 修改资源
                compilation.assets[asset] = {
                    // 最终资源输出时 调用source方法 其返回值就是资源的具体内容
                    source() {
                        return content
                    },
                    //资源大小
                    size() {
                        return content.length
                    }
                }
            })

            callback()
        })
    }
}


module.exports = BannerWebpackPlugin