# Machines

Cause they are hard too.

Unlike graphs, which update frequently from an indeterministic source of input, machines
are often derived from the graph itself or a computation. Therefore, to make things simpler,
it does not use the same reconciliation logic as the graph. Instead, it relies on direct
function calls to update the machine. Some of these function calls still use polling, but
when a change is detected, it will reconstruct the ENTIRE machine instead of surgically
updating a single element, which is the graph method. The reasoning for this is because
machines are helpful for conversions and heavy computation. Any minor edits or computations
should be done on the graph object (which will eventually reflect to the machine). Otherwise
the infrastructure needed to support both sources of input would be too cumbersome to actually
be useful.

One surprising thing is that machines do not use a MachineContext, as you would expect. This
is because machines are mostly backend code. The only time a UI will see a change from the
machine is when a computation has not yet started or has finished, creating a static new machine
state. Therefore, there is no need to constantly update the UI for all changes.

## How To Stop Crying And Learn To Love The Machines
So, ideally, any component can display/manipulate information on any machine. Therefore,
we should treat a Machine as a source of truth/state.

However, a Machine is also always derived from other sources of data (only one at a time
though). Therefore, we need some kind of reconciliation to translate between the two when
something changes. For example, between the graph and the machine. The MachineBuilder can
do this.

That means for any individual source it should be one Machine. Then, if it is derived, it
should have a MachineBuilder to manage reconciliation. If it is only a machine, it will
not be managed as it is usually an artifact of computation and is similarly trivial to manage.

For example, for the Graph source, there should be an associated Machine source, bound
together by a MachineBuilder.

## Rules and Regulations
- A `Machine` is only ever READ from UI and UPDATED by `MachineBuilder`.
- The `Graph` must `useGraphForMachine(MachineBuilder, 'graph', graphState, graphDispatch);`
which will talk to `MachineBuilder`.
- This will update the `Machine` from `Graph.GraphState` changes (But what about
`applyChanges()` effects? There needs to be a way to lock).
    - The solution is that `applyChanges()` actually only updates the graph state from a
    new machine, which will then propagate to the old machine. It is a forced one-direction
    data flow by simply not committing the data back to the machine and let the graph handle it.
- This will also update the `Graph` from APPLIED `Machine` changes (manually through applyChanges(() => {})).
- UI will `useMachine()` to READ, and `applyChanges(() => {})` to UPDATE the "machine".
- `applyChanges()` is the ONLY way for the machine to change the graph.
- Although `applyChanges()` eventually changes the machine, it does so THROUGH graph. In other
words, it sets the graph state from the new changed machine. Which then triggers a
graph-to-machine translation.

### Example Use Cases

Being used from the UI:
```javascript
// This function will handle bi-directional data flow. More specifically, the function will implement
// data flow FROM a graph TO a machine. Whereas the given callback will handle flow FROM a machine TO a graph.
// NOTE: This is because the API cannot determine where the backward data flow should end up at,
// so it's up to the user to define it.
useGraphForMachine(FSABuilder, 'graph', GraphStateContext, machine => graphDispatch({}));
```

As defined by the API:
```javascript
// NOTE: It has since been renamed to useSourceForMachine().
function useGraphForMachine(machineBuilderType, machineName, stateContext, changeCallback)
{
    const state = useContext(stateContext);
    const machineBuilder = useMachineBuilder(machineBuilderType, machineName);

    // To execute when it is called for backward flow.
    machineBuilder.setChangeCallback(changeCallback);

    // To keep it updated from the given state context.
    useEffect(() =>
    {
        machineBuilder.update(state);
    },
    [ state, machineBuilder ]);
}

// The ONLY way to start a backward flow.
function applyChanges(callback)
{
    let machine = new FSA().copy(this.machine);
    callback(machine);
    this.changeCallback(machine);
}

function update(graphState)
{
    // Perform the update...
}
```
