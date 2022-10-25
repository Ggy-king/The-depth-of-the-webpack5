// 配置文件是固定写法
const path = require("path")   //nodejs核心模块 专门用来处理路径问题

module.exports = { 
    // 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        //文件的输出路径
        // __dirname是nodejs的变量 代表当前文件的文件夹目录
        path: path.resolve(__dirname,"dist"),    //绝对路径
        // 文件名
        filename: "main.js"
    },
    // 加载器
    module: {
        rules: [
            //loader配置
            {
                test: /\.css$/,    //只检测.css文件 
                use: [           //执行顺序从下到上，从右到左
                    "style-loader",    //将js中css通过创建style标签添加html文件中生效
                    "css-loader"    //将css资源编译成common.js的模块到js中
                ]
            },
            //less配置
            {
                test: /\.less$/,    //只检测.less文件
                loader: "xxx",     //这样写只能写一个loader
                use: [           //执行顺序从下到上，从右到左
                    // use可以写多个loader
                    "style-loader",    //将js中css通过创建style标签添加html文件中生效
                    "css-loader",    //将css资源编译成common.js的模块到js中
                    "less-loader"
                ]
            }

        ]
    },
    // 插件
    plugins: [
        //plugins的配置
    ],
    // 模式
    mode: "development",

}