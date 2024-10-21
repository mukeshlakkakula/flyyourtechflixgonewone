const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        enforce: "pre", // Ensures this runs before other loaders
        exclude: /node_modules/, // Ignore node_modules to suppress warnings
      },
    ],
  },
  devtool: false, // Disable source maps if not needed
};
