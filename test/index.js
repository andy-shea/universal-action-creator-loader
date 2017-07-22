import test from 'tape';
import fs from 'fs';
import loader from '..';

function loadSouce(filename) {
  return fs.readFileSync('./test/' + filename, 'utf8');
}

function testLoader(t, filename, expectedFilename, message) {
  const source = loadSouce(filename);
  loader.call({cacheable: () => {}, callback: (err, modifiedSource) => {
    t.equal(modifiedSource, loadSouce(expectedFilename), message);
    t.end();
  }}, source);
}

test('source is unchanged if missing server property', t => {
  testLoader(t, 'source1', 'source1', 'source is unchanged');
});

test('strips single server property', t => {
  testLoader(t, 'source2', 'expected2', 'server property is removed');
});

test('strips multiple server properties', t => {
  testLoader(t, 'source2', 'expected2', 'server properties are removed');
});

test('strips server property within function', t => {
  testLoader(t, 'source4', 'expected4', 'server property is removed');
});

test('handles async functions', t => {
  testLoader(t, 'source5', 'expected4', 'server property is removed');
});
