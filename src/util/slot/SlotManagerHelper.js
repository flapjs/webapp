export function isSameContent(componentClass, componentProps, otherContent)
{
    const { component, props } = otherContent;
    if (Object.is(componentClass, component))
    {
        if (isSameProps(componentProps, props))
        {
            return true;
        }
    }
}

export function isSameProps(props, other)
{
    let otherEntries = Object.entries(other);
    let propEntries = Object.entries(props);
    if (otherEntries.length === propEntries.length)
    {
        const length = otherEntries.length;
        for(let i = 0; i < length; ++i)
        {
            let otherEntry = otherEntries[i];
            let propEntry = propEntries[i];
            if (Object.is(otherEntry[0], propEntry[0])
                && Object.is(otherEntry[1], propEntry[1]))
            {
                return true;
            }
        }
    }
    return false;
}
