# Andrew, Tutorial & You - CSS

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
CSS stands for Cascading StyleSheet. It is used to provide style to a web page.

Here's an example:
```css
h1 {
  font-family: monospace;
  font-size: 14pt;
  background: blue;
  color: black;
}
header > label {
  opacity: 0.5;
  color: white;
}
```

CSS styles an HTML page by finding (or "selecting") tags and applying a group of styles, as found with `{...}`, to it. The style attributes are pre-defined and you can easily lookup what you want to do and probably find an attribute to achieve that effect.

The more involved part is the selection. Before each block of styles is a CSS selector that determines what tags should the styles be applied to. These are rules to find what tags should be styled.

Here's a good tutorial to get you familiar with CSS Selectors.

> Link: https://css-tricks.com/how-css-selectors-work/

Before we continue, there is one thing I have found very useful in organizing responsive web pages. It's the `flex-box`. It will make your life easier.

Here's to get you started on what it is:
> Link: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox

Here's a complete reference for it:
> Link: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

And that should get you started. The complexity of CSS really stems from knowing which style attributes you need to add and how to select the appropriate tags to do so. If you are interested, look into attributes like `transition` for fancy transition effects, `keyframes` for custom animations, etc.
