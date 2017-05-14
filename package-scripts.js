const { concurrent } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'babel-watch index.js',
    test: 'jest',
    flow: 'flow',
    validate: concurrent.nps('test', 'flow'),
    // no release so no need to babel and bundle
    // build: 'babel index.js -d lib/',
  },
};
