import React from 'react';
import {createRoot} from 'react-dom/client';

import {Reload} from '../components/Reload';

const rootElem = document.getElementById('root');

if (rootElem) {
    const root = createRoot(rootElem);
    root.render(<Reload />);
} else {
    // eslint-disable-next-line no-console
    console.error('No root element');
}
