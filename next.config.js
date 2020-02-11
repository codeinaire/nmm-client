const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  env: {
    // HTTPS server for FB testing
    // HTTPS: true,
    // CLIENT_URL: 'https://myapp.example:3000/',
    // SERVER_URL: 'https://localhost:4000/nmm-app',
    // REDIRECT_URL: 'https://myapp.example:3000/',
    // PROD ENVS - TODO - UPDATE EMPTY ENS
    // CLIENT_URL: 'https://d2hir6fuy7vez1.cloudfront.net',
    // SERVER_URL:
    //   'https://f4b9m743e3.execute-api.ap-southeast-2.amazonaws.com/prod/nmm-app',
    // FB_GROUP_ID: '',
    // FB_APP_ID: '',
    // Auth0 + CORS stuff
    // APP_DOMAIN: '',
    // APP_CLIENT_ID: '',
    // AUDIENCE: '',
    // REDIRECT_URL: '',
    // FB stuff
    FB_GROUP_ID: '548965739271455',
    FB_APP_ID: '695528800971318',
    // Auth0 + CORS stuff
    APP_DOMAIN: 'dev-s70wdmyk.au.auth0.com',
    APP_CLIENT_ID: 'Mn51EwPsHWiZUVRZJyNkNRZGKMikJoSE',
    AUDIENCE: 'https://dev-s70wdmyk.au.auth0.com/api/v2/',
    REDIRECT_URL: 'http://localhost:3000/',
    CLIENT_URL: 'http://localhost:3000',
    SERVER_URL: 'http://localhost:4000/nmm-app',
    // Create infra for logger URI
    LOGGER_URI: '',
    IS_DEVELOPMENT: true,
    // Don't worry about Ryan creating another account
    CLOUDINARY_API: 'https://api.cloudinary.com/v1_1/codeinaire/image/upload'
  },
  webpack: config => {
    // https://github.com/justadudewhohacks/face-api.js/issues/154
    config.node = { fs: 'empty', fetch: 'empty' }
    return config
  },
  target: 'serverless'
})
