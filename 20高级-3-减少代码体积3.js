// 减少代码体积

// image Minimizer

// 压缩本地静态图片 减少体积

// image-minimizer-webpack-plugin

// 1 下载
// npm i image-minimizer-webpack-plugin imagemin -D

// {
    // 无损压缩 npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
    // 有损压缩 npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
// }

// 2 配置
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")  //引入压缩图片依赖包

// 剩下的配置太多了 自己去官网看一下把

// 可能会报错 需要安装jpegtran.exe
