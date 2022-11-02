// 提升打包构建速度
// Cache 缓存

// 可以缓存之前的Eslint检查和babel编译的结果 第二次打包速度快

// webpack配置

// dev和prod都可以配置

// loader中
options: {
    // presets: ["@babel/preset-env"],  //配置文件可以选择在外面写
    cacheDirectory: true, // 开启babel缓存
    cacheCompression: false, //关闭缓存文件压缩
}

// plugins中
// Eslint
new ESLintPlugin({
    context: path.resolve(__dirname, "src"),
    exclude: "node_modules",
    cache: true, // 开启缓存
    cacheLocation: path.resolve(__dirname, '../node_module/.cache/eslintcache'),  //指定缓存路径

})