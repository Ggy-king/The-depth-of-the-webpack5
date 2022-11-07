// 优化代码运行性能

// PWA
// 开发Web APP项目时 若处于离线状态则无法访问

// PWA是渐进式网络应用程序 是一种可以提供类似于native app(原生应用程序)体验的web app的技术

// 先添加workbox-webpack-plugin 插件
// 再注册Service Worker

// 1 下载
// npm i workbox-webpack-plugin --save-dev

// 2 配置
const WorkboxPlugin = require('workbox-webpack-plugin')

new WorkboxPlugin.GenerateSW({
    //这些选项帮助快速启动 ServiceWorkers
    //不允许遗留任何旧的 ServiceWorkers
    clientsClaim: true,
    skipWaiting: true,
})


// 3 在main.js 中注册
// if()  啥的看官网 太多了



// 该技术兼容性较差 在web app 不常见 在移动 app较常见