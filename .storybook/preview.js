// For StoryBook Console
import '@storybook/addon-console';

// For StoryBook Docs
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});
