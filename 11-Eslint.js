// Eslint
/**
 * 1 可组装的js和jsx检查工具
 * 2 书写Eslint配置文件 运行后代码检查
 */

// 1 配置文件写法  区别格式不一样
// .eslintrc
// .eslintrc.js
// .eslint.json

// package.json中eslintConfig不需要创建文件 在原有文件的基础上写

module.exports = {
    parserOptions: {},  //解析选项
    rules: {},  //具体检查规则
    extends: [],  //继承其他规则

}

// 1 安装
// npm i eslint-webpack-plugin --save-dev
// npm i eslint --save-dev

// 2 配置到webpack.config.js
const ESLintPlugin = require('eslint-webpack-plugin')  //引入eslint依赖包
plugins: [
    //plugins的配置
    new ESLintPlugin({
        context: path.resolve(__dirname, "src"),

    })
]

// 3 配置.eslintrc.js 文件
// 3 配置.eslintignore 文件  在这个文件直接写上你不需要查看报错的文件名就可
