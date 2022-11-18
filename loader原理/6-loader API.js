this.async()   //异步调用loader 返回this.callback
this.callback(err,content,sourceMap?,meta?)   // 可以同步或异步调用的并返回多个结果的函数
this.getOptions(schema)   //获取loader的options
this.emitFile(name, context, sourceMap)  //产生一个文件
this.utils.contextify(context, request)   //返回一个相对路径
this.utils.absolutify(context,request)   //返回一个绝对路径