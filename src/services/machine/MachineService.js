import BaseService from '../base/BaseService.js';

import { MachineProvider } from './MachineContext.jsx';

export default class MachineService extends BaseService
{
    /** @override */
    static get serviceVersion() { return '1.0.0'; }

    /** @override */
    static get providers() { return [ MachineProvider ]; }
}
