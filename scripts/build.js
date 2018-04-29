import webpack from 'webpack';

import clientConfig from '../config/webpack/client';
import serverConfig from '../config/webpack/server';

[clientConfig, serverConfig].forEach(config => {
  console.log('config', config);

  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exitCode = process.exitCode || 1;
      return;
    }

    if (stats.hasErrors()) {
      process.exitCode = process.exitCode || 1;
    }

    console.log(stats.toString({ colors: true }));
  });
});
