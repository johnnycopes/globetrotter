const path = require('path');

module.exports = {
  devServer: { stats: 'errors-only' }, // suppress unhelpful interface import warnings
  resolve: {
    alias: {
      styles: path.resolve(__dirname, '../src/scss/styles.scss')
    }
  }
};
