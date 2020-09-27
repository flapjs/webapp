# Andrew, Tutorial & You - React

## Introduction
Welcome to anoter part of my [React.js](https://reactjs.org/) tutorial. This should provide you the basics to get started on any React project. I will be guiding you through a list of tutorials written by the wonderful programmers of the _Internet_ and showing you what React is and how to use it. Whether you kinda know what's going on or have no idea, this is the tutorial for you.

Due to the vast amount of material that I have to cover, I do not have time to go over everything. So we won't. We will however be going over the essential basics that should allow you to start on a React project and to know where to look for help when needed. For this reason, I have not only included tutorials, but also references.

And since I myself have not written these tutorials, some parts may be irrelevant or confusing within this tutorial's context. Therefore, before reading each tutorial, I suggest you also take a look at the section I wrote for it down below first. Basically, if you follow the flow of this document, you should be fine. There are guiding questions as well which pinpoint what kind of topics you should focus on. For your own benefit, try to answer the questions first before looking at the answer.

Finally, without further ado, here is the tutorial.

---

## The Prerequisites
There are also a few things you must do BEFORE you start this tutorial:
1. Install [Node.js](https://nodejs.org) (or update to latest version).
2. Install [Node Package Manager](https://www.npmjs.com) (or update).
3. Know some basic `cmd` or `bash` commands (things like `cd` and stuff, nothing fancy).

> NOTE: When you do any install / updates, be sure to restart your command prompt or terminal.

## The Tutorial

### Part 2: Setting up React
This will help you setup a basic React environment so you can start building stuff! If you prefer a video over text, there's an identical video guide at the top of the page. Before you start however, there is a couple things you need to do.

The setup:
1. First, create a new directory somewhere. This will be the example project folder. Then open command prompt, or a terminal, to that directory.
```bash
cd ./the/path/to/your/project/directory
```
2. Then, run `npm init` in that directory.
3. Next, when following the tutorial, it will first ask you to run `npm install -g create-react-app`. You do not need to use `-g` in the command. Use `npm install create-react-app` (the flag is omitted) instead. The `g` flag will install the package globally, but we will only be using this package for this tutorial. If you did install it globally, don't worry. Just uninstall it later with `npm uninstall create-react-app`.
4. And you should now follow the tutorial! (There are a few more notes below to help you out).

Additional notes:
> NOTE: `chord` is just the project name. You can name it whatever you want :D

> NOTE: If you run into issues with `node` or `npm` commands, try making sure you have the latest npm and node versions. You can check by doing `npm --version` and `node --version`. You can try updating by following this guide:
https://docs.npmjs.com/try-the-latest-stable-version-of-npm

> NOTE: For updating on windows, this may be useful. Just follow the README; you don't need to download the source code on the github page.
https://github.com/felixrieseberg/npm-windows-upgrade

What you should be able to answer from this:
- How do you setup a React environment?

<details>
  <summary>Answer</summary>
  <p>
    You should follow the tutorial more closely. If that's not helpful, try looking online. There are too many small details to put here.
  </p>
</details>

- How to create a React component and render it?
  - Can you make a React component that renders a static list of fruits?
    - HINT: Try the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul).
    - ANOTHER HINT: You should be able to use the same React component file "template" you used for HelloWorld. If you create a new file, don't forget to `import` it. React won't know what to render if you don't tell it where to find the componet. Look in `index.js` and `App.js` to see how the tutorial tells React what to render.

<details>
  <summary>Answer</summary>
  <pre><code>
// ... boilerplate code ...
function render()
{
  return (
    &lt;ul>
      &lt;li>Item 1&lt;/li>
      &lt;li>Item 2&lt;/li>
      &lt;li>Item 3&lt;/li>
    &lt;/ul>
  );
}
  </code></pre>
</details>

> Link: [How To Create Your First React App](https://coderjourney.com/tutorials/how-to-create-your-first-react-app/)

> Progress (2/6)
