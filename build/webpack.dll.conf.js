const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const env = require('../config/prod.env');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = function (args, e) {
    const dllConfig = {
        output: {
            path: path.join(__dirname, '../static/js'),
            filename: '[name].dll.js',
            library: '[name]_library'
        },
        plugins: [
            new CleanWebpackPlugin(['static', 'manifest'], {
                root: path.resolve(__dirname, '..')
            }),
            new webpack.DllPlugin({
                context: __dirname,
                path: path.join(__dirname, '../manifest', '[name]-manifest.json'),
                name: '[name]_library'
            })
        ]
    };
    dllConfig.entry = Object.assign({}, config.dll.entry);
    if (process.env.NODE_ENV == 'production') {
        dllConfig.plugins = dllConfig.plugins.concat(
            [
                new webpack.DefinePlugin({
                    'process.env': env
                }),
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false
                        }
                    },
                    sourceMap: config.build.productionSourceMap,
                    parallel: true
                })
            ]
        );
    }
    return dllConfig;
};

