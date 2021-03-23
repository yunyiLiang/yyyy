const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports ={

    //入口
    entry:'./src/index.jsx',


    //出口
    // outPut:{

    // },

    //测试服务器
    devServer:{
        //配置服务器根目录
        contentBase:path.join(__dirname,'./public'),
        port:2001
    },

    resolve:{
        //路径别名
        alias:{
            "@":path.resolve('./src'),
        },

        // 默认扩展名
        extensions:['.js','.jsx']
    },

    //加载器:loder
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-react'], // 插件集合  用于把JSX编译成React.createElement()
                        plugins:[
                            ['@babel/plugin-proposal-decorators',{legacy: true}],
                            ['@babel/plugin-proposal-class-properties',{loose:true}],
                        ]
                    }
                }]
            },

            //下载编译器  css loader:css-loader + style-loader
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },

            // 下载编译器 sass: sass-loader
            // sass->css->style
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },

        ]
    },

    //插件
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'./public/index.html')
        }),
    
    ]



}