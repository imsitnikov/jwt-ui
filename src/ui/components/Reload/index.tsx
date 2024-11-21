import {Card, ThemeProvider} from '@gravity-ui/uikit';
import React from 'react';

import '../../styles/global.scss';
import {block} from '../../utils';

import './styles.scss';

const b = block('reload');

export const Reload = () => {
    React.useEffect(() => {
        setTimeout(() => {
            let search = window.location.search + (window.location.search ? '&' : '?');
            search += 'reloaded=true';
            window.location.href =
                window.location.protocol +
                '//' +
                window.location.host +
                window.location.pathname +
                search;
        }, 1000);
    }, []);

    return (
        <ThemeProvider theme="system">
            <div className={b()}>
                <Card className={b('card')} theme="warning">
                    Page is reloading...
                </Card>
            </div>
        </ThemeProvider>
    );
};
