import { State } from '../PDA';

export const EMPTY_SYMBOL = '&empty'; // Why do we need to export here?
const READ_SYMBOL_INDEX = 1;
const TO_STATE_INDEX = 2;
const POP_SYMBOL_INDEX = 3;
const PUSH_SYMBOL_INDEX = 4;


export function convertPDA(pda)
{

//     Preprocessing

// 1. Make all accept states empty the stack (create loop)
const pdaCopy = copy(pda);        //Copy pda is shallow, so this doesn't really do anything.
//make a start state to add a stack symbol on stack with epsilon transition
//for transition symbol just concatenate all string from alphabet
//add a epsilon transitoin to old start state
//make new state to the start state
const oldStartState = pdaCopy.getStartState();
const newStartState = new State('newStart')
pdaCopy.addState(newStartState);
pdaCopy.setStartState(newStartState);

// Now, we need to look for a symbol that is not there (we're just going to make that the )
const clearState = new State('clear')
pdaCopy.addState(clearState);


newSym = ''
// Generate special stack symbol and add transitions to clear state to clear stack
for(const [sym, count] of pdaCopy.stackAlphabet_.entries) {
    newSym.concat(sym)
    pdaCopy.addTransition(clearState, clearState, EMPTY_SYMBOL, sym, EMPTY_SYMBOL)
}

const newAcceptState = new State('newAcc')

// Add transition from the clear state to the new accept state
pdaCopy.addTransition(clearState, newAcceptState, EMPTY_SYMBOL, sym, EMPTY_SYMBOL)

pdaCopy.addTransition(
    oldStartState, 
    newStartState, 
    EMPTY_SYMBOL, 
    EMPTY_SYMBOL,
    newSym // Added our special stack symbol
); //need to change last field to be our special stack symbol



//make a state 'clear' that empties the stack. Transition to accept 
//NOTE: think about not making same state name as the existing pda


// //make a new accept state that only 'clear' points to
// pdaCopy.addState(new State('newAccept'));

//add a transition to state clear
//convert the state to non accept

// TODO: Not correct, would need to make sure that the computation would have stayed in this accept state
// when we ran out of character. Edit: I think we're good here actually, because the accept state will only accept
// with no characters left.
for(const s of pda._finalStates.entries()) {
    pdaCopy.addTransition(
        s, 
        clear, 
        EMPTY_SYMBOL, 
        EMPTY_SYMBOL,
        EMPTY_SYMBOL // Added our special stack symbol
    );     
}
pdaCopy.addTransition( 
    clear,
    newAcceptState,
    EMPTY_SYMBOL, 
    EMPTY_SYMBOL,
    EMPTY_SYMBOL // Added our special stack symbol
);

// So now we need to loop through all transitions

inter = new State('Inter'); // So for all these custom states, we have to make sure that one doesn't already exist.

// Instead we're going to loop through all the outgoing transitions of a state
for(const [stateId, state] of pdaCopy._states.entries()) {
    const dst = state.getOutgoingTransitions(state); // dst = [state, readSymbol, destState, popSymbol, pushSymbol]
    for(const tran of dst) {
        inter = new State('Inter' + /*Some unique string dependent on count or something */); // 
        // Case that both are push
        if(tran[POP_SYMBOL_INDEX] === EMPTY_SYMBOL && tran[PUSH_SYMBOL_INDEX] === EMPTY_SYMBOL) {
            // We want to create a new transition from state to inter that pushes an arbitrary stack symbol
            
            // Then from inter to deststate we pop that symbol

        } else if(tran[POP_SYMBOL_INDEX] !== EMPTY_SYMBOL && tran[PUSH_SYMBOL_INDEX] === EMPTY_SYMBOL) {
            // We want to create a new transition from state to inter that pops the pop symbol

            // And a new transition from inter to deststate that pushes the push symbol
        }
    }
}


//transition (state, alphabet symbol, push to stack) == (state, pop off stack)
// if transistion(p, a, \epsilon == (r, u) and transition(s, b, u) == (q, \epsilon)
// add rule (p, q) → a (r,s) b to G



}


