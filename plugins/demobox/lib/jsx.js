var transform       = require('jstransform').transform;
var reactTransform  = require('reactify/node_modules/react-tools').transform;
var visitors        = require('reactify/node_modules/react-tools/vendor/fbtransform/visitors');

var PRAGMA = '/** @jsx React.DOM **/'

module.exports = function (code) {
  var transformers = visitors.getAllVisitors()
  transformers = require('jstransform/visitors/es6-destructuring-visitors').visitorList.concat(transformers)
  return transform(transformers, PRAGMA + code).code
}


