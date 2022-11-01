// 配置文件是固定写法
const path = require("path")   //nodejs核心模块 专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin')  //引入eslint依赖包
const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入处理html资源包

module.exports = {
    // 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        //文件的输出路径
        //开发模式下没有输出 
        path: undefined,
        filename: "static/js/main.js",    
    },
    // 加载器
    module: {
        rules: [
            //loader配置
            {
                //每个文件只能被一个loader匹配
                oneOf: [
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
                    },
                    // sass/scss配置
                    {
                        test: /\.s[ac]ss$/,    //只检测.scss/.sass文件
                        loader: "xxx",     //这样写只能写一个loader
                        use: [           //执行顺序从下到上，从右到左
                            // use可以写多个loader
                            "style-loader",    //将js中css通过创建style标签添加html文件中生效
                            "css-loader",    //将css资源编译成common.js的模块到js中
                            "sass-loader"  //将sass文件编译成css
                        ]
                    },
                    // styl配置
                    {
                        test: /\.s[ac]ss$/,    //只检测.scss/.sass文件
                        loader: "xxx",     //这样写只能写一个loader
                        use: [           //执行顺序从下到上，从右到左
                            // use可以写多个loader
                            "style-loader",    //将js中css通过创建style标签添加html文件中生效
                            "css-loader",    //将css资源编译成common.js的模块到js中
                            "stylus-loader"  //将styl文件编译成css
                        ]
                    },
                    // 处理图片资源
                    {
                        test: /\.(png|jpe?p|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            // 小于10kb的图片转base64
                            // 优点 ：减少请求数量 缺点：体积会更大
                            dataUrlCondition: {
                                maxSize: 10 * 1024, //10kb
                            }
                        },
                        generator: {
                            //输出图片名称    hash名称id ext文件扩展名 query可选参数
                            //[hash:10]  取id的前十位
                            filename: "static/images/[hash:10][ext][query]",
                        }
                    },
                    // 处理图标资源
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,   //其他资源
                        type: "asset/resource",   //该类型不会转base64
                        generator: {
                            //输出图片名称    hash名称id ext文件扩展名 query可选参数
                            //[hash:10]  取id的前十位
                            filename: "static/media/[hash:10][ext][query]",
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,  //排除node_modules中的文件(即不对该文件进行处理 因为这些成熟的依赖包已经处理好了)
                        loader: "babel-loader",
                        // options: {
                        //     presets: ["@babel/preset-env"],
                        // },     //配置文件可以选择在外面写
                    }
                ]
            }
                

        ]
    },
    // 插件
    plugins: [
        //plugins的配置
        // Eslint
        new ESLintPlugin({
            context: path.resolve(__dirname, "src"),

        }),
        // Html
        new HtmlWebpackPlugin({
            // 特点 1 结构和原来一致 2自动引入打包输出的资源
            template: path.resolve(__dirname, "public/index.html")   //需要配置模板
        })
    ],
    //开发服务器
    devServe: {
        host: "localhost",  //启动服务器域名
        port: "3000",  // 启动服务器端口号
        open: true,   // 是否自动打开浏览器的窗口
        hot: true,  //开启热模块替换功能 默认是true
    },
    // 模式
    mode: "development",
    devtool: "cheap-module-source-map"

}