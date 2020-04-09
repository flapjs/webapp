// HACK: This is a hack to declare types for different files types so then you can
// auto-import them in VS code.

declare module '*.module.css';
declare module '*.css';
declare module '*.svg';

// Globals defined in `.config/globals.js` should also be defined here for autocomplete.

declare const __NODE_ENV__ : string;
declare const __VERSION__ : string;
