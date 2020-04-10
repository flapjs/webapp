export function eventConsumer(e)
{
    e.preventDefault();
    e.stopPropagation();
    return false;
}
