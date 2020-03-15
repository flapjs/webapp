/* globals __VERSION__ */

import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement';

export default function FiniteAutomataJFLAP7Exporter(graphType, graphState)
{
    const graphNodes = graphType.getElements(graphState, NodeElement);
    const graphEdges = graphType.getElements(graphState, EdgeElement);

    // GraphState to JFLAP 7.0
    const header = '<?xml version="1.0" encoding="UTF-8" '
        + 'standalone="no"?><!--Created from Flap.js Web App '
        + __VERSION__
        + '-->';
    const parser = new DOMParser();
    let jff = parser.parseFromString(header, 'application/xml');
    
    let rootStructure = jff.createElement('structure');

    // For Finite Automata...
    let typeElement = jff.createElement('type');
    typeElement.innerHTML = 'fa';
    rootStructure.appendChild(typeElement);

    let automatonElement = jff.createElement('automaton');
    rootStructure.appendChild(automatonElement);
    
    let nodeIdToStateId = new Map();
    let stateId = 0;
    for(let node of graphNodes)
    {
        nodeIdToStateId.set(node.id, stateId);

        let stateElement = jff.createElement('state');
        stateElement.id = String(stateId++);
        stateElement.setAttribute('name', node.label);
        automatonElement.appendChild(stateElement);

        let xElement = jff.createElement('x');
        xElement.innerHTML = String(node.x || 0);
        stateElement.appendChild(xElement);

        let yElement = jff.createElement('y');
        yElement.innerHTML = String(node.y || 0);
        stateElement.appendChild(yElement);

        if (node.initial)
        {
            let initialElement = jff.createElement('initial');
            stateElement.appendChild(initialElement);
        }

        if (node.accept)
        {
            let acceptElement = jff.createElement('final');
            stateElement.appendChild(acceptElement);
        }
    }

    for(let edge of graphEdges)
    {
        let fromStateId = nodeIdToStateId.get(edge.fromId);
        let toStateId = nodeIdToStateId.get(edge.toId);

        if (typeof fromStateId !== 'number' || typeof toStateId !== 'number') continue;
        if (typeof edge.label === 'string') continue;

        const symbols = edge.label.split('\n');
        for(let symbol of symbols)
        {
            let transitionElement = jff.createElement('transition');
            automatonElement.appendChild(transitionElement);

            let fromElement = jff.createElement('from');
            fromElement.innerHTML = String(fromStateId);
            transitionElement.appendChild(fromElement);

            let toElement = jff.createElement('to');
            toElement.innerHTML = String(toStateId);
            transitionElement.appendChild(toElement);

            let readElement = jff.createElement('read');
            readElement.innerHTML = String(symbol);
            transitionElement.appendChild(readElement);
        }
    }
    
    let xmlString = new XMLSerializer().serializeToString(jff);
    return xmlString;
}
