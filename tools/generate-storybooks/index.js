/* eslint-env node */

const path = require('path');
const fs = require('fs');
const { walk } = require('./util.js');

const FILE_TEMPLATE = (path, name) => `import { Meta, Props } from '@storybook/addon-docs/blocks';
import ${name} from './${name}.jsx';

<Meta title="${path}/${name}"
    component={${name}}/>

# ${name}

A React component that needs some love. Please describe me! :(

<Props of={${name}}/>

`;
const FILE_PATH = path.resolve('.', 'src');

walk(FILE_PATH, (file, stat) =>
{
    if (file.endsWith('.jsx'))
    {
        if (file.indexOf('deprecated') === -1)
        {
            const dirname = path.dirname(file);
            const relpath = path.relative(FILE_PATH, dirname);
            const basename = path.basename(file, '.jsx');

            const otherStories = path.resolve(dirname, basename + '.stories.js');
            if (!fs.existsSync(otherStories))
            {
                const datapath = path.resolve(dirname, basename + '.stories.mdx');
                const data = FILE_TEMPLATE('@flapjs/' + relpath, basename);
                if (!fs.existsSync(datapath))
                {
                    fs.writeFileSync(datapath, data);
                }
            }
        }
    }
});
