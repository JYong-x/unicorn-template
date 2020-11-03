const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const StylelintPlugin = require('stylelint-webpack-plugin')

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod', 'isse', 'test'].includes(process.env.NODE_ENV)
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: true,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },

  configureWebpack: (config) => {
    const plugins = []
    if (IS_DEV) {
      plugins.push(
        new StylelintPlugin({
          files: ['src/**/*.vue', 'src/styles/*.scss'],
          failOnError: false,
          fix: true // 打开自动修复（谨慎使用！注意上面的配置不要加入js或html文件，会发生问题，js文件请手动修复）
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]

    // 配置externals,防止打包到bundle中，用cdn形式引入
    // config.externals = {
    //   vue: 'Vue',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    // }
  },

  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('directive', resolve('src/directive'))
      .set('icons', resolve('src/icons'))
      .set('layouts', resolve('src/layouts'))
      .set('mock', resolve('src/mock'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('styles', resolve('src/styles'))
      .set('plugins', resolve('src/plugins'))
      .set('views', resolve('src/views'))

    // svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    //   .oneOf('inline')
    //   .resourceQuery(/inline/)
    //   .use('vue-svg-icon-loader')
    //   .loader('vue-svg-icon-loader')
    //   .end()
    //   .end()
    //   .oneOf('external')
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: 'assets/[name].[hash:8].[ext]'
    //   })
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }

    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    //   js: [
    //     '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
    //     '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    //     '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    //     '//unpkg.com/element-ui@2.10.1/lib/index.js',
    //   ],
    // }
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin('html').tap((args) => {
    //   // html中添加cdn
    //   args[0].cdn = cdn
    //
    //   // 修复 Lazy loading routes Error
    //   args[0].chunksSortMode = 'none'
    //   return args
    // })

    // 删除 moment 除 zh-cn 中文包外的其它语言包，无需在代码中手动引入 zh-cn 语言包。
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    if (IS_PROD) {
      config.optimization.delete('splitChunks')
    }

    return config
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#F5222D',
          // 'ant-prefix': 'u'
          'hack': `true; @import "${resolve('./src/styles/antd.less')}";`
        },
        javascriptEnabled: true
      }
    },
    sourceMap: true
  },

  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true
    },
    open: true, // 是否自动打开浏览器
    port: '8092', // 代理端口
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:8769', // 目标代理接口地址
        // secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/auth': {
        target: 'http://10.254.9.31:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/'
        }
      },
      // '/proxy-user': {
      //   target: 'http://10.254.9.31:9090',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/proxy-user': '/'
      //   }
      // },
      '/isse-auth': {
        target: 'https://10.254.9.31:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/isse-auth': '/'
        }
      }
    }
  }
}
