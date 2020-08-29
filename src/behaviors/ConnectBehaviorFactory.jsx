import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDragBehavior } from '@flapjs/behaviors/DragBehavior.jsx';

/**
 * @param {Function} renderConnector A function to render the connector. It takes a from, to, and current cursor position objects.
 * @returns {React.ReactNode} The rendered node.
 */
export function createConnector(renderConnector)
{
    const connectorName = renderConnector.name;
    const ConnectorContext = React.createContext(null);

    function ConnectorProvider(props)
    {
        const { onConnect, onCancel } = props;
        const [ opts, isActive, updateSource, setTarget ] = useConnector(onConnect, onCancel);

        return (
            <>
                <ConnectorContext.Provider value={{ updateSource, setTarget, isActive }}>
                    {props.children}
                    {renderConnector(opts.from, opts.to, opts.cursor, opts.opts)}
                </ConnectorContext.Provider>
            </>
        );
    }
    ConnectorProvider.propTypes = {
        children: PropTypes.node,
        onConnect: PropTypes.func,
        onCancel: PropTypes.func,
    };
    ConnectorProvider.defaultProps = {
        onConnect: (from, to, cursor, opts) => {},
        onCancel: (from, to, cursor, opts) => {},
    };
    ConnectorProvider.displayName = connectorName + '.ConnectorProvider';

    /**
     * @param {React.Ref<React.ReactElement>} elementRef The element to attach to.
     * @param {object} fromTarget The target object attached to.
     * @param {number} fromTarget.x The x position of the target.
     * @param {number} fromTarget.y The y position of the target.
     * @param {object} opts Any additional options.
     * @returns {boolean} Whether it is actively dragging the connector.
     */
    function useConnectorFromBehavior(elementRef, fromTarget = null, opts = {})
    {
        const { updateSource } = useContext(ConnectorContext);
    
        return useDragBehavior(elementRef, fromTarget, value =>
        {
            updateSource(fromTarget, value, opts);
        },
        {
            ...opts,
            // Make sure to tell the connector that we are no longer using it.
            onDragEnd: () =>
            {
                if (opts.onDragEnd) opts.onDragEnd();
                updateSource(null, undefined, opts);
            },
        });
    }

    function useConnectorToBehavior(elementRef, toTarget, opts = {})
    {
        const { setTarget, isActive } = useContext(ConnectorContext);
    
        useEffect(() =>
        {
            function onMouseOver()
            {
                setTarget(toTarget, opts);
            }
    
            function onMouseOut()
            {
                // NOTE:
                // You may wonder: "what if you enter another targetable element?
                // Wouldn't that erase the previously set target?"
                // Answer: Actually, no. The DOM will call the onMouseOver() only AFTER
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
        [ elementRef, toTarget, setTarget, isActive, opts ]);
    }

    /**
     * @param {Function} connectCallback The callback to handle when the connection is connected.
     * @param {Function} cancelCallback The callbakc to handle when the connection is cancelled.
     * 
     * @returns {[ { from, to, cursor, opts }, boolean, Function, Function ]} The connector hook results.
     */
    function useConnector(connectCallback, cancelCallback)
    {
        const [ isActive, setActive ] = useState(false);
        const [ from, setFrom ] = useState({ target: null, cursor: null });
        const [ to, setTo ] = useState({ target: null });
        const [ fromOpts, setFromOpts ] = useState({});
        const [ toOpts, setToOpts ] = useState({});
        const fromToOpts = { ...fromOpts, ...toOpts };

        useEffect(() =>
        {
            if (!isActive)
            {
                if (from.target || to.target)
                {
                    if (from.target && to.target)
                    {
                        connectCallback(from.target, to.target, from.cursor, fromToOpts);
                    }
                    else
                    {
                        cancelCallback(from.target, to.target, from.cursor, fromToOpts);
                    }

                    // Reset to default.
                    setFrom({ target: null, cursor: null });
                    setTo({ target: null });
                }
            }
        },
        /* Although this is also dependent on "target" and "fromOpts/toOpts", we only care about when "isActive" changes. */
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ isActive, connectCallback, cancelCallback ]);

        const updateSource = useCallback((fromTarget, cursorPosition, opts = {}) =>
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

            setFromOpts(opts);
        },
        [ setActive, setFrom, setFromOpts ]);
    
        const setTarget = useCallback((toTarget, opts = {}) =>
        {
            setTo({ target: toTarget });
            
            setToOpts(opts);
        },
        [ setTo ]);

        const opts = {
            from: from.target,
            to: to.target,
            cursor: from.cursor,
            opts: fromToOpts,
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
