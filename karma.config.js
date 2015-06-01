module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test/runner.js', watched: false }
    ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    //singleRun: true,
    preprocessors: {
      'test/runner.js': ['webpack']
    },
    webpack: {
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};

