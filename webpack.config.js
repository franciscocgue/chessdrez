const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/client/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/client/template.html'),
            title: 'My Application',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};