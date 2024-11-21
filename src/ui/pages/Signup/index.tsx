import {Button, TextInput} from '@gravity-ui/uikit';
import React from 'react';

import {block} from '../../utils';

import './styles.scss';

const b = block('signup');

export const Signup = () => {
    return (
        <div className={b()}>
            <h2 className={b('title')}>Sign up</h2>
            <form method="post" action="/auth/signup">
                <TextInput className={b('input')} name="login" placeholder="Login" size="l" />
                <TextInput
                    className={b('input')}
                    name="displayName"
                    placeholder="Display name"
                    size="l"
                />
                <TextInput
                    className={b('input')}
                    name="password"
                    type="password"
                    placeholder="Password"
                    size="l"
                />
                <Button className={b('button')} type="submit" size="l">
                    Submit
                </Button>
            </form>
        </div>
    );
};
