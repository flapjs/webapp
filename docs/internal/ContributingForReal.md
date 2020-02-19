# Contributing for Real
This is for those of you who don't really know where to start and already
know or are learning React, JavaScript, HTML, etc. This won't really go
into the tools of the project, but really on how to contribute to the code base.

Firstly, get familiar with the directories, it is important to know, when working
on a feature, where the source files should go.

- If the file is used AS-IS without bundling, transpilation, etc. it should go
in the `assets` folder. These things include images, icons, etc. (This could include
scripts that are inlined into the html file).
- If the file is a front-end feature, basically a React component, it should go under `components`.
This should serve as the basis of all UI. The exceptions are React components specific to services,
but we'll talk about that later. Each component themselves should be modular and independent of
other components. This way, other developers can reuse your code in other contexts.
**TL;DR loosely-coupled React components go here.**
- If the file is a "back-end" feature, it should go under its respective module folder
in `modules`. Modules are isolated workspace environments that the app can switch to to
perform different tasks, such as using NFA/DFA, then going to Regular Expressions. This
is how we can support different functionality without introducting unnecessary dependencies
and therefore complexity. All tightly-coupled code should be in the same module.
Refer to the modules docs for more info.
- If the file is a "back-end" feature, but it should be independent of the module, it should go under `services`.
Services are independent features that act like plugins to modules; they encapsulate their entire functionality
within themselves and modules only need to add them to their "services" list and setup the appropriate options. For
example, things like undo/redo, or exporting should be services since they do not care what type of graph or machine
is currently being worked on. Usually most services begin as part of a module. But as other modules start using the
same subset of features, you can refactor that subset into its own service so other modules don't need to repeat your
code.
- If the file is a test, then it should go next to whatever it is testing. If it is dynamically testing "everything", then it should go under `tests`. Otherwise, try to
put it as close to its test target as possible.
- If the file is a documentation, then put it as close to the thing it is documenting as
possible. If it is a general docs or a docs about options, put it in the `docs` folder.
- If the file is a config, good luck. DevOps is hard. Try to keep it neat.

So that covers everything.

> But Andrew, what about `session`? What is that all about?

Well, sessions are simply workspace instances. Each session holds all the dynamic state of
a module, whereas a module holds all static state. So like when the app runs, properties
of the base module file should not change, but if you need to save state, change it on the
session.

Hopefully that helps.

Thanks for reading!

> Brought to you by Andrew Kuo.
