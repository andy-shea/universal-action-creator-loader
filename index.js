var acorn = require('acorn');
var walk = require('acorn/dist/walk');
var astring = require('astring');

function findAsyncActionCreator(nodeType, node) {
  // if found call to asyncActionCreator() and second parameter is an object
  return (nodeType === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      node.callee.name === 'asyncActionCreator' &&
      node.arguments[1] &&
      node.arguments[1].type === 'ObjectExpression');
}

module.exports = function(source, map) {
  this.cacheable();

  var ast = acorn.parse(source, {sourceType: 'module'});
  var foundAsyncAction = walk.findNodeAt(ast, null, null, findAsyncActionCreator);
  while (foundAsyncAction) {
    var properties = foundAsyncAction.node.arguments[1].properties;
    var serverIndex = properties.findIndex(function(property) {
      return property.key.name === 'server';
    });
    if (serverIndex !== -1) properties.splice(serverIndex, 1);

    foundAsyncAction = walk.findNodeAfter(ast, foundAsyncAction.node.end, findAsyncActionCreator);
  }

  this.callback(null, astring(ast, {indent: '  '}), map);
};
