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

### Part 4: Some Import-ant ES6 Stuff
This will go over the concepts of import / export in ES6 (ES6 is a version of JavaScript, like ES5, ES4, etc.).

So you'll notice this has nothing to do with React. However, it does describe something that is used a lot in JavaScript and, to write proper code, we need to understand what it is and how to use it.

I want to point out that when you import a file that has a default export, there is no restriction on the name of the imported file.

Like if you do:
```javascript
import Hello from 'Hello.js';
```

It is exactly the same imported object as:
```javascript
import ASDFWOOT from 'Hello.js';
```

Although they have different names, they will reference the same `export default Hello` class. The difference is when you use it, you use the "import" name. So the Hello component, becomes a ASDFWOOT component.

```javascript
  import Hello from 'Hello.js';
  import ASDFWOOT from 'Hello.js';
  //...
  <div>
    <Hello/>
    <ASDFWOOT/>
  </div>
```

Although this is allowed, this is bad practice. We would not know what `ASDFWOOT` is and we would have to look for the import statement in order to know what it actually means. Since we want to have readable code, the proper convention is to name it EXACTLY the same as the exported name. There is an argument to be made for using only named exports (not export default), but if we follow this convention, we should be fine.

NOTE: You can only have 1 `export default`, but you can have many named `export`.

> Link: [ES6 Import Export - A Beginner's Guide](https://www.adamcowley.co.uk/javascript/es6-import-export-a-beginners-guide/)

---

#### **QUIZ TIME!!!**

**QUESTION 1**

Let's say I want to use the Car class in my code:

`OtherFile.js`
```javascript
function rentACar(money)
{
  //... some code here ...
  return new Car();
}

// ... other functions ...
```

However, the Car class is in another file (in the same directory).

`Car.js`
```javascript
class Car
{
  constructor(/** some arguments **/)
  {
    // ... some setup code ...
  }
}
```

**How would I change the files so that I can get a reference to the Car class in `OtherFile.js`?**

<details>
  <summary>Answer</summary>
  <p>
    <code>Car.js</code>
    <pre><code>
class Car
{
  // ... the same code ...
}

// CHANGES: Added this line below, at end of file.
export default Car;
    </code></pre>
    <code>OtherFile.js</code>
    <pre><code>
import Car from './Car.js';
// CHANGES: Added this line above, at start of file.

function rentACar(money)
{
  // ... the same code ...
  return new Car();
}
    </code></pre>
  </p>
</details>

**QUESTION 2**

Let's say I have another file, in the parent directory, that contains a list of math helper functions called `MathHelper.js`.

`MathHelper.js`
```javascript
function distance(a, b)
{
  // ... code ...
}

function power(a, b)
{
  // ... code ...
}
```

**I want to use this in my `rentACar()` function. How would I change the files so that I can get a reference to both `power()` and `distance()` functions in `OtherFile.js`?**

<details>
  <summary>Answer</summary>
  <p>
    <code>MathHelper.js</code>
    <pre><code>
// CHANGES: Added 'export' to the front of the function we want to use.
export function distance(a, b)
{
  // ... code ...
}

// CHANGES: Added 'export' to the front of the function we want to use.
export function power(a, b)
{
  // ... code ...
}
    </code></pre>
    <code>OtherFile.js</code>
    <pre><code>
import Car from './Car.js';
import { distance, power } from '../MathHelper.js';
// CHANGES: Added this line above, at start of file.

// NOTE: To use it, you can straight up just reference it:
//    distance(0, 1);
//    power(10, 10);

// NOTE: You can also do:
//    import * as MathHelper from '../MathHelper.js';
// And to use it, you'll have to do:
//    MathHelper.distance()

function rentACar(money)
{
  // ... the same code ...
  return new Car();
}
    </code></pre>
  </p>
</details>


// TODO: But what if you have a `power()` function in `OtherFile.js` but you also want to use the `power()` function from `MathHelper.js`?
//

**But let's say I already have a function named `power()` in `OtherFile.js`. However, I also want to use the `power()` function from `MathHelper.js`, which will cause a name conflict. What would I do now?**

<details>
  <summary>Answer</summary>
  <p>
    You still do the same thing, except change the name of the imported module, using an alias. In the previous example, you could have used `* as MathHelper` to import the files. The `as MathHelper` part is actually an alias. This let's you change the name to anything you want and therefore avoid the name conflict. For the specific problem:
    <code>OtherFile.js</code>
    <pre><code>
import Car from './Car.js';
import { distance, power as powerMath } from '../MathHelper.js';
// CHANGES: Added an alias for power

// And to use it, you'll have to do:
//    powerMath()

// NOTE: You can also do:
//    import Fancy from '../Car.js';
// By default, all default imports are aliased. So you are not forced to import by the same name, but it is by convention to name this way.

function rentACar(money)
{
  // ... the same code ...
  return new Car();
}
    </code></pre>
  </p>
</details>

---

> Progress (4/6)
