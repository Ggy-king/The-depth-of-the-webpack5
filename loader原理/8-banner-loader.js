// 自定义banner-loader
const schema = require("./schema.json")

modules.exports = function (content) {
    // schema对options的验证规则
    // schema符合JSON Schema的规则
    const options = this.getOptions(schema)

    const prefix = `
    /*
    * Author: ${options.author}
    */
    `
    return prefix + content
}