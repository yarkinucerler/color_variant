/**
 * Created by Yarkin UCERLER on 7.08.2018.
 */

 const path = require('path');
 const webpack = require('webpack');
 const CopyWebpackPlugin = require('copy-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const cleanWebpackPlugin = require('clean-webpack-plugin');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, './dist'),
         filename: '[name].bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 enforce: 'pre',
                 exclude: /node_modules/,
                 use: {
                     loader: 'eslint-loader'
                 }
             },
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 use: {
                     loader: 'babel-loader'
                 }
             },
             {
                 test: /\.(sa|sc|c)ss$/,
                 use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer"),
                                require('cssnano')
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
             },
             {
                 test: /\.css$/,
                 use: [
                     MiniCssExtractPlugin.loader,
                     "css-loader"
                 ]
             },
             {
                 test: /\.(svg|png|jpg|gif|ico)$/,
                 use: [
                     {
                         loader: 'url-loader',
                         options: {
                             limit: 10000000
                         }
                     },
                 ]
             }
         ]
     },
     resolve: {
         extensions: ['.js', '.css', '.scss', '.json'],
         alias: {
             styles: path.resolve(__dirname, 'src', 'styles'),
             scripts: path.resolve(__dirname, 'src', 'scripts'),
         }
     },
     plugins: [
         new webpack.HotModuleReplacementPlugin(),
         new HtmlWebpackPlugin({
             template: './public/index.html',
             filename: './index.html',
             title: 'Color Variant'
         }),
         new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: '[id].css'
         }),
         new CopyWebpackPlugin(),
         new cleanWebpackPlugin(['dist'], {
             root: path.resolve(__dirname, '..'),
             verbose: true,
             exclude: ['ignore.js']
         }),
     ],
     devServer: {
         contentBase: path.resolve(__dirname, './dist'),
         inline: true,
         port: 4200
     }
 }