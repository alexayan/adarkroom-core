const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, opts) {
    config.output.globals = {
      'lodash-es': '_',
      '@reduxjs/toolkit': 'toolkit',
      'redux-logger': 'logger'
    };

    if (config.output.format === 'umd') {
        delete config.external;
    }

    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p
    );

    return config;
  },
};
