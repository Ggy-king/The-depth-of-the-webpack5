// 同步loader 写法一
// module.exports = function (context) {
//     return context
// }


// 同步loader  写法二

module.exports = function (context, map, meta) {
    /**
     * 第一个参数 err代表是否有错误
     * 第二个参数 context为处理后的内容
     * 第三个参数 source-map 继续传递source-map
     * 第四个参数 meta 给下一个loader继续传递参数
     */

    this.callback(null,context,map,meta)
}
