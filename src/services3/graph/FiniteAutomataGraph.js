import { Graph } from './Graph.js';

export class FiniteAutomataGraph
{
    constructor()
    {
        this.graph = new Graph();
        this.startState = null;
        this.acceptStates = new Set();
    }

    addState(state, accept = false)
    {
        let start = false;
        if (!this.startState)
        {
            this.startState = state;
            start = true;
        }
        this.graph.addNode(state, state, {
            start: start,
            accept: accept,
        });
    }

    addTransition(fromState, toState, values)
    {
        const edgeKey = `${fromState}.${toState}|${values}`;
        this.graph.addEdge(edgeKey, values, fromState, toState);
    }

    deleteState(state)
    {
        this.graph.deleteNode(state);
    }

    deleteTransition(transition)
    {
        this.graph.deleteEdge(transition);
    }

    setStartState(state)
    {
        let prevState = this.startState;
        this.startState = state;
        if (prevState)
        {
            this.graph.setNodeAttribute(state, 'start', false);
        }
        this.graph.setNodeAttribute(state, 'start', true);
    }

    toggleAcceptState(state, force = undefined)
    {
        if (typeof force === 'undefined')
        {
            force = !this.graph.getNodeAttribute(state, 'start');
        }
        let value = Boolean(force);
        this.graph.setNodeAttribute(state, 'start', value);
        if (value)
        {
            this.acceptStates.add(state);
        }
        else
        {
            this.acceptStates.delete(state);
        }
    }

    getStartState()
    {
        return this.startState;
    }

    getAcceptStates()
    {
        return this.acceptStates;
    }

    getTransitionsTo(fromState, toState)
    {
        return Graph.getEdgesBetween(this.graph, fromState, toState, false);
    }

    getTransitionValue(transition)
    {
        return this.graph.getEdgeValue(transition);
    }

    hasState(state)
    {
        return this.graph.hasNode(state);
    }

    hasTransition(transition)
    {
        return this.graph.hasEdge(transition);
    }

    isStartState(state)
    {
        return this.graph.getNodeAttribute(state, 'start');
    }

    isAcceptState(state)
    {
        return this.graph.getNodeAttribute(state, 'accept');
    }

    getStates()
    {
        return this.graph.getNodeKeys();
    }

    getTransitions()
    {
        return this.graph.getEdgeKeys();
    }
}
