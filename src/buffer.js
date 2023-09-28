'use strict';

const x = require('buffer/').Buffer;

const origFrom = x.from;

x.from = function(data, encoding, ...args) {
  if (encoding === 'base64url') {
    return origFrom(data.replaceAll('-', '+').replaceAll('_', '/'), 'base64', ...args);
  }
  return origFrom(data, encoding, ...args);
};

const origToString = x.prototype.toString;

x.prototype.toString = function(encoding, ...str) {
  if (encoding === 'base64url') {
    return origToString.call(this, 'base64', ...str).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
  }
  return origToString.call(this, encoding, ...str);
};

module.exports = x;
