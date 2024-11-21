import {createLayoutPlugin, createRenderFunction, createUikitPlugin} from '@gravity-ui/app-layout';
import {NextFunction, Request, Response} from '@gravity-ui/expresskit';
import jwt from 'jsonwebtoken';
import requestIp from 'request-ip';
import setCookieParser from 'set-cookie-parser';
import {
    ACCESS_TOKEN_TIME_RESERVE,
    AUTH_COOKIE_NAME,
    AUTH_EXP_COOKIE_NAME,
    SET_COOKIE_HEADER,
    X_FORWARDED_FOR_HEADER,
} from 'shared/constants';

import {gatewayApi} from '../components/gateway';
import {AccessTokenPayload} from '../types';
import {uiManifest} from '../ui-manifest';

export const uiAuth = async (req: Request, res: Response, next: NextFunction) => {
    req.ctx.log('UI_AUTH');

    // For race condition testing
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 3000);
    // });

    let authCookie = req.cookies[AUTH_COOKIE_NAME];
    let authExpCookie = req.cookies[AUTH_EXP_COOKIE_NAME];

    if (!authCookie || !authExpCookie) {
        next();
        return;
    }

    const now = Math.floor(new Date().getTime() / 1000);
    const exp = Number(authExpCookie);

    if (now + ACCESS_TOKEN_TIME_RESERVE > exp) {
        req.ctx.log('START_REFRESH_TOKEN', {
            now,
            exp,
        });

        try {
            await gatewayApi.auth
                ._refreshTokens({
                    ctx: req.ctx,
                    headers: {
                        cookie: req.headers.cookie,
                        [X_FORWARDED_FOR_HEADER]: requestIp.getClientIp(req) ?? undefined,
                    },
                    authArgs: {},
                    requestId: req.ctx.get('requestId') ?? '',
                    args: undefined,
                })
                .then((result) => {
                    const {responseHeaders} = result;

                    if (responseHeaders) {
                        Object.keys(responseHeaders).forEach((header) => {
                            res.header(header, responseHeaders[header]);

                            if (header.toLowerCase() === SET_COOKIE_HEADER.toLowerCase()) {
                                const settedCookies = setCookieParser.parse(
                                    responseHeaders[header],
                                );

                                settedCookies.forEach((cookie) => {
                                    if (cookie.name === AUTH_COOKIE_NAME) {
                                        authCookie = cookie.value;
                                    } else if (cookie.name === AUTH_EXP_COOKIE_NAME) {
                                        authExpCookie = cookie.value;
                                    }
                                });
                            }
                        });
                    }

                    req.ctx.log('FINISH_REFRESH_TOKEN', {
                        newExp: Number(authExpCookie),
                    });
                });
        } catch (err) {
            req.ctx.logError('REFRESH_TOKEN_ERROR', err);

            if (req.query.reloaded) {
                res.clearCookie(AUTH_COOKIE_NAME).clearCookie(AUTH_EXP_COOKIE_NAME);
                next();
                return;
            } else {
                const renderLayout = createRenderFunction([
                    createLayoutPlugin({manifest: uiManifest, publicPath: '/build/'}),
                    createUikitPlugin(),
                ]);

                res.send(
                    renderLayout({
                        title: 'Auth PoC reload page',
                        pluginsOptions: {
                            layout: {name: 'reload'},
                            uikit: {
                                theme: 'system',
                                direction: 'ltr',
                            },
                        },
                    }),
                );
                return;
            }
        }
    }

    try {
        req.ctx.log('CHECK_ACCESS_TOKEN');

        const {accessToken} = JSON.parse(authCookie);
        const {userId, sessionId} = jwt.verify(
            accessToken,
            req.ctx.config.accessTokenPublicKey,
        ) as AccessTokenPayload;

        req.originalContext.set('user', {
            userId,
            sessionId,
            accessToken,
        });

        req.ctx.log('CHECK_ACCESS_TOKEN_SUCCESS');
    } catch (err) {
        req.ctx.logError('CHECK_ACCESS_TOKEN_ERROR', err);
    }

    next();
};

export const apiAuth = async (req: Request, res: Response, next: NextFunction) => {
    req.ctx.log('API_AUTH');

    const authCookie = req.cookies[AUTH_COOKIE_NAME];

    try {
        req.ctx.log('CHECK_ACCESS_TOKEN');

        const {accessToken} = JSON.parse(authCookie);
        const {userId, sessionId} = jwt.verify(
            accessToken,
            req.ctx.config.accessTokenPublicKey,
        ) as AccessTokenPayload;

        req.originalContext.set('user', {
            userId,
            sessionId,
            accessToken,
        });

        req.ctx.log('CHECK_ACCESS_TOKEN_SUCCESS');

        next();
        return;
    } catch (err) {
        req.ctx.logError('CHECK_ACCESS_TOKEN_ERROR', err);
        res.status(401).send('Unauthorized access');
        return;
    }
};
