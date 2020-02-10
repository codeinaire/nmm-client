const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  env: {
    // HTTPS: true,
    FB_GROUP_ID: '548965739271455',
    FB_APP_ID: '695528800971318',
    APP_DOMAIN: 'dev-s70wdmyk.au.auth0.com',
    APP_CLIENT_ID: 'Mn51EwPsHWiZUVRZJyNkNRZGKMikJoSE',
    // CLIENT_URL: 'https://myapp.example:3000/',
    CLIENT_URL: 'http://localhost:3000/',
    // SERVER_URL: 'https://localhost:4000/nmm-app',
    SERVER_URL:
      'https://0b7qzqr1t0.execute-api.ap-southeast-2.amazonaws.com/prod/nmm-app',
    AUDIENCE: 'https://dev-s70wdmyk.au.auth0.com/api/v2/',
    // REDIRECT_URL: 'https://myapp.example:3000/',
    REDIRECT_URL: 'http://localhost:3000/',
    LOGGER_URI: 'https://zjy4b2tny0.execute-api.ap-southeast-2.amazonaws.com',
    IS_DEVELOPMENT: true,
    CLOUDINARY_API: 'https://api.cloudinary.com/v1_1/codeinaire/image/upload'
  },
  webpack: config => {
    // https://github.com/justadudewhohacks/face-api.js/issues/154
    config.node = { fs: 'empty', fetch: 'empty' }
    return config
  },
  target: 'serverless'
})
