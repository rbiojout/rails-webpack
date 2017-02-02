// Example webpack configuration with asset fingerprinting in production.

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var StatsPlugin = require('stats-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");


// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
    context: __dirname + "/webpack",
    entry: {
        //global: ["./global.js","./global.scss"],
        global: "./global.js",
        // Sources are expected to live in $app_root/webpack
        // 'application': './webpack/application.js'
    },

    output: {
        // Build assets directly in to public/webpack/, let webpack know
        // that all webpacked assets start with webpack/

        // must match config.webpack.output_dir
        path: path.join(__dirname, 'public', 'webpack'),
        publicPath: '/webpack/',

        filename: production ? '[name]-[chunkhash].js' : '[name].js'
    },

    resolve: {
        modules: ["node_modules", "lib/assets", "vendor/assets/javascripts"],
        //extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
        alias: {
            "jquery": 'jquery/dist/jquery',
            "stellar": "jquery.stellar/jquery.stellar.js"
        }
    },


    externals: {
        // This mean that require('jquery') will refer to global var jQuery
        'jquery': 'jQuery'
    },

    module: {
        rules: [
            {
                test: require.resolve("jquery"),
                loader: "expose-loader?$!expose-loader?jQuery"
            },
            // Process .js and .jsx files for ES6 and React
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader',
                ],
            },
            // Embed images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?name=images/[name].[ext]'
            },
            // Process normal CSS files
            { test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
            },

            // Process SASS files
            {
                test: /\.scss$/,
                //loader: ExtractTextPlugin.extract("style!css!resolve-url!sass")
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                //loader: 'style!css!sass!postcss'
            },
            // Embed fonts
            {
                test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
                loader: "file?name=fonts/[name].[ext]"
            }
        ]
    },


    plugins: [
        //new ExtractTextPlugin(production ? '[name]-[chunkhash].css' : '[name].css'),
        // if you want a module available as variable in every module,
        // such as making $ and jQuery available in every module without writing require("jquery").
        // You should use ProvidePlugin.
        // Expose some modules globally to every module (so you don't have to explicitly require them)
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            React: "react"
        }),
        // must match config.webpack.manifest_filename
        new StatsPlugin('manifest.json', {
            // We only need assetsByChunkName
            chunkModules: false,
            source: false,
            chunks: false,
            modules: false,
            assets: true
        })]
};

if (production) {

    config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false },
        sourceMap: false
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
    );
} else {
    config.devServer = {
        port: devServerPort,
        headers: { 'Access-Control-Allow-Origin': '*' }
    };
    config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
    // Source maps
    config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;
