import PlaygroundLayer from './PlaygroundLayer.jsx';
import ExportPanel from './ExportPanel.jsx';

const MODULE = {
    id: 'node',
    version: '1.0.0',
    serices: [],
    renders: {
        drawer: [ ExportPanel ],
        playground: [ PlaygroundLayer ]
    },
    load(session)
    {
    },
    unload(session)
    {
    }
};

export default MODULE;
