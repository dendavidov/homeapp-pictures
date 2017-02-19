const CREDENTIALS = { username: 'user', password: 'test-password' };
const CREDENTIALS_WRONG = { username: 'user', password: 'wrong-password' };
const CREDENTIALS_NEW = { username: 'new-user', password: 'test-password' };
const CREDENTIALS_WITH_EMPTY_PASSWORD = { username: 'user2' };
const CREDENTIALS_WITH_EMPTY_USERNAME = { password: 'lonely-password' };

module.exports = {
  CREDENTIALS,
  CREDENTIALS_WRONG,
  CREDENTIALS_NEW,
  CREDENTIALS_WITH_EMPTY_PASSWORD,
  CREDENTIALS_WITH_EMPTY_USERNAME,
};
