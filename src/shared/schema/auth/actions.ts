import {COOKIE_HEADER, SET_COOKIE_HEADER} from '../../constants';
import {createAction} from '../utils';

import {
    DeleteRefreshTokenParams,
    DeleteSessionParams,
    DeleteUserParams,
    RefreshTokenResponse,
    SessionsResponse,
    User,
    UsersResponse,
} from './types';

export const actions = {
    _refreshTokens: createAction<undefined, undefined>({
        method: 'POST',
        proxyHeaders: [COOKIE_HEADER],
        proxyResponseHeaders: [SET_COOKIE_HEADER],
        path: () => '/refresh',
    }),

    getUser: createAction<User, undefined>({
        method: 'GET',
        path: () => '/user',
    }),

    getUsers: createAction<UsersResponse, undefined>({
        method: 'GET',
        path: () => '/users',
    }),

    deleteUser: createAction<undefined, DeleteUserParams>({
        method: 'DELETE',
        path: ({userId}) => `/users/${userId}`,
    }),

    getSessions: createAction<SessionsResponse, undefined>({
        method: 'GET',
        path: () => '/sessions',
    }),

    getUserSessions: createAction<SessionsResponse, undefined>({
        method: 'GET',
        path: () => '/user-sessions',
    }),

    deleteSession: createAction<undefined, DeleteSessionParams>({
        method: 'DELETE',
        path: ({sessionId}) => `/sessions/${sessionId}`,
    }),

    getRefreshTokens: createAction<RefreshTokenResponse, undefined>({
        method: 'GET',
        path: () => '/refresh-tokens',
    }),

    deleteRefreshToken: createAction<undefined, DeleteRefreshTokenParams>({
        method: 'DELETE',
        path: ({refreshTokenId}) => `/refresh-tokens/${refreshTokenId}`,
    }),
};
