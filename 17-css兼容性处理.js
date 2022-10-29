

// 1 安装
// npm i postcss-loader postcss postcss-preset-env -D

const { rules } = require("./11-Eslint")

// 2 配置
// 它的位置需要在 css-loader的后面 less-loader的前面

module: {
    rules: [
        {
            test: /\.css$/,    //只检测.css文件 
            use: [           //执行顺序从下到上，从右到左
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
                }



            ]
        }
    ]
}

// 3 在package.json中写需要把样式兼容到什么程度
"browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
]