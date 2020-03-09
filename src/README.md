# What you need to know

## React Hooks
The components that uses hooks are known as React component functions. They are stil components, though they look different. They are basically the same as React component classes, but they maintain better semantics and style (at a debateable cost of efficiency depending on circumstance). They look like this:

```javascript
function SomeReactComponent(props)
{
    // Instead of setState() and this.state, you now use useState() to declare a stateful variable and use the returned values to access/manipulate it.
    const [value, setValue] = useState(null);

    return (
        <div>
        ...
        </div>
    );
}
```

These components have pretty much the same lifecycle callbacks and other functionality. But instead of composing other components for state, etc. it can now use hooks (like the `useState()` example from above)! There are many hooks that do cool things (you can look them up on the React docs), but most importantly they allow us to define our own hooks, simplifying the way we write components MASSIVELY. Please look up the `Rules of Hooks` for a better understanding of hooks.

## React Contexts
They are made up of 2 parts.
- The Provider
- The Consumer

You can use them like this:
```javascript
const SomeContext = React.createContext();

// ... in a class component ...

render()
{
    return (
        <SomeContext.Provider value={/*someContext value*/}>
            <...>
                <SomeContext.Consumer>
                    {
                        (/*someContext value*/) =>
                        {
                            // Do what you want here.
                            return <...>;
                        }
                    }
                </SomeContext.Consumer>
            </...>
        </SomeContext.Provider>
    );
}

// ... or in a hook ...
function OtherComponent()
{
    // Somewhere in the parent, it already has <SomeContext.Provider>...

    const someContextValue = useContext(SomeContext);

    // ... and use that value...

    return <...>;
}
```

In it's simplest form, they allow prop-drilling. You give the provider a value and the consumer will produce that value when rendered (by calling its child function with those values).

Sometimes however it's a bit more complicated and we need to introduce a third component:
- The Reducer

This function does one thing: It takes the previous value (aka state) and an action, then returns a new value from those 2 things. It does not need to be deterministic, but predictability would be a kind gesture to its users ;).

To facilitate this, we usually create 2 Contexts, one to provide the value, known as the StateContext and the other to provide the reducer, known as the DispatchContext. That way, components that only need to read don't need access to dispatch and those that only need to write don't need the state (reducer and dispatcher are used interchangeably).

Furthermore, sometimes there are just too many different action types in a reducer to handle (it turns into a pretty long switch case list) and you can easily forget what arguments it has. To counteract this, there is sometimes classes called `...Actions.jsx` which are basically React hooks that returns a function which will call all the dispatcher with all the appropriate arguments for you. It's like an individual "action" wrapped into a single function call. Of course, this is simply a ease-of-use feature and you can achieve the same thing by doing it directly.

NOTE: Sometimes we want a computed value from the dispatcher (the reducer), but the reducer does not return anything. So to facilitate this, we sometimes use an AsyncReducer, this dispatches a change asynchronously so you can `await` or `then()` it for it's result. You can tell the dispatcher is an AsyncReducer if in the provider, it has `useAsyncReducer()`.

## Render Props
One way to configure what a component renders is by passing a function through props that will return rendered content. The component that takes in this prop can determine where to call that function and where it should render.

## Slots
Like Render Props, this let's you customize a component's rendered children.

Slots are not a React concept. It is taken from WebComponents (it's also in Vue). Basically, you first define a `<Slot name="somePlace">` where you want future content to be. It must have a name in order to refer back to. Then, in some point in time, you "inject" components into that slot by name (refer to `Slot.inject()` or `<Slot.Fill>` for more info). Then, that slot will now contain your new component without you having to edit the original code! How cool is that?

NOTE: The problem this solves is modularity. We wanted modules to only edit their own code, yet be able to change components in the app "shell". This method allows a declarative (and imperative if you must) method of changing the app's contents.

For our purposes, slots are used mainly by `AppLayout.jsx` to define places a module can inject components into (it's not the only place that can use slots; in fact, YOU can use slots IN slots). Modules will then define an object map of slot names to an array of components. These are parsed by the ModuleLoader to automatically inject them into slots for you.

NOTE: If you want to pass props to a component rendered by a slot, you can pass the "injector", instead of the component class, an object like `{ component: ComponentClass, props: { ...your props... } }` or an array like `[ComponentClass, { ...your props... }]`.

## Behaviors
These are React hooks that deal with input handling. Before this, input handling was a monster (not as big of a monster as the graph-machine behemoth, but contributed to it quite a bit). Now it's as simple as using a behavior and you are good to go! See the current use cases for a better understanding on how to use them.

NOTE: Be careful when attaching behaviors to components that re-render frequently, you may need to optimize them for better performance.

## Renderers
These are React components that ONLY renders things, no state or logic. They are essentially `PureComponent`s in that they only change/re-render if their props change. Components that handle a lot of state or logic can benefit from being split into 2 separate files, one that handles rendering and the other that handles the rest. To distinguish between these components, we call one the renderer and the other a regular component.

## Layouts
These are React components that ONLY structure its children. It can contain some logic and state, but it is mainly concerned with properly managing where components are rendered. Most of these achieve this either by defining slots or render props.

## Services
These are like modules, except they are "bundled" with the app itself and available to be used across modules. They have their own providers, renders, the same lifecycle callbacks, and even their own list of dependent services (the dependency tree is solved for you). They simply encapsulate a functionality that is used across modules. They use all the methods above to give an interface for your module.

## UNSAFE_Functions
Functions that start with `UNSAFE_...()` should not be used if you don't know what you are doing. This is mostly because these functions do not update itself when its' arguments change (which all React components and hooks do). They rely on their caller to re-call these functions when the arguments change.
