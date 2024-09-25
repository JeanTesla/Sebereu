//const env = require('../src/app/environments/environment.ts')

const proxy = [
    {
      context: '/api/*',
      target:  env.default.api.server + '/api',
      pathRewrite: {'^/api' : ''},
      secure: false
    }
  ];
module.exports = proxy;