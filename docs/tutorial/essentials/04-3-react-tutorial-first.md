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

### Part 3: Your First React App
This will help you build your first component (and introduce props and states).

Before we start this tutorial, rename `App.js` to `Hello.js`. Then change the name of the class `App` to `Hello`. You will also need to change `export default App;` to `export default Hello;` at the bottom of the file.
In `index.js`, change `import App from 'App';` to `import Hello from 'Hello';`. That should be everything you need.

Here are some notes while you go through the tutorial:

> NOTE: There is a typo in "Event Handlers". The render method should be:
```javascript
render()
{
  return (
    <div>
      <h1>Hello {this.state.message}!</h1>
      <button onClick={this.updateMessage}>Click me!</button>
    </div>
  );
}
```

Now follow this tutorial (you can skip the setup). When complete, move on to the next one!

What you should learn:
- How can you render dynamic, stateful components? In other words, how can I render something that depends on state or props?
  - HINT: Is it possible to write JavaScript in JSX? If so, how would you do this?
  - ANOTHER HINT: What is JSX escaping?

<details>
  <summary>Answer</summary>
  <pre><code>
// ... boilerplate code ...
function render()
{
  const hide = this.props.hide;
  return (
    &lt;section>
      {hide ? null : &lt;b>Hello, I am visible.&lt;/b>}
    &lt;/section>
  );
}
  </code></pre>
</details>

- How can you change the state?

<details>
  <summary>Answer</summary>
  <p>Use this.setState({ someStateName: someStateValue }). Do NOT do this.state.someStateName = someStateValue.</p>
</details>

- How about props?

<details>
  <summary>Answer</summary>
  <p>You can't. Props can only be changed by the parent component.</p>
</details>

- How can you add event handlers? More concretely, how do you do something on button click?
  - Why do we need to bind the function?

<details>
  <summary>Answer</summary>
  <pre><code>
class HelloWorld extends Component
{
  constructor(props)
  {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e)
  {
    console.log('click');
  }
  render()
  {
    return (
      &lt;button onClick={this.onClick}>Click Me</button>
    );
  }
}
  </code></pre>
</details>

> Link: [Learn React.js in 5 Minutes](https://www.freecodecamp.org/news/learn-react-js-in-5-minutes-526472d292f4/)

> Progress (3/6)
