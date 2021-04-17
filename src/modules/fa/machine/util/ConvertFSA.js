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

    const trapState = new State();
    dst.addState(trapState);

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
            if (newStates.length == 0) // trap state
            { 
                // dst.addTransition(dfaState, trapState);
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

    // const startState = fsa.getStartState();

    // const dfaData = {
    //     nfaSource: fsa,
    //     //To keep track of dfa states in terms of nfa sets
    //     dfaStateMap: new Map(),
    //     //Array of final dfa states
    //     dfaFinalStates: [],
    //     //To keep track of dfa transitions in terms of dfa states
    //     dfaTransitionMap: new Map(),
    //     //The resultant dfa start state
    //     dfaStartState: null,
    //     //The trap state for all missing transitions
    //     dfaTrapState: null
    // };

    //Make new DFA start state
    // const startStatesByClosure = fsa.doClosureTransition(startState);
    // console.log(startState); // remove later
    // dfaData.dfaStartState = getDFAStateFromNFAStates(startStatesByClosure, dfaData);
    // dfaData.dfaTrapState = getDFAStateFromNFAStates([], dfaData);

    //For every state from the NFA's powerset, add it to DFA with correct transitions
    // const statePowerSet = getPowerSetOfStates(fsa.getStates());
    // for (const nfaStates of statePowerSet)
    // {
    //     //As long as it is not the empty set...
    //     if (nfaStates.length > 0)
    //     {
    //         expandNFAStatesToDFA(nfaStates, dfaData);
    //     }
    // }

    // //Make sure any unused symbols are added as transitions for every state...
    // for (const dfaState of dfaData.dfaStateMap.values())
    // {
    //     for (const symbol of fsa.getAlphabet())
    //     {
    //         //If transition for symbol does not exist...
    //         const dfaTransitionKey = getDFATransitionKeyFromDFAStateAndSymbol(dfaState, symbol, dfaData);
    //         if (!dfaData.dfaTransitionMap.has(dfaTransitionKey))
    //         {
    //             dfaData.dfaTransitionMap.set(dfaTransitionKey, [dfaState, symbol, dfaData.dfaTrapState]);
    //         }
    //     }
    // }

    // //Compiled dfa data to dst
    // dst.clear();
    // //Add states
    // for (const dfaState of dfaData.dfaStateMap.values())
    // {
    //     dst.addState(dfaState);
    // }

    // //Set start state
    // dst.setStartState(dfaData.dfaStartState);
    // //Set final states
    // for (const finalState of dfaData.dfaFinalStates)
    // {
    //     dst.setFinalState(finalState);
    // }
    // //Add transitions (will also add any symbols used to alphabet)
    // for (const transition of dfaData.dfaTransitionMap.values())
    // {
    //     dst.addTransition(transition[0], transition[2], transition[1]);
    // }
    // return dst;
}

// function expandNFAStatesToDFA(nfaStates, dfaData)
// {
//     let fromDFAState = getDFAStateFromNFAStates(nfaStates, dfaData);
//     let dfaState = null;

//     let nfaTerminals = [];

//     for (const symbol of dfaData.nfaSource.getAlphabet())
//     {
//         //Get all closed reachable states...
//         for (const fromNFAState of nfaStates)
//         {
//             dfaData.nfaSource.doTerminalTransition(fromNFAState, symbol, nfaTerminals);
//         }

//         //If has reachable states...
//         if (nfaTerminals.length > 0)
//         {
//             dfaState = getDFAStateFromNFAStates(nfaTerminals, dfaData);

//             //Create transition for reachable state
//             //Should guarantee to be unique for state and symbol pair
//             const dfaTransitionKey = getDFATransitionKeyFromDFAStateAndSymbol(fromDFAState, symbol, dfaData);
//             dfaData.dfaTransitionMap.set(dfaTransitionKey, [fromDFAState, symbol, dfaState]);
//         }

//         //Reset list
//         nfaTerminals.length = 0;
//     }
// }

// s

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

// function getPowerSetOfStates(states)
// {
//     var result = [[]];

//     for (const state of states)
//     {
//         for (let i = 0, len = result.length; i < len; ++i)
//         {
//             result.push(result[i].concat(state));
//         }
//     }
//     return result;
// }
