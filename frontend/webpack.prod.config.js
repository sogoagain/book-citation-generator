const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = require('./webpack.config');

module.exports = {
  ...config,
  plugins: [
    ...config.plugins,
    new Dotenv({
      path: path.resolve(__dirname, `config/.env.prod`),
    }),
  ],
};
