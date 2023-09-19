var acorn = require("acorn");
var walk = require("acorn-walk");
var astring = require("astring");

function isObject(nodeType, node) {
  return nodeType === "ObjectExpression" && node.properties.length;
}

module.exports = function (source, map) {
  this.cacheable();

  var ast = acorn.parse(source, {
    sourceType: "module",
    ecmaVersion: 14,
  });

  var found = walk.findNodeAfter(ast, 0, isObject);
  while (found) {
    var properties = found.node.properties;
    var serverIndex = properties.findIndex(function (property) {
      return property.key && property.key.name === "server";
    });
    if (serverIndex !== -1) properties.splice(serverIndex, 1);

    found = walk.findNodeAfter(
      ast,
      properties.length ? properties[0].start : found.node.end,
      isObject
    );
  }

  this.callback(null, astring.generate(ast, { indent: "  " }), map);
};
