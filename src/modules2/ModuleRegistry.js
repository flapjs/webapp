// This class is used to statically register all modules for dynamic import. Otherwise, every app install
// will need to download ALL modules.

export const fa = {
    name: 'Finite Automata',
    version: '1.0.0',
    description: 'Back to our roots.',
    disabled: false,
    fetch: () => { return Promise.resolve({}); },
};

export const node = {
    name: 'Node Graph',
    version: '1.0.0',
    description: 'And so it begins.',
    disabled: false,
    fetch: () => import(/* webpackChunkName: "module_node" */ './node/NodeModule.js'),
};
