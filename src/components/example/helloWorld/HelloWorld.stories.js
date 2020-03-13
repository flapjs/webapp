import React from 'react';
import HelloWorld from './HelloWorld.jsx';

export default {
    title: '@flapjs/components/example/helloWorld/HelloWorld',
    component: HelloWorld,
    decorators: [],
};

export const Primary = () => <HelloWorld/>;

export const withText = () => <HelloWorld title="Home!"/>;
export const withRainbow = () => <HelloWorld rainbow={true}/>;
