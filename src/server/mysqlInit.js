import mysql from 'mysql';

import logger from './logger';
import Config from '../config';

const connection = mysql.createConnection({
  ...Config.mysql,
});
connection.connect(err => {
  if (err) throw err;
  logger.info('Connected to mySQL database!');
});

export default connection;
