import React from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useGraphElementIds, useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';

import GraphElementLayer from './GraphElementLayer.jsx';

export default function GraphElementComponentLayer(props)
{
    const { elementType } = props;

    const [ elementIds ] = useGraphElementIds(elementType);

    return (
        <GraphElementLayer elementType={elementType} elementIds={elementIds}>
            {(elementType, elementId) => (
                <GraphElementComponent key={elementId}
                    elementType={elementType}
                    elementId={elementId}>
                    {props.children}
                </GraphElementComponent>
            )}
        </GraphElementLayer>
    );
}
GraphElementComponentLayer.propTypes = {
    children: PropTypes.func.isRequired,
    elementType: PropTypes.elementType.isRequired,
};

function GraphElementComponent(props)
{
    const { elementType, elementId } = props;

    const forceUpdate = useForceUpdate();
    const element = useGraphElement(elementType, elementId, forceUpdate);

    return (
        <>
        {props.children(element)}
        </>
    );
}
GraphElementComponent.propTypes = {
    children: PropTypes.func.isRequired,
    elementType: PropTypes.elementType.isRequired,
    elementId: PropTypes.string.isRequired,
};
