import FSA, { EMPTY_SYMBOL } from '../FSA.js';
import { solveFSA, convertToDFA } from '../FSAUtils.js';

function testSolveFSA(machine, testString, expectedResult = true)
{
    test('test string \'' + testString + '\'', () =>
    {
        expect(solveFSA(machine, testString)).toBe(expectedResult);
    });
}

function testIsDFA(dfa) 
{
    test('is a valid DFA', () => 
    {
        expect(dfa).toBeDefined();
        expect(dfa.isDeterministic()).toBe(true);
        expect(dfa.validate()).toBe(true);
        expect(dfa.isValid()).toBe(true);
    });
}

function testSizes(dfa, expectedAlphabetSize, expectedStateSize)
{
    test('To have correct number of states and trans', () => 
    {
        const alphabetSize = dfa.getAlphabet().length;
        const stateSize = Array.from(dfa.getStates()).length;
        expect(alphabetSize).toBe(expectedAlphabetSize);
        expect(stateSize).toBe(expectedStateSize);

        let transitionCount = 0;
        for (const tran of Array.from(dfa.getTransitions()))
        {
            transitionCount += tran.getSymbols().length;
        }
        expect(transitionCount).toBe(alphabetSize*stateSize);
    });
}

describe('Trying to convert an empty NFA machine', () =>
{
    const nfa = new FSA(false);
    const dfa = convertToDFA(nfa, nfa);

    testIsDFA(dfa);

    test('is sorta empty', () => 
    {
        expect(Array.from(dfa.getStates()).length).toBe(1); // should create start state
        expect(Array.from(dfa.getTransitions).length).toBe(0);
    });
});

describe('Trying to convert a simple state machine', () =>
{
    const nfa = new FSA(false);
    const state0 = nfa.createState('q0');
    nfa.addTransition(state0, state0, '0');
    nfa.addTransition(state0, state0, '1');
    const dfa = convertToDFA(nfa, nfa);

    test('full transitions', () =>
    {
        // @ts-ignore
        for (const state of dfa.getStates())
        {
            for (const letter of dfa.getAlphabet())
            {
                const nxtStates = dfa.doTransition(state, letter);
                expect(nxtStates).toBeDefined();
                expect(nxtStates).toHaveLength(1);       
            }
        }
    });

    testIsDFA(dfa);    

    test('has the expected generated states', () =>
    {
        const states = Array.from(dfa.getStates());
        expect(states).toHaveLength(1);
        expect(dfa.hasStateWithLabel('{q0}')).toBe(true);
    });

    test('has the expected alphabet', () =>
    {
        const alphabet = dfa.getAlphabet();
        expect(alphabet).toHaveLength(2);
        expect(alphabet).toContain('0');
        expect(alphabet).toContain('1');
    });

    test('has the expected transitions', () =>
    {
        let q0 = dfa.getStatesByLabel('{q0}');
        expect(q0).toHaveLength(1);
        q0 = q0[0];
        expect(q0).toBeDefined();

        let result = dfa.doTransition(q0, '0');
        expect(result).toHaveLength(1);
        expect(result[0].getStateLabel()).toBe('{q0}');

        result = dfa.doTransition(q0, '1');
        expect(result).toHaveLength(1);
        expect(result[0].getStateLabel()).toBe('{q0}');
    });
});

describe('Trying recursive test', () =>
{
    const machine = new FSA();
    const state0 = machine.createState('q0');
    const state1 = machine.createState('q1');
    machine.addTransition(state0, state1, '1');
    machine.addTransition(state1, state0, '0');
    machine.setStartState(state0);
    machine.setFinalState(state0);

    const dfa = convertToDFA(machine, machine);
    
    testIsDFA(dfa);
});

describe('Trying another machine', () =>
{
    const nfa = new FSA(false);
    const state0 = nfa.createState('q0');
    const state1 = nfa.createState('q1');
    nfa.addTransition(state0, state0, '0');
    nfa.addTransition(state0, state0, '1');
    nfa.addTransition(state0, state1, '1');
    nfa.setFinalState(state1);

    const dfa = convertToDFA(nfa, nfa);
    
    testIsDFA(dfa);

    // const states = dfa.getStates();
    //console.log(states, dfa.getStartState(), dfa.getFinalStates());
    // const alphabet = dfa.getAlphabet();
    //console.log(alphabet);
    // const transitions = dfa.getTransitions();
    //console.log(transitions);

    testSolveFSA(dfa, '', false);
    testSolveFSA(dfa, '0', false);
    testSolveFSA(dfa, '1', true);
    testSolveFSA(dfa, '111111111111', true);
    testSolveFSA(dfa, '10000000001', true);
    testSolveFSA(dfa, '0000000001', true);
    testSolveFSA(dfa, '101010010010100101', true);
});

