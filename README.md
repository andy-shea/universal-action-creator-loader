# Universal Action Creator Loader

A Webpack loader to strip server side code from action creators in a client build.
For use with universal action creators defined using the [redux-action-creator](https://github.com/andy-shea/redux-action-creator#universal) helper

## Install

```npm install universal-action-creator-loader --save-dev```

## Usage

In your client webpack build, add the loader for your action files.  In this example we assume the action creators are defined in
files called `action.js`:
```
module: {
  loaders: [
    {test: /actions\.js$/, loader: require.resolve('universal-action-creator-loader')}
  ]
}
```

## Licence

[MIT](./LICENSE)
