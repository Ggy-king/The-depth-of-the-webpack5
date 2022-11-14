const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const MiniCssExtractPlugin = require("mini-css-extract-plugin") //生产下的css打包成单独文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin") //css压缩
const TerserWebpackPlugin = require("terser-webpack-plugin") //js压缩
// const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin") //图片压缩  这个配置较复杂 官网自行赋值代码 这里就不写了
const CopyPlugin = require("copy-webpack-plugin")   //复制问题 解决图标问题 即public目录下静态文件问题

const { VueLoaderPlugin } = require("vue-loader")
const { DefinePlugin } = require("webpack")

const ElementPlus = require("unplugin-element-plus/webpack")

const isProduction = process.env.NODE_ENV === 'production'


//返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        {
            // 处理css兼容性的问题
            // 配合package.json中的browserslist来指定兼容性做到什么程度
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre && {
            loader: pre,
            options:
                pre === "sass-loader" ? {
                    additionalData: `@use "@/styles/element/index.scss" as *;`,
                } : {}
        }
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            //处理css
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            //处理less
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            },
            //处理scss sass
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader")
            },
            //处理styl
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader")
            },
            //处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                }
            },
            //处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            //处理js
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    //开启缓存
                    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader")
                }
            }
        ],

    },
    //处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
        }),
        isProduction && new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        ignore: ["**/index.html"],   //忽略文件
                    }
                },

            ]
        }),
        new VueLoaderPlugin(),
        //cross-env定义的环境变量是给打包工具使用
        //DefinePlugin定义的环境变量是给原代码使用
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        ElementPlus({   
            useSource: true   //自定义主题
        })

    ].filter(Boolean),
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                //vue相关 打包成一个文件
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-react",
                    priority: 40,
                },
                //elementPlus单独打包
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30,
                },
                //剩下的node_modules单独打包
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "lib-chunk",
                    priority: 20,
                },
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        minimize: isProduction,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    //webpack解析模块加载选项
    resolve: {
        //自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        }
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,  //解决前端路由刷新返回404问题
    },
    performance: false  //关闭性能分析 提高打包速度

}

