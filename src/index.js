var acorn = require('acorn');
var walk = require('acorn/dist/walk');
var astring = require('astring');
var fs = require('fs');
var util = require('util');

function findAsyncActionCreator(nodeType, node) {
  return (nodeType === 'MemberExpression' && node.property.name === 'asyncActionCreator');
}

module.exports = function(source, map) {
  this.cacheable();

  var ast = acorn.parse(source);
  var foundAsyncAction = walk.findNodeAt(ast, null, null, findAsyncActionCreator);
  while (foundAsyncAction) {
    var parent = walk.findNodeAround(ast, foundAsyncAction.node.start, function(nodeType) {
      return (nodeType === 'CallExpression');
    });
    var properties = parent.node.arguments[parent.node.arguments.length - 1].properties;
    if (properties) {
      var serverIndex = properties.findIndex(function(property) {
        return property.key.name === 'server';
      });
      if (serverIndex !== -1) properties.splice(serverIndex, 1);
    }

    foundAsyncAction = walk.findNodeAfter(ast, foundAsyncAction.node.end, findAsyncActionCreator);
  }

  this.callback(null, astring(ast, {indent: '  '}), map);
};
