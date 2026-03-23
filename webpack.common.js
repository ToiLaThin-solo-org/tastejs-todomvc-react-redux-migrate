const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@/*': path.resolve(__dirname, 'src/*'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TodoMVC: React',
            template: 'public/index.html',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
};
