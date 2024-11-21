import {Button, TextInput} from '@gravity-ui/uikit';
import React from 'react';
import {Link} from 'react-router-dom';

import {block} from '../../utils';

import './styles.scss';

const b = block('signin');

export const Signin = () => {
    return (
        <div className={b()}>
            <h2 className={b('title')}>Sign in</h2>
            <form method="post" action="/auth/signin">
                <TextInput className={b('input')} name="login" placeholder="Login" size="l" />
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
                <div className={b('menu')}>
                    <a href="/auth/signin/saml" className={b('menu-item')}>
                        <Button size="l">Sign in via SAML</Button>
                    </a>
                    <Link to="/signin/ldap" className={b('menu-item')}>
                        <Button size="l">Sign in via LDAP</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
