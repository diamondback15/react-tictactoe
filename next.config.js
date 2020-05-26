const path = require('path')
const webpack = require('webpack')

module.exports = phase => {
  const webpack = config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    return config;
  }

  return {
    webpack
  }
}
