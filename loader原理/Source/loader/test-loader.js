/**
 * loader就是一个函数 将main.js文件作为参数传入 处理后相应返回
    context 文件内容
    map SourceMap
    meta 别的loader传递的数据
 */


module.exports = function (context,map,meta) {
    console.log(context)
    return context
}