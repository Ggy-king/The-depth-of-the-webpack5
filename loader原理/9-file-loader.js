const loaderUtils = require("loader-utils")

module.exports = function (content) {
    // 1 根据文件内容生成带hash值的文件名
    const interpolatedName = loaderUtils.interpolatedName(this, "[hash].[ext][query]", {
        content
    })
    // 2 将文件输出出去
    this.emitFIle(interpolatedName,content)
    // 3 返回： module.exports = "文件路径"
    return `module.export = ${interpolatedName}`

}

// 需要处理图片 字体等文件 他们都是buffer数据
// 需要使用raw loader才能处理
module.exports.raw = true