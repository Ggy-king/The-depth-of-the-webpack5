const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "./loaders/test-loader.js"
            },
            {
                test: /\.js$/,
                loader: "./loaders/babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/test-loader.js",
                type: "javascript/auto"  //阻止webpack默认处理图片
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        })
    ],
    mode: "development"
}