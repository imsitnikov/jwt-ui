export type ExpirableTokenPayload = {
    iat: number;
    exp: number;
};

export type AccessTokenPayload = ExpirableTokenPayload & {
    userId: string;
    sessionId: string;
};

export type CtxUser = {
    userId: string;
    sessionId: string;
    accessToken: string;
};
