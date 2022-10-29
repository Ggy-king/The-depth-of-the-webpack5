// 1 在配置文件中定义函数 返回重复的代码


// 封装一个用来获取样式的方法
function getStyleLoader(pres) {
    return [
        MiniCssExtractPlugin.loader,    //提取css成单独文件
        "css-loader",    //将css资源编译成common.js的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",  //能解决大多数样式兼容性的问题
                    ]
                }
            }
        },
        pre,
    ].filter(Boolean);   //会将Boolean值给过滤掉
}