module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { lazyImports: true, jsxRuntime: 'automatic' }]],
    plugins: ['react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  }
}
