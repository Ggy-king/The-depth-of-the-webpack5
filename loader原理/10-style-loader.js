

module.exports = function (content) {

    // 1 直接使用style-loader 只能处理样式 不能处理其中引入的其他资源
    // use: ["./loaders/style-loader"]

    // 2 借助css-loader解决样式中引入其他资源
    // use: ["./loaders/style-loader","css-loader"]
    // 问题是css-loader暴露了一段js代码 style-loader需要执行js代码 得到返回值 在动态创建style标签 插入页面 不好操作

    // 3 style-loader使用pitch loader用法

    
}

module.exports.pitch = function (remainingRequest) {
    // 1 将remainingPath中的绝对路径改成相对路径
    // remainingRequest 剩下还需要处理的loader
    const relativePath = remainingRequest.spilt('!').map(absolutePath => {
        // 返回相对路径并拼接
        return this.utils.contextify(this.context,absolutePath)
    }).join('!')

    // 2 引入css-loader处理后的资源
    // 3 创建style 将内容插入到页面中生效
    const script = `
    import style from "!!${relativePath}";
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
    `
    // 终止后面loader执行
    return script
}