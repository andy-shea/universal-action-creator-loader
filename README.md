# Universal Action Creator Loader

[![Build Status](https://travis-ci.org/andy-shea/universal-action-creator-loader.svg?branch=master)](https://travis-ci.org/andy-shea/universal-action-creator-loader)
[![Code Coverage](http://codecov.io/github/andy-shea/universal-action-creator-loader/coverage.svg?branch=master)](http://codecov.io/github/andy-shea/universal-action-creator-loader?branch=master)

A Webpack loader to strip server side code from action creators in a client build.
For use with universal action creators defined using the [redux-action-creator](https://github.com/andy-shea/redux-action-creator#universal) helper.

## Install

```yarn add universal-action-creator-loader --dev```

## Usage

In your client webpack build, add the loader for your action files.  In this example we assume the action creators are defined in
files called `action.js`:
```javascript
module: {
  loaders: [
    {test: /actions\.js$/, loader: require.resolve('universal-action-creator-loader')}
  ]
}
```

## Licence

[MIT](./LICENSE)
