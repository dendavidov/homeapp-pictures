import { config as envConfig } from 'dotenv';

envConfig();

const config = {
  apiPrefix: '/api/v1/',
  token: process.env.SESSION_TOKEN || 'default-token-key',
  mongo: {
    url: process.env.DB_URL,
  },
  isRegEnabled: true,
};

export default config;
