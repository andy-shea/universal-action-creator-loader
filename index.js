var acorn = require('acorn');
var walk = require('acorn/dist/walk');
var astring = require('astring');

function isObject(nodeType, node) {
  return nodeType === 'ObjectExpression';
}

module.exports = function(source, map) {
  this.cacheable();

  var ast = acorn.parse(source, {sourceType: 'module'});
  var object = walk.findNodeAt(ast, null, null, isObject);
  while (object) {
    var properties = object.node.properties;
    var serverIndex = properties.findIndex(function(property) {
      return property.key.name === 'server';
    });
    if (serverIndex !== -1) properties.splice(serverIndex, 1);

    object = walk.findNodeAfter(ast, object.node.end, isObject);
  }

  this.callback(null, astring(ast, {indent: '  '}), map);
};
