import { Logger } from '@flapjs/util/Logger.js';
import { topoSort } from '@flapjs/util/TopologicalSort.js';
import SemanticVersion from '@flapjs/util/SemanticVersion.js';

import Slot from '@flapjs/util/slot/Slot.jsx';

// eslint-disable-next-line no-unused-vars
import BaseModule from './base/BaseModule.js';

import * as ModuleRegistry from './ModuleRegistry.js';

const LOGGER = new Logger('ModuleLoader');

export async function fetchModuleClassById(moduleId, expectedModuleVersion = undefined)
{
    LOGGER.info(`...fetching module with id '${moduleId}'...`);

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

        if (expectedModuleVersion && !SemanticVersion.parse(nextModule.moduleVersion).canSupportVersion(expectedModuleVersion))
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
 * Loads the module class into the system. This affects and depends on <Slot> and
 * managers to operate correctly. That means the app must define <SlotProvider name="app">
 * and initialize managers first. to help you, there is already a ModuleManager to
 * handle that logic.
 * 
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
 * @param {typeof BaseModule} moduleClass The module class.
 * @returns {object} Instance of the loaded module class.
 */
export function loadModule(moduleClass)
{
    LOGGER.info('ModuleLoader', `...loading module class '${moduleClass.name}'...`);

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
    let services = [];
    if ('services' in moduleClass) services.push(...moduleClass.services);

    LOGGER.info(`...found ${services.length} service(s)...`);
    
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

    LOGGER.info(`...injecting ${totalContributions} slot component(s)...`);
    // Now, inject the components...
    injectSlotComponents(slotProviderName, loader.slotComponents);

    LOGGER.info(`...mounting ${orderedServices.length} service(s) and '${moduleClass.name}'...`);
    // Now, mount!
    for(let serviceClass of orderedServices)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('mount' in serviceInstance) serviceInstance.mount(loader.serviceContexts);
    }
    if ('mount' in currentModule) currentModule.mount(loader.serviceContexts);

    LOGGER.info('...hello!');

    return [ currentModule, loader ];
}

export function unloadModule(currentModule, loader)
{
    const slotProviderName = 'app';

    LOGGER.info(`...unmounting '${currentModule.constructor.name}' and services...`);

    if ('unmount' in currentModule) currentModule.unmount(loader.serviceContexts);
    let services = Array.from(loader.serviceContexts.keys()).reverse();
    for(let serviceClass of services)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('unmount' in serviceInstance) serviceInstance.unmount(loader.serviceContexts);
    }

    LOGGER.info('...clearing slot components...');
    Slot.clearAll(slotProviderName);
    loader.slotComponents = { providers: [] };
    
    for(let serviceClass of services)
    {
        let serviceInstance = loader.serviceContexts.get(serviceClass);
        if ('destroy' in serviceInstance) serviceInstance.destroy(loader);
        loader.serviceContexts.delete(serviceClass);
    }
    if ('destroy' in currentModule) currentModule.destroy(loader);
    loader.moduleClass = null;

    LOGGER.info('...good-bye!');
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
        let providerList = dst.providers;
        for(let provider of moduleOrServiceClass.providers)
        {
            providerList.push(transformToSlotComponentObject(provider));
        }
    }
    // Get module/service renders...
    if ('renders' in moduleOrServiceClass)
    {
        for(let [slotName, renderList] of Object.entries(moduleOrServiceClass.renders))
        {
            if (!(slotName in dst)) dst[slotName] = [];
            let slotList = dst[slotName];
            for(let render of renderList)
            {
                slotList.push(transformToSlotComponentObject(render));
            }
        }
    }
    return dst;
}

function transformToSlotComponentObject(slotComponent)
{
    if (Array.isArray(slotComponent))
    {
        return { component: slotComponent[0], props: slotComponent[1] };
    }
    else if (typeof slotComponent === 'object')
    {
        return slotComponent;
    }
    else
    {
        return { component: slotComponent, props: {} };
    }
}

function injectSlotComponents(slotProviderName, slotComponents)
{
    let i = 0;
    for(let slotName of Object.keys(slotComponents))
    {
        for(let slotComponent of slotComponents[slotName])
        {
            if (typeof slotComponent !== 'object') throw new Error(`Expected slot component object in the form of { component, props }, but found ${slotComponent}.`);
            Slot.inject(slotProviderName, slotComponent.component, slotComponent.props, slotName, String(i++));
        }
    }
}
