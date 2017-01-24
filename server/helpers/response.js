'use strict';

module.exports = function Response(error, data, message) {
  this.error = error;
  this.data = data;
  this.message = message;
}
