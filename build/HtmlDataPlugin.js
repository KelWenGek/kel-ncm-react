const fs = require('fs');
const path = require('path');
module.exports = function HtmlDataPlugin() {
    this.apply = function (compiler) {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
                fs.writeFile(path.resolve(__dirname, 'hdata.json'), JSON.stringify(data), err => {
                    if (err) throw err;
                    console.log('write data successfully');
                });
                cb(null, data);
            });
        })
    }
}