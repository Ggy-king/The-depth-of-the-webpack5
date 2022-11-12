const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")


const MiniCssExtractPlugin = require("mini-css-extract-plugin") //生产下的css打包成单独文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin") //css压缩
const TerserWebpackPlugin = require("terser-webpack-plugin") //js压缩
// const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin") //图片压缩  这个配置较复杂 官网自行赋值代码 这里就不写了
const CopyPlugin = require("copy-webpack-plugin")   //复制问题 解决图标问题 即public目录下静态文件问题

// 获取cross-env定义的环境变量
const isProduction = process.env.NODE_ENV === "production"

//返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
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
                pre === "less-loader" ? {
                    //在这里可以修改less选项
                    //如 antd主题配置
                    lessOptions: {
                        modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true
                    }
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
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                        !isProduction && 'react-refresh/babel'   //激活js的HMR功能
                    ].filter(Boolean),
                },
            },
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
        !isProduction && new ReactRefreshWebpackPlugin(),

    ].filter(Boolean),
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",

    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                //react react-dom react-router-dom 打包成一个文件
                react: {
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name: "chunk-react",
                    priority: 40,
                },
                //antd单独打包
                antd: {
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    name: "chunk-antd",
                    priority: 30,
                },
                //剩下的node_modules单独打包
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "chunk-lib",
                    priority: 20,
                },
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        minimize: isProduction,    //是否需要进行压缩
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    //webpack解析模块加载选项
    resolve: {
        //自动补全文件扩展名
        extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,  //开启HMR
        historyApiFallback: true,  //解决前端路由刷新返回404问题
    },
    performance: false  //关闭性能分析 提升打包速度

}

