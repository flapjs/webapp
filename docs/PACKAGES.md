# Packages
To make sure any future contributor can update the tools we use, we must
show our reasoning for each toolset, plugin, language, etc. that we chose.
Therefore, for any tools you decide to add to the project, be sure to also
include below your reasoning why you chose it, why it is better than other
alternatives, what would be better, and how to update/change it.

**TL;DR: Anytime you `npm install` a new package, please explain below why we MUST use it.**

# For Production
These are the packages used in production. They are listed under
`dependencies` in `package.json`.

## react
This is a component UI library that enables us to structure our components
in a manner that is easy to read and understand. (It is also because of
legacy code.) We could have also used Web Components, although a steeper
learning curve, is guaranteed to be future proof by web standards.

## react-dom
This is a necessary dependency if using `react` on the web. It basically
serves as a way to "mount" `react` into the DOM.

## prop-types
Allows prop type checking for `react` components. Although this may
initially seem like a `dev-dependencies`, this has useful information
when debugging in production. Therefore, we include it.

There are alternatives, such as `flow` or `typescript`, but PropTypes
provides enough safety for our purposes for now without too much work
on our end. If you feel strongly that we need a type system, feel free
to migrate over. This was really an ad-hoc decision that has persisted.
If you do, please consider the costs and benefits of this migration.

## @ctrl/tinycolor
This is a tiny and useful color helper, so we don't have to keep writing
our own :P In the past, I've actually written multiple color helpers,
but this package is much more complete and we don't have to maintain
more code. Win-win.

Since this is a library used by our code, it must be deployed to production.

# For Development
These are the packages used in development only. They are listed under
`devDependencies` in `package.json`.

## webpack
This allows us to bundle and transform our source code to something
more efficient and compact for delivery. Although other alternatives
exist, such as `rollup` or `parcel`, `webpack` is built for SPAs
(single page applications) in mind. Things such as automatic
code-splitting, which breaks-up our LARGE bundle into smaller chunks
reducing immediate load time, and easier static asset organization.

If we are no longer using these features, `rollup` is a great
alternative. I will leave the research to you.

[Here](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)
is something to get you started.

> *CONFIG*: The entrypoint is in `./webpack.config.js`. Within, it
redirects and loads more config files in `.webpack/`.

## webpack-cli
We need this to interact with `webpack` in the command line. Not much
else to this one.

## webpack-dev-server
Since helps us host and deploy code to a local server to test run our
code and it allows us to use `hot module reloading` to live-reload code
changes, it is very helpful to have open while developing.

Be default it just loads the expected html, css, and js files, so do
be careful when adding other loaders for other files. If you expect
these files to also be hot-reloaded (such as `jsx` or `svg`), you need
to also find compatible loaders. The same goes for transpilation steps.

## webpack-merge
This supports the separation of Webpack configurations for development
and production builds into different files by allowing the config files
to "merge" with other common config files. This reduces redundancy and
actually makes separating the config files a reasonable approach to
different build options.

The only other alternative is to keep both configurations in the same
file, but this would soon lead to a massive file that is hard to read.

[Here](https://dev.to/wiaio/how-to-set-up-different-webpack-configurations-for-development-and-production-2bk9)
is a tutorial on how we did it.

---

## html-webpack-inline-source-only-plugin
## html-webpack-plugin
## clean-webpack-plugin
## copy-webpack-plugin

---

## @pmmmwh/react-refresh-webpack-plugin
Unlike `react-hot-loader`, this is much more robust, albeit, at the
point of this writing, still unstable... but we still use it :P.

This does have some setup code in `webpack.config.js` and in `.babelrc`.

## react-refresh
This is a required dependency for `@pmmmwh/react-refresh-webpack-plugin`.

## react-is

---

## @babel/core
## @babel/preset-react
## babel-loader

---

## eslint
## eslint-import-resolver-alias
## eslint-loader
## eslint-plugin-compat
## eslint-plugin-import
## eslint-plugin-react
## eslint-plugin-react-hooks
## babel-eslint

---

## @svgr/webpack
## file-loader
## workbox-webpack-plugin

---

## jest

---

## mini-css-extract-plugin
## css-loader
## postcss-loader
## autoprefixer

---

## husky
## lint-staged
## stylelint
## stylelint-config-standard

---

## @storybook/react
## @storybook/addon-docs

---

## enquirer
Although this is not used DIRECTLY with with project, it allows us
to build custom tools (with nice interfaces) that help with
project setup.
