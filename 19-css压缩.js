// CssMinimizerWebpackPlugin  css压缩

// 1 安装
// npm i css-minimizer-webpack-plugin --save-dev

// 2 引入
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")  //引入css压缩依赖包

// plugin插件中调用
new CssMinimizerPlugin()

/**
 * 注意 生产模式下 已默认开启了html 和 js 的压缩
 */