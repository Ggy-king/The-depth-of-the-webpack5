module.exports = {
    //智能预设 可以编译es6语法
    presets: [
        ["babel/preset-env", {
            useBuiltIns: 'usage',  //按需自动加载
            corejs: 3,
        }]
        
    ],
}