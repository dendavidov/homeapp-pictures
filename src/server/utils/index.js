const HTTPStatus = require('http-status');

const getHttpResponse = identifier => ({
  status: HTTPStatus[identifier],
  message: HTTPStatus[HTTPStatus[identifier]],
});

module.exports = {
  http: getHttpResponse,
};
