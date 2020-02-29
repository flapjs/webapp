import SemanticVersion from '@flapjs/util/SemanticVersion.js';
import * as ModuleRegistry from './ModuleRegistry.js';
import Slot from '@flapjs/util/slot/Slot.jsx';

export async function loadModuleById(moduleId, moduleVersion)
{
    if (moduleId in ModuleRegistry)
    {
        // eslint-disable-next-line import/namespace
        let nextModuleInfo = ModuleRegistry[moduleId];
        let nextModule = await nextModuleInfo.fetch();

        if (!nextModule) throw new Error('Unable to load module.');
        
        if (nextModule.moduleId !== moduleId)
        {
            throw new Error('Module id mismatch! You probably forgot to update the'
                + ' module id in the module class or the module fetch registry, because'
                + ' "' + nextModule.moduleId + '" does not equal "' + moduleId + '".');
        }

        if (moduleVersion && !SemanticVersion.parse(nextModule.moduleVersion).canSupportVersion(SemanticVersion.parse(moduleVersion)))
        {
            throw new Error('Outdated module version!');
        }

        return await loadModuleByClass(nextModule);
    }
    return null;
}

export async function loadModuleByClass(moduleClass)
{
    Slot.clearAll();

    const slotProviderName = moduleClass.moduleId;
    await loadModuleServices(slotProviderName, moduleClass, moduleClass.services);
    loadModuleProviders(slotProviderName, moduleClass, moduleClass.providers);
    loadModuleRenders(slotProviderName, moduleClass, moduleClass.renders);

    let currentModule = new (moduleClass)();
    return currentModule;
}

function loadModuleProviders(slotProviderName, moduleClass, providers)
{
    let i = 0;
    if (!Array.isArray(providers)) providers = [providers];
    for(let provider of providers)
    {
        if (typeof provider === 'object')
        {
            Slot.inject(slotProviderName, provider.component, provider.props, 'provider', i++);
        }
        else
        {
            Slot.inject(slotProviderName, provider, {}, 'provider', i++);
        }
    }
}

function loadModuleRenders(slotProviderName, moduleClass, renders)
{
    for(let [slot, renderList] of Object.entries(renders))
    {
        let i = 0;
        if (!Array.isArray(renderList)) renderList = [renderList];
        for(let render of renderList)
        {
            if (typeof render === 'object')
            {
                Slot.inject(slotProviderName, render.component, render.props, slot, i++);
            }
            else
            {
                Slot.inject(slotProviderName, render, {}, slot, i++);
            }
        }
    }
}

async function loadModuleServices(slotProviderName, moduleClass, services)
{
    for(let service of services)
    {
        await service.load(moduleClass);
    }
}
