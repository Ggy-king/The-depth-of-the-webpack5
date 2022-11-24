
class CleanWebpackPlugin {
    apply(compiler) {
        // 2 获取打包输出的路径
        const outputPath = compiler.options.output.path
        const fs = compiler.outputFileSystem

        // 1 注册钩子 在打包之前 emit
        compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
            // 3 通过fs删除打包输出目录下的所有文件
            this.removeFiles(fs,outputPath)
        })
    }

    removeFiles(fs,filepath)  {
        //  想要删除打包目录下的所有资源 需要先删除目录下的资源 后删除目录
        // 1 读取当前目录下所有资源
        const files = fs.readdirSync(filepath)
        // 2 遍历一个一个删除
        // 判断是文件夹还是文件并操作
        files.forEach((file) => {
            const path = `${filepath}/${path}`
            const fileStat = fs.statSync(path)
            if (fileStat.isDirectory()) {
                // 是文件夹 再次调用
                this.removeFiles(fs,path)
            } else {
                // 是文件 直接删除
                fs.unlinkSync(path)
            }
        })
    }  
}

module.exports = CleanWebpackPlugin