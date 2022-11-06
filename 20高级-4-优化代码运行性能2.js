// 优化代码运行性能
// preload/prefetch

// 预加载技术

// 共同点 只加载不执行 都有缓存  但是兼容性都比较差


/**
 * preload
 * 浏览器立即加载资源
 * 加载优先级高
 * 只能加载当前页面资源
 */

/**
 * prefetch
 * 浏览器空闲时加载资源
 */


// 引入
// npm i --save-dev @vue/preload-webpack-plugin

// 配置
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin")

new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script',

    //或
    rel: 'prefetch'

})








// 2 
// network cache 缓存  没听 自己去查官网把