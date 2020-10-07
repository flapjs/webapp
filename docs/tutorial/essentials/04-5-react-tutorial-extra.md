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

### Part 5: Diving Into React

> This will go over more in-depth on how to make a practical component in React. This one is a bit long, so be sure to take a break when you need to!

As per usual, skip the setup.

> NOTE: If you see `yarn`, it is just another package manager like `npm`. Most of the commands in `yarn` are the same as in `npm`, just replace `yarn` with `npm` and you should be fine. If that command doesn't exist, you can look up the equivalent command for `npm` on Google.

Useful questions:
- Why does the second code snippet (has 12 lines) extract `helloWorld` outside the render method? When do we NOT want to do this and why?
  - HINT: This has more to do with the philosophy of reusable design and code style than it does with React.
  - ANOTHER HINT: The tutorial only tells you why you should do it. It's up to you to figure out why we shouldn't do this EVERYWHERE. What if you have a huge render function? How about readability and flow of the file?

<details>
  <summary>Answer</summary>
  <p>There's no right answer as long as you have a logical reason for why you chose it. Maybe it was for readability? For managing complexity? For maintainability?</p>
</details>

- What is a Fragment? Why are they necessary?

<details>
  <summary>Answer</summary>
  <p>Since React render functions require you to have a single parent, if you need to return two sibling elements, you must put them under a single container. Fragments serve this purpose, like `&lt;div>`. They are like placeholders that will be removed later. However, why not use `&lt;div>`? Imagine you use a bunch of components that use `&lt;div>` as their parents. Then, the output will create a bunch of useless `&lt;div>` tags in the DOM tree. That becomes unmanageable and inefficient. Fragments will be removed when the component is added, so this complexity will be removed.</p>
</details>

- What is the difference between controlled and uncontrolled components?
  - Can you use them together?
  - How would you create a input field component that capitalizes the first letter of the entered text?
    - NOTE: Although both are legitimate methods to accomplish this task, by React's standards, we prefer to use controlled components when possible.

<details>
  <summary>Answer</summary>
  <p>Controlled components FORCE the element to use OUR state. Uncontrolled components are left to their own devices and we simply "ask" them for their state.</p>
  <p>But most importantly, THEY CANNOT BE USED TOGETHER! If you need to manipulate the data as it is changed, use controlled. Otherwise, let the default HTML logic handle it with uncontrolled.</p>
</details>

> Link: [Reusable Components in React - A Practical Guide](https://blog.bitsrc.io/reusable-components-in-react-a-practical-guide-ec15a81a4d71)

> Progress (5/6)
