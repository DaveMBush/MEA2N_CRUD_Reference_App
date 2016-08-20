var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: './www/app/main',
    output: {
        path: __dirname + '/www/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve:{
        extensions: ['','.ts','.js']
    },
    module:{
        loaders: [
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'moduleId:.module.id,',
                    replace: '',
                    flags: 'g'
                }
            },
            {
                test: /\.ts$/,
                loaders: ['ts-loader','angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('www', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('www', 'app'),
                loader: 'raw'
            }
        ]
    },
    htmlLoader: {
        minimize: false // workaround for ng2
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {keep_fnames: true}
        }),
        new ExtractTextPlugin('[name].[hash].css')
    ]
}