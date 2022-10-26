// 1  下载字体图标 想阿里巴巴失量图标库
// 2  添加字体图标文件
// 3  引入 别忘了改路径
// 4  配置
// 处理图标资源
{
    test: /\.(ttf|woff2?)$/,
        type: "asset/resource",   //该类型不会转base64
            generator: {
        //输出图片名称    hash名称id ext文件扩展名 query可选参数
        //[hash:10]  取id的前十位
        filename: "static/media/[hash:10][ext][query]",
                }
}