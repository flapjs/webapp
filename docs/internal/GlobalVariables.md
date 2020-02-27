# How to Stop Caring and Use Global Variables

So you want to use global variables huh? Well I won't go on about how they
are often considered an anti-pattern to whatever you are doing and should
usually be AVOIDED AT ALL COSTS... but here we are.

## Usage
First, put the necessary linting comments at the top of the file to tell
ESLint you know what you are doing:

```javascript
/* global __GLOBAL_VARIABLE_NAME__ */
```

Finally, you use the variable as you would any other variable.

```javascript
const value = __GLOBAL_VARIABLE_NAME__ + 1;
console.log(value);
```

Global variables are always constant time replacements, meaning the variables
are replaced at bundle-time.

So **NEVER REASSIGN THE VALUE OF A GLOBAL VARIABLE**.

In other words, global variables are like macros in C, they simply replace wherever
they are used with the value defined.

## Format
For Flap.js, global variables must follow the format:

```javascript
__GLOBAL_VARIABLE_NAME__
```

In words, the variable names are always prepended and appended by double
underscores and the name itself is in all caps. Any spaces inbetween are
also converted to underscores. This is not a syntax rule, just a coding style.

## Defining New Global Variables
To define your very own global variable, just add the name and value as a property
to the exported object in `.config/globals.js`. Since global variables are simply
doing a search-and-replace, the value defined for the property will simply **replace**
the variable reference. In other words, if a global variable is a string value "Hello World",
the global variable should be defined as:

```javascript
module.exports = {
    "__HELLO_WORLD__": '"Hello World"'
};
```

Notice the additional set of quotes in the value. Refer to the usage for an explanation on why this is.
Also, please refer to the formatting for further details on the naming conventions.

## So You Are Doing DevOps?
Well well well. So we finally meet (lol). Anyways, global variables must be defined for:
- **webpack** for bundling and actually replacing the variables with their value.
- **jest** for linking the variables with their values when running the tests.
- **(Please include any future dependents here!)**

These "links" can be seen in `.webpack/base.config.js` (used by the DefinePlugin) and `.jest/config.js` (under "globals"). Hope that helps!

## Conclusino
Thank you for reading!

> Brought to you by Andrew Kuo