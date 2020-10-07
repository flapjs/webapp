// HACK: This is a hack to declare types for different files types so then you can
// auto-import them in VS code.

declare module '*.module.css';
declare module '*.css';
declare module '*.svg';
declare module '*.png';

// Globals defined in `.config/globals.js` should also be defined here for autocomplete.

declare const __VERSION__ : string;
declare const __BUG_REPORT_URL__ : string;
declare const __PROJECT_NAME__ : string;
declare const __NODE_ENV__ : string;
