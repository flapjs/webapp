# Graphs

Cause graphs are hard.

## Getting Started
The entrypoint is `GraphService.js`. It also expects you to define a graph type class (refer to `BaseGraph.js` for more info). Most functions interacting with the graph will take a graph type.

## My Graph Design Thought Process
What if I want to access a graph element's state in render()?
> For example: `<... disabled={state.active}/>`
- You'll need to re-render if it changes.
- Solutions:
    - Maybe a `useGraphElement(elementId)`. It will force an update anytime that element changes (inside will `useContext()` to get the graph).
    - Maybe a per node consumer?
What if I want to access a graph element's state in general?
> For example: `onload() { if (!graph.isEmpty()) showWarning(); }`
- You don't need to re-render as any code "outside" will have a normal program flow. This changes when you want to change its state though...
- Solutions:
    - Use a `Context.Provider` and pass it the graph object. Then, you can reference the graph object, while the render bits can reference the context.
What if I want to change a graph element's state in render()?
> For example: `<button onClick={() => {graph.state.accept = !graph.state.accept}}>`
- Solutions:
    - `[nodeState, setNodeState] = useGraphElement(id); setNodeState((prev) => ({accept: prev.accept}));`

What if I want to change a graph elemnet's state in general?
> For example: `focusToNode(graph)`

What if I want to list all graph elements?
> For example: `<p>States: {graph.nodes.map(value => <div>{value.label}</div>)}</p>`

What if I want to add/delete graph elements?
> For example: `<button onClick={() => {graph.createState()}}>`


Example: Create a button for all node elements, that when clicked will move the viewport to that node.
- `const [nodes, updateNodes] = useGraphElements(NodeType)`
Example: Create a button for all node elements, that when clicked will delete the node (should also remove the button from previous).
- `const [nodes, updateNodes] = useGraphElements(NodeType)`
Example: When click on button, create a node at origin.
- `const [nodes, updateNodes] = useGraphElements(NodeType)`
Example: When click on button, clear all node elements.
- `const [nodes, updateNodes] = useGraphElements(NodeType)`
Example: When click on button, rearrange all nodes to a certain layout.
- `const [nodes, updateNodes] = useGraphElements(NodeType)`

What about undo/redo?
- Every few seconds serialize the entire graph and check if it has changed.
    - If it has, save it. Otherwise, throw it away.

What about initialization/loading/exporting?
- Just do it.
