const path = require('path');
const log4js = require('log4js');
const rimraf = require('rimraf');

const logger = log4js.getLogger();
logger.level = 'info';

const removeDirectory = glob => {
  rimraf(glob, err => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(`Deleted files/folders: ${glob}`);
    }
  });
};

removeDirectory(path.resolve(__dirname, '../../dist'));
removeDirectory(path.resolve(__dirname, '../../static'));
