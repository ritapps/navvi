const path = require("path");

const CHROME_EXTENSION_DIR = path.join(__dirname, "chrome");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(CHROME_EXTENSION_DIR, "build"),
        filename: "content-script.js"
    }
};