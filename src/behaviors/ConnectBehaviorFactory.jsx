import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';

export function createConnector(renderConnector)
{
    const connectorName = renderConnector.name;
    const ConnectorContext = React.createContext();

    function ConnectorProvider(props)
    {
        const { onConnect } = props;
        const [ opts, isActive, updateSource, setTarget ] = useConnector(onConnect);

        return (
            <>
            <ConnectorContext.Provider value={{ updateSource, setTarget, isActive }}>
                {props.children}
                {renderConnector(opts)}
            </ConnectorContext.Provider>
            </>
        );
    }
    ConnectorProvider.propTypes = {
        children: PropTypes.node,
        onConnect: PropTypes.func,
    };
    ConnectorProvider.defaultProps = {
        onConnect: () => {},
    };
    ConnectorProvider.displayName = connectorName + '.ConnectorProvider';

    function useConnectorFromBehavior(elementRef, fromTarget, dragBehaviorOpts = {})
    {
        const { updateSource } = useContext(ConnectorContext);
    
        return useDragBehavior(elementRef, fromTarget, value =>
        {
            updateSource(fromTarget, value);
        },
        {
            ...dragBehaviorOpts,
            // Make sure to tell the connector that we are no longer using it.
            onDragEnd: () => updateSource(null),
        });
    }

    function useConnectorToBehavior(elementRef, toTarget)
    {
        const { setTarget, isActive } = useContext(ConnectorContext);
    
        useEffect(() =>
        {
            function onMouseOver()
            {
                setTarget(toTarget);
            }
    
            function onMouseOut()
            {
                // NOTE:
                // You may wonder: "what if you enter another targetable element?
                // Wouldn't that erase the previously set target?"
                // Answer: Actually, no. The DOM will cal the onMouseOver() only AFTER
                // onMouseOut() therefore the target will always be correct.
                setTarget(null);
            }
    
            if (isActive)
            {
                let element = elementRef.current;
                element.addEventListener('mouseover', onMouseOver);
                element.addEventListener('mouseout', onMouseOut);
                return () =>
                {
                    element.removeEventListener('mouseover', onMouseOver);
                    element.removeEventListener('mouseout', onMouseOut);
                };
            }
        },
        [ elementRef, toTarget, setTarget, isActive ]);
    }

    function useConnector(connectCallback)
    {
        const [ isActive, setActive ] = useState(false);
        const [ from, setFrom ] = useState({ target: null, cursor: null });
        const [ to, setTo ] = useState({ target: null });

        useEffect(() =>
        {
            if (!isActive)
            {
                if (from.target || to.target)
                {
                    if (from.target && to.target)
                    {
                        connectCallback(from.target, to.target);
                    }

                    // Reset to default.
                    setFrom({ target: null, cursor: null });
                    setTo({ target: null });
                }
            }
        },
        /* Although this is also dependent on "target", we only care about when "isActive" changes. */
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ isActive, connectCallback ]);

        const updateSource = useCallback((fromTarget, cursorPosition) =>
        {
            if (fromTarget)
            {
                setActive(true);
                setFrom({ target: fromTarget, cursor: cursorPosition || null });
            }
            else
            {
                setActive(false);
            }
        },
        [ setActive, setFrom ]);
    
        const setTarget = useCallback((toTarget) =>
        {
            setTo({ target: toTarget });
        },
        [ setTo ]);

        const opts = {
            from: from.target,
            to: to.target,
            cursor: from.cursor,
        };
        return [
            opts,
            isActive,
            updateSource,
            setTarget,
        ];
    }

    return {
        ConnectorProvider,
        useConnectorFromBehavior,
        useConnectorToBehavior,
    };
}
