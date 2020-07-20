// This class is used to statically register all modules for dynamic import. Otherwise, every app install
// will need to download ALL modules.

export const node = {
    name: 'Node Graph',
    version: '2.0.0',
    description: 'And so it begins.',
    disabled: false,
    fetch: () => import(/* webpackChunkName: "module_node" */ './node/NodeModule.js'),
};

export const fa = {
    name: 'Finite Automata',
    version: '4.0.0',
    description: 'Back to our roots.',
    disabled: false,
    fetch: () => import(/* webpackChunkName: "module_fa" */ './fa/FiniteAutomataModule.js'),
};

export const re = {
    name: 'Regular Expression',
    version: '3.0.0',
    description: 'Here is a step towards something new.',
    disabled: false,
    fetch: () => import(/* webpackChunkName: "module_re" */ './re/RegularExpressionModule.js'),
};

export const pda = {
    name: 'Push-Down Automata',
    version: '3.0.0',
    description: 'We will complete you one day.',
    disabled: true,
    fetch: () => import(/* webpackChunkName: "module_pda" */ './pda/PushdownAutomataModule.js'),
};

export const cfg = {
    name: 'Context-Free Grammar',
    version: '1.0.0',
    description: 'What is this?',
    disabled: true,
    fetch: () => import(/* webpackChunkName: "module_cfg" */ './cfg/ContextFreeGrammarModule.js'),
};

export const tm = {
    name: 'Turing Machine',
    version: '1.0.0',
    description: 'One day...',
    disabled: true,
    fetch: () => import(/* webpackChunkName: "module_tm" */ './tm/TuringMachineModule.js'),
};

export const tree = {
    name: 'Tree',
    version: '1.0.0',
    description: 'Almost there!',
    disabled: true,
    fetch: () => import(/* webpackChunkName: "module_tree" */ './tree/TreeModule.js'),
};
