// var acorn = require('acorn');
// require('acorn-es7-plugin')(acorn);
// var astring = require('astring');
//
// var source = `
// async function test() {
//   console.log(this);
// }
// `;

// var ast = acorn.parse(source, {
//   plugins: {asyncawait: true},
//   ecmaVersion: 7
// });
//
// console.log(astring.generate(ast, {indent: '  '}));

var acorn = require("acorn");

var code = "const test = async () => {console.log('sdf');}\n";
var ast = acorn.parse(code, {ecmaVersion: 8});
console.log(JSON.stringify(ast,null,2)) ;
