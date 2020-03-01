import { ModuleProvider } from './ModuleContext.jsx';

export default class ModuleService
{
    /** @override */
    static get providers()
    {
        return [
            { component: ModuleProvider, props: { currentModule: null, moduleId: null, loader: null } },
        ];
    }

    constructor(loader, contribs)
    {
        let moduleProviderProps = contribs.providers[0].props;
        moduleProviderProps.loader = loader;
        moduleProviderProps.moduleId = loader.moduleClass.moduleId;

        // This will set the currentModule props BEFORE the provider is mounted but AFTER the module instance has been created.
        Object.defineProperty(loader, 'currentModule', {
            set(value)
            {
                // Revert to normal property...
                Object.defineProperty(this, 'currentModule', { value, enumerable: true, configurable: true });

                // ...define it on our props... ;)
                moduleProviderProps.currentModule = value;

                // ~Presto! Magic happened before your very eyes!
            },
            enumerable: false,
            configurable: true,
        });
    }
}
