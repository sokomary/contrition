module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
            fallback: {
            "fs": false,
            "os": false,
            "stream": false,
            "path": require.resolve("path-browserify")
        }
    },
};