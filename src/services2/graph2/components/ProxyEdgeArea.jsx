import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/hooks/behaviors/DragBehaviorHook.jsx';

import ControlledEdgeElementComponent from '../elements/edge/ControlledEdgeElementComponent.jsx';

/** This is used to pass the proxy edge's update function to all ProxyEdgeArea's children. */
const ProxyEdgeContext = React.createContext();

export default function ProxyEdgeArea(props)
{
    const { onCreate } = props;
    const [ proxyEdgeProps, active, update, target ] = useProxyEdge(onCreate);
    return (
        <>
        <ProxyEdgeContext.Provider value={{ update, target, active }}>
            {props.children}
        </ProxyEdgeContext.Provider>
        {proxyEdgeProps.from && <ControlledEdgeElementComponent {...proxyEdgeProps} opts={{
            forceLine: false,
            placeholderLength: 15,
        }}/>}
        </>
    );
}
ProxyEdgeArea.propTypes = {
    children: PropTypes.node,
    onCreate: PropTypes.func,
};
ProxyEdgeArea.defaultProps = {
    onCreate: () => {},
};

/**
 * Can only be used by children of <ProxyEdgeArea>. This effectively is a drag behavior
 * that updates the proxy edge's to position instead.
 * 
 * @param {React.Ref} elementRef The reference to the element to drag a proxy edge out of.
 * @param {object} graphElement The graph element the proxy edge is from.
 */
export function useProxyEdgeStartBehavior(elementRef, graphElement)
{
    const { update } = useContext(ProxyEdgeContext);

    useDragBehavior(elementRef, graphElement, value =>
    {
        update(graphElement, value);
    },
    {
        // We create edges only using the right button.
        useButton: 2,
        // Make sure to tell the proxy edge that we are no longer using it.
        onDragEnd: () => update(null),
    });
}

/**
 * Can only be used by children of <ProxyEdgeArea>. This updates the "to" target of the proxy
 * edge when it is "over" this element, allowing it to be targeted by the proxy as its "to".
 * 
 * @param {React.Ref} elementRef The reference to the element to drag a proxy edge to.
 * @param {object} graphElement The graph element the proxy edge will be to.
 */
export function useProxyEdgeEndBehavior(elementRef, graphElement)
{
    const { target, active } = useContext(ProxyEdgeContext);

    useEffect(() =>
    {
        function onMouseOver()
        {
            target(graphElement);
        }

        function onMouseOut()
        {
            // NOTE:
            // You may wonder: "what if you enter another targetable graph element?
            // Wouldn't that erase the previously set target?"
            // Answer: Actually, no. The DOM will cal the onMouseOver() only AFTER
            // onMouseOut() therefore the target will always be correct.
            target(null);
        }

        if (active)
        {
            elementRef.current.addEventListener('mouseover', onMouseOver);
            elementRef.current.addEventListener('mouseout', onMouseOut);
            return () =>
            {
                elementRef.current.removeEventListener('mouseover', onMouseOver);
                elementRef.current.addEventListener('mouseout', onMouseOut);
            };
        }
    },
    [
        graphElement, active
    ]);
}

/**
 * Sets up the proxy edge environment.
 * 
 * @param {Function} factoryCallback Creates the finalized edge given the proxy edge's own props.
 * @returns {[object, boolean, Function, Function]} The props for the proxy edge component
 * (including "from" and "to"), whether the proxy edge is actively used, a function to update
 * the edge's "to" position, and a function to update the target to a valid "to" graph element
 * for the proxy edge (and eventually the created element).
 */
function useProxyEdge(factoryCallback)
{
    const [ proxyEdgeActive, setProxyEdgeActive ] = useState(false);
    const [ proxyEdgeTarget, setProxyEdgeTarget ] = useState(null);
    const [ proxyEdgeProps, setProxyEdgeProps ] = useState({ from: null, to: null });

    useEffect(() =>
    {
        if (!proxyEdgeActive)
        {
            if (proxyEdgeProps.from || proxyEdgeProps.to)
            {
                if (proxyEdgeTarget)
                {
                    factoryCallback({ ...proxyEdgeProps, to: proxyEdgeTarget });
                }
                // Reset to default. The render depends on it to make the proxy edge disappear.
                setProxyEdgeProps({ from: null, to: null });
                setProxyEdgeTarget(null);
            }
        }
    },
    /* Although this is also dependent on proxyEdgeProps, we only care about when proxyEdgeActive changes. */
    [ proxyEdgeActive, factoryCallback ]);

    const update = updateProxyEdge.bind(undefined, setProxyEdgeActive, setProxyEdgeProps);
    const target = targetProxyEdge.bind(undefined, setProxyEdgeTarget);

    // NOTE: This must be deterministic and happen every render. Otherwise, use setProxyEdgeProps().
    if (proxyEdgeTarget) { proxyEdgeProps.to = proxyEdgeTarget; }

    return [
        proxyEdgeProps,
        proxyEdgeActive,
        update,
        target,
    ];
}

function updateProxyEdge(setProxyEdgeActive, setProxyEdgeProps, graphElement, position)
{
    if (graphElement)
    {
        setProxyEdgeActive(true);
        setProxyEdgeProps({ from: graphElement, to: position });
    }
    else
    {
        setProxyEdgeActive(false);
    }
}

function targetProxyEdge(setProxyEdgeTarget, graphElement)
{
    setProxyEdgeTarget(graphElement);
}
