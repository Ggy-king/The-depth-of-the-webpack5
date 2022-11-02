// 提升打包构建速度
// include/Exclude  包装/排除
// 第三方库在node_modules中 这些文件是不需要检测的

// include 包含只处理某些文件
// exclude 排除除了某些文件

// webpack中配置
exclude: /node_modules/,  //排除node_modules中的文件(即不对该文件进行处理 因为这些成熟的依赖包已经处理好了)
include: path.resolve(__dirname, '../src'),  //只处理src下的文件