describe('Trying a machine with immediate moves', () =>
{
    const nfa = new FSA(false);
    const state0 = nfa.createState('q0');
    const state1 = nfa.createState('q1');
    nfa.addTransition(state0, state0, '0');
    nfa.addTransition(state0, state0, '1');
    nfa.addTransition(state0, state1, '1');
    nfa.addTransition(state0, state1, EMPTY_SYMBOL);
    nfa.setFinalState(state1);

    const dfa = convertToDFA(nfa, nfa);

    testIsDFA(dfa);

    /*
    const states = dfa.getStates();
    //console.log(states, dfa.getStartState(), dfa.getFinalStates());
    const alphabet = dfa.getAlphabet();
    //console.log(alphabet);
    const transitions = dfa.getTransitions();
    //console.log(transitions);
    */

    testSolveFSA(dfa, '', true);
    testSolveFSA(dfa, '0', true);
    testSolveFSA(dfa, '1', true);
    testSolveFSA(dfa, '111111111111', true);
    testSolveFSA(dfa, '10000000001', true);
    testSolveFSA(dfa, '0000000001', true);
    testSolveFSA(dfa, '101010010010100101', true);
});

describe('Trying a machine with 5 states', () =>
{
    const nfa = new FSA(false);
    const states = [];
    for (let i = 0; i < 5; i++)
    { // 5-state machine
        states.push(nfa.createState(i.toString()));
    }
    nfa.addTransition(states[0], states[1], EMPTY_SYMBOL);
    nfa.addTransition(states[0], states[2], 'a');
    nfa.addTransition(states[1], states[3], 'a');
    nfa.addTransition(states[1], states[4], 'a');
    nfa.addTransition(states[2], states[3], 'b');
    nfa.addTransition(states[3], states[4], 'a');
    nfa.addTransition(states[3], states[4], 'b');
    nfa.setFinalState(states[4]);

    const dfa = convertToDFA(nfa);
    
    testIsDFA(dfa);

    testSizes(dfa, 2, 5);

    testSolveFSA(dfa, '', false);
    testSolveFSA(dfa, 'a', true);
    testSolveFSA(dfa, 'aa', true);
    testSolveFSA(dfa, 'ab', true);
    testSolveFSA(dfa, 'b', false);
    testSolveFSA(dfa, 'abbb', false);
});

describe('Trying a machine with 5 states but more transitions', () =>
{
    const nfa = new FSA(false);
    const states = [];
    for (let i = 0; i < 5; i++)
    { // 5-state machine
        states.push(nfa.createState(i.toString()));
    }
    nfa.addTransition(states[0], states[1], 'a');
    nfa.addTransition(states[0], states[2], 'a');
    nfa.addTransition(states[0], states[2], 'b');
    nfa.addTransition(states[0], states[3], 'a');
    nfa.addTransition(states[0], states[3], 'b');

    nfa.addTransition(states[1], states[1], 'a');
    nfa.addTransition(states[1], states[2], 'a');
    nfa.addTransition(states[1], states[2], 'b');
    nfa.addTransition(states[1], states[3], 'b');

    nfa.addTransition(states[2], states[2], 'b');
    nfa.addTransition(states[2], states[4], 'b');

    nfa.addTransition(states[3], states[3], 'b');
    nfa.addTransition(states[3], states[4], 'a');
    nfa.addTransition(states[3], states[4], 'b');

    nfa.setFinalState(states[1]);

    const dfa = convertToDFA(nfa);
    
    testIsDFA(dfa);

    testSizes(dfa, 2, 8);

    testSolveFSA(dfa, '', false);
    testSolveFSA(dfa, 'aa', true);
    testSolveFSA(dfa, 'aaaaa', true);
    testSolveFSA(dfa, 'aaab', false);
    testSolveFSA(dfa, 'abbb', false);
});

