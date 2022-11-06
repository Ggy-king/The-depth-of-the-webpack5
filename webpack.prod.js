// 配置文件是固定写法
const os = require("os")  //os模块
const path = require("path")   //nodejs核心模块 专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin')  //引入eslint依赖包
const HtmlWebpackPlugin = require('html-webpack-plugin')  //引入处理html资源包
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  //引入单独打包css的依赖包
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")  //引入css压缩依赖包
const TerserWebpackPlugin = require("terser-webpack-plugin")  //引入js压缩依赖包
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")  //引入压缩图片依赖包 下面的配置暂不写
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin")  //引入立即加载依赖包

const threads = os.cpus().length  //获取cpu核心数

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


module.exports = {
    // 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        //文件的输出路径
        // __dirname是nodejs的变量 代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"),    //绝对路径
        // 是入口文件打包输出的文件名
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",  //给打包输出的其他文件命名
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        //自动清空打包内容
        //原理 在打包前 将path整个目录内容清空 再进行打包
        clean: true
    },
    // 加载器
    module: {
        rules: [
            //loader配置
            {
                oneOf: [
                    //css配置
                    {
                        test: /\.css$/,    //只检测.css文件 
                        use: getStyleLoader(),//执行顺序从下到上，从右到左
                    },

                    //less配置
                    {
                        test: /\.less$/,    //只检测.less文件
                        loader: "xxx",     //这样写只能写一个loader
                        use: getStyleLoader("less-loader"),  // use可以写多个loader    
                    },

                    // sass/scss配置
                    {
                        test: /\.s[ac]ss$/,    //只检测.scss/.sass文件
                        loader: "xxx",     //这样写只能写一个loader
                        use: getStyleLoader("sass-loader"),

                    },

                    // styl配置
                    {
                        test: /\.s[ac]ss$/,    //只检测.scss/.sass文件
                        loader: "xxx",     //这样写只能写一个loader
                        use: getStyleLoader("stylus-loader"),  //将styl文件编译成css

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
                        use: [
                            {
                                loader: "thread-loader",  // 开启多线程
                                options: {
                                    works: threads,  //进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"],  //配置文件可以选择在外面写
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, //关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"], //减少代码体积
                                },  
                            }
                        ]   
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
            exclude: "node_modules",
            cache: true, // 开启缓存
            cacheLocation: path.resolve(__dirname, '../node_module/.cache/eslintcache'),  //指定缓存路径
            threads, //开启多线程和设置线程数量

        }),
        // Html
        new HtmlWebpackPlugin({
            // 特点 1 结构和原来一致 2自动引入打包输出的资源
            template: path.resolve(__dirname, "public/index.html")   //需要配置模板
        }),
        // css打包配置
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: "static/css/[name].chunk.css",
        }),  //css成单独文件的插件调用
        // new CssMinimizerPlugin(),
        // new TerserWebpackPlugin({   
        //     parallel: threads,  //开启多线程和设置线程数量
        // }),
        //预加载技术
        new PreloadWebpackPlugin({
            // rel: 'preload',
            // as: 'script',
            rel: 'prefetch'
        })  
    ],
    optimization: {  //压缩的相关可以放在这里 功能是一样的
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                parallel: threads,  //开启多线程和设置线程数量
            }),
      ]  
    },
    //生产模式下不需要devSever
    // 模式
    mode: "production",
    devtool: "source-map"

}