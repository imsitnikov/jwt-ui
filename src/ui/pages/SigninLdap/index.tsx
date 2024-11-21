import {Button, TextInput} from '@gravity-ui/uikit';
import React from 'react';

import {block} from '../../utils';

import './styles.scss';

const b = block('signin-ldap');

export const SigninLdap = () => {
    return (
        <div className={b()}>
            <h2 className={b('title')}>Sign in LDAP</h2>
            <form method="post" action="/auth/signin/ldap">
                <TextInput className={b('input')} name="login" placeholder="LDAP Login" size="l" />
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
