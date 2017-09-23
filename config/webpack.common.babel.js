import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dir = path.resolve(__dirname, '../');

export default {
    entry: {
        app: path.resolve(dir, 'src/index.js'),//入口文件
        lib: ['react', 'react-dom']// 单独提出框架文件，加快编译速度，这部分不会改变，所以没必要每次都重新编译
    },
    output: {
        publicPath: './',
        path: path.join(dir, 'dist'),//输出文件的路径
        filename: 'js/[name].[hash].js',//entry里有几个入口文件，这里就有几个js
        chunkFilename: 'js/[name].[chunkhash].js',//按需加载的js
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }]
            },
            {
                test: /\.css|less$/,
                use: ['style-loader','css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|md)$/,
                use: ['file-loader?limit=8192&name=imgs/[base64].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css']//引入这些文件时可以省略后缀名
    },
    plugins: [
        new HtmlWebpackPlugin({//把输出文件加载到html文件里面去
            template: './src/index.html'
        })
    ]
}