// 1 分类
/**
 * pre: 前置loader
 * normal: 普通loader
 * inline: 内联loader
 * post: 后置loader
 */

// 2 执行顺序
/**
 * 优先级： pre > normal > inline > post
 * 相同级为从右到左 从下到上
 */

module: {
    rules: [
        {
            enforce: "pre",   //定前置优先级
            test: /\.js$/,
            loader: "loader1"
        },
        {
            test: /\.js$/,
            loader: "loader2"
        },
        {
            enforce: "post",   //定后置优先级
            test: /\.js$/,
            loader: "loader3"
        },
    ]
}


// 内联loader是通过import语句引入的   不建议写不好复用

import Styles from 'style-loader!css-loader?modules!./styles.css'   //多个loader通过 ! 连接 通过 ? 传递参数


// 前方加用于跳过
// !跳过normal loader
import Styles from '!style-loader!css-loader?modules!./styles.css'
// -!跳过 pre 和 normal
import Styles from '-!style-loader!css-loader?modules!./styles.css'
// !!跳过 pre normal post
import Styles from '!!style-loader!css-loader?modules!./styles.css'