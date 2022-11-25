// 如果打包生成的runtime文件比较小 可以将其内联到js中从而减少请求数量
// 需要借助html-webpack-plugin实现

class InlineChunkWebpackPlugin {
    // 不写了太多了 我开摆了
}

module.exports = InlineChunkWebpackPlugin