import {
    ArrowRightFromSquare,
    ArrowRightToSquare,
    Display,
    Fingerprint,
    House,
    PersonPlus,
    Persons,
} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import React from 'react';
import {Link, Outlet, useSearchParams} from 'react-router-dom';
import {RELOADED_QUERY_PARAM} from 'shared/constants';

import {block} from '../../utils';

import './styles.scss';

const b = block('layout');

type Props = {
    isAuthenticated: boolean;
};

export const Layout: React.FC<Props> = ({isAuthenticated}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        if (searchParams.has(RELOADED_QUERY_PARAM)) {
            searchParams.delete(RELOADED_QUERY_PARAM);
            setSearchParams(searchParams);
        }
    }, [searchParams]);

    return (
        <div className={b()}>
            <div className={b('title')}>
                <h1>Auth PoC</h1>
                <div className={b('title-menu')}>
                    {isAuthenticated ? (
                        <a href="/auth/logout" className={b('title-menu-item')}>
                            <Button size="l">
                                <Icon data={ArrowRightFromSquare} size={18} />
                                Logout
                            </Button>
                        </a>
                    ) : (
                        <React.Fragment>
                            <Link to="/signin" className={b('title-menu-item')}>
                                <Button size="l">
                                    <Icon data={ArrowRightToSquare} size={18} />
                                    Sign in
                                </Button>
                            </Link>
                            <Link to="/signup" className={b('title-menu-item')}>
                                <Button size="l">
                                    <Icon data={PersonPlus} size={18} />
                                    Sign up
                                </Button>
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>

            <Card className={b('menu')}>
                <Link to="/" className={b('menu-item')}>
                    <Button size="l">
                        <Icon data={House} size={18} />
                        Main
                    </Button>
                </Link>
                {isAuthenticated ? (
                    <React.Fragment>
                        <Link to="/users" className={b('menu-item')}>
                            <Button size="l">
                                <Icon data={Persons} size={18} />
                                Users
                            </Button>
                        </Link>
                        <Link to="/sessions" className={b('menu-item')}>
                            <Button size="l">
                                <Icon data={Display} size={18} />
                                Sessions
                            </Button>
                        </Link>
                        <Link to="/refresh-tokens" className={b('menu-item')}>
                            <Button size="l">
                                <Icon data={Fingerprint} size={18} />
                                Refresh tokens
                            </Button>
                        </Link>
                    </React.Fragment>
                ) : null}
            </Card>

            <Card className={b('content')}>
                <Outlet />
            </Card>
        </div>
    );
};
