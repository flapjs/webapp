# Andrew, Tutorial & You - JavaScript

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
Before you start React stuff, you do need to know JavaScript (and the new ES6 JavaScript features). Don't worry, we have a couple tutorials to do just that:
1. https://jgthms.com/javascript-in-14-minutes/
2. Arrow Functions: https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/
3. Classes: https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes
4. More ES6 Stuff: https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be

REFERENCE: https://javascript.info/ - Has a list of modern JavaScript features and also guides to how to use them.

REFERENCE: https://developer.mozilla.org/en-US/ - Anything related to the current web standards.

Things you should know now:
- How do you create objects? How do you set and get properties of that object?
  - What does it mean to 'new' or 'delete' something?
<details>
  <summary>Answer</summary>
  <p>
    You can create objects with curly braces. Then, to set a property, use the dot access operator. Similarly, you can set it the same way, but with an assignment operator afterwards.
  </p>
  <pre><code>
const newObject = {
  someProp: "hello"
};
console.log(newObject.someProp); // Prints "hello"
newObject.otherProp = 1;
console.log(newObject.otherProp); // Prints "1"
  </code></pre>
  <p>
    The 'new' keyword is used with classes to create a new instance of that class. The 'delete' keyword is NOT used in the same context. Instead, 'delete' is for removing a property from an object, which is not the same as setting a property to null. The 'delete' operation actually removes the value AND key from the object, whereas setting null simply changes the value of the entry.
  </p>
  <pre><code>
class HelloWorld
{
  constructor()
  {
    this.message = "Hello";
  }
}
const helloWorld = new HelloWorld();
console.log(helloWorld.message); // Prints "Hello"
const anotherObject = {
  someProp: "yoohoo"
};
console.log(anotherObject.someProp); // Prints "yoohoo"
delete anotherObject.someProp;
console.log(anotherObject.someProp); // Undefined
  </code></pre>
</details>

- Do you know the 3 ways to create a function? What is the difference between them?

<details>
  <summary>Answer</summary>
  <pre><code>
// Named function defined on load.
function helloWorld1() {}
// Unnamed function but defined during execution.
const helloWorld2 = function() {};
// Anonymous function that binds the local context automatically.
const helloWorld3 = () => {};
  </code></pre>
</details>

- How do you create a class? How is polymorphism different in JavaScript? In other words, do you know what prototype is?

<details>
  <summary>Answer</summary>
  <p>
    Polymorphism in JavaScript is done through prototyping. Through syntactic sugar it can appear like normal Java-like polymorphism, but implementation-wise it is not. I just want you to be aware of this, since not ALL Java-like polymorphism behaviors are the same here. But if you aren't doing anything fancy, you should be fine. This is an advanced and involved topic. Please look it up for further detail if you are stuck.
  </p>
  <p>But here's how you make a class.</p>
  <pre><code>
class HelloWorld
{
constructor()
{
  // ...
}
}
  </code></pre>
</details>

- What data structures are built-in to JavaScript?
  - How do you create an array?
  - A map (there's 2 ways to do this)?
  - A set?
  - What else is there (there's 2 more)?

<details>
  <summary>Answer</summary>
  <p>
    Array, Set, Map, WeakSet, and WeakMap.
  </p>
  <pre><code>
const array1 = new Array(10);
const array2 = [];
const set1 = new Set();
const map1 = new Map();
// etc.
  </code></pre>
</details>

- How do you iterate over the array?
  - What's the difference between 'for-in', 'for-of' and 'forEach()'.
  - What does 'map()', 'reduce()', and 'filter()' do? More specifically, what do they output?


<details>
  <summary>Answer</summary>
  <p>
    You can use for-loops to go over an array, either through indexing or for-each.
  </p>
  <p>
    As for the differences between each type, 'for-in' iterates over the "keys" of the iterable target. Since this is an array, this means its indices. 'for-of' iterates over the values, which is usually what you want. 'forEach' is a function call that takes a callback function to handle each entry of the array. 
  </p>
  <p>
    Finally, the 3 functions defined above help you manipulate the array and will return a NEW array with those modifications. In other words, it will not modify the existing array.
  </p>
</details>
