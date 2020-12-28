const path = require("path");  //引入path
function resolve(dir) {    //封装一个通用方法
    return path.resolve(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('acssets',resolve('src/assets'))
            .set('@',resolve('src'))
            .set('views',resolve('src/views'))
    },
    devServer:{
        port:8081
    }

}