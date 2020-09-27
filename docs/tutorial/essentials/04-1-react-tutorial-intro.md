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

### Part 1: Introduction to React
This first one is mostly for reference but also serves as sorta a taste of what React is. Have a read through it. You should also try answering the challenges in the conclusion. They are helpful.

What you should take away from this:
- What is a component?

<details>
  <summary>Answer</summary>
  <p>
    A component is the basic building block of a React app. It is the button, the panel, etc.
  </p>
</details>

- What is JSX and how do you use it?

<details>
  <summary>Answer</summary>
  <p>
    JSX is a way to describe the structure of the component by using HTML syntax in JavaScript. You will often only use JSX in the render() function. However, you can also use JavaScript logic within JSX to add/remove HTML content dynamically. This can be done by escaping JSX with '{...}' and then writing JavaScript logic within.
  </p>
</details>

- When to use Stateless vs Class components?

<details>
  <summary>Answer</summary>
  <p>
    Class components are useful when you need complex logic or state management. Otherwise, stateless components are easier and faster to work with.
  </p>
</details>

- What is the difference between State vs Props?

<details>
  <summary>Answer</summary>
  <p>
    State is created/managed within the component and can be modified by the component. Props is given by the user of the component, and CANNOT be changed by the component itself.
  </p>
</details>

- What is destructuring (not related to destructors in C++) in JavaScript?

<details>
  <summary>Answer</summary>
  <p>
    Don't worry too much about this one. It makes more sense when you actually use it. For now, just know what it looks like.
  </p>
  <p>Here's some parameter destructuring.</p>
  <pre><code>
function choose(...items)
{
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
  </code></pre>
  <p>Here's some object destructuring.</p>
  <pre><code>
const props = {
  margin: 0,
  background: 'black',
  boo: true,
  hoo: false,
  wam: true
};
const [margin, background, ...other] = props;
console.log(margin); // Prints "0"
console.log(...other); // Prints "true false true"
  </code></pre>
</details>

- How does React actually know about and render your components?
  - What is ReactDOM?

<details>
  <summary>Answer</summary>
  <p>
    For the root component, such as 'App.js', you must call ReactDOM.render(appComponent). For all other components, it must be imported and rendered by another component. Mostly, this would be some sort of container component, or the App component itself.
  </p>
</details>

After all that, grab your favorite text editor and move on to the second one!

> Link: [React Tutorial For Beginners](https://ihatetomatoes.net/react-tutorial-for-beginners/)

> Progress (1/6)
