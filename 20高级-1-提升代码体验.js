// 提升代码体验
// SourceMap

// 开发模式下 是没有输出的 只能在内存中查看
// 所以出现错误时 编译后报错的提示是打包生成后的文件 不利于我们观察错误
// 故引出 SourceMap

// SourceMap(源代码映射)是一个用来生成源代码与构建后的代码 --- 映射的文件的方案
// 会生成一个 xxx.map文件 一行对一行

/**
 * sourcemap文件的生成方式有很多种
 * 一般是开发模式使用 cheap-module-source-map(只有行映射 速度较快) 生产模式使用 source-map(行列映射都有 速度较慢)
 */
module.exports = {
    //其他省略
    mode: "development",
    devtool: "cheap-module-source-map"
}
module.exports = {
    //其他省略
    mode: "production",
    devtool: "source-map"
}