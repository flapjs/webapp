export { DrawerProvider, DrawerConsumer, useDrawer } from './DrawerContext.jsx';
export { Drawer } from './Drawer.jsx';

/**
 * @module DrawerService
 * 
 * ## Setup
 * - Requires DrawerProvider as the top-level parent. All drawer actions
 * must be performed in a descendent of DrawerProvider.
 * 
 * ## Usage
 * - Put Drawer somewhere to draw it.
 * - Use the hook useDrawer() to perform drawer actions and alter
 * its state.
 */
