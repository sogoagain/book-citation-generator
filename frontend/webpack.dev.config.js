const path = require('path');
const DotenvWebpack = require('dotenv-webpack');

const config = require('./webpack.config');

module.exports = {
  ...config,
  plugins: [
    ...config.plugins,
    new DotenvWebpack({
      path: path.resolve(__dirname, `config/.env.dev`),
    }),
  ],
};
