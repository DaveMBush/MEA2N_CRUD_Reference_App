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
        extensions: ['.ts','.js']
    },
    module:{
        rules: [
            {
                test: /\.ts$/,
                use: [{loader:'ts-loader'},{loader:'angular2-template-loader'}]
            },
            {
                test: /\.html$/,
                use: [{loader:'html-loader'}]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [{loader:'file?name=assets/[name].[hash].[ext]'}]
            },
            {
                test: /\.css$/,
                exclude: helpers.root('www', 'app'),
                use: [{loader:ExtractTextPlugin.extract({fallbackLoader: 'style-loader',loader: 'css-loader'})}]
            },
            {
                test: /\.css$/,
                include: helpers.root('www', 'app'),
                use: [{loader:'raw'}]
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/
        ),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {keep_fnames: true}
        }),
        new ExtractTextPlugin('[name].[hash].css')
    ]
};