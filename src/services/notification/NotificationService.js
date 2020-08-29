export { NotificationProvider, useNotifications } from './NotificationContext.jsx';
export { NotificationList } from './NotificationList.jsx';
export { NotificationElementContainer } from './NotificationElementContainer.jsx';

/**
 * @module NotificationService
 * 
 * ## Setup
 * - Put NotificationProvider as a top-level parent. All notification actions must be performed
 * as a descendent of NotificationProvider.
 * - Put NotificationList somewhere to render the list of active notifications.
 * 
 * ## Usage
 * - Use the hook useNotifications() to interact with notifications. Within it includes mutable
 * functions, such as addNotification() and clearNotifiations(), and a list of active
 * notifications (read-only).
 * - If you want to define your own notification message, you can use NotificationElementContainer
 * as a component template to style it like the default notifications. Otherwise, feel free to
 * pass in your own notification element class as the message.
 */
