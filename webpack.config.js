var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var htmlMin = require('html-minifier').minify;
var autoprefixer = require('autoprefixer');
var webpackCleanPlugin = require('clean-webpack-plugin');

var path = require('path');
var serverPath = 'http://localhost:8080/';

var ENV = process.env.npm_lifecycle_event;
var isProduction = ENV === 'build';

var config = {
    entry: {
        app: './src/main.js',
        vendor: ['angular', 'angular-ui-router', 'ocLazyLoad']
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: isProduction ? './' : serverPath,
        filename: isProduction ? 'js/[name].[chunkhash].js' : '[name].chunk.js',
        chunkFilename: isProduction ? 'js/[name].[chunkhash].js' : '[name].chunk.js'
    },
    module: {
        rules: [{
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: '10240',
                        name: 'image/[name].[ext]',
                        publicPath: '../'
                    }
                }
            },
            {
                test: /\.(jpg|jpeg)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                        loader: "raw-loader"
                    },
                    {
                        loader: "html-minifier-loader",
                        options: {
                            removeComments: true,
                            collapseWhitespace: true,
                            conservativeCollapse: true,
                            preserveLineBreaks: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 每次编译之前尝试从缓存读取
                        cacheDirectory: true,
                        presets: ["es2015"],
                        plugins: ["angularjs-annotate"]
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash].css',
            allChunks: true,
            disable: !isProduction
        }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src/'),
            'swiper.css': path.resolve('node_modules/swiper/dist/css/swiper.min.css')
        },
        extensions: ['.js', '.css', '.html', '.scss']
    }
};

if (!isProduction) {
    config.devtool = 'source-map';
    config.devServer = {
        contentBase: './build',
        compress: false,
        port: 8080
    };
}

if (isProduction) {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({ options: { context: __dirname } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 删除之前打包文件夹
        new webpackCleanPlugin(['build'], {
            verbose: true // log in console
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: true,
            },
            mangle: false
        }),
        // 用于解决只改变app文件，而vendonr hash值也会变化
        new webpack.HashedModuleIdsPlugin(),
        // new ngAnnotatePlugin({ add: true }),
        /*
         *  抽离共同代码
         * */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // webpack3 新增特性
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 第三方资源包每次打包hash值不变，以利于浏览器缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    );
}


module.exports = config;