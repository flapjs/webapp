import GraphMachineBuilder from '@flapjs/services/graphmachine/GraphMachineBuilder.js';

import FSA from '@flapjs/modules/fa/machine/FSA.js';

import { hashCode } from '@flapjs/modules/fa/graph/FiniteAutomataHash.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';

import { buildGraphFromMachine } from '@flapjs/modules/fa/graphmachine/FiniteAutomataGraphToMachineHandler.js';
import { buildMachineFromGraph } from '@flapjs/modules/fa/graphmachine/FiniteAutomataMachineToGraphHandler.js';

export default class FiniteAutomataBuilder extends GraphMachineBuilder
{
    /** @override */
    static build(from = null, opts = {})
    {
        if (from && opts.machineOnly)
        {
            return from;
        }
        else
        {
            let result = new FSA(false);
            if (from) result.copy(from);
            return result;
        }
    }

    /** @override */
    static updateGraphFromMachine(graphType, graphState, graphDispatch, machine, opts = {})
    {
        if (opts.machineOnly)
        {
            graphDispatch({ type: 'forceUpdate' });
            return;
        }

        const nextGraphData = buildGraphFromMachine(this, machine, graphType, graphType, opts);
        let nextGraphState = graphType.deserialize(nextGraphData, {}, { forceIgnoreVersion: true });
        graphDispatch({ type: 'resetState', state: nextGraphState });
    }

    constructor()
    {
        super();
        
        // From state ids to node ids
        this.sourceMap = new Map();
        this.errors = [];
        this.warnings = [];

        this.prevSourceHash = 0;
        this.prevDeterminism = null;
    }

    shouldMachineUpdate(machine, source)
    {
        const hash = hashCode(source);
        const prevHash = this.prevSourceHash;
        this.prevSourceHash = hash;

        const determinism = machine.isDeterministic();
        const prevDeterminism = this.prevDeterminism;
        this.prevDeterminism = determinism;

        return hash !== prevHash || determinism !== prevDeterminism;
    }

    /** @override */
    updateMachineFromSource(machine, source, opts = {})
    {
        // TODO: This is used when switching determinism, we don't want to rebuild everything. Cause nothing changes.
        // HOWEVER! We do want to update the validator, so unfortunately we can only choose all or nothing right now.
        // Until we can separate the validator from the builder...
        if (opts.machineOnly)
        {
            return true;
        }

        if (!this.shouldMachineUpdate(machine, source))
        {
            return false;
        }

        const { errors, warnings } = buildMachineFromGraph(this, machine, FiniteAutomataGraph, source, opts);

        this.errors.length = 0;
        this.warnings.length = 0;
        if (errors) this.errors.push(...errors);
        if (warnings) this.warnings.push(...warnings);

        return true;
    }
}
