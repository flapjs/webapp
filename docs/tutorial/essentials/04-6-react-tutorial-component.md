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

### Part 6: Actually Making Useful React Components
Congrats! You've made it to the last section of the tutorial. Now for the final stretch, we'll be working on one last hands-on tutorial... with minimal instructions. This is because the goal of this tutorial is not to teach you how to make ALL the useful components you will make, but how to make approach the design and the making of one. There are just way too many facets of front-end development to fit in even a month's worth of tutorials. Instead, I hope this tutorial can help you get started on this journey and smooth out that steep learning curve.

At the bottom are references to things that I think will be helpful for you. But before you crack them open, I would suggest you try looking things up on Google and see what you find. This is an essential skill to learn early.

However, there is one thing you should stay away from: copy-paste-able code. When you are researching for hours and you finally find something that solves your problem but it's like a hundred lines long, you are tempted to just copy-paste it over and be done with it. However, this is detrimental to both you and the project. For one, you lose the opportunity to learn how to actually solve the problem yourself. The next time you encounter the same problem, you will have to go on the search again. Also, for future readers of your code who are confused about how to work with it, you won't be able to answer and be stuck, once again, scouring the internet. It's best to understand what you are writing so that you can both learn and apply your software engineering skills to create maintainable and readable code.

(Of course, there are always exceptions. If you do copy-paste, ALWAYS put the link somewhere next to the code. That way, we can refer to it if something goes wrong. This goes also for research that inspired your work that you can't explain yourself.)

Now here's the specifications:

_Step 1:_

Use this as a template for the component to start off from (thank Jacob Chazen for making this happen).

```javascript
import React, { Component } from 'react';

// Be sure to create this file if it doesn't exist yet!
import './ItemList.css';

class ItemList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      items: []
    };

    // You need to do something here for onButtonClick since it is being passed outside this context as an event handler... but what?
    // HINT: this.onButtonClick = ...
  }

  /** The */
  onButtonClick(e)
  {
    const target = e.target;

    // What do you want to do here?
    // HINT: You can access the id with target.id...
  }

  /** @override */
  render()
  {
    return (
      <article>
        <section className="list-container">
          <ul>
            {/* Put your list items here. */}
          </ul>
        </section>
        <div className="list-buttons">
          <button id="hat" onClick={this.onButtonClick}>Hat</button>
          <button id="bird" onClick={this.onButtonClick}>Bird</button>
          <button id="mushroom" onClick={this.onButtonClick}>Mushroom</button>
        </div>
      </article>
    );
  }
}

export default App;

```

Create an ItemList that displays a static list of items vertically. Just custom define any list for now. Just get something to show up.

HINT: Try a `<ul>` element. It contains `<li>` elements.

_Step 2:_

There should be a button that lets the user add either a "Hat", a "Bird", or a "Mushroom" to the growing list.

NOTE: The items are strings, not images.

HINT: [Display a List in React](https://daveceddia.com/display-a-list-in-react/)

HINT: The component should keep an array of strings. And the button, when clicked, should `push()` an item to that array. However, somehow you have to make sure that React knows it has been changed, otherwise, it will not be rendered.

_Step 3:_

There should be a button for each item that lets the user remove specific items already added into the list.

As the list changes, the order of the list should still be maintained.

NOTE: To keep the list order, just add new items to the end of the list. The rest should handle itself.

_Step 4:_

There should be a button that sorts the list. It only needs to sort the current list. In other words, it does not have to maintain sorted order afterwards, only at the moment of button click.

HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

NOTE: Did you declare any global variables (variables NOT restricted to the scope of the instance)? If so, it would still work for this example, but all variables that affect the state of the component should be kept within the instance. That means to define any variables in the constructor of the component class. Otherwise, any other instances of the same component will share the SAME variable and any manipulations would propagate to those components as well.

_Step 5:_

The Hat items, on hover, should change their background to `saddlebrown`.
The Bird item, on hover, should disappear.
The Mushroom item, on hover, should change colors.

HINT: You can style `<li>` tags with the `background` attribute to change color. To apply styles on hover, consider using a pseudo-class selector (such as `:hover`).

HINT: https://developer.mozilla.org/en-US/docs/Web/CSS/:hover

_Step 6:_

There should be a button that rotates the list to a horizontal view, where the first item is on the left and the last to the right.

HINT: Use CSS.
ANOTHER HINT: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
ALTERNATIVE HINT: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox

## More References

> Link: [Array Form Inputs](https://goshakkk.name/array-form-inputs/)
  - What to focus on:
  - Don't mutate the array, because it may not render properly.
  - So you gotta make a NEW array with filter, etc.

> Link: [Dynamically Add Classes](https://www.andreasreiterer.at/dynamically-add-classes/)

_Some videos about good stuff_
- Maps & Arrays: https://www.youtube.com/watch?v=Nzy5Qv-XQQQ
- Pure & Higher Order Funcs: https://www.youtube.com/watch?v=vNKxWqMbNpY

_Stuff that would be good to know, but not tested in this tutorial..._
- https://blog.pusher.com/beginners-guide-react-component-lifecycle/
- https://flaviocopes.com/react-forms/


## The Conclusion

And when you have done all that, I would say you are ready! If you run into any issues, feel free to message me. I'll be glad to clarify anything you were confused about or on any topics you want to know more about.

Happy Coding!
