var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        App: './src/App'
    },
    output: {
        path: path.join(__dirname, 'example'),
        publicPath: 'example',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    optional: [
                        'runtime',
                        'minification.propertyLiterals'
                    ]
                }
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        modulesDirectories: ['src/Components', 'src/Views', 'src/Styles', 'node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};