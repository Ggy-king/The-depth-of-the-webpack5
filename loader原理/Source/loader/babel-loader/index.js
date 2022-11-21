const babel = require("@babel/core")
const schema = require("./schema.json")

module.exports = function (content) {
    //异步loader
    const callback = this.async()
    const options = this.getOptions(schema)

    //使用babel对代码进行编译
    babel.transform(content, options, function (err, result) {
        // result; // => {code,options,ast}
        if (err) callback(err)
        else callback(null,result.code)
    })
}