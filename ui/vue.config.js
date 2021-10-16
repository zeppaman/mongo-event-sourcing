// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 console.log("customization");
console.log(process.env.VUE_APP_PUBLICPATH);
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/app/'
    : '/'
  }