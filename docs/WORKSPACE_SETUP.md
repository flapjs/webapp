## Workspace Setup

### Installing [Node.js](https://nodejs.org/en/)
This is required to test the program. Just get the current version and install it.

### Installing [Git](https://git-scm.com/)
This is required to edit the program remotely. Just get the current version and install it. The repository is hosted at [GitHub](https://github.com/flapjs/).

### Installing [VS Code](https://code.visualstudio.com/)
This is NOT required, but recommended (by me). Just get the current version and install it.

### Installing [Atom.io](https://nodejs.org/en/)
This is NOT required and is an alternative to VS code. If you choose not to get VS code, just get this current version and install it.

Otherwise, you just need a text editor to write JavaScript, HTML, and CSS.

**Note:** Be sure to get the compatible versions for your operating system.

### Recommended VS Code extensions
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  * A helpful linter for your JavaScript.
* [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  * A helpful linter for you CSS.
* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  * Let's you host a local debug server.
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
  * A pair programming extension for collaborative programming in real-time.

#### Recommended Atom packages
* [Teletype](https://teletype.atom.io/)
  * A pair programming package for collaborative programming in real-time.
* [PlatformIO IDE Terminal](https://atom.io/packages/platformio-ide-terminal)
  * An integrated terminal for the `Atom.io` editor. Allows you easy access to run commands.

### Getting the remote repository
Open a command line or terminal and enter a directory to where to copy the project repository. This can be anywhere in your local file system (like your home directory). For example:

```
cd ~/
```

Then, create a project root directory and go into that directory.

```
mkdir flapjs
cd flapjs
```

Then, clone the [repo](https://github.com/flapjs/webapp.git) to the new directory.

```
git clone https://github.com/flapjs/webapp.git
```

Or, if you want to work on the welcome page, clone this [repo](https://github.com/flapjs/welcome.git) to the new directory instead.

```
git clone https://github.com/flapjs/welcome.git
```

**NOTE:** If you are working on a different, or multiple, repos under the Flap.js project, you can clone them here. Upon cloning, they will create their own subdirectories and therefore not conflict with other ongoing projects.

Navigate into the directory of the repository.

```
cd webapp
```

To ensure and verify the state of the repository enter the following command:

```
git status
```

### Installing dependencies
Open a command line or terminal and enter into the project directory. This should be where you've copied the remote repository. Following the previous example:

```
cd ~/flapjs/webapp
```

If you want to inspect the contents of this directory, it should contain the project files, such as `package.json`.

Then run the following command:

```
npm install
```

This should automatically start installing the dependencies (as listed in `package.json`). After it finishes, it should create a directory called `node_modules`, which contains all required dependencies.

**NOTE:** The `node_modules` directory sometimes contains files unique to each platform so this directory SHOULD NOT be committed to the repository.

**NOTE:** If a `package-lock.json` is created, it should be committed to the repo. It should not be ignored.

After that, the project is ready to run. _Happy coding!_

---

## Running the Program
After saving any changes to a file, open a command line or terminal and enter into the project directory.

**NOTE:** If using the recommended `Atom.io` package, the in-editor terminal is automatically opened at the project directory (no need to `cd` every time). If you are using the recommended `VS Code` editor, then the built-in terminal is already included and simply toggle it with `Ctrl + Tilde(~)`.

### Production Build
To "compile" the scripts for public distribution:

```
npm run build
```

**NOTE:** This will bundle all the resources and assets required into `build`. It will also "uglify" the code to reduce size and apply other optimizations.

Then, open `index.html` in your web browser. Either by just opening the file itself or running the command:

```
open index.html
```

### Development Build
Another way to quickly run, or test, the program:

```
npm start
```

This will run all appropriate commands to bundle and build the program, then will run it in your default web browser. It is also hot loaded and in development mode, so changes will be reflected on save and debug messages are more human-readable.

**Note:** Running this way will start a local server on the machine at default port `3000`, or what is defined in `webpack.config.js`. Therefore, only one instance of the server can be open at one time (but as many clients as you want).

## Running the Tests
Tests are currently written in individual `.spec.js` or `.test.js` scripts located throughout the project (**NOT** only `.js`). These test scripts will be dynamically loaded when running the tester. We use [jest](https://jestjs.io/) as our test runner.

Similar to running the main program, after saving any changes, open a command line or terminal and enter into the project directory. Then execute:

```
npm test
```

This will find and load all written tests and compute them. Once complete, the tester will report test results, successes, and failures.

It is recommended to write only a single `.spec.js` file per "subject". And within each file, divide each test case by a local block. This is to ensure local variables do not contaminate other tests. For example:

```
//Test empty
{
  console.log("Testing empty...");
  ...
  console.log("Finished testing empty.");
}
```

**NOTE:** If a test runs into any errors or failures, any outputs gathered during computation are outputted in the order they occur, therefore `console.log` should print in the order expected. If a test was successful, all test output is consumed and not printed.
