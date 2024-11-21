import {Loader, ThemeProvider} from '@gravity-ui/uikit';
import React from 'react';
import {RELOADED_QUERY_PARAM} from 'shared/constants';

import '../../styles/global.scss';
import {block} from '../../utils';

import './styles.scss';

const b = block('reload');

export const Reload = () => {
    React.useEffect(() => {
        setTimeout(() => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set(RELOADED_QUERY_PARAM, 'true');
            window.location.href = `${window.location.protocol}//${window.location.host}${
                window.location.pathname
            }?${searchParams.toString()}`;
        }, 1000);
    }, []);

    return (
        <ThemeProvider theme="system">
            <div className={b()}>
                <Loader size="l" />
            </div>
        </ThemeProvider>
    );
};
