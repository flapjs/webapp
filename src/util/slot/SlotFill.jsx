import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Slot from './Slot.jsx';
import { SlotProviderNameContext } from './SlotContext.jsx';

export default function SlotFill(props)
{
    const { slot, contentKey, component, props: componentProps } = props;
    const providerName = useContext(SlotProviderNameContext);
    useEffect(() =>
    {
        Slot.inject(providerName, component, componentProps, slot, contentKey);
        return () =>
        {
            if (Slot.contains(providerName, component, componentProps, slot, contentKey))
            {
                Slot.reject(providerName, slot, contentKey);
            }
        };
    });
    return (
        <></>
    );
}
SlotFill.propTypes = {
    component: PropTypes.elementType.isRequired,
    props: PropTypes.object,
    slot: PropTypes.string,
    contentKey: PropTypes.string,
};
SlotFill.defaultProps = {
    slot: Slot.DEFAULT_SLOT_NAME,
    contentKey: Slot.DEFAULT_CONTENT_KEY,
    props: {},
};
