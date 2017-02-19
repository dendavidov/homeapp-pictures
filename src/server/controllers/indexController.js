const HTTPStatus = require('http-status');
const version = require('../../../package.json').version;

exports.getIndexPage = function getIndexPage() {
  this.status = HTTPStatus.OK;
  this.body = {
    version,
  };
};
