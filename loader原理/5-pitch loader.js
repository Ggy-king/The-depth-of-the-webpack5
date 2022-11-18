module.exports = function (context) {
    return context
}

module.exports.pitch = function () {
    console.log("pitch");
}

// pitch会在所有loader执行之前执行

// pitch执行顺序与loader执行顺序恰巧相反 这一点要注意

module.exports.pitch = function () {
    console.log("pitch");
    return "result"
}

// 注意 一但pitch有return函数 从该return开始后面都不执行 直到第一个loader