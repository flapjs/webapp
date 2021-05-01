import FSA, { State } from '../FSA.js';

export function convertToNFA(fsa, dst = new FSA(false))
{
    if (!fsa.isDeterministic())
    {
        dst.copy(fsa);
        return dst;
    }

    dst.setDeterministic(false);
    return dst;
}

function bfs(nfa, dst) 
{
    const alphabet = nfa.getAlphabet(); // these will be all transitions

    const sendToTrap = [];

    let states = nfa.doClosureTransition(nfa.getStartState());
    states.sort((a, b) => a.getStateLabel() < b.getStateLabel() ? -1 : 1);

    let dfaState = getDFAStateFromNFAStates(states);
    dst.addState(dfaState);
    dst.setStartState(dfaState);

    const seen = new Map(); // store seen states
    let statesLabel = states.map(state => state.getStateLabel()).toString();
    seen.set(statesLabel, dfaState);

    const q = [states];
    while (q.length > 0) // while still something to explore
    {
        states = q.shift(); // get a set of nfa states
        statesLabel = states.map(state => state.getStateLabel()).toString();
        dfaState = seen.get(statesLabel); 
        for (const letter of alphabet) // for each letter
        {
            const newStatesSet = new Set();
            for (const state of states) // for each state do transition
            {
                nfa.doTransition(state, letter).forEach(newState => 
                {
                    newStatesSet.add(newState);
                });
            }

            for (const newState of newStatesSet) // do closure on each new state
            {
                nfa.doClosureTransition(newState).forEach(epsilonState => 
                {
                    newStatesSet.add(epsilonState);
                });
            }

            const newStates = Array.from(newStatesSet);
            if (newStates.length == 0) // send that transition to trap
            { 
                sendToTrap.push([dfaState, letter]); // this combo results in trapped state
                continue;
            }
            
            newStates.sort((a, b) => a.getStateLabel() < b.getStateLabel() ? -1 : 1);

            // now we have the set of new reachable states
            let newStatesLabel = newStates.map(state => state.getStateLabel()).toString();
            let newDFAState;

            // if seen before
            if (seen.has(newStatesLabel))
            {
                newDFAState = seen.get(newStatesLabel);
                dst.addTransition(dfaState, newDFAState, letter); // simply add transition
            }
            else 
            {
                newDFAState = getDFAStateFromNFAStates(newStates); // create
                dst.addState(newDFAState); // add state
                dst.addTransition(dfaState, newDFAState, letter);

                for (const newState of newStates) // check for end
                {
                    if (nfa.isFinalState(newState))
                    {
                        dst.setFinalState(newDFAState);
                    }
                }
                
                seen.set(newStatesLabel, newDFAState); // seen
                q.push(newStates); // add to explore queue
            }
        }
    }
    // now we are done building the regular transitions, we finish all the trap states
    const trapState = new State('trap');
    dst.addState(trapState);
    for (const letter of alphabet)
    {
        sendToTrap.push([trapState, letter]);
    }
    for (const transition of sendToTrap) 
    {
        dst.addTransition(transition[0], trapState, transition[1]);
    }
}

export function convertToDFA(fsa, dst = new FSA(true))
{
    if (fsa.isDeterministic()) // if alreayd deterministic then return a copy
    {
        dst.copy(fsa);
        return dst;
    }

    const tmpFSA = new FSA(false);
    tmpFSA.copy(fsa);
    bfs(tmpFSA, dst); // build dfa
    return dst;
}

function getDFAStateFromNFAStates(nfaStates)
{
    // Compute the label from nfa states in set notation...
    let dfaStateLabel = '{';
    for (const state of nfaStates)
    {
        if (dfaStateLabel.length > 1)
        {
            dfaStateLabel += ',';
        }
        dfaStateLabel += state.getStateLabel();
    }
    dfaStateLabel += '}';

    // return the state
    return new State(dfaStateLabel);
}
