module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [ 'src/*_spec.js' ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    //singleRun: true,
    preprocessors: {
      'src/*_spec.js': [ 'webpack' ]
    },
    webpack: {
      cache: true,
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      }
    }
  });
};

