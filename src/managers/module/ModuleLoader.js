import Logger from '@flapjs/util/Logger.js';
import SemanticVersion from '@flapjs/util/SemanticVersion.js';
import Slot from '@flapjs/util/slot/Slot.jsx';
import { topoSort } from '@flapjs/util/TopologicalSort.js';

import * as ModuleRegistry from './ModuleRegistry.js';
import ModuleService from './ModuleService.js';

export async function fetchModuleClassById(moduleId, expectedModuleVersion = undefined)
{
    Logger.out('ModuleLoader', `...fetching module with id '${moduleId}'...`);

    if (moduleId in ModuleRegistry)
    {
        // eslint-disable-next-line import/namespace
        let nextModuleInfo = ModuleRegistry[moduleId];
        let nextModule = await nextModuleInfo.fetch();

        if (!nextModule) throw new Error('Unable to load module.');

        // Prioritize the default export as the module class.
        let nextModuleDefault = nextModule.default;
        if (nextModuleDefault) nextModule = nextModuleDefault;
        
        if (nextModule.moduleId !== moduleId)
        {
            throw new Error('Module id mismatch! You probably forgot to update the'
                + ' module id in the module class or the module fetch registry, because'
                + ' "' + nextModule.moduleId + '" does not equal "' + moduleId + '".');
        }

        if (expectedModuleVersion && !SemanticVersion.parse(nextModule.moduleVersion).canSupportVersion(SemanticVersion.parse(expectedModuleVersion)))
        {
            throw new Error('Outdated module version!');
        }

        return nextModule;
    }
    else
    {
        throw new Error(`Module id '${moduleId}' not found in registry.`);
    }
}

/**
 * A module's lifecycle:
 * - First, fetch the module class by id.
 * - Compute dependency order of module's services.
 * - Then initialize all used services (calls their constructor, with the current load context as the first argument and their contributions as the second).
 *   - Now is the chance for services to alter their load context. Any changes to contributions are also reflected.
 * - Initialize module instance (calls its constructor, with the current load context as the first argument and its contributions as the second).
 *   - Now is the chance for the module to alter its load context. Any changes to contributions are also reflected.
 * - Inject all of the services' providers/renders.
 * - Inject all of the module's providers/renders.
 * - Mount the services.
 * - Mount the module.
 * 
 * @param {Class} moduleClass The module class.
 * @returns {object} Instance of the loaded module class.
 */
export async function loadModuleByClass(moduleClass)
{
    Logger.out('ModuleLoader', `...loading module class '${moduleClass.name}'...`);

    const slotProviderName = 'app';
    Slot.clearAll(slotProviderName);

    let totalContributions = 0;
    let loader = {
        moduleClass,
        serviceContexts: new Map(),
        slotComponents: { providers: [] },
        get services() { return Array.from(this.serviceContexts.keys()); },
        get providers() { return [...this.slotComponents.providers]; },
        get renders() { let result = {...this.slotComponents}; delete result.providers; return result; },
    };
    let services = [ ModuleService ];
    if ('services' in moduleClass) services.push(...moduleClass.services);

    Logger.out('ModuleLoader', `...found ${services.length} service(s)...`);
    
    // Resolve service dependencies...
    let orderedServices = resolveServiceDependencies(services);

    // Initialize services...
    for(let serviceClass of orderedServices)
    {
        // ...get service providers/renders...
        let contribs = getSlotComponentsFromClass(serviceClass, {});
        // ...instantiate the service...
        let context = new (serviceClass)(loader, contribs);
        // ...merge final contributions...
        mergeContributionsToSlotComponents(loader.slotComponents, contribs);
        totalContributions += countContributions(contribs);
        loader.serviceContexts.set(serviceClass, context);
    }

    // Initialize module...
    // ...get module providers/renders...
    let moduleContribs = getSlotComponentsFromClass(moduleClass, {});
    // ...instantiate the module...
    let currentModule = new (moduleClass)(loader, moduleContribs);
    // ...merge final contributions...
    mergeContributionsToSlotComponents(loader.slotComponents, moduleContribs);
    totalContributions += countContributions(moduleContribs);

    // --!!! Inject The Spectacular Special Concoction of Module Identification !!!--
    // NOTE: This is the only time we should invert dependencies. Otherwise, you should follow the rules.
    // ADDITIONAL NOTE: Look at ModuleService for more info on why this is magical. Maybe you too can be a wizard Harry.
    loader.currentModule = currentModule;

    Logger.out('ModuleLoader', `...injecting ${totalContributions} slot component(s)...`);
    // Now, inject the components...
    injectSlotComponents(slotProviderName, loader.slotComponents);

    Logger.out('ModuleLoader', `...mounting ${orderedServices.length} service(s) and '${moduleClass.name}'...`);
    // Now, mount!
    for(let serviceClass of orderedServices)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('mount' in serviceInstance) serviceInstance.mount();
    }
    if ('mount' in currentModule) currentModule.mount();

    Logger.out('ModuleLoader', '...hello!');

    return [ currentModule, loader ];
}

export function unloadModule(currentModule, loader)
{
    const slotProviderName = 'app';

    Logger.out('ModuleLoader', `...unmounting '${currentModule.constructor.name}' and services...`);

    if ('unmount' in currentModule) currentModule.unmount();
    let services = Array.from(loader.serviceContexts.keys()).reverse();
    for(let serviceClass of services)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('unmount' in serviceInstance) serviceInstance.unmount();
    }

    Logger.out('ModuleLoader', '...clearing slot components...');
    Slot.clearAll(slotProviderName);
    loader.slotComponents = { providers: [] };
    
    for(let serviceClass of services)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('destroy' in serviceInstance) serviceInstance.destroy();
        loader.serviceContexts.delete(serviceClass);
    }
    if ('destroy' in currentModule) currentModule.destroy();
    loader.moduleClass = null;

    Logger.out('ModuleLoader', '...good-bye!');
}

function resolveServiceDependencies(services, dst = [])
{
    dst.push(...topoSort(services, (service) => service.services || []));
    return dst;
}

function mergeContributionsToSlotComponents(slotComponents, contributions)
{
    for(let [slotName, renderList] of Object.entries(contributions))
    {
        if (!(slotName in slotComponents)) slotComponents[slotName] = [];
        slotComponents[slotName].push(...renderList);
    }
    return slotComponents;
}

function countContributions(contributions)
{
    let result = 0;
    for(let renderList of Object.values(contributions))
    {
        result += renderList.length;
    }
    return result;
}

function getSlotComponentsFromClass(moduleOrServiceClass, dst = {})
{
    // Get module/service providers...
    if ('providers' in moduleOrServiceClass)
    {
        if (!('providers' in dst)) dst.providers = [];
        dst.providers.push(...moduleOrServiceClass.providers);
    }
    // Get module/service renders...
    if ('renders' in moduleOrServiceClass)
    {
        for(let [slotName, renderList] of Object.entries(moduleOrServiceClass.renders))
        {
            if (!(slotName in dst)) dst[slotName] = [];
            dst[slotName].push(...renderList);
        }
    }
    return dst;
}

function injectSlotComponents(slotProviderName, slotComponents)
{
    let i = 0;
    for(let slotName of Object.keys(slotComponents))
    {
        for(let slotComponent of slotComponents[slotName])
        {
            if (typeof slotComponent === 'object')
            {
                Slot.inject(slotProviderName, slotComponent.component, slotComponent.props, slotName, i++);
            }
            else
            {
                Slot.inject(slotProviderName, slotComponent, {}, slotName, i++);
            }
        }
    }
}
