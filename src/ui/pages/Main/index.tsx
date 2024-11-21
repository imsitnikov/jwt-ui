import React from 'react';

import {User} from '../../types';
import {block} from '../../utils';

import './styles.scss';

const b = block('main');

type Props = {
    user: User | null;
};

export const Main: React.FC<Props> = ({user}) => {
    return (
        <div className={b()}>
            <div>Hi, {user ? user.displayName : 'anonymous'}!</div>
            {user ? <div className={b('session')}>Session id: {user.sessionId}</div> : null}
        </div>
    );
};
