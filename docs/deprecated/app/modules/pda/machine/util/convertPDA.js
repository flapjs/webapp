import { State, Symbol } from '../PDA';

export const EMPTY_SYMBOL = '&empty'; // Why do we need to export here?
const FROM_STATE_INDEX = 0;
const READ_SYMBOL_INDEX = 1;
const TO_STATE_INDEX = 2;
const POP_SYMBOL_INDEX = 3;
const PUSH_SYMBOL_INDEX = 4;


export function convertPDA(pda) {

    //     Preprocessing
    //     NOTE: think about not making same state name as the existing pda

    // 1. Make all accept states empty the stack (create loop)
    const pdaCopy = copy(pda);        //Copy pda is shallow, so this doesn't really do anything.
    //If it's shallow, the existing PDA that the user has might change, but we will fix that later.

    // We create a new start state that has only one transition to the old start state. Pushes a special stack 
    // symbol that will allow us to detect if stack is empty at the end of a computation.
    const oldStartState = pdaCopy.getStartState();
    const newStartState = new State('newStart');
    pdaCopy.addState(newStartState);
    pdaCopy.setStartState(newStartState);

    // 2. Make all accept states transition to a final accept state.
    // Every old accept state will redirect to clearState, which will clear the stack.
    // After stack is cleared, will redirect to newAcceptState.
    const clearState = new State('clear');
    pdaCopy.addState(clearState);
    const newAcceptState = new State('newAcc');


    // We generate a special stack symbol through concatenation and add transitions to clear the stack.
    // Note: Is there a more efficient way of doing this?
    newSym = '';
    for (const [sym, count] of pdaCopy.stackAlphabet_.entries) {
        newSym.concat(sym)
        pdaCopy.addTransition(clearState, clearState, EMPTY_SYMBOL, sym, EMPTY_SYMBOL)
    }

    // Push special stack symbol to newStartState.
    pdaCopy.addTransition(newStartState, oldStartState, EMPTY_SYMBOL, EMPTY_SYMBOL, newSym);

    // Add transitions from the clear state to the new accept state.
    pdaCopy.addTransition(clearState, newAcceptState, EMPTY_SYMBOL, newSym, EMPTY_SYMBOL)
    pdaCopy.addTransition(clearState, newAcceptState, EMPTY_SYMBOL, EMPTY_SYMBOL, EMPTY_SYMBOL);

    // Direct all accept states to clear and make them no longer accept states.
    for (const s of pda._finalStates.entries()) {
        pdaCopy.addTransition(s, clearState, EMPTY_SYMBOL, EMPTY_SYMBOL, EMPTY_SYMBOL);
        pdaCopy.setFinalState(s, false);
    }

    // Set newAcceptState to be an accept state. (Note: has to be after the above for loop).
    pdaCopy.setFinalState(newAcceptState, true);

    // THIS COMPLETES STEPS 1 AND 2.

    // STEP 3 BEGINS HERE.

    // 3. For t in transitions:
    // if no_push_or_pop, then insert placeholder push then pop
    // if both, divide into 2 separate transitions with a placeholder state

    // So now we need to loop through all transitions

    // So for all these custom states, we have to make sure that one doesn't already exist.

    // Instead we're going to loop through all the outgoing transitions of a state
    for (const [stateId, state] of pdaCopy._states.entries()) {
        const dst = state.getOutgoingTransitions(state); // dst = [startState, readSymbol, destState, popSymbol, pushSymbol]
        for (const tran of dst) {
            inter = new State('Inter' /* + Some unique string dependent on count or something */); // 
            // Case that both are push
            if (tran[POP_SYMBOL_INDEX] === EMPTY_SYMBOL && tran[PUSH_SYMBOL_INDEX] === EMPTY_SYMBOL) {
                // We want to create a new transition from state to inter that pushes an arbitrary stack symbol
                pdaCopy.addState(inter);

                // Remove the bad transition // Remove transition not implemented????
                pdaCopy.removeTransition(
                    tran[FROM_STATE_INDEX],
                    tran[TO_STATE_INDEX],
                    new Symbol(
                        tran[READ_SYMBOL_INDEX],
                        tran[POP_SYMBOL_INDEX],
                        tran[PUSH_SYMBOL_INDEX]
                    )
                );

                // Add transition to intermediate state with random stack character
                pdaCopy.addTransition(
                    tran[FROM_STATE_INDEX],
                    inter,
                    tran[READ_SYMBOL_INDEX],
                    EMPTY_SYMBOL,
                    'OUR SPECIAL STACK STRING',
                );

                // Add transition from intermediate state popping that random stack character
                pdaCopy.addTransition(
                    inter,
                    tran[TO_STATE_INDEX],
                    EMPTY_SYMBOL,
                    'OUR SPECIAL STACK STRING',
                    EMPTY_SYMBOL,
                );

                // Same idea, except we don't need a random symbol
            } else if (tran[POP_SYMBOL_INDEX] !== EMPTY_SYMBOL && tran[PUSH_SYMBOL_INDEX] === EMPTY_SYMBOL) {
                // Remove the bad transition // Remove transition not implemented????
                pdaCopy.removeTransition(
                    tran[FROM_STATE_INDEX],
                    tran[TO_STATE_INDEX],
                    new Symbol(
                        tran[READ_SYMBOL_INDEX],
                        tran[POP_SYMBOL_INDEX],
                        tran[PUSH_SYMBOL_INDEX]
                    )
                );

                // Add transition to intermediate state with random stack character
                pdaCopy.addTransition(
                    tran[FROM_STATE_INDEX],
                    inter,
                    tran[READ_SYMBOL_INDEX],
                    tran[POP_SYMBOL_INDEX],
                    EMPTY_SYMBOL,
                );

                // Add transition from intermediate state popping that random stack character
                pdaCopy.addTransition(
                    inter,
                    tran[TO_STATE_INDEX],
                    EMPTY_SYMBOL,
                    EMPTY_SYMBOL,
                    tran[PUSH_SYMBOL_INDEX],
                )
            }
        }
    }

    // THIS COMPLETES STEP 3.


    //transition (state, alphabet symbol, push to stack) == (state, pop off stack)
    // if transistion(p, a, \epsilon == (r, u) and transition(s, b, u) == (q, \epsilon)
    // add rule (p, q) → a (r,s) b to G



}


