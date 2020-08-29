import BaseService from '../base/BaseService.js';

import { MachineProvider } from './MachineContext.jsx';

/**
 * This is a module service that handles machine synchronization across UI and logic states.
 */
export default class MachineService extends BaseService
{
    /** @override */
    static get serviceVersion() { return '1.0.0'; }

    /** @override */
    static get providers() { return [ MachineProvider ]; }
}
