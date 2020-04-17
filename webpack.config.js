const path = require("path");

const CHROME_EXTENSION_DIR = path.join(__dirname, "chrome");

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, "src", "index.js")],
    output: {
        path: path.join(CHROME_EXTENSION_DIR, "build"),
        filename: "content-script.js"
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
                options: {
                    // eslint options (if necessary)
                },
            }
        ],
    }
};