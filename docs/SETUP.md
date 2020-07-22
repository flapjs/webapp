# Setup (INCOMPLETE)

## Setup workspace
```
├───dist/
├───docs/
├───node_modules/
├───out/
└───src/
    └───main.js
```

## Setup Git
```.gitignore
/node_modules/
/out/
.DS_Store

# Depending on where this is hosted, you may or may not need to exclude the output files.
# /dist/

# Ignore any logs
*.log

# ESlint cache file
.eslintcache

# VSCode setting files
/.vscode/
```

## Setup React
```sh
npm install --save react react-dom
# For type checking
npm install --save prop-types
```

## Setup Webpack
```sh
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
# Useful plugins
npm install --save-dev html-webpack-plugin html-webpack-inline-plugin clean-webpack-plugin copy-webpack-plugin
npm install --save-dev @svgr/webpack
# For efficiency
npm install --save-dev parallel-webpack
```
```js
// webpack.config.js
```
```js
// dev.config.js
```
```js
// prod.config.js
```

## Setup Babel
```sh
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev babel-loader
```
```json
//.babelrc
```

## Setup CSS Modules
```
npm install --save-dev css-loader
npm install --save-dev mini-css-extract-plugin
```

## Setup linters
```
npm install --save-dev eslint
npm install --save-dev stylelint
npm install --save-dev husky lint-staged 
```