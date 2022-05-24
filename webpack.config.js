const path = require('path');
const { pathToFileURL } = require('url');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/client/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    }
};