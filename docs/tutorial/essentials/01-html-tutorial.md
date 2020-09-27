# Andrew, Tutorial & You - HTML

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
HTML stands for HyperText Markup Language. It's used to layout and semantically describe your website. Within the scope of the web, HTML is the structure, whilst JavaScript is the logic and CSS is the style.

HTML is basically XML, a language that uses tags to describe things.

Here's an example of a standard web page:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>The Webpage About Stuff</title>
  </head>
  <body>
    <h1>The Webpage About Stuff</h1>
    <p>Here's some stuff about this page.</p>
    <button onclick="console.log('woot')">I am a button</button>

    <section>
      <h2>Here's a List of Items</h2>
      <ul>
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
      </ul>
    </section>
  </body>
</html>
```

You'll notice that tags are defined within `<...>` and every tag has a corresponding end tag `</...>` of the same name. Every tag must be closed this way, with content usually placed in-between. Attributes, like the `onclick`, can also be specified on opening tags. They are ways to pass data to the tag and usually customize the tag's functionality. One important thing to note is that it CAN ONLY BE A STRING. There are no other data types. For instance, the `onclick` attribute in the previous example is a text string of an executable JavaScript code. When the button is clicked, the browser will first parse the string to JavaScript code then execute it. This goes for numbers and other things as well. Be aware of this when working with different data types.

You may also realize that tags usually contain other tags. This nesting of tags creates a sort of tree with parent and child relationships. Behind the scenes, the eventual output of this markup is called the DOM tree, which is basically what a web page is (we won't go much more into this, but it is an important facet of web dev that you should look into in the future. For now just know it exists).

Generally, to use HTML effectively, you need to know when certain tags are appropriate for which situations. I will explain the larger concepts that will help you determine which is better, and I will also go over most commonly used tags. But there is still much, much more.

### Inline vs Block
Inline refers to being on the same flow/line as the content it is next to. This would be tags like `<span>`, `<b>` (bold), or `<a>` (link). Block will divide content onto its own line, leaving whitespace between text. This would be tags like `<div>`, `<p>` (paragraph), or `<h1>` (header).

### Semantic vs Non-Semantic
Semantic tags describe what a block of content _means_. It does not change the way it looks, but it changes the way it is treated. When you see a `<article>` tag, you would assume it is an independent, cohesive block of content. However, stylistically, content within an `<article>` block, without additional styling with CSS, looks the same as a `<div>` block (which means "division"). This is important because this description lets other programmers and programs reading the code understand what is going on. A common practice for web devs is to employ an endless nesting of `<div>` and `<span>` tags. These tags also divide content, but no one can tell what the content is suppose to do. Bottomline, use semantic tags when you can (basically any tag that is not `div` or `span`), and use non-semantic tags if the content really doesn't mean anything.

> More info: https://www.lifewire.com/why-use-semantic-html-3468271

As for the general format of a webpage, it is a web standard to include the top root `<html>`, a special starting tag `<!DOCTYPE html>` and a `<head>` and `<body>` block. The `<head>` usually contains all setup information, and the `<body>` contains the actual viewed content.

--

Have more questions? Please ask a team member or request some more work on this document!
