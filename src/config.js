import { config as envConfig } from 'dotenv';

envConfig();

const config = {
  apiPrefix: '/api/v1/',
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  isRegEnabled: true,
};

export default config;
