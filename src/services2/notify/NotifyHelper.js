export function UNSAFE_findMessagesWithConjunctiveTags(notifyState, tags)
{
    if (tags.length <= 0) return [];

    let [ firstTag, ...otherTags ] = tags;

    if (!(firstTag in notifyState.tags)) return [];

    let result = new Set(Object.keys(notifyState.tags[firstTag].messages));
    for(let tag of otherTags)
    {
        if (!(tag in notifyState.tags)) return [];

        for(let messageId of Object.keys(notifyState.tags[tag]))
        {
            if (!result.has(messageId)) result.delete(messageId);
        }
    }
    return Array.from(result);
}

export function UNSAFE_findMessagesWithDisjunctiveTags(notifyState, tags)
{
    if (tags.length <= 0) return [];

    let result = new Set();
    for(let tag of tags)
    {
        if (tag in notifyState.tags)
        {
            for(let messageId of Object.keys(notifyState.tags[tag]))
            {
                result.add(messageId);
            }
        }
    }
    return Array.from(result);
}
