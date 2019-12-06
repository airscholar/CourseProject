module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://server:4000/api",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
