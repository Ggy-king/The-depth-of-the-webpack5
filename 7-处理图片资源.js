// webpack已经内置该依赖包 激活即可

// 处理图片资源
// {
//     test: /\.(png|jpe?p|gif|webp|svg)$/,
//         type: "asset",
//             parser: {
//         // 小于10kb的图片转base64
//         // 优点 ：减少请求数量 缺点：体积会更大
//         dataUrlCondition: {
//             maxSize: 10 * 1024, //10kb
//                     }
//     },
//     generator: {
//         //输出图片名称    hash名称id ext文件扩展名 query可选参数
//         //[hash:10]  取id的前十位
//         filename: "static/images/[hash:10][ext][query]",
//                 }
// }