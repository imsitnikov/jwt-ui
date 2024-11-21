export type User = {
    userId: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    login: string | null;
    password: string | null;
    passwordSalt: string | null;
};

export type UsersResponse = User[];

export type DeleteUserParams = {
    userId: string;
};

export type Session = {
    sessionId: string;
    userId: string;
    userAgent: string;
    userIp: string;
    createdAt: string;
    updatedAt: string;
    expiredAt: string;
};

export type SessionsResponse = Session[];

export type DeleteSessionParams = {
    sessionId: string;
};

export type RefreshToken = {
    refreshToken: string;
    sessionId: string;
    createdAt: string;
    expiredAt: string;
};

export type RefreshTokenResponse = RefreshToken[];

export type DeleteRefreshTokenParams = {
    refreshToken: string;
};
