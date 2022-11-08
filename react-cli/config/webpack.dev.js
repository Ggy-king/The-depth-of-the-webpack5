
const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

//返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
        "style-loader",
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
        pre
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assentModuleFilename: "static/media/[hash:10][ext][query]",

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
                },
            },
        ],

    },
    //处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "mode_module",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_module/.cache/.eslintcache'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"../public/index.html"),
        }),
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        spiltChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name:(entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    devServe: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true
    }

}