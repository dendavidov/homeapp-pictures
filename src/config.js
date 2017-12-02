import { config as envConfig } from 'dotenv';

envConfig();

const config = {
  apiPrefix: '/api/v1/',
  token: process.env.SESSION_TOKEN || 'default-token-key',
  mongoDbUrl:
    process.env.DB_URL || 'mongodb://localhost:27017/site_dev',
  isRegEnabled: false,
  siteName: 'SiteName',
  description:
    'Description of website',
  rootLogin: process.env.ROOT_LOGIN || 'admin',
  rootPass: process.env.ROOT_PASS || '12345',
};

export default config;
