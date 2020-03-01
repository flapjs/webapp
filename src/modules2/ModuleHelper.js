export function withConstructor(serviceClass, constructorCallback, destructorCallback = () => {})
{
    return class extends serviceClass
    {
        constructor(loader, contribs)
        {
            super(loader, contribs);
            constructorCallback(loader, contribs);
        }

        /** @override */
        destroy()
        {
            destructorCallback();
            super.destroy();
        }
    };
}
