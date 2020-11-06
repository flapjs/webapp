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
pdaCopy.addTransition(oldStartState, newStartState, EMPTY_SYMBOL, EMPTY_SYMBOL, 
    EMPTY_SYMBOL); //need to change last field to be our special stack symbol

//make a state 'clear' that empties the stack. Transition to accept 
//NOTE: think about not making same state name as the existing pda

pdaCopy.addState(new State('clear'));
//make a new accept state that only 'clear' points to
pdaCopy.addState(new State('newAccept'));

//empty 
for(const [key, value] of pda._finalStates.entries())
        {
        
            //add a transition to state clear
            //convert the state to non accept
            

        }
//transition (state, alphabet symbol, push to stack) == (state, pop off stack)
// if transistion(p, a, \epsilon == (r, u) and transition(s, b, u) == (q, \epsilon)
// add rule (p, q) → a (r,s) b to G



}


