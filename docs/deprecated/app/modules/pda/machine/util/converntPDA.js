import { State } from '../PDA';

export const EMPTY_SYMBOL = '&empty';


export function convertPDA(pda)
{

//     Preprocessing

// 1. Make all accept states empty the stack (create loop)
const pdaCopy = copy(pda);        //Copy state (might need to fix copy function)
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
// when we ran out of character.
for(const s of pda._finalStates.entries()) {
    pdaCopy.addTransition(
    s, 
    clear, 
    EMPTY_SYMBOL, 
    EMPTY_SYMBOL,
    EMPTY_SYMBOL // Added our special stack symbol
);      

    }
//transition (state, alphabet symbol, push to stack) == (state, pop off stack)
// if transistion(p, a, \epsilon == (r, u) and transition(s, b, u) == (q, \epsilon)
// add rule (p, q) → a (r,s) b to G



}


