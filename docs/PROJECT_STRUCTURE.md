# Project Structure

### Entry point
The entry point for the code is in `src/main.js` (if bundled, this will be referred to by `index.html` through `build/app.bundle.js`).

This script only serves to handle any immediate setup code. Any app-specific resources should be handled in the appropriate `Application` file.

### Application
This handles any app-specific resources. Unlike session-specific details, it handles actions or mechanics applied globally through multiple sessions. More specifically, it handles the modules' lifecycle.

### Session
This handles any session-specific resources. Any data and state used by a module are kept here for a user-session. In other words, each session serves as an instance of a module workspace. There can be multiple sessions that are initialized and destroyed in a single "use". And since there can be multiple sessions with the same module, this means you *SHOULD NOT USE GLOBAL VARIABLES TO MANAGE STATE IN MODULES!* Only save state to the session context.

### Module
This handles any module-specific interfaces. Modules serve as a template for a session to register and handle specific logic. Rendering components, services, managers, and other handlers are registered, initialized, and destroyed here. However, this is static and therefore should not save state across uses (only save state into session). In other words, this serves as a global template that persists over multiple sessions and acts on different session instances.

Modules are also loaded asynchronously and compartimentalized into their own bundles. This means that any module loaded is (and should be) completely independent of other modules.

### Components
These are the rendering objects of the app. For every component, it should have 5 files:

- The `.jsx` React component. This handles the structure and logic of the component.
- The `.module.css` CSS stylesheet. This contains the localized style of the component.
- The `.spec.js` Jest test. This is the unit tests for the component to validate functionality.
- The `.stories.js` Storybook test. This is the integration and UI tests for the component to document and validate the component working in its intended environment.
- The `.md` documentation. This serves to further explain the motivations of the component and any possible failure points that future developers should be aware of.

## Conclusion

If you have any more questions, please contact any Flap.js dev team member.

Or, you can contact me:
andykuo1supergreen@gmail.com
(Please begin the subject with 'Flap.js - ')

Thank you for reading me!