import React from 'react';
import {createRoot} from 'react-dom/client';

import {App} from '../components/App';

const rootElem = document.getElementById('root');

if (rootElem) {
    const root = createRoot(rootElem);
    root.render(<App />);
} else {
    // eslint-disable-next-line no-console
    console.error('No root element');
}
