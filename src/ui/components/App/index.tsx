import {ThemeProvider} from '@gravity-ui/uikit';
import React from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import {Layout} from '../../components/Layout';
import {Main} from '../../pages/Main';
import {RefreshTokens} from '../../pages/RefreshTokens';
import {Sessions} from '../../pages/Sessions';
import {Signin} from '../../pages/Signin';
import {SigninLdap} from '../../pages/SigninLdap';
import {Signup} from '../../pages/Signup';
import {Users} from '../../pages/Users';
import '../../styles/global.scss';
import {getWindowData} from '../../utils';

export const App = () => {
    const {user} = getWindowData();

    const isAuthenticated = Boolean(user);

    return (
        <ThemeProvider theme="system">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
                        <Route index element={<Main user={user} />} />

                        <Route
                            path="/signin"
                            element={isAuthenticated ? <Navigate to="/" /> : <Signin />}
                        />
                        <Route
                            path="/signin/ldap"
                            element={isAuthenticated ? <Navigate to="/" /> : <SigninLdap />}
                        />
                        <Route
                            path="/signup"
                            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
                        />

                        <Route
                            path="/users"
                            element={
                                isAuthenticated ? <Users user={user} /> : <Navigate to="/signin" />
                            }
                        />
                        <Route
                            path="/sessions"
                            element={
                                isAuthenticated ? (
                                    <Sessions user={user} />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                        <Route
                            path="/refresh-tokens"
                            element={
                                isAuthenticated ? (
                                    <RefreshTokens user={user} />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};
