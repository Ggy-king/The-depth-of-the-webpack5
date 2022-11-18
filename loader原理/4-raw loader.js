// raw loader接收到的context是Buffer(二进制)的数据
// 处理图片图片一般使用

// 写法一
// module.exports = function (context) {
//     return context
// }

// module.exports.raw = true

// 写法二
function test3Loader(context) {
    return context
}

test3Loader.raw = true
module.exports = test3Loader