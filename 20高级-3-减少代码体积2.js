// 减少代码体积
// babel
// babel会为每一个编译的文件插入辅助代码 使体积过大

// 使用
// @babel/plugin-transform-runtime: 禁用了babel自动对每个文件的runtime注入 而是按需引入

// 下载
// npm i @babel/plugin-transform-runtime -D

// 配置
// 开发生产都可以
// babel中配置

plugins: ["@babel/plugin-transform-runtime"], //减少代码体积

// 例
{
    loader: "babel-loader",
        options: {
        // presets: ["@babel/preset-env"],  //配置文件可以选择在外面写
        cacheDirectory: true, // 开启babel缓存
        cacheCompression: false, //关闭缓存文件压缩
        plugins: ["@babel/plugin-transform-runtime"], //减少代码体积
        }
}