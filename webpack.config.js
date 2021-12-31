const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/main.js",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            title: 'Development',
        }),
    ],
    cache: false,
    context: path.resolve(__dirname, '.'),
    devtool: 'source-map',
    target: 'web',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public', 'js/webpack'),
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    devtool: 'inline-source-map',
    resolve: {
        fallback: {
            util: require.resolve("util/")
        }
    },
    devServer: {
        port: 3002,
    },
};
