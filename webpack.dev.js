const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('node:path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
            watch: true,
        },
        //no refresh when files from static dir changes
        hot: true,
        liveReload: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});
