const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack: (config, { buildId, dev }) => {
    const oldEntry = config.entry;

    config.entry = () => oldEntry().then((entry) => {
      entry['main.js']
					&& entry['main.js'].push(path.resolve('./utils/offline'));
      return entry;
    });

    /* Enable only in Production */
    if (!dev) {
      //there is also a webpack plugin that can generate the service worker for you
      //GenerateSW
      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.join(__dirname, 'utils', 'sw.js'),
          swDest: path.join(__dirname, '.next', 'sw.js'),
          globDirectory: __dirname,
          globPatterns: [
            'static/**/*.{png,jpg,ico}',
          ],
        }),
      );
    }

    return config;
  },
});
