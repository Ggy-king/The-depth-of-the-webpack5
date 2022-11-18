// 异步loader

module.exports = function (context,map,meta) {
    const callback = this.async()

    setTimeout(() => {
        callback(null,context,map,meta)
    },1000)
}
