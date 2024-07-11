const path = require('path')
const name = 'Vue Typescript Admin'
const IS_PROD = ['production', 'development'].includes(process.env.NODE_ENV)

module.exports = {
  'publicPath': process.env.NODE_ENV === 'production' ? './' : '/', //TODO: 请根据自己路径配置更改
  'lintOnSave': process.env.NODE_ENV === 'development',
  'pwa': {
    'name': name
  },
  'pluginOptions': {
    'style-resources-loader': {
      'preProcessor': 'scss',
      'patterns': [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  devServer: {
    port: 6666,
    open: true,
    disableHostCheck: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/admin': {
        target: process.env.VUE_APP_URL,
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {},
  },
};
