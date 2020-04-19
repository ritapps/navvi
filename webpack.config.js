const path = require("path");

module.exports = {
    entry: {
        'chrome/build/content-script': path.join(__dirname, "src", "index.js"),
        'mozilla/build/content-script': path.join(__dirname, "src", "index.js"),
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-syntax-dynamic-import"]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {},
            }
        ],
    }
};